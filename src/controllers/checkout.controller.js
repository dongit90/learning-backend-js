'use strict'

const { CREATED } = require("../core/success.response");
const CheckoutService = require("../services/checkout.service");

class CartController{

    checkoutReview = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await CheckoutService.checkoutReview(req.body) 
        }).send(res)                
    }
}
module.exports = new CartController()