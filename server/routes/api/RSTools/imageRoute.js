/*
 * Author: Duncan Levings
 * 
 * Copyright (c) 2020 DuncanLevings
 */

'use strict';

var express = require('express');
const auth = require('../../auth');
const { IMAGE_ROUTES } = require('../../../consts/route_consts');
const { _imageService } = require('../../../service');
const multer = require('multer');
const router = express.Router();

const Multer = multer({
  storage: multer.MemoryStorage,
  fileSize: 5 * 1024 * 1024
});

router.post(IMAGE_ROUTES.UPLOAD, Multer.array('images'), auth.user, _imageService.uploadMultipleToBucket, (req, res, next) => {
  res.status(200).json({ files: req.files });
});

module.exports = router;