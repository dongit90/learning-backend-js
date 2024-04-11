'use strict'

const express = require('express')
const router = express.Router()
const productController = require('../../controllers/product.controller');

const { authenticationV2 } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');

//authentication
router.use(authenticationV2)


router.post('', asyncHandler(productController.createProduct))

//query
router.get('/drafts/all', asyncHandler(productController.getAllDraftsForShop))
router.get('/publics/all', asyncHandler(productController.getAllPublicsForShop))
router.post('/publish/:product_id', asyncHandler(productController.publishProductByShop))
router.patch('/:id', asyncHandler(productController.updateProduct))
///
module.exports = router