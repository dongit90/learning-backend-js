'use strict'

const {model, Schema} = require('mongoose');

const DOCUMENT_NAME = 'Product'
const COLLECTION_NAME = 'Products'

const productSchema = new Schema({
    product_name: {type: String, required: true},
    product_thumb: {type: String, required: true},
    product_description: String,
    product_price: {type: Number, required:true},
    product_quantity: {type: Number, required:true},
    product_type: {type: String, required:true, enum: ['Electronics', 'Clothing', 'Funiture']},
    product_shop: {type: Schema.Types.ObjectId, ref: 'Shop'},
    product_attributes: {type: Schema.Types.Mixed, required: true}
}, {
    timestamps:true,
    collection: COLLECTION_NAME
})

const clothingSchema = new Schema({
    brand: {type: String, required: true},
    size: String,
    material: String
},{
    collection: 'Clothings',
    timestamps: true
})

const electronicSchema = new Schema({
    manufacturer: {type: String, required: true},
    model: String,
    color: String
},{
    collection: 'Electronics',
    timestamps: true
})

module.exports = {
    product: model(DOCUMENT_NAME, productSchema),
    electronic: model('Electronic', electronicSchema),
    clothing: model('Clothing', clothingSchema)
}