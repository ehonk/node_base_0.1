// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb

    // Express4 Special
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    //mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());




    // define model =================
    /* var Todo = mongoose.model('Todo', {
        text : String
    });
    */


    // routes ======================================================================
    // api ---------------------------------------------------------------------
    // get = Anfrage auf ein Element // HTML Page Aufruf via URL-----------------------

    app.get('/', function(req, res) {       // This will load the single index.html file when we hit localhost:8080
        console.log ("< Info > GET Slash Call");  
         res.sendFile(__dirname + '/public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });

    app.get('/overview', function(req, res){   console.log ("< Info >  GET /overview");  }); 
    app.get('/api/todos', function(req, res) { console.log ("< Info >  GET /api/todos");  });



    // post = Ausgabe eines Element // HTML Button Aufruf e.g. ------------------------------------------------
    // create todo and send back all todos after creation
    app.post('/api/todos', function(req, res) {
        console.log (" POST /api/todos");
    });


        // listen (start app with node server.js) ======================================
    if (!module.parent) {
    app.listen(8080);
    console.log('++++++++++++++++  node server running +++++++++++++++++++');
    console.log("App listening on port 8080");
    console.log("< Info > NodeJS Version: " + process.version);
    }