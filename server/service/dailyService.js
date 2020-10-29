/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { Daily, RSToolsUser } = require('../config/mongo');
const { DAILY_ERRORS } = require('../consts/error_jsons');

/* Regular expressions for parameter validation. */
const TYPE_REGEX = new RegExp(/^[0-2]+$/);

// retrieve users daily list based on daily type
const getDailys = async (userId, type) => {
    return await RSToolsUser.findOne({ userId: userId, "dailys.type": type, "dailys.completed": false }, { dailys: 1 }).populate('dailys.dailyId');
}

// gets image url from uploaded images if index exists for that step
const getURL = (images, index = 0) => {
    const img = images.find(img => img.stepIndex == index);
    return img ? img.url : null;
}

const createDaily = async (user, data, images) => {

    // if daily has images, retrieve original name and public url from uploaded images
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
        steps.push({ step: data.steps, url: getURL(imageUrls) });
    } else {
        for (let i = 0; i < data.steps.length; i++) {
            steps.push({ step: data.steps[i], url: getURL(imageUrls, i) });
        }
    }

    // construct daily model object
    const daily = new Daily(
        new DailyBuilder()
            .withOwner(user._id)
            .withTitle(data.title)
            .withType(data.type)
            .withSteps(steps)
        );

    // check if owner is admin to set public access bool and update all users
    if (user.isAdmin) {
        daily.publicDaily = true;

        const newDaily = await daily.save();

        // update every users daily list with new public daily
        addAllUsersDailyList(newDaily._id, newDaily.type)
            .then(() => { 
                return newDaily; 
            })
            .catch(err => { 
                throw Error(err); 
            });
    }

    return await daily.save();
}

const deleteDaily = async (userId, dailyId) => {
    const daily = await Daily.findOne({ _id: dailyId });
    if (daily.ownerId != userId) {
        throw Error(DAILY_ERRORS.NOT_OWNER);
    }

    // remove this daily from all users lists if its public type
    if (daily.publicDaily) {
        removeAllUsersDailyList(dailyId);
    }

    // to retrieve updated set of dailys assuming type from selected deletion one
    const type = daily.type;

    await Daily.deleteOne({ _id: dailyId });

    return await getDailys(userId, type);
}

const addAllUsersDailyList = async (dailyId, dailyType) => {
    const users = await RSToolsUser.find({});
    for (const user of users) {
        let position = 0;
        console.log(user.dailys.length)
        if (user.dailys.length > 0 ) {
            position = (Math.max.apply(Math, user.dailys.map(daily => { return daily.position; }))) + 1;
        }
        user.dailys.push({
            dailyId: dailyId,
            type: dailyType,
            position: position
        });
        await user.save();
    }
    return;
}

const removeUserDailyList = async (userId, dailyId) => {
    try {
        return await RSToolsUser.updateOne(
           { userId: userId },
           { $pull: { "dailys": { "dailyId": dailyId }}}
        );
     } catch (e) {
        throw Error(e);
     }
}

const removeAllUsersDailyList = async (dailyId) => {
    try {
        return await RSToolsUser.updateMany(
           {},
           { $pull: { "dailys": { "dailyId": dailyId }}}
        );
     } catch (e) {
        throw Error(e);
     }
}

class DailyBuilder {
    withOwner(id) {
        if (!id) throw Error(DAILY_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withTitle(title) {
        if (!title) throw Error(DAILY_ERRORS.TITLE_REQUIRED);
        this.title = title;
        return this;
    }

    withType(type) {
        if (!type) throw Error(DAILY_ERRORS.TYPE_REQUIRED);
        if (!TYPE_REGEX.test(type)) throw Error(DAILY_ERRORS.TYPE_REGEX_FAIL);
        this.type = type;
        return this;
    }

    withSteps(steps) {
        if (!steps) throw Error(DAILY_ERRORS.STEPS_REQUIRED);
        if (steps.length < 1)
            throw Error(DAILY_ERRORS.STEPS_LENGTH);
        for (const step of steps) {
            if (step.step == '') throw Error(DAILY_ERRORS.STEP_MISSING);
        }
        this.steps = steps;
        return this;
    }
}

module.exports = {
    createDaily,
    getDailys,
    deleteDaily
}
