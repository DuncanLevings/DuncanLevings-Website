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
    if (!data.equipSlotData &&
        !data.inventorySlotData) throw Error(PRESET_ERRORS.NO_DATA);

    const presetNameCheck = await Preset.countDocuments({ ownerId: userId, name: data.name });
    if (presetNameCheck > 0) throw Error(PRESET_ERRORS.PRESET_EXISTS);

    const preset = new Preset(new PresetBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withEquipSlotData(data.equipSlotData)
        .withInventorySlotData(data.inventorySlotData)
        .withFamiliar(data.familiar)
        .withfamiliarSlotData(data.familiarSlotData)
        .withAbilityBarData(data.abilityBarData)
        .withPresetAbilityBar(data.presetAbilityBar, data.originalBarEdited)
        .withPrayerData(data.prayerData, data.prayerType)
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
        preset.equipSlotData = data.equipSlotData;
        preset.inventorySlotData = data.inventorySlotData;

        if (data.familiar) preset.familiar = data.familiar;
        else preset.familiar = undefined;
        preset.familiarSlotData = data.familiarSlotData;

        preset.abilityBarData = data.abilityBarData;
        if (data.presetAbilityBar && !data.originalBarEdited) preset.presetAbilityBar = data.presetAbilityBar;
        else preset.presetAbilityBar = undefined;

        preset.prayerData = data.prayerData;
        if (data.prayerType) preset.prayerType = data.prayerType;
        else preset.prayerType = undefined;

        if (data.equipSlotData.length > 0) checkEquipSlot(data.equipSlotData);
        if (data.inventorySlotData.length > 0) checkInventorySlot(data.inventorySlotData);
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
    if (!hasSlotData) throw Error(PRESET_ERRORS.EQUIP_ERROR);
}

const checkInventorySlot = (inventorySlotData) => {
    let hasSlotData = false;
    for (const slot of inventorySlotData) {
        if (slot.name && slot.image) {
            hasSlotData = true;
        }
    }
    if (!hasSlotData) throw Error(PRESET_ERRORS.INVENTORY_ERROR);
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

    withInventorySlotData(inventorySlotData) {
        if (inventorySlotData.length < 1) return this;
        checkInventorySlot(inventorySlotData);
        this.inventorySlotData = inventorySlotData;
        return this;
    }

    withFamiliar(familiar) {
        if (!familiar) return this;
        this.familiar = familiar;
        return this;
    }

    // familiar is allowed to have all empty slots
    withfamiliarSlotData(familiarSlotData) {
        if (familiarSlotData.length < 1) return this;
        this.familiarSlotData = familiarSlotData;
        return this;
    }

    withAbilityBarData(abilityBarData) {
        if (abilityBarData.length < 1) return this;
        this.abilityBarData = abilityBarData;
        return this;
    }

    withPresetAbilityBar(presetAbilityBar, originalBarEdited) {
        if (!presetAbilityBar || originalBarEdited) return this;
        this.presetAbilityBar = presetAbilityBar;
        return this;
    }

    withPrayerData(prayerData, prayerType) {
        if (prayerData.length < 1) return this;
        this.prayerData = prayerData;
        this.prayerType = prayerType;
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