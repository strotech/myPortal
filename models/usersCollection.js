let mongoose=require('mongoose');
const configDB=require('../appConfig/appDatabase')

//User Schema
let usersSchema=mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    username:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
}, { collection: configDB.usersColl })

let users=module.exports=mongoose.model('usersModel',usersSchema);