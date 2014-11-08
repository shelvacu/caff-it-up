/**
 * Module dependencies.
 */

var express = require('express'),
	http = require('http'),
	path = require('path'),
	settings = require('./settings.json');

var app = express();

///////////
// setup //
///////////

// using the settings file you can change the port number
app.set('port', process.env.PORT || settings.port_number);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'twig');

app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);

// Protip put all of the static data in the public folder
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
	app.use(express.errorHandler());
}

////////////
// Routes //
////////////

// Put all of your routes in the index.js file
require('./routes')(app);


//////////////////////
// Start the Server //
//////////////////////

http.createServer(app).listen(app.get('port'), function() {
	console.log('Express server listening on port ' + app.get('port'));
});