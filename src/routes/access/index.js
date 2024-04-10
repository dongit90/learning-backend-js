'use strict'

const express = require('express')
const router = express.Router()
const accessController = require('../../controllers/access.controller');

const { authentication, authenticationV2 } = require('../../auth/authUtils');
const asyncHandler = require('../../helpers/asyncHandler');
//init routes
router.get('', (req, res, next) => {
    return res.status(200).json({
        message: 'Welcom Fantipjs'
    })
});

router.post('/shop/signup', asyncHandler(accessController.signUp))
router.post('/shop/login', asyncHandler(accessController.login))
//authentication
router.use(authenticationV2)


router.post('/shop/logout', asyncHandler(accessController.logout))
router.post('/shop/handleRefreshToken', asyncHandler(accessController.handlerRefreshToken))


///
module.exports = router