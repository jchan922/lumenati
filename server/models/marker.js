
//  *************************************   //
//  *                                   *   //
//  *          MARKER MODELS            *   //
//  *                                   *   //
//  *************************************   //

console.log('Server>Models>bookmark.js is running!!'.blue);
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// BUILD USER SCHEMA ====================================================================
var MarkerSchema = new mongoose.Schema({
    title: {type:String, required:true},
    address: {type:String, required:true},
    category: {type:String},
    description: {type:String},
    url: {type:String},
    latitude: {type: Number},
    longitude: {type: Number},
    _creator: {type:Schema.Types.ObjectId, ref:'User'},
}, {timestamps:true});

// register the schema as a model
var marker = mongoose.model('Marker', MarkerSchema);
