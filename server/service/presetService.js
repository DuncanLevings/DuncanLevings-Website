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
    // try {
    //     const item = await Item.findOne({ _id: data.itemId });
    //     if (!item.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);
    //     if (item.name !== data.name) {
    //         const itemCheck = await Item.countDocuments({ name: data.name });
    //         if (itemCheck > 0) throw Error(EQUIPMENT_ERRORS.ITEM_EXISTS);
    //     }

    //     item.name = data.name;

    //     if (data.wikiUrl !== '') {
    //         item.wiki = data.wikiUrl;
    //     }

    //     if (image) item.imageUrl = image.cloudStoragePublicUrl;

    //     // check if edited item is still augmented
    //     if (data.isAugmented) {
    //         console.log(item)
    //         // if gizmo data is empty, assume removal of augment
    //         if (data.gizmo1 === '' && data.gizmo2 === '') {
    //             item.augment = undefined;
    //         } else if (item.augment && item.augment.isAugmented) { // item augment obj already exists, then update
    //             item.augment.gizmo1 = data.gizmo1 || '';
    //             item.augment.gizmo2 = data.gizmo2 || '';
    //         } else {
    //             item.augment = { // item has not been augmented before, create augment obj
    //                 isAugmented: data.isAugmented,
    //                 gizmo1: data.gizmo1 || '',
    //                 gizmo2: data.gizmo2 || ''
    //             }
    //         }
    //     } else {
    //         item.augment = undefined;
    //     }

    //     if (item.slot === 14) item.familiarSize = data.familiarSize;

    //     await item.save();
    //     return await searchItems(userId, slots);
    // } catch (e) {
    //     throw Error(e);
    // }
}

const deletePreset = async (userId, presetId) => {
    // const item = await Item.findOne({ _id: itemId }, { ownerId: 1 });
    // if (!item.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);

    // await Item.deleteOne({ _id: itemId });

    // return await searchItems(userId, slots);
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
        let hasSlotData = false;
        for (const slot of equipSlotData) {
            if (slot.name && slot.image) {
                hasSlotData = true;
            }
        }
        // equipment slot data was activated by user but all slots empty
        if (!hasSlotData) throw Error(PRESET_ERRORS.EQUIP_ERROR);
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