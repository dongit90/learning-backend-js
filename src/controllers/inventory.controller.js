'use strict'

const { CREATED } = require("../core/success.response");
const InventoryService = require("../services/inventory.service");

class InventoryController{

    addStock = async(req, res, next) => {        
        new CREATED({
            message: 'Create success',
            metadata: await InventoryService.addStockToInventory(req.body) 
        }).send(res)                
    }

}
module.exports = new InventoryController()