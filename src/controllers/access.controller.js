'use strict'

const { CREATED } = require("../core/success.response");
const AccessService = require("../services/access.service");

class AccessController{
    signUp = async(req, res, next) => {        
        new CREATED({
            message: 'Registerd OK!',
            metadata: await AccessService.signUp(req.body)
        })               
    }
}
module.exports = new AccessController()