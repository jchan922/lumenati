var mongoose = require("mongoose");
var Group = mongoose.model("Group")
var User = mongoose.model("User")
var Marker = mongoose.model("Marker")

module.exports = {

// REGISTER NEW GROUP INTO BATABASE ===============================================================================
    create: function(req,res){
        console.log("***************** Got to SERVER users.js CREATE ".green);
        console.log("***************** DATA TO CREATE".green, req.body);
        var newGroup = new Group(req.body)
        var currentUser = req.session.user._id
        newGroup._creator = currentUser
        newGroup.members.push(currentUser)
        newGroup.save(function(err, group){
            if (err) {
                console.log("There were validation errors:", err);
                res.json(err);
            } else {
                User.findOne({_id:req.session.user._id}).exec(function(err,user){
                    if(err){
                        res.json(err)
                    } else {
                        user.groups.push(newGroup._id)
                        user.save(function(err){
                            if(err){
                                res.json(err);
                            } else {
                                res.json(newGroup)
                                console.log("***************** Group created and added to User".green);
                                console.log("Group created:".green, newGroup);
                                console.log("Going back to the front-end. *****************".green);
                            }
                        })
                    }
                })
            }
        })
    },

// JOIN EXISTING GROUP INTO BATABASE ===============================================================================
    join: function(req,res){
        console.log("***************** Got to SERVER users.js CREATE ".green);
        console.log("***************** DATA TO CREATE".green, req.body);
        Group.findOne({name: req.body.name}).exec(function(err,foundGroup){
            if(!foundGroup || req.body.password != foundGroup.password){
                var errors = {errors:{
                    general:{message:"Invalid group information."}
                    }
                }
                res.json(errors);
            } else {
                foundGroup.members.push(req.session.user._id)
                foundGroup.save(function(err, foundGroup){
                    if (err) {
                        console.log("There were validation errors:", err);
                        res.json(err);
                    } else {
                        User.findOne({_id:req.session.user._id}).exec(function(err,user){
                            if(err){
                                res.json(err)
                            } else {
                                user.groups.push(foundGroup._id)
                                user.save(function(err){
                                    if(err){
                                        res.json(err);
                                    } else {
                                        res.json(foundGroup)
                                        console.log("***************** Group joined and added to User".green);
                                    }
                                })
                            }
                        })
                    }
                })
            }
        })
    },

// GET LAST MARKER CREATED FOR GROUP INTO BATABASE ===============================================================================
    lastmarker: function(req,res){
        Group.findOne({_id: req.params._id}).populate('markers').exec(function(err,foundGroup){
            if(!foundGroup){
                var errors = {errors:{
                    general:{message:"Invalid group information."}
                    }
                }
                res.json(errors);
            } else {
                var lastMarker = foundGroup.markers[foundGroup.markers.length-1]
                res.json(lastMarker)
            }
        })
    },




}
