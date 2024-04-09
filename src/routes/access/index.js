'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller');

const { authentication } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');
//init routes
router.get('', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});

//authentication
router.use(authentication)

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.login))
router.post('/shop/logout', asyncHandler(accessController.logout))


///
module.exports = router