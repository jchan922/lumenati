// REQUIRE MODULES =======================================================================
var mongoose = require( "mongoose" ),
    express  = require( "express" ),
    bp       = require( "body-parser"),
    path     = require( "path" ),
    colors   = require( "colors"),
    session  = require( "express-session")
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();



// LOCATE CLIENT AND BOWER ================================================================
app.use(express.static(path.join( root, 'client' )));
app.use(express.static(path.join( root, 'bower_components' )));
app.use(express.static(path.join( root, 'node_modules' )));

// USE BODY PARSER ========================================================================
app.use(bp.urlencoded({ extended: true }));
app.use(bp.json());

// USE SESSION ============================================================================
var sessionConfig = {
    secret:'CookieMonster', // Secret name for decoding secret and such
    resave:false, // Don't resave session if no changes were made
    saveUninitialized: true, // Don't save session if there was nothing initialized
    name:'myCookie', // Sets a custom cookie name
    cookie: {
        secure: false, // This need to be true, but only on HTTPS
        httpOnly:false, // Forces cookies to only be used over http
        maxAge: 3600000
    }
}
// Use session with our app
app.use(session(sessionConfig));

// USE MIDDLEWARE =========================================================================
app.use(function(req,res,next){
    next();
})

// LOCATE MONGOOSE.JS FILE ================================================================
require('./server/config/mongoose.js');

// LOCATE ROUTES.JS FILE ==================================================================
var routes_setter = require('./server/config/routes.js');
// invoke the function stored in routes_setter and pass in the "app" variable
routes_setter(app);

// SERVER LISTEN ==========================================================================
var server = app.listen(port, function() {
    console.log("SERVER.JS is working!!".green)
})
