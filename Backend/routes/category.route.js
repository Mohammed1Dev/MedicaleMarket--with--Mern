const express = require('express');

const { sellerById, clientById, } = require("../middlewares/sellerAndClient.middel")
const { requireSignIn, isAuth, isSeller, isSellerStatus } = require("../middlewares/authentification.middel")

const router = express.Router();

const { createCategory, categoryId, showCategory, updateCategory, deleteCategory, allCategories } = require('../controllers/category.controller')


router.get('/', allCategories);

router.get('/:categoryId', showCategory);

router.post('/create/:userId', [requireSignIn, isAuth, isSeller, isSellerStatus], createCategory);

router.put('/:categoryId/:userId', [requireSignIn, isAuth, isSeller, isSellerStatus], updateCategory);

router.delete('/:categoryId/:userId', [requireSignIn, isAuth, isSeller, isSellerStatus], deleteCategory);



router.param('userId', sellerById)

router.param('categoryId', categoryId);

module.exports = router;