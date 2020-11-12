/*
 * Filename: c:\Users\Tatsu\Documents\personal_website\server\service\equipmentService.js
 * Path: c:\Users\Tatsu\Documents\personal_website\server
 * Created Date: Thursday, November 5th 2020, 6:17:23 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { EQUIPMENT_ERRORS } = require("../consts/error_jsons");
const { Item, AbilityBar } = require("../config/mongo");
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
        }
    ]);
}

const searchAbilityBars = async (userId, style) => {
    const userIdc = mongoose.Types.ObjectId(userId);
    const style_n = parseInt(style);
    if (style_n == 0) return await AbilityBar.find({ ownerId: userIdc });
    else return await AbilityBar.find({ ownerId: userIdc, styleType: style_n });
}

const createItem = async (userId, data, image, slots) => {
    const itemCheck = await Item.countDocuments({ name: data.name });
    if (itemCheck > 0) throw Error(EQUIPMENT_ERRORS.ITEM_EXISTS);

    // if (!image) throw Error(EQUIPMENT_ERRORS.MISSING_IMAGE);

    const item = new Item(new ItemBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withSlot(data.slot)
        .withWiki(data.wikiUrl)
        .withAugmented(data.isAugmented, data.gizmo1, data.gizmo2)
        .withFamiliarSize(data.familiarSize)
    );

    // item.imageUrl = image.cloudStoragePublicUrl
    item.imageUrl = "test.png" //FOR TESTING

    await item.save();

    return await searchItems(userId, slots);
}

const createAbilityBar = async (userId, data, style) => {
    const abilityBarCheck = await AbilityBar.countDocuments({ ownerId: userId, name: data.name });
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

const editItem = async (userId, data, image, slots) => {
    try {
        const item = await Item.findOne({ _id: data.itemId });
        if (!item.ownerId.equals(userId)) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);
        if (item.name !== data.name) {
            const itemCheck = await Item.countDocuments({ name: data.name });
            if (itemCheck > 0) throw Error(EQUIPMENT_ERRORS.ITEM_EXISTS);
        }

        item.name = data.name;

        if (data.wikiUrl !== '') {
            item.wiki = data.wikiUrl;
        }

        if (image) item.imageUrl = image.cloudStoragePublicUrl;

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
            const abilityBarCheck = await AbilityBar.countDocuments({ ownerId: userId, name: data.name });
            if (abilityBarCheck > 0) throw Error(EQUIPMENT_ERRORS.ABILITY_BAR_EXISTS);
        }

        abilityBar.name = data.name;
        abilityBar.styleType = data.styleType;
        abilityBar.abilityBar = JSON.parse(data.abilitys);

        await abilityBar.save();
        return await searchAbilityBars(userId, style);
    } catch (e) {
        throw Error(e);
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

    await AbilityBar.deleteOne({ _id: abilityBarId });

    return await searchAbilityBars(userId, style);
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
        this.wikiUrl = url;
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
    createItem,
    createAbilityBar,
    editItem,
    editAbilityBar,
    deleteItem,
    deleteAbilityBar
}