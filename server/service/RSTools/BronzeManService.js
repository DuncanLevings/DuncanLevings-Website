/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const { BRONZE_MAN_ERRORS } = require("../../consts/error_jsons");
const { BronzeManItem } = require("../../config/mongo");
const mongoose = require('mongoose');

/**
 * Gets all items based on userId
 * @param {*} userId
 */
const getItems = async (userId, name) => {
    return await BronzeManItem.find({ ownerId: mongoose.Types.ObjectId(userId), name: {$regex: new RegExp(name, "i")} }).limit(10);
}

/**
 * Sets acquired flag for a single item and ensures user is owner
 * @param {*} userId 
 * @param {*} itemId 
 */
 const setAcquired = async (userId, itemId) => {
    const item = await BronzeManItem.findOne({ _id: itemId });

    if (!item.ownerId.equals(userId)) throw Error(BRONZE_MAN_ERRORS.NOT_OWNER_ITEM);

    item.acquired = !item.acquired;

    await item.save();
    return item;
}


const createItem = async (userId, data) => {

    const itemCheck = await BronzeManItem.countDocuments({ name: data.name });
    if (itemCheck > 0) throw Error(BRONZE_MAN_ERRORS.ITEM_EXISTS);

    const item = new BronzeManItem(new ItemBuilder()
        .withOwner(userId)
        .withName(data.name)
        .withAcquired(data.acquired)
    );

    await item.save();
    return item;
}


const deleteItem = async (userId, itemId) => {
    const item = await BronzeManItem.findOne({ _id: itemId }, { ownerId: 1 });
    if (!item.ownerId.equals(userId)) throw Error(BRONZE_MAN_ERRORS.NOT_OWNER_ITEM);

    await BronzeManItem.deleteOne({ _id: itemId });
}

class ItemBuilder {
    withOwner(id) {
        if (!id) throw Error(BRONZE_MAN_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withName(name) {
        if (!name) throw Error(BRONZE_MAN_ERRORS.NAME_REQUIRED);
        this.name = name;
        return this;
    }

    withAcquired(acquired) {
        if (!acquired) return this;
        this.acquired = acquired;
        return this;
    }
}

module.exports = {
    getItems,
    setAcquired,
    createItem,
    deleteItem
}