'use strict'

const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/product.model")


class ProductFactory {
    /*

    */
    static async createProduct(type, payload){
        console.log("log data", type, payload)
        switch (type){
            case 'Electronics':
                return new Electronics(payload).createProduct()
            case 'Clothing':
                return new Clothing(payload).createProduct()
            default:
                throw new BadRequestError('Invalid Product Type')
        }
    }
}

class Product {
    constructor({
        product_name, product_thumb, product_description, product_price,
        product_quantity, product_type, product_shop, product_attributes

    }){
        this.product_name = product_name;
        this.product_thumb = product_thumb;
        this.product_description = product_description;
        this.product_price = product_price;
        this.product_quantity = product_quantity;
        this.product_type = product_type;
        this.product_shop = product_shop;
        this.product_attributes = product_attributes;

    }
    // create new product
    async createProduct(product_id){
        return await product.create({...this, _id: product_id})
    }
}

class Clothing extends Product{
    async createProduct(){
        const newClothing = await clothing.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        console.log("newClothing", newClothing)
        if (!newClothing) throw new BadRequestError('create new Clothing eror')
        const newProduct = await super.createProduct(newClothing._id)
        console.log("newProduct", newProduct)
        if (!newProduct) throw new BadRequestError('create new Clothing eror')
        return newProduct
    }
}

class Electronics extends Product{
    async createProduct(){
        const newElectronics = await electronic.create({
            ...this.product_attributes,
            product_shop: this.product_shop
        })
        if (!newElectronics) throw new BadRequestError('create new Electronics eror')
        const newProduct = await super.createProduct(newElectronics._id)
        if (!newProduct) throw new BadRequestError('create new Electronics eror')
        return newProduct
    }
}

module.exports = ProductFactory