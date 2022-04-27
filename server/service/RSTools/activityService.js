/*
 * Filename: c:\Users\Tatsu\Documents\personal_website\server\service\activityService.js
 * Path: c:\Users\Tatsu\Documents\personal_website\server
 * Created Date: Tuesday, November 3rd 2020, 3:47:27 pm
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */
'use strict';

const got = require('got');
const cheerio = require("cheerio");
const { Activity } = require('../../config/mongo');
const { ACTIVITY_ERRORS } = require('../../consts/error_jsons');
const mongoose = require('mongoose');

const RUNE_TYPES = ["Air", "Water", "Earth", "Fire", "Dust", "Lava", "Mist", "Mud", "Smoke", "Steam", "Mind", "Body", "Cosmic", "Chaos", "Nature", "Law", "Death", "Astral", "Blood", "Soul"];

const getActivities = async (userId) => {
    return await Activity.find({ ownerId: userId });
}

const getActivity = async (userId, activityId) => {
    return await Activity.findOne({ _id: activityId, ownerId: userId });
}

const createActivity = async (userId, data) => {
    const activityNameCheck = await Activity.countDocuments({ ownerId: userId, title: data.title });
    if (activityNameCheck > 0) throw Error(ACTIVITY_ERRORS.ACTIVITY_EXISTS);

    const activity = new Activity(new ActivityBuilder()
        .withOwner(userId)
        .withPreset(JSON.parse(data.preset))
        .withTitle(data.title)
        .withWebURL(data.webURL)
        .withYoutubeURL(data.youtubeURL)
        .withNotes(data.notes)
    );

    return await activity.save();
}

const editActivity = async (userId, data) => {
    try {
        const activity = await Activity.findOne({ _id: data.activityId });
        if (!activity.ownerId.equals(userId)) {
            throw Error(ACTIVITY_ERRORS.NOT_OWNER);
        }

        activity.preset = JSON.parse(data.preset)
        activity.title = data.title;
        if (data.webURL) activity.webURL = data.webURL;
        if (data.youtubeURL) activity.youtubeURL = data.youtubeURL;
        if (data.notes) activity.notes = data.notes;

        return await activity.save();
    } catch (e) {
        throw Error(e);
    }
}

const deleteActivity = async (userId, activityId) => {
    const activity = await Activity.findOne({ _id: activityId }, { ownerId: 1 });
    if (!activity.ownerId.equals(userId)) throw Error(ACTIVITY_ERRORS.NOT_OWNER);

    await activity.deleteOne({ _id: activityId });

    return await getActivities(userId);
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

const scrapeVisWaxHtmlData = async () => {
    const htmlData = await fetchHtmlData('https://warbandtracker.com/goldberg/');

    // parse HTML from website
    const selector = cheerio.load(htmlData);
    const table = selector('h2:contains("Correct Rune Combinations")').next();
    const rowData = table.children().find("td");

    // extract table data
    const runeArr = [];
    rowData.each((i, elem) => {
        const textArr = selector(elem).text().split(" ");
        const filteredText = textArr.filter(text => RUNE_TYPES.includes(text));
        if (filteredText && filteredText.length > 0) {
            runeArr.push(filteredText[0])
        }
    });

    if (runeArr.length < 1) throw Error(ACTIVITY_ERRORS.NO_RUNE_DATA);

    // construct final object
    const secondRunes = runeArr.slice(1);
    const runeData = {
        firstRune: {
            name: `${runeArr[0]} Rune`,
            img: runeArr[0].toLowerCase()
        },
        secondRune: []
    };
    
    secondRunes.forEach(rune => {
        runeData.secondRune.push({
            name: `${rune} Rune`,
            img: rune.toLowerCase()
        });
    });

    return runeData;
}

const fetchRedditData = () => {
    return (async () => {
        try {
            const response = await got('https://www.reddit.com/r/NemiForest/new.json');
            const responseObj = JSON.parse(response.body);
            if (responseObj.data.children.length > 0) {
                return responseObj.data.children[0].data;
            }
        } catch (error) {
            throw Error(error.response.body);
        }
    })();
}

const getLatestNemiForest = async () => {
    return await fetchRedditData()
        .then(data => {
            return { title: data.title, url: data.url };
        })
        .catch(err => { throw Error(err); });
}

class ActivityBuilder {
    withOwner(id) {
        if (!id) throw Error(ACTIVITY_ERRORS.USER_REQUIRED);
        this.ownerId = id;
        return this;
    }

    withPreset(preset) {
        if (!preset) throw Error(ACTIVITY_ERRORS.PRESET_REQUIRED);
        if (preset._id) preset._id = mongoose.Types.ObjectId(preset._id);
        if (preset.id) preset.id = undefined;
        if (preset.ownerId) preset.ownerId = mongoose.Types.ObjectId(preset.ownerId);
        this.preset = preset;
        return this;
    }

    withTitle(title) {
        if (!title) throw Error(ACTIVITY_ERRORS.TITLE_MISSING);
        this.title = title;
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
}

module.exports = {
    getActivities,
    getActivity,
    createActivity,
    editActivity,
    deleteActivity,
    scrapeVisWaxHtmlData,
    getLatestNemiForest
}