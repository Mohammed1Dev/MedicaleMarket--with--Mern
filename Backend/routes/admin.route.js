const express = require('express')
const { adminLogin, adminLogout } = require('../controllers/admin.controller');
const router = express.Router()

router.post('/admin/login', adminLogin);
router.get('/admin/logOut', adminLogout);


module.exports = router