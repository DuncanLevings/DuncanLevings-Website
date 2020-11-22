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

const searchPvm = async (userId, type, filter) => {
    const userIdc = mongoose.Types.ObjectId(userId);
    const n_type = parseInt(type);
    const n_filter = parseInt(filter);

    const matchFilter = {
        type: n_type
    };

    switch (n_filter) {
        case 1:
            matchFilter.ownerId = { $ne: userIdc };
            break;
        case 2:
            matchFilter.ownerId = userIdc;
            break;
        default:
            break;
    }

    const aggregateQuery = [
        {
            $match: matchFilter
        },
        {
            $addFields: {
                isOwner: {
                    $cond: {
                        if: { $eq: ["$ownerId", userIdc] }, then: true, else: false
                    }
                }
            }
        },
        {
            $sort: {
                name: 1
            }
        }
    ];

    // filters out if user already has a pvm created with given name from retrieved pvms
    if (n_filter === 3) {
        aggregateQuery.push(
            {
                $lookup: {
                    from: PvmTask.collection.name,
                    let: { name: '$name', type: '$type' },
                    pipeline: [
                        {
                            $match: {
                                $and: [
                                    { $expr: { $eq: ["$ownerId", userIdc] } },
                                    { $expr: { $eq: ["$pvmName", "$$name"] } },
                                    { $expr: { $eq: ["$type", "$$type"] } }
                                ]
                            },
                        }
                    ],
                    as: "pvmTasks"
                }
            },
            {
                $match: { "pvmTasks.0": { $exists: false } }
            }
        )
    }

    return await PvM.aggregate(aggregateQuery);
}

const getPvm = async (type, pvmId) => {
    return await PvM.findOne({ _id: pvmId, type: type });
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

const createPvmTask = async (userId, data) => {
    const taskNameCheck = await PvmTask.countDocuments({ ownerId: userId, taskName: data.taskName });
    if (taskNameCheck > 0) throw Error(PVM_ERRORS.PVM_TASK_EXISTS);

    // construct daily model object
    const pvmTask = new PvmTask(
        new PvmTaskBuilder()
            .withOwner(userId)
            .withPvM(JSON.parse(data.pvm))
            .withPreset(JSON.parse(data.preset))
            .withTaskName(data.taskName)
            .withWebURL(data.webURL)
            .withYoutubeURL(data.youtubeURL)
            .withNotes(data.notes)
            .withType(data.type)
    );

    return await pvmTask.save();
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

class PvmTaskBuilder {
    withOwner(id) {
        if (!id) throw Error(PVM_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withPvM(pvm) {
        if (!pvm) return this;
        this.pvmName = pvm.name;
        if (pvm.mapURL) this.mapURL = pvm.mapURL;
        this.wikiURL = pvm.wikiURL;
        this.imageUrl = pvm.imageUrl;
        this.thumbnailURL = pvm.thumbnailURL;
        return this;
    }

    withPreset(preset) {
        if (!preset) throw Error(PVM_ERRORS.PRESET_REQUIRED);
        if (preset._id) preset._id = mongoose.Types.ObjectId(preset._id);
        if (preset.id) preset.id = undefined;
        if (preset.ownerId) preset.ownerId = mongoose.Types.ObjectId(preset.ownerId);
        this.preset = preset;
        return this;
    }

    withTaskName(taskName) {
        if (!taskName) throw Error(PVM_ERRORS.TASK_NAME_REQUIRED);
        this.taskName = taskName;
        return this;
    }

    withWebURL(url) {
        if (!url) return this;
        this.webURL = url;
        return this;
    }

    withYoutubeURL(url) {
        if (!url) return this;
        this.youtubeURL = url;
        return this;
    }

    withNotes(notes) {
        if (!notes) return this;
        this.notes = notes;
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
    searchPvm,
    getPvm,
    createPvm,
    createPvmTask
}
