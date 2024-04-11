'use strict'

const express = require('express')
const router = express.Router()
const discountController = require('../../controllers/discount.controller');

const { authenticationV2 } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');

//authentication
router.use(authenticationV2)


//query
router.post('', asyncHandler(discountController.createDiscount))
router.get('', asyncHandler(discountController.getDiscountWithProduct))
///
module.exports = router