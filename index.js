const express = require('express');
const path=require('path');
const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost:27017/teamDB');
let db=mongoose.connection;

//check for DB errors
db.on('error',function(err){
    console.log(err)
})

//check for connection
db.once('open',function(){
    console.log('connected to mongo db')
})

//bring in models
let teamActivities=require('./models/activitiesCollection');

//init app
const app= express();

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set ('view engine','pug')

//home route
app.get('/',function(req,res){
    res.render('home',{
        varSection:"Home",
        project: "Automation and Performance team activity tracking"
    })
});

//add route
app.get('/dashboard',function(req,res){
    teamActivities.find({},function(err,activitiesList){
        if(err){
            console.log(err)
        }else{
            res.render('dashboard',{
                varSection:"Dashboard",
                activities:activitiesList
            })
        }
    })
    
})

app.listen(3000,function(){
    console.log('Server started on port 3000......')
})