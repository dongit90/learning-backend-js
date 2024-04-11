'use strict'

const { CREATED } = require("../core/success.response");
const ProductService = require("../services/product.service");

class ProductController{
    

    
    createProduct = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await ProductService.createProduct(req.body.product_type, {
                ...req.body, product_shop: req.user.userId}) 
        }).send(res)                
    }
    
    updateProduct = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await ProductService.updateProduct(req.body.product_type, req.params.id, {
                ...req.body,
                 product_shop: req.user.userId}) 
        }).send(res)                
    }
    

    //query 
    getAllDraftsForShop = async(req, res, next) => {        
        new CREATED({
            message: 'Get list success',
            metadata: await ProductService.findAllDraftsForShop( {
                product_shop: req.user.userId}) 
        }).send(res)                
    }

    //query 
    getAllPublicsForShop = async(req, res, next) => {        
        new CREATED({
            message: 'Get list success',
            metadata: await ProductService.findAllPublicForShop( {                
                product_shop: req.user.userId}) 
        }).send(res)                
    }

    //public product
    publishProductByShop = async(req, res, next) => { 
        new CREATED({
            message: 'Get list success',
            metadata: await ProductService.publishProductByShop( {
                product_shop: req.user.userId,
                product_id : req.params.product_id
                }) 
        }).send(res)  
    }

}
module.exports = new ProductController()