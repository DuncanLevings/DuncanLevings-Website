/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { PvM, PvmTask } = require('../../config/mongo');
const { PVM_ERRORS } = require('../../consts/error_jsons');
const mongoose = require('mongoose');

/* Regular expressions for parameter validation. */
const TYPE_REGEX = new RegExp(/^[0-2]+$/);

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

const getPvmTasks = async (userId, type) => {
    return await PvmTask.find({ ownerId: userId, type: type }).sort({ taskName: 1 });
}

const getPvm = async (pvmId) => {
    return await PvM.findOne({ _id: pvmId });
}

const getPvmTask = async (userId, pvmTaskId) => {
    const pvmTask = await PvmTask.findOne({ _id: pvmTaskId });
    if (!pvmTask.ownerId.equals(userId)) {
        throw Error(PVM_ERRORS.NOT_OWNER);
    }

    return pvmTask;
}

const checkPvmName = async (data) => {
    if (data.pvmId) { // coming from edit pvm
        const pvm = await PvM.findOne({ _id: data.pvmId }, { name: 1 });
        if (pvm.name !== data.name) {
            const pvmNameCheck = await PvM.countDocuments({ name: data.name });
            if (pvmNameCheck > 0) throw Error(PVM_ERRORS.PVM_EXISTS);
        }
    } else {
        const pvmNameCheck = await PvM.countDocuments({ name: data.name });
        if (pvmNameCheck > 0) throw Error(PVM_ERRORS.PVM_EXISTS);
    }
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

    // retrieve original name and public url from uploaded images
    let imgUrl, thumbnailUrl = null;
    if (images.length > 0) {
        for (const image of images) {
            if (image.originalname.includes('thumbnail')) thumbnailUrl = image.cloudStoragePublicUrl;
            else imgUrl = image.cloudStoragePublicUrl;
        }
    }

    try {
        const pvm = await PvM.findOne({ _id: data.pvmId });
        if (!pvm.ownerId.equals(userId)) throw Error(PVM_ERRORS.NOT_OWNER);

        pvm.name = data.name;
        if (data.mapURL) pvm.mapURL = data.mapURL;
        pvm.wikiURL = data.wikiURL;
        if (imgUrl) pvm.imageUrl = imgUrl;
        if (thumbnailUrl) pvm.thumbnailURL = thumbnailUrl;

        return await pvm.save();
    } catch (e) {
        throw Error(e);
    }
}

const editPvmTask = async (userId, data) => {
    try {
        const pvmTask = await PvmTask.findOne({ _id: data.pvmTaskId });
        if (!pvmTask.ownerId.equals(userId)) {
            throw Error(PVM_ERRORS.NOT_OWNER);
        }

        if (pvmTask.taskName !== data.taskName) {
            const taskNameCheck = await PvmTask.countDocuments({ ownerId: userId, taskName: data.taskName });
            if (taskNameCheck > 0) throw Error(PVM_ERRORS.PVM_TASK_EXISTS);
        }

        pvmTask.preset = JSON.parse(data.preset);
        pvmTask.taskName = data.taskName;
        if (data.webURL) pvmTask.webURL = data.webURL;
        else pvmTask.webURL = undefined;
        if (data.youtubeURL) pvmTask.youtubeURL = data.youtubeURL;
        else pvmTask.youtubeURL = undefined;
        if (data.notes) pvmTask.notes = data.notes;
        else pvmTask.notes = undefined;

        return await pvmTask.save();
    } catch (e) {
        throw Error(e);
    }
}

const deletePvm = async (userId, pvmId, filter) => {
    const pvm = await PvM.findOne({ _id: pvmId });
    if (!pvm.ownerId.equals(userId)) {
        throw Error(PVM_ERRORS.NOT_OWNER);
    }

    const type = pvm.type;

    await PvM.deleteOne({ _id: pvmId });

    return await searchPvm(userId, type, filter);
}

const deletePvmTask = async (userId, pvmTaskId) => {
    const pvmTask = await PvmTask.findOne({ _id: pvmTaskId });
    if (!pvmTask.ownerId.equals(userId)) {
        throw Error(PVM_ERRORS.NOT_OWNER);
    }

    const type = pvmTask.type;

    await PvmTask.deleteOne({ _id: pvmTaskId });

    return await getPvmTasks(userId, type);
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
    getPvmTasks,
    getPvm,
    getPvmTask,
    checkPvmName,
    createPvm,
    createPvmTask,
    editPvm,
    editPvmTask,
    deletePvm,
    deletePvmTask
}
