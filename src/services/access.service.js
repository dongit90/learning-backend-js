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
const { findByEmail } = require("./shop.service")
const RoleShop = {
    SHOP: 'SHOP',
    WRITER: 'WRITER',
    ADMIN: 'ADMIN',
}
class AccessService{ 


    static login = async({email, password, refreshToken = null}) =>{
        const foundShop = await findByEmail({email});
        if (!foundShop) throw new BadRequestError('Shop not registerd')
        const match = bcrypt.compare(password, foundShop.password)
        if (!match) throw new BadRequestError('Pass not match')

        const privateKey = crypto.randomBytes(64).toString('hex')
        const publicKey = crypto.randomBytes(64).toString('hex')

        const tokens = await createTokenPair({userId: foundShop._id, email}, publicKey, privateKey)
        console.log(tokens)
        await KeyTokenService.createKeyToken({
            userId: foundShop._id,
            refreshToken: tokens.refreshToken,
            privateKey, publicKey            
        })

        return {            
            shop: getInfoData({fileds : ['_id', 'name', 'email'], object: foundShop}),
            tokens            
        }
    }


    static signUp = async ({name, email, password}) => {        

        const holderShop = await shopModel.findOne({email}).lean()
        if (holderShop){
            throw new BadRequestError('Error: Shop already register');                
        }
        const passwordHash = await bcrypt.hash(password, 10);

        const newShop = await shopModel.create({
            name, email, password: passwordHash, roles :[RoleShop.SHOP]
        })

        if (newShop){
            
            const privateKey = crypto.randomBytes(64).toString('hex')
            const publicKey = crypto.randomBytes(64).toString('hex')
            
            console.log({privateKey, publicKey}) // save collection key store
            const publicKeyString = await KeyTokenService.createKeyToken({
                userId: newShop._id,
                publicKey, 
                privateKey
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
    }
}

module.exports = AccessService