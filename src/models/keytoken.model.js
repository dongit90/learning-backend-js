'use strict'

const { type, status } = require('express/lib/response');
const mongoose = require('mongoose');

const DOCUMENT_NAME = 'Key'
const COLLECTION_NAME = 'Keys'

var keyTokenSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'Shop'
    },
    publicKey:{
        type:String,
        required:true,        
    },
    privateKey:{
        type:String,
        default: '',        
    },
    refreshTokensUsed:{
        type:Array,
        default:[],        
    },
    refreshToken:{
        type:String,
        required:true,        
    }
}, {
    timestamps:true,
    collection: COLLECTION_NAME
});

module.exports = mongoose.model(DOCUMENT_NAME, keyTokenSchema)