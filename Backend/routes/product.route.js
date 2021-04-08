const express = require('express');
const {
    createProduct,
    updateProduct,
    productById,
    showProduct,
    deleteProduct,
    allProducts,
    relatedProduct,
    searchProduct,
    photoProduct
} = require('../controllers/product.controller');
const { sellerById } = require("../middlewares/sellerAndClient.middel")
const { requireSignIn, isAuth, isSeller, isSellerStatus } = require("../middlewares/authentification.middel")

const router = express.Router()

router.get('/', allProducts)
router.get('/related/:productId', relatedProduct)
router.get('/:productId', showProduct)
router.get('/photo/:productId', photoProduct)
router.post('/search', searchProduct)
router.post('/create/:userId', [requireSignIn, isAuth, isSeller, isSellerStatus] , createProduct)
router.delete('/:productId/:userId', [requireSignIn, isAuth, isSeller, isSellerStatus] ,deleteProduct )
router.put('/:productId/:userId', [requireSignIn, isAuth, isSeller, isSellerStatus] , updateProduct )


router.param("userId", sellerById)
router.param("productId", productById)

module.exports = router  