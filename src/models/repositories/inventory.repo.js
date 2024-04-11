'use strict'

const { Types } = require('mongoose')
const inventoryModel = require('../inventory.model')

const insertInventory = async ({productId, shopId, stock, localtion = 'unknow'}) => {
    return await inventoryModel.create({
        inven_productId: productId,
        inven_stock: stock,
        inven_shopId: shopId,
        inven_localtion: localtion,
    })
}


module.exports = {
    insertInventory
}