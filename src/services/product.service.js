'use strict'

const { BadRequestError } = require("../core/error.response");
const { product, clothing, electronic } = require("../models/product.model");
const { insertInventory } = require("../models/repositories/inventory.repo");
const { queryProduct, publicProductByShop, updateProductById } = require("../models/repositories/product.repo");


class ProductFactory {
    /*

    */

    static productRegistry = {}

    static registerProductType(type, classRef){
        ProductFactory.productRegistry[type] = classRef
    }

    static async createProduct(type, payload){
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError('Invalid Product Type')
        return new productClass(payload).createProduct()
    }

    static async updateProduct(type, productId, payload){
        const productClass = ProductFactory.productRegistry[type]
        if (!productClass) throw new BadRequestError('Invalid Product Type')
        return new productClass(payload).updateProduct(productId)
    }

    static async findAllDraftsForShop({product_shop}, limit = 50, skip = 0){
        const query = {product_shop, isDraft: true}
        return await queryProduct({query, limit, skip})
    }

    static async publishProductByShop({product_shop, product_id}){        
        return await publicProductByShop({product_shop, product_id})
    }

    static async findAllPublicForShop({product_shop}, limit = 50, skip = 0){
        const query = {product_shop, isPublic: true}
        return await queryProduct({query, limit, skip})
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
        const newProduct =  await product.create({...this, _id: product_id})
        if (newProduct){
            await insertInventory({
                productId: newProduct._id,
                shopId: this.product_shop,
                stock: this.product_quantity

            })
        }
        return newProduct
    }

    // update product
    async updateProduct(productId, bodyUpdate){
        return await updateProductById({productId, bodyUpdate, model: product})
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

    async updateProduct(productId){
        const objectParams = this
        if (objectParams.product_attributes){
            await updateProductById({productId, bodyUpdate: objectParams.product_attributes, model: clothing})
        }

        const updateProduct = await super.updateProduct(productId, objectParams)

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
//register product types
ProductFactory.registerProductType('Electronics', Electronics)
ProductFactory.registerProductType('Clothing', Clothing)

module.exports = ProductFactory