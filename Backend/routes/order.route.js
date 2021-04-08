const express = require('express');
const { clientById, adminById ,addProductsClientHistory } = require('../middlewares/sellerAndClient.middel');
const { decreaseQuantity } = require('../middlewares/product.middel')
const { orderById }  = require('./../middlewares/order.middel')
const {create, listOrders, getStatus, updateOrderStatus} = require('./../controllers/order.controller')
const { requireSignIn, isAuth, isClient, isAdmin } = require('../middlewares/authentification.middel');


const router = express.Router();

router.get('/:adminId', [requireSignIn, isAuth, isAdmin ], listOrders)
router.get('/status/:adminId', [requireSignIn, isAuth, isAdmin], getStatus)
router.patch('/:orderId/status/:adminId', [requireSignIn, isAuth, isAdmin], updateOrderStatus)

router.post('/create/:clientId', [requireSignIn, isAuth, isClient, addProductsClientHistory, decreaseQuantity], create)



router.param('adminId', adminById)
router.param('clientId', clientById)
router.param('orderId', orderById)



module.exports = router