'use strict'

const express = require('express')
const router = express.Router()
const checkoutController = require('../../controllers/checkout.controller');

const { authentication, authenticationV2 } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');
//init routes
router.get('', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});

//authentication
//router.use(authenticationV2)

router.post('/review', asyncHandler(checkoutController.checkoutReview))


///
module.exports = router