'use strict'

const redis = require('redis')
const { promisify} = require('util');
const { reservationInventory } = require('../models/repositories/inventory.repo');
/*
const redisClient = redis.createClient()

const pexpire = promisify(redisClient.pexpire).bind(redisClient);
const setnxAsync = promisify(redisClient.setnx).bind(redisClient);

const aquireLock = async(productId, quantity, cartId) => {
    const key = `loc_v2023_${productId}`
    const retryTimes = 10
    const expireTime = 3000
    
    for (let i = 0; i < retryTimes.length; i++){
        //tao mot key
        const result = await setnxAsync(key, expireTime)
        console.log(`result:::`, result)
        if (result === 1){
            //thao tac voi inventory 
            const isReservation = await reservationInventory({
                productId, quantity, cartId
            })
            if (isReservation.modifiedCount){
                await await pexpire(key, expireTime)
                return key
            }
            return null;
        }else{
            await new Promise((resolve) => setTimeout(resolve, 50))
        }
    }
}

const releaseLock = async keyLock => {
    const delAsyncKey = promisify(redisClient.del).bind(redisClient)
    return await delAsyncKey(keyLock)
}
*/

const aquireLock = async(productId, quantity, cartId) => {
}

const releaseLock = async keyLock => {
}
module.exports = {
    aquireLock,
    releaseLock
}