'use strict'

const { Types } = require('mongoose')
const model = require('../discount.model')

const checkDicountExists = async (filter) => {
    return await model.findOne(filter).lean()
}


module.exports = {
    checkDicountExists
}