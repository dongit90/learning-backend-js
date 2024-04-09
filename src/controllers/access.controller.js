'use strict'

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController{

    logout = async(req, res, next) => {        
        new CREATED({
            message: 'Logout success',
            metadata: await AccessService.logout(req.keyStore) 
        }).send(res)                
    }

    login = async(req, res, next) => {        
        new CREATED({
            metadata: await AccessService.login(req.body)
        }).send(res)                
    }

    signUp = async(req, res, next) => {        
        new CREATED({
            message: 'Registerd OK!',
            metadata: await AccessService.signUp(req.body)
        }).send(res)               
    }
}
module.exports = new AccessController()