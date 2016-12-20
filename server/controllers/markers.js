// console.log('Server>Controllers>users.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User");
var Marker = mongoose.model("Marker");
var Group = mongoose.model("Group");

module.exports = {

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SINGLE USER METHODS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

// ADD NEW MARKER TO CURRENT USER ===========================================================================
    add: function(req,res){
        // Create New Marker
        var addMarker = new Marker(req.body);
        var errorsObj = {};

        if (req.body.title.length == 0 || req.body.address.length == 0 || req.body.latitude.length == 0 || req.body.longitude.length == 0){
            var errors = {errors:{general: errorsObj}}
            if (req.body.title.length == 0 && req.body.address.length == 0 && req.body.latitude.length == 0 && req.body.longitude.length == 0) {
                errorsObj.emptyForm = "Form can't be empty! Search again."
            } else {
                if (req.body.title.length == 0) {
                    errorsObj.title = "Please enter a title!"
                }
                if (req.body.address.length == 0) {
                    errorsObj.address = "Please enter an address!"
                }
                if (req.body.latitude.length == 0 || req.body.longitude.length == 0) {
                    errorsObj.coordinates = "Coordinates not detected!"
                }
            }
            res.json(errors);
            console.log("********************* Validation errors".red);
        } else {
            User.findOne({_id:req.session.user._id}).exec(function(err, user){
                addMarker._creator = user._id;
                addMarker.save(function(err){
                    if(err){
                        res.json(err);
                    } else {
                        user.markers.push(addMarker);
                        user.save(function(err,user){
                            if(err){
                                res.json(err);
                            } else {
                                res.sendStatus(200);
                            }
                        })
                    }
                })
                console.log("***************** Marker created and added to User".green);
                console.log("Data created:".green, addMarker);
                // console.log("Current user:".green, user);
                console.log("Going back to the front-end. *****************".green);
            })
        }
    },


// SHOW ALL MARKERS TO CURRENT USER ===========================================================================
    show_all: function(req,res){
        // console.log("***************** Got to SERVER markers.js ADD ".yellow);
        // console.log("***************** DATA TO CREATE".yellow, req.body);
        User.findOne({_id:req.session.user._id}).populate('markers').exec(function(err, markers){
            if(err){
                res.json(err);
            } else {
                // console.log(markers);
                res.json(markers);
            }
        });
    },

// FILTER FOOD MARKERS OF CURRENT USER ===========================================================================
    filter_food: function(req,res){
        console.log("***************** Got to SERVER markers.js ADD ".yellow);
        Marker.find({$and: [{category:"Food"}, {_creator:req.session.user._id}]}).exec(function(err, food_markers){
            if(err){
                res.json(err);
            } else {
                res.json(food_markers);
            }
        });
    },



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// GROUP METHODS
////////////////////////////////////////////////////////////////////////////////////////////////////////////

    addGroupMarker: function(req,res){
        // Create New Group Marker
        var addGroupMarker = new Marker(req.body);
        var errorsObj = {};

        if (req.body.title.length == 0 || req.body.address.length == 0 || req.body.latitude.length == 0 || req.body.longitude.length == 0){
            var errors = {errors:{general: errorsObj}}
            if (req.body.title.length == 0 && req.body.address.length == 0 && req.body.latitude.length == 0 && req.body.longitude.length == 0) {
                errorsObj.emptyForm = "Form can't be empty! Search again."
            } else {
                if (req.body.title.length == 0) {
                    errorsObj.title = "Please enter a title!"
                }
                if (req.body.address.length == 0) {
                    errorsObj.address = "Please enter an address!"
                }
                if (req.body.latitude.length == 0 || req.body.longitude.length == 0) {
                    errorsObj.coordinates = "Coordinates not detected!"
                }
            }
            res.json(errors);
            console.log("********************* Validation errors".red);
        } else {
            User.findOne({_id:req.session.user._id}).exec(function(err, user){
                addGroupMarker._creator = user._id;
                addGroupMarker.save(function(err){
                    if(err){
                        console.log("Something went wrong in User");
                    } else {
                        user.markers.push(addGroupMarker);
                        user.save(function(err,user){
                            if(err){
                                res.json(err);
                            } else {
                                Group.findOne({_id:req.params._id}).exec(function(err,group){
                                    if(err){
                                        console.log("Something went wrong in Group");
                                        res.json(err);
                                    } else {
                                        group.markers.push(addGroupMarker)
                                        group.save(function(err){
                                            if(err){
                                                res.json(err);
                                            } else {
                                                res.sendStatus(200);
                                            }
                                        })
                                    }
                                })
                            }
                        })
                    }
                })
            })
        }
    },

    // SHOW ALL MARKERS TO CURRENT GROUP ===========================================================================
    show_group_all: function(req,res){
        Group.findOne({_id:req.params._id}).populate('markers').exec(function(err,markers){
            if(err){
                console.log("Something went wrong in Group");
                res.json(err);
            } else {
                res.json(markers);
            }
        })
    }


}
