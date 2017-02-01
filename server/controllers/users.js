// console.log('Server>Controllers>users.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User")

module.exports = {

// REGISTER USER INTO BATABASE ===============================================================================
    register: function(req,res){
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
                    registerUser.save(function(err, user){
                        if (err) {
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
                        res.sendStatus(200);
                    }
                });
            }
        })
    },

// LOGIN CHECK FROM DATABASE TO FRONT END ====================================================================
    login: function(req,res){
        var errors = {errors:{
            general:{message:"Invalid login information"}
            }
        }
        User.findOne({username:req.body.username}).populate("groups").populate("markers").exec(function(err, user){
            if(!req.body.username||!req.body.password||!user){
                res.json(errors);
            }else{
                if(!user.validatePassword(req.body.password)){
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
                    res.json(user);
                }
            }
        })
    },

// LOGOUT FROM DATABASE TO FRONT END ====================================================================
    logout: function(req,res){
        req.session.destroy(function(err){
            if(err){
                res.sendStatus(401);
            } else {
                res.sendStatus(200);
            }
        })
    },

// GRAB SESSION USERS INFORMATION ===========================================================================
    sessionUser: function(req,res){
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
                res.json(session_user);
            }
        })
    },
}
