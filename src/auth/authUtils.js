'use strict'
const JWT = require('jsonwebtoken')

const createTokenPair = async(payload, publicKey, privateKey) => {
    try{
        const accessToken = await JWT.sign(payload, privateKey)
        
    }catch (error){

    }
}

module.exports = {
    createTokenPair
}