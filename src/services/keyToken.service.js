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
    static createKeyToken = async ({userId, publicKey}) => {
        try{
            const publicKeyString = publicKey.toString()
            const tokens  = await keytokenModel.create({
                user: userId,
                publicKey: publicKeyString,
                refreshToken: []
            })
            return tokens ? publicKeyString : null
           
        }catch(error){
            console.log(error)
            return error;
        }
    }
}

module.exports = KeyTokenService