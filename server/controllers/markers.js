// console.log('Server>Controllers>users.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User")
var Marker = mongoose.model("Marker")

module.exports = {

// ADD NEW MARKER TO CURRENT USER ===========================================================================
    add: function(req,res){
        console.log("***************** Got to SERVER markers.js ADD ".yellow);
        console.log("***************** DATA TO CREATE".yellow, req.body);
        var addMarker = new Marker(req.body);

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


}
