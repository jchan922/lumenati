//  *********************************   //
//  *                               *   //
//  *     CONNECTS TO DATABASE      *   //
//  *                               *   //
//  *********************************   //
// console.log('Server>Config>mongoose.js is running!!'.blue);

// This file is complete other than changing our DB
var mongoose      = require('mongoose'),
// require file-system so that we can load, read, require all of the model files
    fs            = require('fs'),
// utilize path for easy dir/file joining
    path          = require('path'),
// Dir where our models are located
    models_path   = path.join( __dirname, "../models"),
//  Regular expression that checks for .js extension
    reg           = new RegExp( ".js$", "i" ),
// database information
    dbURI         = 'mongodb://localhost/lumenati';
// Connect to the database
mongoose.connect( dbURI );

/*
*  CONNECTION EVENTS
*  When successfully connected
*/
mongoose.connection.on( 'connected', function () {
    console.log( `Mongoose default connection open to ${ dbURI }`.green );
});

mongoose.connection.on( 'error', function ( err ) {
    console.error( `Mongoose default connection error: ${ err }`.red );
});

mongoose.connection.on( 'disconnected', function () {
    console.log( 'Mongoose default connection disconnected'.red );
});

process.on( 'SIGINT', function() {
    mongoose.connection.close( function () {
        console.log( 'Mongoose default connection disconnected through app termination'.red );
        process.exit( 0 );
    });
});

fs.readdirSync( models_path ).forEach( function( file ) {
    if( reg.test( file ) ) {
        require( path.join( models_path, file ) );
    }
});
