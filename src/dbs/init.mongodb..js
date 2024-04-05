'use strict'

const mongoose = require('mongoose')
const connectString = 'mongodb://localhost:27017/shopDEv'
class Database {
    constructor(){
        this.connect();
    }

    //connect 
    connect(type = 'mongodb'){
        //dev
        if (1  === 1){
            mongoose.set('debug', true)
            mongoose.set('debug', {color : true})
        }
        mongoose.connect( connectStrin, {maxPoolSize: 50}).then ( _ => console.log(`Connected Mongodb Success`))
        .catch(err => console.log(`Error Connect`))

    }

    static getInstance() {
        if (!Database.instance){
            Database.instance = new Database();
        }
        return Database.instance; 
    }
}




module.exports = mongoose