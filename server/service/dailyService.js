/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { Daily, RSToolsUser } = require('../config/mongo');
const { DAILY_ERRORS } = require('../consts/error_jsons');
const mongoose = require('mongoose');
const Moment = require('moment-timezone');

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

const getTimeObj = (type) => {
    switch (parseInt(type)) {
        case 0:
            return { fieldName: 'lastDayReset' }
        case 1:
            return { fieldName: 'lastWeekReset' }
        case 2:
            return { fieldName: 'lastMonthReset' }
        default:
            break;
    }
}

const getLocalTime = (time) => {
    return {
        day: Moment(time.lastDayReset).tz('America/Toronto').date(),
        week: Moment(time.lastWeekReset).tz('America/Toronto').week(),
        weekDay: Moment(time.lastWeekReset).tz('America/Toronto').weekday(),
        month: Moment(time.lastMonthReset).tz('America/Toronto').month()
    } 
}

const getRSTime = () => {
    return {
        day: Moment().utc().date(),
        week: Moment().utc().week(),
        weekDay: Moment().utc().weekday(),
        month: Moment().utc().month()
    } 
}

/**
 * Check if users dailys that have been completed, need to be reset
 * @param {*} userId 
 */
const checkReset = async (userId) => {
    const user = await RSToolsUser.findOne({ userId: userId });

    const lastResetlocalTime = getLocalTime(user.resetTimes)
    const rsTime = getRSTime();

    // if any of the following are true, flag this boolean to tell the client it should refetch the users list data
    let refreshData = false;

    // DAY
    
    // if previous reset day is different day to runescapes server reset day, reset dailys
    if (lastResetlocalTime.day < rsTime.day) {
        resetDailys(userId, 0);
        refreshData = true;
    }

    // WEEK

    const weeklyResetDay = 3; // Wednesday

    // if previous reset time for week is different week to runescapes server reset week, reset weeklys
    const weekDiff = rsTime.week - lastResetlocalTime.week;
    if (weekDiff > 1) { // been more than a week since last weekly reset, ignore tuesday reset only
        resetDailys(userId, 1);
        refreshData = true;
    } else if (weekDiff === 1) { // last weekly reset was previous week, must check if day is tuesday to reset weekly
        if (rsTime.weekDay === weeklyResetDay) {
            resetDailys(userId, 1);
            refreshData = true;
        }
    } else { // last reset for weeklys was done on the same week as runescapes current week (ie. sunday/monday etc)
        if (lastResetlocalTime.weekday < weeklyResetDay) { // check if last reset for weeklys was done prior to tuesday of same week
            if (rsTime.weekday === weeklyResetDay) { // make sure it is reset day of the week
                resetDailys(userId, 1);
                refreshData = true;
            }
        }
    }

    // MONTH

    // if previous reset month is different month to runescapes server month, reset monthlys
    if (lastResetlocalTime.month < rsTime.month) {
        resetDailys(userId, 2);
        refreshData = true;
    }

    return refreshData;
}

/**
 * Reset users daily list type to completed false
 * @param {} userId 
 * @param {*} type 
 */
const resetDailys = async (userId, type) => {
    const typeObj = getType(type);
    const user = await RSToolsUser.findOne({ userId: userId }, { [typeObj.fieldName]: 1, resetTimes: 1 });

    for (const item of user[typeObj.fieldName]) {
        item.completed = false;
    }

    // update last reset time for this type
    const timeObj = getTimeObj(type);
    user.resetTimes[timeObj.fieldName] = new Date();

    await user.save();
}

const setComplete = async (userId, dailyId, type) => {
    const typeObj = getType(type);
    const user = await RSToolsUser.findOne({ userId: userId }, { [typeObj.fieldName]: 1 });

    const userDailyList = user[typeObj.fieldName].map(daily => daily.dailyId);
    if (!userDailyList.includes(dailyId)) throw Error(DAILY_ERRORS.DAILY_NOT_IN_LIST);
    
    await RSToolsUser.updateOne(
        { userId: userId, [`${typeObj.fieldName}.dailyId`]: dailyId },
        { $set: { [`${typeObj.fieldName}.$.completed`]: true } }
    )

    return await getDailys(userId, type);
}

/**
 * retrieve users daily list based on daily type
 * @param {*} userId 
 * @param {*} type 
 */
