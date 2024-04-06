'use strict'

class AccessController{
    signUp = async(req, res, next) => {
        try{
            console.log(`[P]::signUp::`, req.body)
            return res.status(201).json({
                code: '200001',
                metadata: {userid: 1}
            })
        }catch{
            next(console.error());
        }
    }
}
module.exports = new AccessController()