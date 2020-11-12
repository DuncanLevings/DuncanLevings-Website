/*
 * Filename: c:\Users\Tatsu\Documents\personal_website\server\service\equipmentService.js
 * Path: c:\Users\Tatsu\Documents\personal_website\server
 * Created Date: Thursday, November 5th 2020, 6:17:23 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { PRESET_ERRORS } = require("../consts/error_jsons");
const { Preset } = require("../config/mongo");
const mongoose = require('mongoose');

const getPresets = async (userId) => {
    return await Preset.find({ ownerId: userId });
}

const getPreset = async (userId, presetId) => {
    return await Preset.findOne({ _id: presetId, ownerId: userId });
}

const createPreset = async (userId, data) => {
    // ensure preset has some needed data
    if (!data.equipSlotData && !data.inventorySlotData) throw Error(PRESET_ERRORS.NO_DATA);

    const presetNameCheck = await Preset.countDocuments({ ownerId: userId, name: data.name });
    if (presetNameCheck > 0) throw Error(PRESET_ERRORS.PRESET_EXISTS);

    const preset = new Preset(new PresetBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withEquipSlotData(data.equipSlotData)
    );

    return await preset.save();
}

const editPreset = async (userId, data) => {
    try {
        const preset = await Preset.findOne({ _id: data.presetId });
        if (!preset.ownerId.equals(userId)) throw Error(PRESET_ERRORS.NOT_OWNER_PRESET);
        if (preset.name !== data.name) {
            const presetNameCheck = await Preset.countDocuments({ ownerId: userId, name: data.name });
            if (presetNameCheck > 0) throw Error(PRESET_ERRORS.PRESET_EXISTS);
        }

        preset.name = data.name;
        if (data.equipSlotData.length > 0) {
            checkEquipSlot(data.equipSlotData);
            preset.equipSlotData = data.equipSlotData;
        }
        //do same for rest

        return await preset.save();
    } catch (e) {
        throw Error(e);
    }
}

const deletePreset = async (userId, presetId) => {
    const preset = await Preset.findOne({ _id: presetId }, { ownerId: 1 });
    if (!preset.ownerId.equals(userId)) throw Error(PRESET_ERRORS.NOT_OWNER_PRESET);

    await Preset.deleteOne({ _id: presetId });

    return await getPresets(userId);
}

const checkEquipSlot = (equipSlotData) => {
    let hasSlotData = false;
    for (const slot of equipSlotData) {
        if (slot.name && slot.image) {
            hasSlotData = true;
        }
    }
    // equipment slot data was activated by user but all slots empty
    if (!hasSlotData) throw Error(PRESET_ERRORS.EQUIP_ERROR);
}

class PresetBuilder {
    withOwner(id) {
        if (!id) throw Error(PRESET_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withName(name) {
        if (!name) throw Error(PRESET_ERRORS.NAME_REQUIRED);
        this.name = name;
        return this;
    }

    withEquipSlotData(equipSlotData) {
        if (equipSlotData.length < 1) return this;
        checkEquipSlot(equipSlotData);
        this.equipSlotData = equipSlotData;
        return this;
    }
}

module.exports = {
    getPresets,
    getPreset,
    createPreset,
    editPreset,
    deletePreset
}