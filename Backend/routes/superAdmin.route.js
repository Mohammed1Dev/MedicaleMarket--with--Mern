const express = require('express')
const { superAdminRegistration, 
        superAdminLogin, 
        superAdminLogout, 
        allSellers, 
        sellerConfirmation,
        bannSeller,
        adminsList,
        getOneAdmin,
        createAdmin,
        updateAdmin,
        deleteAdmin } = require('../controllers/superAdmin.controller');

const router = express.Router()

router.post('/superAdmin/registration', superAdminRegistration);
router.post('/superAdmin/login', superAdminLogin);
router.get('/superAdmin/logOut', superAdminLogout);
router.get('/superAdmin/ShowSellers', allSellers);
router.patch('/superAdmin/activateSeller/:id', sellerConfirmation);
router.delete('/superAdmin/BannSeller/:id', bannSeller);
router.get('/superAdmin/ShowAdmins', adminsList);
router.get('/superAdmin/showOneAdmin/:id', getOneAdmin);
router.post('/superAdmin/addNewAdmin', createAdmin);
router.put('/superAdmin/updateAdmin/:id', updateAdmin);
router.delete('/superAdmin/deleteAdmin/:id', deleteAdmin);


module.exports = router