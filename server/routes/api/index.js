const express = require('express');
const router = express.Router();
const {
    USER_ROUTES,
    EMAIL_ROUTES,
    IMAGE_ROUTES,
    DAILY_ROUTES,
    ACTIVITY_ROUTES, 
    EQUIPMENT_ROUTES,
    PRESET_ROUTES,
    FARM_RUN_ROUTES,
    PVM_ROUTES} = require('../../consts/route_consts')

router.use(USER_ROUTES._ROOT, require('./userRoute'));
router.use(EMAIL_ROUTES._ROOT, require('./emailRoute'));
router.use(IMAGE_ROUTES._ROOT, require('./RSTools/imageRoute'));
router.use(DAILY_ROUTES._ROOT, require('./RSTools/dailyRoute'));
router.use(ACTIVITY_ROUTES._ROOT, require('./RSTools/activityRoute'));
router.use(EQUIPMENT_ROUTES._ROOT, require('./RSTools/equipmentRoute'));
router.use(PRESET_ROUTES._ROOT, require('./RSTools/presetRoute'));
router.use(FARM_RUN_ROUTES._ROOT, require('./RSTools/farmRunRoute'));
router.use(PVM_ROUTES._ROOT, require('./RSTools/pvmRoute'));

module.exports = router;