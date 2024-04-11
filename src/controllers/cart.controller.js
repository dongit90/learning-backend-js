'use strict'

const { CREATED } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController{

    addToCart = async(req, res, next) => {        
        new CREATED({
            message: 'Handle success',
            metadata: await AccessService.handleRefreshTokenV2({refreshToken: req.refreshToken, user: req.user, keyStore: req.keyStore}) 
        }).send(res)                
    }
}
module.exports = new CartController()