'use strict'

const { CREATED } = require("../core/success.response");
const CartService = require("../services/cart.service");

class CartController{

    addToCart = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await CartService.addToCart(req.body) 
        }).send(res)                
    }

    update = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await CartService.addToCartV2(req.body) 
        }).send(res)                
    }

    delete = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await CartService.deleteUserCart(req.body) 
        }).send(res)                
    }

    listToCart = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await CartService.getListUserCart(req.query) 
        }).send(res)                
    }

}
module.exports = new CartController()