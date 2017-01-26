// console.log('Server>Controllers>users.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User")

module.exports = {

// REGISTER USER INTO BATABASE ===============================================================================
    register: function(req,res){
        // console.log("***************** Got to SERVER users.js CREATE ".green);
        // console.log("***************** DATA TO CREATE".green, req.body);
        User.findOne({username:req.body.username}).populate("groups").populate("markers").exec(function(err, user){
            if(user){
                var errors = {errors:{
                        general:{message:"Username already exists."}
                    }}
                res.json(errors);
            } else if(req.body.password != req.body.passwordConf){
                var errors = {errors:{
                        general:{message:"Passwords must match."}
                    }}
                res.json(errors);
                } else if (req.body.first_name == undefined || req.body.last_name == undefined || req.body.email == undefined || req.body.password == undefined || req.body.passwordConf == undefined){
                    var errors = {errors:{
                        general:{message:"All fields must be filled in."}
                    }}
                    res.json(errors);
                } else {
                    var registerUser = new User(req.body);
                    registerUser.password = registerUser.generateHash(registerUser.password);
                    console.log("SALT".green,registerUser.password);
                    registerUser.save(function(err, user){
                        if (err) {
                        // console.log("There were validation errors:", err);
                        res.json(err);
                        } else {
                            req.session.user = {
                                _id: user._id,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                username: user.username,
                                email: user.email,
                                groups: user.groups,
                                markers: user.markers
                            }
                        // console.log("***************** Creating a user session. Going back to the front-end".green);
                        res.sendStatus(200);
                    }
                });
            }
        })
    },

// LOGIN CHECK FROM DATABASE TO FRONT END ====================================================================
    login: function(req,res){
        // console.log("***************** Got to SERVER users.js LOGIN ".green);
        // console.log("***************** DATA TO FIND".green, req.body);
        var errors = {errors:{
            general:{message:"Invalid login information"}
            }
        }
        User.findOne({username:req.body.username}).populate("groups").populate("markers").exec(function(err, user){
            if(!req.body.username||!req.body.password||!user){
                res.json(errors);
            }else{
                if(!user.validatePassword(req.body.password)){
                    console.log("VALIDATE".green,user.password);
                   res.json(errors);
                } else {
                    req.session.user = {
                        _id: user._id,
                        first_name: user.first_name,
                        last_name: user.last_name,
                        username: user.username,
                        email: user.email,
                        groups: user.groups,
                        markers: user.markers
                    }
                    // console.log("***************** Found a match. Creating a user session. Going back to the front-end.".green);
                    // console.log(req.session.user);
                    res.json(user);
                }
            }
        })
    },

// LOGOUT FROM DATABASE TO FRONT END ====================================================================
    logout: function(req,res){
        // console.log("***************** Got to SERVER users.js LOGOUT ".red);
        req.session.destroy(function(err){
            if(err){
                res.sendStatus(401);
            } else {
                console.log("**** LOGGED OUT! Session is now empty:".red, req.session);
                res.sendStatus(200);
            }
        })
    },

// GRAB SESSION USERS INFORMATION ===========================================================================
    sessionUser: function(req,res){
        // console.log("***************** Got to SERVER users.js DASHBOARD ".yellow);
        // console.log("***************** DATA TO FIND".yellow, req.session.user);
        User.findOne({_id:req.session.user._id}).populate("groups").exec(function(err, user){
            if(err){
                res.sendStatus(401);
            } else {
                var session_user = {
                    _id: user._id,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                    email: user.email,
                    groups: user.groups
                }
                // console.log("***************** Found a match. Gathering user info. Going back to the front-end.".yellow);
                // console.log("Session user:".green,session_user);
                // console.log("Going back to the front-end. *****************".yellow);
                // console.log(session_user);
                res.json(session_user);
            }
        })
    },
}
