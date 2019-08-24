let mongoose=require('mongoose');
const configDB=require('../appConfig/appDatabase')

//Activities Schema
let activitiesSchema=mongoose.Schema({
    activity:{
        type: String,
        required: true
    },
    createdDate:{
        type: String,
        required: true
    },
    startDate:{
        type: String,
        required: true
    },
    endDate:{
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    remarks:{
        type: String,
        required: false
    },
    assignee:{
        type: String,
        required: true
    }
}, { collection: configDB.activitiesColl })

let activities=module.exports=mongoose.model('activitiesModel',activitiesSchema);