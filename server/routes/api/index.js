const express = require('express');
const router = express.Router();
const { USER_ROOT } = require("../../constants/route_consts/user_route_consts");

router.use(USER_ROOT, require('./userRoute'));

module.exports = router;