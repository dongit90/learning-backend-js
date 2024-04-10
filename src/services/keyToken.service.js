'use strict'

const { status } = require("express/lib/response")
const shopModel = require("../models/shop.model")
const bcrypt = require('bcrypt')
const crypto = require('crypto')
const keytokenModel = require("../models/keytoken.model")
const { Types } = require("mongoose")
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

    static findByUserId = async (userId) =>{
        return await keytokenModel.findOne({user: new Types.ObjectId(userId)})
    }

    static removeById = async(id) => {
        return await keytokenModel.deleteOne(id)
    }

    static findByRefreshTokenUsed = async (refreshToken) => {
        return await keytokenModel.findOne({refreshTokensUsed: refreshToken}).lean()
    }

    static deleteKeyById = async (userId) => {
        return await keytokenModel.findByIdAndDelete({user: userId}).lean()
    }

    static findByRefreshToken = async (refreshToken) => {
        return await keytokenModel.findOne({refreshToken: refreshToken}).lean()
    }

    static findOneAndUpdate = async (id, refreshToken) => {
        return await keytokenModel.findOneAndUpdate({_id: id},
        {
            $set: {
                refreshToken: refreshToken
            },
            $addToSet: {
                refreshTokensUsed: refreshToken
            }
        })
    }

}

module.exports = KeyTokenService