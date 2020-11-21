/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { PvM, PvmTask } = require('../config/mongo');
const { PVM_ERRORS } = require('../consts/error_jsons');
const mongoose = require('mongoose');

/* Regular expressions for parameter validation. */
const TYPE_REGEX = new RegExp(/^[0-2]+$/);

const getType = (type) => {
    switch (parseInt(type)) {
        case 0:
            return { fieldName: 'dailys' }
        case 1:
            return { fieldName: 'weeklys' }
        case 2:
            return { fieldName: 'monthlys' }
        default:
            break;
    }
}

/**
 * retrieve users daily list based on daily type
 * @param {*} userId 
 * @param {*} type 
 */
const getDailys = async (userId, type) => {
    const typeObj = getType(type);
    const userIdc = mongoose.Types.ObjectId(userId);

    const listData = await RSToolsUser.aggregate([
        {
            $match: { userId: userIdc }
        },
        {
            $project: { [`${typeObj.fieldName}`]: 1 }
        },
        {
            $unwind: `$${typeObj.fieldName}`
        },
        {
            $match: { [`${typeObj.fieldName}.completed`]: false }
        },
        {
            $sort: { [`${typeObj.fieldName}.position`]: 1 }
        },
        {
            $group: {
                _id: '$_id',
                [typeObj.fieldName]: {
                    $push: `$${typeObj.fieldName}`
                }
            }
        },
        {
            $lookup: {
                from: Daily.collection.name,
                let: { dailyId: `$${typeObj.fieldName}.dailyId` },
                pipeline: [
                    {
                        $match: {
                            $expr: { $in: ["$_id", "$$dailyId"] }
                        }
                    }
                ],
                as: "listData"
            }
        }
    ]);

    if (listData.length === 0) return [];

    // rematching populated dailyId schema with correct dailyId list object to maintain sorting
    for (const data of listData[0][typeObj.fieldName]) {
        data.dailyId = listData[0].listData.filter(d => d._id.equals(data.dailyId))[0];
    }

    return listData[0][typeObj.fieldName];
}

/**
 * Retrieve a single Daily checking ownership
 * @param {*} userId 
 * @param {*} dailyId 
 */
const getDaily = async (userId, dailyId) => {
    const daily = await Daily.findOne({ _id: dailyId });

    if (!daily.ownerId.equals(userId)) throw Error(DAILY_ERRORS.NOT_OWNER);

    return daily;
}

/**
 * retrieve dailys based on filter and type
 * @param {*} userId 
 * @param {*} type 
 * @param {*} filter 
 */
const searchDailys = async (userId, type, filter) => {
    const typeObj = getType(type);
    const userIdc = mongoose.Types.ObjectId(userId);
    const n_type = parseInt(type);

    const user = await RSToolsUser.findOne({ userId: userIdc }, { [typeObj.fieldName]: 1 });
    const userDailyList = user[typeObj.fieldName].map(daily => daily.dailyId);

    if (filter == 0) { // filter for public and user owned dailys, of type, that are not already in their list
        return await Daily.find({
            _id: { $nin: userDailyList },
            $or: [
                { publicDaily: true, type: n_type },
                { ownerId: userIdc, type: n_type }
            ]
        });
    } else if (filter == 1) { // filter for public, of type, that are not already in their list
        return await Daily.find({
            _id: { $nin: userDailyList },
            publicDaily: true,
            type: n_type
        });
    } else { // filter for user owned dailys, of type, that are not already in their list
        return await Daily.find({
            _id: { $nin: userDailyList },
            ownerId: userIdc,
            type: n_type
        });
    }
}

/**
 * gets image url from uploaded images if index exists for that step
 * @param {*} images 
 * @param {*} index 
 */
const getURL = (images, index = 0) => {
    const img = images.find(img => img.stepIndex == index);
    return img ? img.url : null;
}

const createPvm = async (user, data, images) => {

    // retrieve original name and public url from uploaded images
    let imgUrl, thumbnailUrl = null;
    if (images.length > 0) {
        for (const image of images) {
            if (image.originalname.includes('thumbnail')) thumbnailUrl = image.cloudStoragePublicUrl;
            else imgUrl = image.cloudStoragePublicUrl;
        }
    }

    // construct daily model object
    const pvm = new PvM(
        new PvmBuilder()
            .withOwner(user._id)
            .withName(data.name)
            .withMapURL(data.mapURL)
            .withWikiURL(data.wikiURL)
            .withImage(imgUrl)
            .withThumbnail(thumbnailUrl)
            .withType(data.type)
    );

    return await pvm.save();
}

const editPvm = async (userId, data, images) => {

    // if daily has new images, retrieve original name and public url from uploaded images
    const imageUrls = [];
    if (images.length > 0) {
        for (const image of images) {
            imageUrls.push({
                stepIndex: image.originalname.split('_').pop(),
                url: image.cloudStoragePublicUrl
            });
        }
    }

    // convert daily steps into object {step, image url}
    const steps = [];
    if (!Array.isArray(data.steps)) { // non array means daily only has a single step
        const stepData = JSON.parse(data.steps)
        steps.push({ step: stepData.step, url: stepData.url ? stepData.url : getURL(imageUrls) });
    } else {
        for (let i = 0; i < data.steps.length; i++) {
            const stepData = JSON.parse(data.steps[i]);
            steps.push({ step: stepData.step, url: stepData.url ? stepData.url : getURL(imageUrls, i) });
        }
    }

    try {
        const daily = await Daily.findOne({ _id: data.dailyId });
        if (!daily.ownerId.equals(userId)) {
            throw Error(DAILY_ERRORS.NOT_OWNER);
        }
        daily.title = data.title;
        if (data.mapURL) daily.mapURL = data.mapURL
        daily.steps = steps;
        return await daily.save();
    } catch (e) {
        throw Error(e);
    }
}

const deletePvm = async (userId, dailyId) => {
    const daily = await Daily.findOne({ _id: dailyId });
    if (!daily.ownerId.equals(userId)) {
        throw Error(DAILY_ERRORS.NOT_OWNER);
    }
    // to retrieve updated set of dailys assuming type from selected deletion one
    const type = daily.type;

    await Daily.deleteOne({ _id: dailyId });

    return await getDailys(userId, type);
}

class PvmBuilder {
    withOwner(id) {
        if (!id) throw Error(PVM_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withName(name) {
        if (!name) throw Error(PVM_ERRORS.NAME_REQUIRED);
        this.name = name;
        return this;
    }

    withMapURL(url) {
        if (!url) return this;
        this.mapURL = url;
        return this;
    }

    withWikiURL(url) {
        if (!url) throw Error(PVM_ERRORS.WIKI_REQUIRED);
        this.wikiURL = url;
        return this;
    }

    withImage(url) {
        if (!url) throw Error(PVM_ERRORS.IMAGE_REQUIRED);
        this.imageUrl = url;
        return this;
    }

    withThumbnail(url) {
        if (!url) throw Error(PVM_ERRORS.THUMBNAIL_REQUIRED);
        this.thumbnailURL = url;
        return this;
    }

    withType(type) {
        if (!type) throw Error(PVM_ERRORS.TYPE_REQUIRED);
        if (!TYPE_REGEX.test(type)) throw Error(PVM_ERRORS.TYPE_REGEX_FAIL);
        this.type = type;
        return this;
    }
}

module.exports = {
    createPvm
}
