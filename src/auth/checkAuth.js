'use strict'

const { findById } = require("../services/apikey.service")

const HEADER = {
    API_KEY : "x-api-key",
    AUTHORIZATION: 'authorization'
}
const apiKey = async (req, res, next) => {
    try{
        const key = req.headers[HEADER.API_KEY]?.toString()
        console.log(`key: ${key}`)
        if (!key){
            console.log('Invalid api key')
            return res.status[403].json({
                message: 'Forbidden Error'
            })
        }        
        
        //check objKey
        const objectKey = await findById(key)
        console.log(`key: ${objectKey}`)
        if (!objectKey){
            console.log('tracking 2')
            return res.status[403].json({
                message: 'Forbidden Error'
            })
        }
        req.objKey = objectKey
        return next()
    }catch(error){

    }
}

const permission = (permission) => {
    return (req, res, next) => {
        if (!req.objKey.permissions){
            return res.status[403].json({
                message: 'Permission denied'
            })
        }
        console.log("permissions::", req.objKey.permissions)
        const validPermision = req.objKey.permissions.includes(permission)
        if (!validPermision){
            return res.status[403].json({
                message: 'Permission denied'
            })
        }

        return next()
    }
}

const asyncHandler = fb => {
    return (req, res, next) => {
        fn((req, res, next).catch(next)
    }
}
module.exports = {
    apiKey, permission, asyncHandler
}