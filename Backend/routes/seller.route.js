const express = require('express')
const { sellerRegistration, sellerLogin, sellerLogout } = require('../controllers/seller.controller');
const router = express.Router()


router.post('/seller/registration', sellerRegistration);
router.post('/seller/login', sellerLogin);
router.get('/seller/logOut', sellerLogout);


module.exports = router