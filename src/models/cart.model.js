'use strict'

//key 
const mongoose = require('mongoose');

const {model, Schema, Types} = require('mongoose');
const DOCUMENT_NAME = 'Cart'
const COLLECTION_NAME = 'carts'

//Declare the Schema
const cartSChema = new Schema({
    cart_state: {type: String, required: true, enum: ['active', 'completed', 'failed', 'peding'], default: 'active'},
    cart_products: {type: Array, required: true, default: []},
    cart_count_product: {type: Number, default: 0},
    cart_userId: {type: Number, required: true},
}, {
    timestamps:true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, cartSChema)