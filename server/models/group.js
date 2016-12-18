
//  *************************************   //
//  *                                   *   //
//  *          GROUP MODELS             *   //
//  *                                   *   //
//  *************************************   //

console.log('Server>Models>bookmark.js is running!!'.blue);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var GroupSchema = new mongoose.Schema({
    name: {type:String, required:true},
    password: {type:String, minlength:8},
    public: {type:Boolean, default: false},
    members: [{type:Schema.Types.ObjectId, ref:'Member'}],
    markers: [{type:Schema.Types.ObjectId, ref:'Marker'}],
    _creator: {type:Schema.Types.ObjectId, ref:'Creator'},
}, {timestamps:true});

// register the schema as a model
var group = mongoose.model('Group', GroupSchema);
