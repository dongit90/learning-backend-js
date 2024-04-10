'use strict'
const JWT = require('jsonwebtoken');
const asyncHandler = require('../helpers/asyncHandler');
const { findByUserId } = require('../services/keyToken.service');
const { token } = require('morgan');
const HEADER = {
    CLIENT_ID : "x-client-id",   
    AUTHORIZATION: "authorization",
    REFRESHTOKEN: "x-rtoken-id"
}

const createTokenPair = async(payload, publicKey, privateKey) => {
    try{
        const accessToken = await JWT.sign(payload, publicKey, {         
            expiresIn: '2 days'
        });

        const refreshToken = await JWT.sign(payload, privateKey, {            
            expiresIn: '7 days'
        });
        JWT.verify(accessToken, publicKey), (err, decode) => {
            if (err){
                console.error(`error verify: `, err)
            }else{
                console.log('decode verify::', decode)
            }
        };
        console.log('blbal',accessToken)
        return {accessToken, refreshToken}
    }catch (error){
        console.log('error')
    }
}

const authentication = asyncHandler(async (req, res, next) => {
    /*
    1 - check userId missing
    2 - get accessToken 
    3 - verify token 
    4 - check user in dbs
    5 - check keyStore with this userId
    6 - OK all return next()
    */
    const userId = req.headers[HEADER.CLIENT_ID]    
    if (!userId) throw new BadRequestError('Invalid Request')

     const keyStore = await findByUserId(userId)
    if (!keyStore) throw new BadRequestError('Invalid Request')    

    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new BadRequestError('Invalid Request')
    try{                
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)        
        if (userId !== decodeUser.userId){
            throw new BadRequestError('Invalid Request')
        }
        req.keyStore = keyStore
        return next()
    }catch(error){
        throw error
    }

})


const authenticationV2 = asyncHandler(async (req, res, next) => {
    /*
    1 - check userId missing
    2 - get accessToken 
    3 - verify token 
    4 - check user in dbs
    5 - check keyStore with this userId
    6 - OK all return next()
    */
    const userId = req.headers[HEADER.CLIENT_ID]    
    if (!userId) throw new BadRequestError('Invalid Request')

     const keyStore = await findByUserId(userId)
    if (!keyStore) throw new BadRequestError('Invalid Request')    

    if (req.headers[HEADER.REFRESHTOKEN]){
        const refreshToken = req.headers[HEADER.REFRESHTOKEN]
        const decodeUser = JWT.verify(refreshToken, keyStore.privateKey)        
        if (userId !== decodeUser.userId){
            throw new BadRequestError('Invalid Request')
        }
        req.keyStore = keyStore
        req.user = decodeUser
        req.refreshToken = refreshToken
        return next()
    }
    const accessToken = req.headers[HEADER.AUTHORIZATION]
    if (!accessToken) throw new BadRequestError('Invalid Request')
    try{                
        const decodeUser = JWT.verify(accessToken, keyStore.publicKey)        
        if (userId !== decodeUser.userId){
            throw new BadRequestError('Invalid Request')
        }
        req.keyStore = keyStore
        req.user = decodeUser
        return next()
    }catch(error){
        throw error
    }

})
const verifyJWT = async(token, keySecret) => {
    return await JWT.verify(token, keySecret)
}
module.exports = {
    createTokenPair, authentication, verifyJWT, authenticationV2
}