const { check, validationResult } = require('express-validator');
const bcrypt=require('bcryptjs')
const passport=require('passport')

//bring in models
let teamUsers=require('../models/usersCollection');

module.exports=function(app){
    app.get('/register',function(req,res){
        res.render('register')
    })

    app.post('/register',
    [
        check('name','Name field should not be empty').not().isEmpty(),
        check('email','Email  field should not be empty').isEmail(),
        check('username','Username field should not be empty').not().isEmpty(),
        check('password','Password field should not be empty').not().isEmpty(),
        check('cpassword','Confirm password field should not be empty').not().isEmpty()
    //    check('cpassword','Password and confirm password should match').equals(req.body.password)
    ],    
    function(req,res){

        const name=req.body.name
        const email=req.body.email
        const username=req.body.username
        const password=req.body.password
        const cpassword=req.body.cpassword

        let errors=validationResult(req);

        if(!errors.isEmpty()){
            res.render('register',{
                varSection:"Register",
                errors:errors.errors
                
            })
        }else{

            let newUser= new teamUsers({
                name:name,
                email:email,
                username:username,
                password:password
            })

            bcrypt.genSalt(10,function(err,salt){
                bcrypt.hash(newUser.password,salt,function(err,hash){
                    if(err){
                        console.log(err)
                    }
                    newUser.password=hash
                    newUser.save(function(err){
                        if(err){
                            console.log(err)
                            return
                        }else{
                            req.flash('success','You have successfully registered and you can now log in')
                            res.redirect('/')
                        }
                    })
                      
                })
            })
        }        
    })
    app.post('/',function(req,res,next){
        passport.authenticate('local',{
            successRedirect:'/dashboard',
            failureRedirect:'/',
            failureFlash:true
        })(req,res,next)
    })

    app.get('/logout',function(req,res){
        req.logout()
        req.flash('success','You are logged out')
        res.redirect('/')
    })
}