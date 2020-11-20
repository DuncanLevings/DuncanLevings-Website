/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { FarmRun } = require('../config/mongo');
const { FARM_RUN_ERRORS } = require('../consts/error_jsons');
const mongoose = require('mongoose');

/* Regular expressions for parameter validation. */
const TYPE_REGEX = new RegExp(/^[0-6]+$/);

const getFarmRun = async (userId, type) => {
    const farmRun = await FarmRun.findOne({ ownerId: userId, type: type });

    if (!farmRun) return null;
    if (!farmRun.ownerId.equals(userId)) throw Error(FARM_RUN_ERRORS.NOT_OWNER);

    return farmRun;
}

const createFarmRun = async (user, data) => {
    const checkType = await FarmRun.countDocuments({ ownerId: user._id, type: data.type });
    if (checkType > 0) throw Error(FARM_RUN_ERRORS.FARM_RUN_EXISTS);

    // convert farm run steps into object {step, image url, conditional type}
    const steps = [];
    if (!Array.isArray(data.titles)) { // non array means farm run only has a single step
        const step = { title: data.titles, step: data.steps, mapURL: data.mapURLs };
        if (data.type == 0) {
            if (data.types) step.type = data.types;
            else throw Error(FARM_RUN_ERRORS.ALL_FARM_TYPE_MISSING);
        }
        steps.push(step);
    } else {
        for (let i = 0; i < data.titles.length; i++) {
            const step = { title: data.titles[i], step: data.steps[i], mapURL: data.mapURLs[i] };
            if (data.type == 0) {
                if (data.types[i]) step.type = data.types[i];
                else throw Error(FARM_RUN_ERRORS.ALL_FARM_TYPE_MISSING);
            }
            steps.push(step);
        }
    }

    // construct farm run model object
    const farmRun = new FarmRun(
        new FarmRunBuilder()
            .withOwner(user._id)
            .withPreset(JSON.parse(data.preset))
            .withWebURL(data.webURL)
            .withYoutubeURL(data.youtubeURL)
            .withNotes(data.notes)
            .withSteps(steps)
            .withType(data.type)
            .withHidden(data.hidden)
    );

    return await farmRun.save();
}

const editFarmRun = async (user, data) => {

    // convert farm run steps into object {step, image url, conditional type}
    const steps = [];
    if (!Array.isArray(data.steps)) { // non array means farm run only has a single step
        const stepData = JSON.parse(data.steps)
        const stepObj = { title: stepData.title, step: stepData.step, mapURL: stepData.mapURL }
        if (data.type == 0) {
            if (stepData.type) stepObj.type = stepData.type;
            else throw Error(FARM_RUN_ERRORS.ALL_FARM_TYPE_MISSING);
        }
        steps.push(stepObj);
    } else {
        for (let i = 0; i < data.steps.length; i++) {
            const stepData = JSON.parse(data.steps[i]);
            const stepObj = { title: stepData.title, step: stepData.step, mapURL: stepData.mapURL }
            if (data.type == 0) {
                if (stepData.type) stepObj.type = stepData.type;
                else throw Error(FARM_RUN_ERRORS.ALL_FARM_TYPE_MISSING);
            }
            steps.push(stepObj);
        }
    }

    try {
        const farmRun = await FarmRun.findOne({ _id: data.farmRunId });
        if (!farmRun.ownerId.equals(user._id)) {
            throw Error(FARM_RUN_ERRORS.NOT_OWNER);
        }

        farmRun.preset = JSON.parse(data.preset)
        if(data.hidden) farmRun.hidden = data.hidden.split(",");
        if(data.webURL) farmRun.webURL = data.webURL;
        if(data.youtubeURL) farmRun.youtubeURL = data.youtubeURL;
        if (data.notes) farmRun.notes = data.notes;
        farmRun.steps = steps;

        return await farmRun.save();
    } catch (e) {
        throw Error(e);
    }
}

class FarmRunBuilder {
    withOwner(id) {
        if (!id) throw Error(FARM_RUN_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withPreset(preset) {
        if (!preset) throw Error(FARM_RUN_ERRORS.PRESET_REQUIRED);
        if (preset._id) preset._id = mongoose.Types.ObjectId(preset._id);
        if (preset.id) preset.id = undefined;
        if (preset.ownerId) preset.ownerId = mongoose.Types.ObjectId(preset.ownerId);
        this.preset = preset;
        return this;
    }

    withWebURL(webURL) {
        if (!webURL) return this;
        this.webURL = webURL;
        return this;
    }

    withYoutubeURL(youtubeURL) {
        if (!youtubeURL) return this;
        this.youtubeURL = youtubeURL;
        return this;
    }

    withNotes(notes) {
        if (!notes) return this;
        this.notes = notes;
        return this;
    }

    withSteps(steps) {
        if (!steps) throw Error(FARM_RUN_ERRORS.STEPS_REQUIRED);
        if (steps.length < 1)
            throw Error(FARM_RUN_ERRORS.STEPS_LENGTH);
        for (const step of steps) {
            if (step.title == '') throw Error(FARM_RUN_ERRORS.TITLE_MISSING);
        }
        this.steps = steps;
        return this;
    }

    withType(type) {
        if (!type) throw Error(FARM_RUN_ERRORS.TYPE_MISSING);
        if (!TYPE_REGEX.test(type)) throw Error(FARM_RUN_ERRORS.TYPE_REGEX_FAIL);
        this.type = type;
        return this;
    }

    withHidden(hidden) {
        if (!hidden) return this;
        this.hidden = hidden;
        return this;
    }
}

module.exports = {
    getFarmRun,
    createFarmRun,
    editFarmRun
}
