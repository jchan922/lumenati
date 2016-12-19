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
                        user.groups.push(newGroup)
                        user.save(function(err){
                            if(err){
                                res.json(err);
                            } else {
                                res.sendStatus(200)
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







}
