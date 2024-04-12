'use strict'

//key 
const mongoose = require('mongoose');

const {model, Schema, Types} = require('mongoose');
const DOCUMENT_NAME = 'Order'
const COLLECTION_NAME = 'Orders'

//Declare the Schema
const orderSChema = new Schema({
    order_userId: {type: Number, required: true},
    order_checkout: {type: Object, default: {}}/** totalPrice, totalApplyDiscount,  */,
    order_shipping: {type: Object, default: {}},/**street, city, state, country */
    order_payment: {type: Object, default: {}},
    order_products: {type: Array, required: true},
    order_trackingNumber: {type: String, default: '#0001123455'},
    order_status: {type: String, enum: ['pending', 'confirmed', 'shipped', 'cancelled', ''], default: 'pending'}
}, {
    timestamps:true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, orderSChema)