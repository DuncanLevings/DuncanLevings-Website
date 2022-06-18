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
    PVM_ROUTES,
    BRONZE_MAN_ITEM_ROUTES,
    BUDGET_ROUTES,
    SALARY_ROUTES,
    TRANSACTION_ROUTES,
    COMBINED_TRANSACTION_ROUTES,
    AUDIT_ROUTES} = require('../../consts/route_consts')

router.use(USER_ROUTES._ROOT, require('./userRoute'));
router.use(EMAIL_ROUTES._ROOT, require('./emailRoute'));
router.use(IMAGE_ROUTES._ROOT, require('./RSTools/imageRoute'));
router.use(DAILY_ROUTES._ROOT, require('./RSTools/dailyRoute'));
router.use(ACTIVITY_ROUTES._ROOT, require('./RSTools/activityRoute'));
router.use(EQUIPMENT_ROUTES._ROOT, require('./RSTools/equipmentRoute'));
router.use(PRESET_ROUTES._ROOT, require('./RSTools/presetRoute'));
router.use(FARM_RUN_ROUTES._ROOT, require('./RSTools/farmRunRoute'));
router.use(PVM_ROUTES._ROOT, require('./RSTools/pvmRoute'));
router.use(BRONZE_MAN_ITEM_ROUTES._ROOT, require('./RSTools/bronzeManRoute'));
router.use(BUDGET_ROUTES._ROOT, require('./Budget/budgetRoute'));
router.use(SALARY_ROUTES._ROOT, require('./Budget/salaryRoute'));
router.use(TRANSACTION_ROUTES._ROOT, require('./Budget/transactionRoute'));
router.use(COMBINED_TRANSACTION_ROUTES._ROOT, require('./Budget/combinedTransactionRoute'));
router.use(AUDIT_ROUTES._ROOT, require('./Budget/auditRoute'));

module.exports = router;