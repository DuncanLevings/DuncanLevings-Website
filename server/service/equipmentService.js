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
const { Item } = require("../config/mongo");
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

const createItem = async (userId, data, image, slots) => {

    const itemCheck = await Item.countDocuments({ name: data.name });
    if (itemCheck > 0) throw Error(EQUIPMENT_ERRORS.ITEM_EXISTS);

    // if (!image) throw Error(EQUIPMENT_ERRORS.MISSING_IMAGE);

    const item = new Item(new ItemBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withSlot(data.slot)
        .withWiki(data.wikiUrl)
        .withFamiliarSize(data.familiarSize)
    );

    // item.imageUrl = image.cloudStoragePublicUrl
    item.imageUrl = "test.png" //FOR TESTING

    await item.save();
    
    return await searchItems(userId, slots);
}

const editItem = async () => {

}

const deleteItem = async (userId, itemId, slots) => {
    const item = await Item.findOne({ _id: itemId }, { ownerId: 1});
    if (item.ownerId != userId) throw Error(EQUIPMENT_ERRORS.NOT_OWNER_ITEM);

    await Item.deleteOne({ _id: itemId });

    return await searchItems(userId, slots);
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

    withFamiliarSize(size) {
        if (!size || size === 0) return this;
        if (size < 0) throw Error(EQUIPMENT_ERRORS.NEGATIVE_SUMMON_SIZE);
        if (!SIZE_REGEX.test(size)) throw Error(EQUIPMENT_ERRORS.INVALID_SUMMON_SIZE);
        this.familiarSize = size;
        return this;
    }
}

module.exports = {
    searchItems,
    createItem,
    editItem,
    deleteItem
}