const getDailys = async (userId, type) => {
    const typeObj = getType(type);
    const userIdc = mongoose.Types.ObjectId(userId);

    const listData =  await RSToolsUser.aggregate([
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

    if (daily.ownerId != userId) throw Error(DAILY_ERRORS.NOT_OWNER);

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
 * Adding daily to users list
 * @param {*} userId 
 * @param {*} dailyId 
 * @param {*} filter 
 */
const addDaily = async (userId, dailyId, type, filter) => {
    const typeObj = getType(type);
    const user = await RSToolsUser.findOne({ userId: userId }, { [typeObj.fieldName]: 1 });
    const dailyList = user[typeObj.fieldName].map(daily => daily.dailyId);

    // check if daily already exists in users list
    if (dailyList.includes(dailyId)) throw Error(DAILY_ERRORS.DAILY_ALREADY_IN_LIST);

    await addUsersDailyList(userId, dailyId, type);

    return await searchDailys(userId, type, filter);
}

/**
 * removes dailyId from users daily list, does NOT delete
 * @param {*} userId 
 * @param {*} dailyId 
 */
const hideDaily = async (userId, dailyId) => {
    const daily = await Daily.findOne({ _id: dailyId });
    const typeObj = getType(daily.type);

    const user = await RSToolsUser.findOne({ userId: userId }, { [typeObj.fieldName]: 1 });
    const dailyList = user[typeObj.fieldName].map(daily => daily.dailyId);

    // check if daily has already been removed from users list
    if (!dailyList.includes(dailyId)) throw Error(DAILY_ERRORS.DAILY_ALREADY_HIDDEN);

    await removeUserDailyList(userId, dailyId, daily.type);

    return await getDailys(userId, daily.type);
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
    } else { // custom user daily, only update owners daily list
        const newDaily = await daily.save();

        addUsersDailyList(user._id, newDaily._id, newDaily.type);
    }

    return await daily.save();
}

const editDaily = async (userId, data, images) => {

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
        daily.steps = steps;
        return await daily.save();
    } catch (e) {
        throw Error(e);
    }
}

const deleteDaily = async (userId, dailyId) => {
    const daily = await Daily.findOne({ _id: dailyId });
    if (daily.ownerId != userId) {
        throw Error(DAILY_ERRORS.NOT_OWNER);
    }
    // to retrieve updated set of dailys assuming type from selected deletion one
    const type = daily.type;

    // remove this daily from all users lists if its public type
    if (daily.publicDaily) {
        removeAllUsersDailyList(dailyId, type);
    } else { // remove only from owners list for custom owned daily
        removeUserDailyList(userId, dailyId, type);
    }

    await Daily.deleteOne({ _id: dailyId });

    return await getDailys(userId, type);
}

const addUsersDailyList = async (userId, dailyId, dailyType) => {
    const user = await RSToolsUser.findOne({ userId: userId });
    const typeObj = getType(dailyType);

    let position = 0;
    if (user[typeObj.fieldName].length > 0) {
        position = (Math.max.apply(Math, user[typeObj.fieldName].map(daily => { return daily.position; }))) + 1;
    }

    user[typeObj.fieldName].push({
        dailyId: dailyId,
        position: position
    });

    return await user.save();
}

const addAllUsersDailyList = async (dailyId, dailyType) => {
    const users = await RSToolsUser.find({});
    const typeObj = getType(dailyType);

    for (const user of users) {
        let position = 0;
        if (user[typeObj.fieldName].length > 0) {
            position = (Math.max.apply(Math, user[typeObj.fieldName].map(daily => { return daily.position; }))) + 1;
        }
        user[typeObj.fieldName].push({
            dailyId: dailyId,
            position: position
        });
        await user.save();
    }
    return;
}

const removeUserDailyList = async (userId, dailyId, type) => {
    const typeObj = getType(type);

    try {
        return await RSToolsUser.updateOne(
            { userId: userId },
            { $pull: { [typeObj.fieldName]: { "dailyId": dailyId } } }
        );
    } catch (e) {
        throw Error(e);
    }
}

const removeAllUsersDailyList = async (dailyId, type) => {
    const typeObj = getType(type);

    try {
        return await RSToolsUser.updateMany(
            {},
            { $pull: { [typeObj.fieldName]: { "dailyId": dailyId } } }
        );
    } catch (e) {
        throw Error(e);
    }
}

const reOrder = async (userId, dailyList, type) => {
    const typeObj = getType(type);
    const user = await RSToolsUser.findOne({ userId: userId });

    for (const daily of user[typeObj.fieldName]) {
        const newPosition = dailyList.filter(d => d.id == daily._id)[0].position;
        if (newPosition > -1) daily.position = newPosition;
        else throw Error(DAILY_ERRORS.RE_ORDER_FAIL);
    }

    await user.save();

    return await getDailys(userId, type);
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
    checkReset,
    resetDailys,
    getDailys,
    getDaily,
    searchDailys,
    addDaily,
    hideDaily,
    createDaily,
    editDaily,
    deleteDaily,
    reOrder,
    setComplete
}
