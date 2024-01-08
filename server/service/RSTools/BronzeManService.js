/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';
const got = require('got');
const cheerio = require("cheerio");
const { BRONZE_MAN_ERRORS } = require("../../consts/error_jsons");
const { BronzeManItem, BronzeManEnemy } = require("../../config/mongo");
const mongoose = require('mongoose');

const BLACK_LIST = ["Rare drop table", "Key token", "Mimic kill token"];

/**
 * Gets all items based on userId
 * @param {*} userId
 */
const getItems = async (userId, name) => {
    return await BronzeManItem.find({ ownerId: mongoose.Types.ObjectId(userId), name: { $regex: new RegExp(name, "i") } }).limit(20);
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
    const itemCheck = await BronzeManItem.countDocuments({ ownerId: mongoose.Types.ObjectId(userId), name: data.name });
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

const getEnemies = async (userId, name) => {
    return await BronzeManEnemy.find({ ownerId: mongoose.Types.ObjectId(userId), name: { $regex: new RegExp(name, "i") } }, { name: 1 }).limit(20);
}

const getEnemyData = async(userId, name) => {
    const userIdc = mongoose.Types.ObjectId(userId);
    const enemyData = await BronzeManEnemy.aggregate([
        {
            $match: { ownerId: userIdc, name: name }
        },
        {
            $lookup: {
                from: BronzeManItem.collection.name,
                localField: "items",
                foreignField: "_id",
                as: "items"
            }
        }
    ]);
    if (enemyData.length > 0) return enemyData[0];
    return enemyData;
}

const createEnemy = async (userId, data) => {

    const enemyName = await scrapeEnemyName(data.url);

    const enemyCheck = await BronzeManEnemy.countDocuments({ ownerId: mongoose.Types.ObjectId(userId), name: enemyName });
    if (enemyCheck > 0) throw Error(BRONZE_MAN_ERRORS.ENEMY_EXISTS);

    const scrapedItems = await scrapeWikiItemTables(data.url);

    const itemIds = await BronzeManItem.aggregate([
        {
            $match: {
                $expr: {
                    $in: ["$name", scrapedItems]
                }
            }
        },
        {
            $group: {
                _id: '$_id'
            }
        }
    ]);
    
    const enemy = new BronzeManEnemy(new EnemyBuilder()
        .withOwner(userId)
        .withURL(data.url)
        .withName(enemyName)
        .withItems(itemIds)
    );

    await enemy.save();
    return enemy;
}

const deleteEnemy = async (userId, enemyId) => {
    const enemy = await BronzeManEnemy.findOne({ _id: enemyId }, { ownerId: 1 });
    if (!enemy.ownerId.equals(userId)) throw Error(BRONZE_MAN_ERRORS.NOT_OWNER_ENEMY);

    await BronzeManEnemy.deleteOne({ _id: enemyId });
}

const fetchHtmlData = (url) => {
    return (async () => {
        try {
            const { body } = await got(url);
            return body;
        } catch (error) {
            throw Error(error.response.body);
        }
    })();
}

const scrapeWikiItemTables = async (url) => {
    const htmlData = await fetchHtmlData(url);

    // parse HTML from website
    const selector = cheerio.load(htmlData);

    selector('table#drop-table-rdt').remove();
    selector('sub').remove();
    selector('sup').remove();

    const tables = selector('table.item-drops');
    const rowData = tables.children().find("td.item-col");

    const itemList = [];
    rowData.each((i, elem) => {
        const text = selector(elem).text().trim();
        if (!BLACK_LIST.includes(text)) {
            itemList.push(text);
        }
    });
    return itemList;
}

const scrapeEnemyName = async (url) => {
    const htmlData = await fetchHtmlData(url);

    // parse HTML from website
    const selector = cheerio.load(htmlData);

    return selector('h1#firstHeading').text();
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

class EnemyBuilder {
    withOwner(id) {
        if (!id) throw Error(BRONZE_MAN_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withURL(url) {
        if (!url) throw Error(BRONZE_MAN_ERRORS.URL_REQUIRED);
        this.url = url;
        return this;
    }

    withName(name) {
        this.name = name;
        return this;
    }

    withItems(items) {
        if (!items || items.length == 0) return this;
        this.items = items;
        return this;
    }
}

module.exports = {
    getItems,
    setAcquired,
    createItem,
    getEnemies,
    getEnemyData,
    createEnemy,
    deleteItem,
    deleteEnemy
}