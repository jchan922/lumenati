//  *********************************   //
//  *                               *   //
//  *          USER MODELS          *   //
//  *                               *   //
//  *********************************   //

console.log('Server>Models>user.js is running!!'.blue);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var UserSchema = new mongoose.Schema({
    first_name: {type:String, required:true},
    last_name: {type:String, required:true},
    username: {type:String, required:true},
    email: {type:String, required:true},
    password: {type:String, required:true, minlength:8},
    markers: [{type:Schema.Types.ObjectId, ref:'Marker'}],
    groups: [{type:Schema.Types.ObjectId, ref:'Group'}]
}, {timestamps:true});

// register the schema as a model
var user = mongoose.model('User', UserSchema);
