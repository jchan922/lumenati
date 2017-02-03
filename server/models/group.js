
//  *************************************   //
//  *                                   *   //
//  *          GROUP MODELS             *   //
//  *                                   *   //
//  *************************************   //

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var GroupSchema = new mongoose.Schema({
    name: {type:String, required:true},
    password: {type:String, minlength:8},
    public: {type:Boolean, default: false},
    status: {type:String},
    members: [{type:Schema.Types.ObjectId, ref:'User'}],
    markers: [{type:Schema.Types.ObjectId, ref:'Marker'}],
    _creator: {type:Schema.Types.ObjectId, ref:'User'},
}, {timestamps:true});

// register the schema as a model
var group = mongoose.model('Group', GroupSchema);
