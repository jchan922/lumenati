//  *********************************   //
//  *                               *   //
//  *          USER MODELS          *   //
//  *                               *   //
//  *********************************   //

console.log('Server>Models>user.js is running!!'.blue);
var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
const saltRounds = 10;
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

// BCYRPT METHODS ====================================================================
UserSchema.methods.generateHash = function(password) {
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

UserSchema.methods.validatePassword = function(password) {
    var test = bcrypt.compareSync(password, this.password);
    return test
}

// register the schema as a model
var user = mongoose.model('User', UserSchema);
