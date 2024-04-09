'use strict'
const JWT = require('jsonwebtoken')

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

module.exports = {
    createTokenPair
}