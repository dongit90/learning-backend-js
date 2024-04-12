'use strict'

const inventory = require("../models/inventory.model")
const { BadRequestError } = require("../core/error.response");

class InventoryService{

    static async createUserCart({userId, product}){
        const query = {cart_userId: userId, cart_state: 'active'},
        updateOrInsert = {
            $addToSet: {
                cart_products: product
            }
        }, options = {upsert: true, new: true}
        return await cartModel.findOneAndUpdate(query, updateOrInsert, options)
    }

   
}

module.exports = InventoryService