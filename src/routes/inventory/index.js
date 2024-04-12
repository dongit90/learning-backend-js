'use strict'

const express = require('express')
const router = express.Router()
const inventoryController = require('../../controllers/inventory.controller');

const { authentication, authenticationV2 } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');
//init routes
router.get('', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});


//authentication
router.use(authenticationV2)

router.post('', asyncHandler(inventoryController.addStock))


///
module.exports = router