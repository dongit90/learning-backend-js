'use strict'

const { Types } = require('mongoose')
const inventoryModel = require('../inventory.model')
const { convertToObjectIdMongoDb } = require('../../utils')

const insertInventory = async ({productId, shopId, stock, localtion = 'unknow'}) => {
    return await inventoryModel.create({
        inven_productId: productId,
        inven_stock: stock,
        inven_shopId: shopId,
        inven_localtion: localtion,
    })
}

const reservationInventory = async( {productId, quantity, cartId})=> {
    const query = {
        inven_productId: convertToObjectIdMongoDb(productId),
        inven_stock: {$gte: quantity}
    }, updateSet = {
        $inc: {
            inven_stock: -quantity
        },
        $push: {
            inven_reservations: {
                quantity,
                cartId,
                createOn: new Date()
            }
        }
    }, options = {upsert: true, new: true}        
    return await inventoryModel.updateOne(query, updateSet, option)
}

module.exports = {
    insertInventory,
    reservationInventory
}