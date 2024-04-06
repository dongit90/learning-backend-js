'use strict'

const { status } = require("express/lib/response")
const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const {createTokenPair} = require('../auth/authUtils')
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    ADMIN: 'ADMIN',
}
class AccessService{ 
    static signUp = async ({name, email, password}) => {
        try{

            const holderShop = await shopModel.findOne({email}).lean()
            if (holderShop){
                return {
                    code: 'xxx',
                    message: 'Shop already register',
                    status: 'error'
                }
            }
            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, passwordHash, roles :[RoleShop.SHOP]
            })

            if (newShop){
                const {privateKey, publicKey} =crypto.generateKeyPairSync('rsa', {
                    modulusLenth: 4096
                });

                console.log({privateKey, publicKey}) // save collection key store
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })

                if (publicKeyString){
                    return {
                        code: 'xxx',
                        message: 'publicKeyString error',
                        status: 'error'
                    }
                }
                //const tokens 
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKey, privateKey)
                console.log(`Create token Success::`, tokens)
                return {
                    code: 201,
                    metadata: {
                        shop: newShop,
                        tokens
                    }
                }
            }

            return {
                code: 200,
                metadata: null
            }
        }catch(error){
            return {
                code: 'xxx',
                message: error.message,
                status: 'error'
            }
        }
    }
}

module.exports = AccessService