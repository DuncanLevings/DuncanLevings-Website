/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { EQUIPMENT_ERRORS } = require("../../consts/error_jsons");
const { Item, AbilityBar, Preset } = require("../../config/mongo");
const mongoose = require('mongoose');

/* Regular expressions for parameter validation. */
const SLOT_REGEX = new RegExp(/^([0-9]|1[0-4])$/);
const SIZE_REGEX = new RegExp(/^(?:[0-9]|[12][0-9]|3[0-2])$/);

const equipmentSlots = {
    AURA: 0,
    HEAD: 1,
    POCKET: 2,
    CAPE: 3,
    AMULET: 4,
    AMMUNITION: 5,
    WEAPON: 6,
    CHEST: 7,
    OFFHAND: 8,
    LEGS: 9,
    HANDS: 10,
    BOOTS: 11,
    RING: 12,
    ITEM: 13,
    FAMILIAR: 14
}

/**
 * Retrieves a single item and ensures user is owner
 * @param {*} userId 
 * @param {*} itemId 
 */
const getItem = async (userId, itemId) => {
    const item = await Item.findOne({ _id: itemId });

    if (!item.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);

    return item;
}

/**
 * Retrieves a single ability bar and ensures user is owner
 * @param {*} userId 
 * @param {*} abilityBarId 
 */
const getAbilityBar = async (userId, abilityBarId) => {
    const abilityBar = await AbilityBar.findOne({ _id: abilityBarId });

    if (!abilityBar.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ABILITY_BAR);

    return abilityBar;
}

/**
 * Searchs items based on userId and slot filter, if no slots then searches all items
 * @param {*} userId 
 * @param {*} slots string array consisting of #, #, #, etc...
 */
const searchItems = async (userId, slots) => {
    const matchFilter = {};

    const userIdc = mongoose.Types.ObjectId(userId);

    if (slots !== "-1") {
        const slotsArr = slots.split(',').map(Number);
        matchFilter.slot = { $in: slotsArr };
    }

    return await Item.aggregate([
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
    ]);
}

const searchAbilityBars = async (userId, style) => {
    const userIdc = mongoose.Types.ObjectId(userId);
    const style_n = parseInt(style);
    if (style_n == 0) return await AbilityBar.find({ ownerId: userIdc });
    else return await AbilityBar.find({ ownerId: userIdc, styleType: style_n });
}

const checkItemName = async (data) => {
    if (data.itemId) { // coming from edit
        const item = await Item.findOne({ _id: data.itemId });
        if (item.name !== data.name) {
            const itemCheck = await Item.countDocuments({ name: data.name });
            if (itemCheck > 0) throw Error(EQUIPMENT_ERRORS.ITEM_EXISTS);
        }
    } else {
        const itemCheck = await Item.countDocuments({ name: data.name });
        if (itemCheck > 0) throw Error(EQUIPMENT_ERRORS.ITEM_EXISTS);
    }
}

const createItem = async (userId, data, images, slots) => {

    let imgUrl, thumbnailUrl = null;
    if (images.length < 1) throw Error(EQUIPMENT_ERRORS.MISSING_IMAGE);
    else {
        for (const image of images) {
            if (image.originalname.includes('thumbnail')) thumbnailUrl = image.cloudStoragePublicUrl;
            else imgUrl = image.cloudStoragePublicUrl;
        }
    }

    const item = new Item(new ItemBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withSlot(data.slot)
        .withWiki(data.wikiUrl)
        .withAugmented(data.isAugmented, data.gizmo1, data.gizmo2)
        .withFamiliarSize(data.familiarSize)
        .withImage(imgUrl)
        .withThumbnail(data.slot, thumbnailUrl)
    );

    await item.save();

    return await searchItems(userId, slots);
}

const createAbilityBar = async (userId, data, style) => {
    const abilityBarCheck = await AbilityBar.countDocuments({ ownerId: userId, name: data.name, styleType: data.styleType });
    if (abilityBarCheck > 0) throw Error(EQUIPMENT_ERRORS.ABILITY_BAR_EXISTS);

    const abilityBar = new AbilityBar(new AbilityBarBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withStyleType(data.styleType)
        .withAbilityBar(JSON.parse(data.abilitys))
    );

    await abilityBar.save();

    return await searchAbilityBars(userId, style);
}

const editItem = async (userId, data, images, slots) => {
    // retrieve original name and public url from uploaded images
    let imgUrl, thumbnailUrl = null;
    if (images.length > 0) {
        for (const image of images) {
            if (image.originalname.includes('thumbnail')) thumbnailUrl = image.cloudStoragePublicUrl;
            else imgUrl = image.cloudStoragePublicUrl;
        }
    }

    try {
        const item = await Item.findOne({ _id: data.itemId });
        if (!item.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);

        item.name = data.name;

        if (data.wikiUrl !== '') {
            item.wiki = data.wikiUrl;
        }

        if (imgUrl) item.imageUrl = imgUrl;
        if (item.slot === 14 && thumbnailUrl) item.thumbnailUrl = thumbnailUrl;

        // check if edited item is still augmented
        if (data.isAugmented) {
            // if gizmo data is empty, assume removal of augment
            if (data.gizmo1 === '' && data.gizmo2 === '') {
                item.augment = undefined;
            } else if (item.augment && item.augment.isAugmented) { // item augment obj already exists, then update
                item.augment.gizmo1 = data.gizmo1 || '';
                item.augment.gizmo2 = data.gizmo2 || '';
            } else {
                item.augment = { // item has not been augmented before, create augment obj
                    isAugmented: data.isAugmented,
                    gizmo1: data.gizmo1 || '',
                    gizmo2: data.gizmo2 || ''
                }
            }
        } else {
            item.augment = undefined;
        }

        if (item.slot === 14) item.familiarSize = data.familiarSize;

        await item.save();
        return await searchItems(userId, slots);
    } catch (e) {
        throw Error(e);
    }
}

