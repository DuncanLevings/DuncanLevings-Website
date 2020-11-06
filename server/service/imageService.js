/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

const _config = require('../config/config.json');
const { Storage } = require('@google-cloud/storage');
const fs = require("fs");

const CLOUD_BUCKET = _config.gcloud_bucket_name;
const storage = new Storage({
    projectId: _config.gcloud_project_id,
    keyFilename: _config.keyfile_path
});
const bucket = storage.bucket(CLOUD_BUCKET);

// returns public url of given filename from bucket
const getPublicUrl = (filename) => {
    return `https://storage.googleapis.com/${CLOUD_BUCKET}/${filename}`
}

const uploadMultipleToBucket = (req, res, next) => {
    if (!req.files) {
        return next()
    }

    let promises = [];
    req.files.forEach((image, index) => {
        const imageName = req.user._id + "_" + Date.now();
        const file = bucket.file(imageName);

        const promise = new Promise((resolve, reject) => {
            const stream = file.createWriteStream({
                metadata: {
                    contentType: image.mimetype
                }
            });

            stream.on('finish', async () => {
                try {
                    req.files[index].cloudStorageObject = imageName
                    await file.makePublic()
                    req.files[index].cloudStoragePublicUrl = getPublicUrl(imageName)
                    resolve();
                } catch (error) {
                    reject(error)
                }
            });

            stream.on('error', (err) => {
                req.files[index].cloudStorageError = err
                reject(err)
            });

            stream.end(image.buffer);
        })

        promises.push(promise)
    });

    Promise.all(promises)
        .then(_ => {
            promises = [];
            next();
        })
        .catch(next);
}

const uploadSingleToBucket = (req, res, next) => {
    if (!req.file) {
        return next()
    }

    const imageName = req.user._id + "_" + Date.now();
    const file = bucket.file(imageName);

    const stream = file.createWriteStream({
        metadata: {
            contentType: req.file.mimetype
        }
    });

    stream.on('finish', async () => {
        try {
            req.file.cloudStorageObject = imageName
            await file.makePublic()
            req.file.cloudStoragePublicUrl = getPublicUrl(imageName)
            next();
        } catch (error) {
            throw Error(error);
        }
    });

    stream.on('error', (err) => {
        req.file.cloudStorageError = err
        throw Error(err);
    });

    stream.end(req.file.buffer);
}

module.exports = {
    uploadMultipleToBucket,
    uploadSingleToBucket
}