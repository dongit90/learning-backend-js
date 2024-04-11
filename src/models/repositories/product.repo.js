'use strict'

const { Types } = require('mongoose')
const {product, electronic, clothing} = require('../../models/product.model')

const queryProduct = async ({query, limit, skip}) => {
    return await product.find(query)
        .populate('product_shop', 'name email -_id')
        .sort({updateAt: -1})
        .skip(skip)
        .limit(limit)
        .lean()
        .exec()
}

const publicProductByShop = async ({product_shop, product_id}) => {  
    console.log("log query", product_shop, product_id)  
    const foundShop = await product.findOne({
        product_shop: new Types.ObjectId(product_shop),
        _id: new Types.ObjectId(product_id)
    })
    console.log("found shop", foundShop)
    if (!foundShop) return null
    foundShop.isDraft = false
    foundShop.isPublic = true
    const {modifedCount} = await foundShop.updateOne(foundShop)
    return modifedCount
}

const updateProductById = async({
    productId,
    bodyUpdate,
    model,
    isNew = true
}) => {
    return await model.findByIdAndUpdate(productId, bodyUpdate, {
        new: isNew
    })
}
module.exports = {
    queryProduct,
    publicProductByShop,
    updateProductById
}