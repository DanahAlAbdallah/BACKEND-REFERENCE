const adminController = require('../controllers/admin.controller')

const Routes = require('./routeConstants')
var router = require('express').Router();

router.post(Routes.SIGN_UP, adminController.registerAdmin);
router.post(Routes.SIGN_IN, adminController.loginAdmin);

module.exports = router;