'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller');
const { asyncHandler } = require('../../auth/checkAuth');
//init routes
router.get('', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});

router.post('/shop/signup', asyncHandler(accessController.signUp))
module.exports = router