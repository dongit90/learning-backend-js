'use strict'

const { Types } = require('mongoose')
const cart = require('../cart.model')
const { convertToObjectIdMongoDb } = require('../../utils')

const findCardById = async (cartId) => {
    return await cart.findOne({_id: convertToObjectIdMongoDb(cartId), cart_state : 'active'}).lean()
}


module.exports = {
    findCardById
}