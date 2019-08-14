let mongoose=require('mongoose');

//Activities Schema
let activitiesSchema=mongoose.Schema({
    slNo:{
        type: String,
        required: true
    },
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
        required: true
    },
    assignee:{
        type: String,
        required: true
    }
}, { collection: 'team_activities' })

let activities=module.exports=mongoose.model('activitiesModel',activitiesSchema);