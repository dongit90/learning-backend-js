'use strict'

const inventory = require("../models/inventory.model")
const { BadRequestError } = require("../core/error.response");
const { getProductById } = require("../models/repositories/product.repo");

class InventoryService{

    static async addStockToInventory({
        stock, product,
        shopId, localtion = '123 address'
    }){
        const checkProduct = await getProductById(productId)
        if (!checkProduct) throw new BadRequestError('not existed')
        const query = {inven_shopId: shopId, inven_productId: productId}
        updateSet = {
            $inc: {
                inven_stock: stock
            },
            $set: {
                inven_location: localtion
            }                        
        }
        options = {upsert: true, new : true}
        return await inventory.updateOne(query, updateSet, options)

    }

   
}

module.exports = InventoryService