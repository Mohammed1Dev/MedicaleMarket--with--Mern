const express = require('express')
const { clientRegistration, clientLogin, clientLogout } = require('../controllers/client.controller');
const router = express.Router()

router.post('/client/registration', clientRegistration);
router.post('/client/login', clientLogin);
router.get('/client/logOut', clientLogout);


module.exports = router