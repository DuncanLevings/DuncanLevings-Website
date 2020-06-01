const express = require('express');
const router = express.Router();
const { USER_ROUTES } = require('../../consts/route_consts')

router.use(USER_ROUTES._ROOT, require('./userRoute'));

module.exports = router;