const editAbilityBar = async (userId, data, style) => {
    try {
        const abilityBar = await AbilityBar.findOne({ _id: data.abilityBarId });
        if (!abilityBar.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ABILITY_BAR);
        if (abilityBar.name !== data.name) {
            const abilityBarCheck = await AbilityBar.countDocuments({ ownerId: userId, name: data.name, styleType: data.styleType });
            if (abilityBarCheck > 0) throw Error(EQUIPMENT_ERRORS.ABILITY_BAR_EXISTS);
        }

        abilityBar.name = data.name;
        abilityBar.styleType = data.styleType;
        abilityBar.abilityBar = JSON.parse(data.abilitys);

        if (data.updateAll) {
            await updateAllPresetAbilityBars(data.abilityBarId, abilityBar);
        }

        await abilityBar.save();
        return await searchAbilityBars(userId, style);
    } catch (e) {
        throw Error(e);
    }
}

const updateAllPresetAbilityBars = async (abilityBarId, abilityBar) => {
    const presets = await Preset.find({ "presetAbilityBar._id": abilityBarId });

    for (const preset of presets) {
        preset.presetAbilityBar = abilityBar;
        preset.abilityBarData = abilityBar.abilityBar;

        await preset.save();
    }
}

const deleteItem = async (userId, itemId, slots) => {
    const item = await Item.findOne({ _id: itemId }, { ownerId: 1 });
    if (!item.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);

    await Item.deleteOne({ _id: itemId });

    return await searchItems(userId, slots);
}

const deleteAbilityBar = async (userId, abilityBarId, style) => {
    const abilityBar = await AbilityBar.findOne({ _id: abilityBarId }, { ownerId: 1 });
    if (!abilityBar.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ABILITY_BAR);

    await deleteAllPresetAbilityBars(abilityBarId);

    await AbilityBar.deleteOne({ _id: abilityBarId });

    return await searchAbilityBars(userId, style);
}

const deleteAllPresetAbilityBars = async (abilityBarId) => {
    const presets = await Preset.find({ "presetAbilityBar._id": mongoose.Types.ObjectId(abilityBarId) });

    for (const preset of presets) {
        preset.presetAbilityBar = undefined;

        await preset.save();
    }
}

class ItemBuilder {
    withOwner(id) {
        if (!id) throw Error(EQUIPMENT_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withName(name) {
        if (!name) throw Error(EQUIPMENT_ERRORS.NAME_REQUIRED);
        this.name = name;
        return this;
    }

    withSlot(slot) {
        if (!slot) throw Error(EQUIPMENT_ERRORS.SLOT_REQUIRED);
        if (!SLOT_REGEX.test(slot)) throw Error(EQUIPMENT_ERRORS.SLOT_REGEX_FAIL);
        this.slot = slot;
        return this;
    }

    withWiki(url) {
        if (url === '') return this;
        this.wiki = url;
        return this;
    }

    withAugmented(augmented, gizmo1, gizmo2) {
        if (!augmented || (augmented && gizmo1 === '' && gizmo2 === '')) return this;
        this.augment = {
            isAugmented: augmented,
            gizmo1: gizmo1 || '',
            gizmo2: gizmo2 || ''
        };
        return this;
    }

    withFamiliarSize(size) {
        if (!size || size === 0) return this;
        if (size < 0) throw Error(EQUIPMENT_ERRORS.NEGATIVE_SUMMON_SIZE);
        if (!SIZE_REGEX.test(size)) throw Error(EQUIPMENT_ERRORS.INVALID_SUMMON_SIZE);
        this.familiarSize = size;
        return this;
    }

    withImage(url) {
        if (!url) throw Error(EQUIPMENT_ERRORS.MISSING_IMAGE);
        this.imageUrl = url;
        return this;
    }

    withThumbnail(slot, url) {
        if (slot !== '14') return this;
        if (!url) throw Error(EQUIPMENT_ERRORS.MISSING_IMAGE);
        this.thumbnailUrl = url;
        return this;
    }
}

class AbilityBarBuilder {
    withOwner(id) {
        if (!id) throw Error(EQUIPMENT_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withName(name) {
        if (!name) throw Error(EQUIPMENT_ERRORS.NAME_REQUIRED);
        this.name = name;
        return this;
    }

    withStyleType(style) {
        if (!style) throw Error(EQUIPMENT_ERRORS.STYLE_REQUIRED);
        this.styleType = style;
        return this;
    }

    withAbilityBar(bar) {
        if (!bar) throw Error(EQUIPMENT_ERRORS.ABILITY_BAR_REQUIRED);
        this.abilityBar = bar;
        return this;
    }
}

module.exports = {
    getItem,
    getAbilityBar,
    searchItems,
    searchAbilityBars,
    checkItemName,
    createItem,
    createAbilityBar,
    editItem,
    editAbilityBar,
    deleteItem,
    deleteAbilityBar
}