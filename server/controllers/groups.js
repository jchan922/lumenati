var mongoose = require("mongoose");
var Group = mongoose.model("Group")
var User = mongoose.model("User")
var Marker = mongoose.model("Marker")

module.exports = {

// GET CURRENT GROUP INFO ===============================================================================
    groupInfo: function(req,res){
        Group.findOne({_id: req.params._id}).populate('markers').populate('groups').exec(function(err,foundGroup){
            if(!foundGroup){
                var errors = {errors:{
                    general:{message:"Invalid group information."}
                    }
                }
                res.json(errors);
            } else {
                res.json(foundGroup)
            }
        })
    },


// REGISTER NEW GROUP INTO BATABASE ===============================================================================
    create: function(req,res){
        var newGroup = new Group(req.body)
        var currentUser = req.session.user._id
        newGroup._creator = currentUser
        newGroup.members.push(currentUser)
        newGroup.save(function(err, group){
            if (err) {
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
                            }
                        })
                    }
                })
            }
        })
    },

// JOIN EXISTING GROUP INTO BATABASE ===============================================================================
    join: function(req,res){
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

// CHANGE GROUP STATUS ===============================================================================
    status_change: function(req,res){
        Group.findOne({_id: req.params._id}).exec(function(err,foundGroup){
            if(!foundGroup){
                var errors = {errors:{
                    general:{message:"Invalid group information."}
                    }
                }
                res.json(errors);
            } else {
                foundGroup.status = req.body.comment
                foundGroup.save(function(err, foundGroup){
                    if (err) {
                        res.json(err);
                    } else {
                        res.json(foundGroup.status);
                    }
                })
            }
        })
    },


}
