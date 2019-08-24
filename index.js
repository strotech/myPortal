const express = require('express');
const path=require('path');
const mongoose=require('mongoose');
const bodyParser=require('body-parser');
const flash=require('connect-flash')
const session=require('express-session')
const passport=require('passport')

const activityRoutes=require('./routes/activity.js')
const userRoutes=require('./routes/user.js')
const config=require('./appConfig/appDatabase.js')

mongoose.connect(config.database);
let db=mongoose.connection;

//check for DB errors
db.on('error',function(err){
    console.log(err)
})

//check for connection
db.once('open',function(){
    console.log('connected to mongo db')
})



//init app
const app= express();

//load view engine
app.set('views',path.join(__dirname,'views'));
app.set ('view engine','pug')

//Body parser middleware
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
//parse application/json
app.use(bodyParser.json())

//Set public folder
app.use(express.static(path.join(__dirname,'public')))

//Express session Middleware
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
//    cookie: { secure: true }
  }))

//Express messages Middleware
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

//Passport config
require('./appConfig/appPassport')(passport)

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

app.get('*',function(req,res,next){
    //Setting the user GLOBAL variable
    res.locals.user=req.user||null
    next()
})

//home route
app.get('/',function(req,res){
    res.render('home',{
        varSection:"Home",
        project: "Activity tracking"
    })
});

activityRoutes(app);
userRoutes(app);

app.listen(3001,function(){
    console.log('Server started on port 3001......')
})