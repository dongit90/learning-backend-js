'use strict'

const { status } = require("express/lib/response")
const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keytokenModel = require("../models/keytoken.model")
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    ADMIN: 'ADMIN',
}
class KeyTokenService{ 
    static createKeyToken = async ({userId, publicKey, privateKey, refreshToken}) => {
        try{
            const filter = {user: userId}, update = {
                publicKey, privateKey, refreshTokenUsed: [], refreshToken
            }, options = {upsert: true, new: true}
            const tokens = await keytokenModel.findOneAndUpdate(filter, update, options)
            return tokens ? tokens.publicKey : null
           
        }catch(error){
            console.log(error)
            return error;
        }
    }
}

module.exports = KeyTokenService