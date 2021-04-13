const express = require('express')
const { sellerRegistration, sellerLogin, sellerLogout, sellerFile } = require('../controllers/seller.controller');
const { sellerById } = require("../middlewares/sellerAndClient.middel")
const router = express.Router()


router.post('/seller/registration', sellerRegistration);
router.post('/seller/login', sellerLogin);
router.get('/seller/logOut', sellerLogout);
router.get('/sellerFile/:sellerId', sellerFile)

router.param('sellerId', sellerById)

module.exports = router