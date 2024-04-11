'use strict'

const { CREATED } = require("../core/success.response");
const DisconutService = require("../services/discount.service");

class DiscountController{
    

    
    createDiscount = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await DisconutService.createDiscountCode({
                ...req.body, shopId: req.user.userId}) 
        }).send(res)                
    }
    

    //query 
    getDiscountWithProduct = async(req, res, next) => {        
        new CREATED({
            message: 'Get list success',
            metadata: await DisconutService.getAllDiscountCodesWithProduct( {
                ...req.query}) 
        }).send(res)                
    }


}
module.exports = new DiscountController()