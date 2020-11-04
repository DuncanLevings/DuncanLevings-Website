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
const { ACTIVITY_ERRORS } = require('../consts/error_jsons');

const RUNE_TYPES = ["Air", "Water", "Earth", "Fire", "Dust", "Lava", "Mist", "Mud", "Smoke", "Steam", "Mind", "Body", "Cosmic", "Chaos", "Nature", "Law", "Death", "Astral", "Blood", "Soul"];

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

module.exports = {
    scrapeVisWaxHtmlData,
    getLatestNemiForest
}