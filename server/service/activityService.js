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

const fetchRedditData = () => {
    return (async () => {
        try {
            const response = await got('https://www.reddit.com/r/NemiForest/new.json');
            const responseObj = JSON.parse(response.body);
            if (responseObj.data.children.length > 0) {
                return responseObj.data.children[0].data;
            }
        } catch (error) {
            console.log(error.response.body);
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
    getLatestNemiForest
}