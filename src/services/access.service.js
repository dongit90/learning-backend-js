'use strict'

const { status } = require("express/lib/response")
const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const KeyTokenService = require('./keyToken.service')
const {createTokenPair} = require('../auth/authUtils')
const {getInfoData} = require('../utils/index')
const { format } = require("path")
const { BadRequestError, ConflictRequestError } = require("../core/error.response")
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
                throw new BadRequestError('Error: Shop already register');                
            }
            const passwordHash = await bcrypt.hash(password, 10);

            const newShop = await shopModel.create({
                name, email, password: passwordHash, roles :[RoleShop.SHOP]
            })

            if (newShop){
                
                const {privateKey, publicKey} =crypto.generateKeyPairSync('rsa', {
                    modulusLength: 4096,
                    publicKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    },
                    privateKeyEncoding: {
                        type: 'pkcs1',
                        format: 'pem'
                    }
                });
                
                console.log({privateKey, publicKey}) // save collection key store
                const publicKeyString = await KeyTokenService.createKeyToken({
                    userId: newShop._id,
                    publicKey
                })
                
                if (!publicKeyString){
                    return {
                        code: 'xxx',
                        message: 'publicKeyString error',
                        status: 'error'
                    }
                }

                const publicKeyObject = crypto.createPublicKey(publicKeyString)
                //const tokens 
                const tokens = await createTokenPair({userId: newShop._id, email}, publicKeyString, privateKey)
                console.log(`Create token Success::`, tokens)
                return {
                    code: 201,
                    metadata: {
                        shop: getInfoData({fileds : ['_id', 'name', 'email'], object: newShop}),
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