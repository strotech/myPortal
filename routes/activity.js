const { check, validationResult } = require('express-validator');

//bring in models
let teamActivities=require('../models/activitiesCollection');

module.exports=function(app){
    //dashboard route
    app.get('/dashboard',ensureAuthenticated,function(req,res){
        teamActivities.find({},function(err,activitiesList){
            if(err){
                console.log(err)
            }else{
                res.render('dashboard',{
                    varSection:"Dashboard",
                    activities:activitiesList,
                    user:req.user.name
                })
            }
        })
        
    })

    //post route - dashboard
    app.post('/dashboard',
    [
        check('activity','Activity field should not be empty').not().isEmpty(),
        check('start_date','Start date  field should not be empty').not().isEmpty(),
        check('end_date','End date field should not be empty').not().isEmpty(),
        check('status','Status field should not be empty').not().isEmpty(),
        check('assignee','Assignee field should not be empty').not().isEmpty()
    ],
    function(req,res){    

        let errors=validationResult(req);

        if(!errors.isEmpty()){
            console.log(errors.errors)
            teamActivities.find({},function(err,activitiesList){
                if(err){
                    console.log(err)
                }else{
                    res.render('dashboard',{
                        errors:errors.errors,
                        varSection:"Dashboard",
                        activities:activitiesList
                    })
                }
            })    
        }else{

            async function db_save(){
                        
                let activity=new teamActivities();
                    
                activity.activity=req.body.activity
                activity.createdDate=Date(Date.now()).toString();
                activity.startDate=req.body.start_date
                activity.endDate=req.body.end_date
                activity.status=req.body.status
                activity.remarks=req.body.remarks
                activity.assignee=req.body.assignee
        
                activity.save(function(err){
                    if(err){
                        console.log(err);
                        res.render('error');
                        
                    }
                    req.flash('success','Activity added')
                    res.redirect('/dashboard')
                })
            }
            db_save();
        
            
            return
        }

        
    })

    //edit route - GET
    app.get('/edit/:activityId',ensureAuthenticated,function(req,res){

        teamActivities.findById(req.params.activityId,function(err,activity){
            res.render('edit_activity',{
                varSection:"Edit Activity",
                activity:activity
            })
        })

    })

    //edit route [update] - POST
    app.post('/edit/:activityId',function(req,res){
        let activity={}
        activity.activity=req.body.desc
        activity.status=req.body.status

        let query={_id:req.params.activityId}

        teamActivities.update(query,activity,function(err){
            if(err){
                console.log(err);
                res.render('error');
            }else{
                res.redirect('/dashboard')
            }
        })


    })
        
    
    //delete route - AJAX
    app.delete('/edit/:activityId',function(req,res){

        if(!req.user._id){
            res.status(500).send()
        }else{
            let query={_id:req.params.activityId}

            teamActivities.remove(query,function(err){
                if(err){
                    console.log(err);
                    res.render('error');
                }else{
                    res.redirect('/dashboard')
                }
            })
        }


    })

    function ensureAuthenticated(req,res,next){
        if(req.isAuthenticated()){
            next()
        }else{
            req.flash('danger','Please login')
            res.redirect('/')
        }
    }
}