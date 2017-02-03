// console.log('Server>Controllers>users.js is running!!'.blue);

var mongoose = require("mongoose");
var User = mongoose.model("User");
var Marker = mongoose.model("Marker");
var Group = mongoose.model("Group");

module.exports = {

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
        } else {
            User.findOne({_id:req.session.user._id}).exec(function(err, user){
                addGroupMarker._creator = user._id;
                addGroupMarker.save(function(err){
                    if(err){
                    } else {
                        user.markers.push(addGroupMarker);
                        user.save(function(err,user){
                            if(err){
                                res.json(err);
                            } else {
                                Group.findOne({_id:req.params._id}).exec(function(err,group){
                                    if(err){
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
        Group.findOne({_id:req.params._id}).populate('markers').populate('members').exec(function(err,markers){
            if(err){
                res.json(err);
            } else {
                res.json(markers);
            }
        })
    }


}
