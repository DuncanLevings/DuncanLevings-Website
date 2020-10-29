const express = require('express');
const router = express.Router();
const { 
    USER_ROUTES, 
    EMAIL_ROUTES, 
    IMAGE_ROUTES,
    DAILY_ROUTES} = require('../../consts/route_consts')

router.use(USER_ROUTES._ROOT, require('./userRoute'));
router.use(EMAIL_ROUTES._ROOT, require('./emailRoute'));
router.use(IMAGE_ROUTES._ROOT, require('./imageRoute'));
router.use(DAILY_ROUTES._ROOT, require('./dailyRoute'));

module.exports = router;