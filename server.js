// server.js

    console.log("< Info > Start up ");

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var mongodb = require('mongodb');                       // pure mongo
    var MongoClient = mongodb.MongoClient;

    // Express4 Special
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    // Mongoose Block


    //mongoose.connect('mongodb://node:nodeuser@mongo.onmodulus.net:27017/uwO3mypu');     // connect to mongoDB database on modulus.io
    mongoose.connect('mongodb://localhost/test');
    var db = mongoose.connection;
     db.on('error', function() {
        // we're connected!
        console.log (" mongoose we're NOT connected!");
    });
    db.once('open', function() {
        // we're connected!
        console.log (" mongoose we're connected!");

        var Schema = mongoose.Schema;

        // create a schema
        var userSchema = new Schema({
             name: String
        });
        var User = mongoose.model('movie', userSchema);

        // get all the users
        User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);
        });

        // get the user starlord55
    User.find({ username: 'tutorials point' }, function(err, user) {
    if (err) throw err;

    // object of the user
    console.log("Mongo Object : " + user);
    });


    });

     // Mongoose Block
    

    // Mongo Block
/*
    var url = 'mongodb://localhost:27017/test'; // Connection URL. This is where your mongodb server is running.
    MongoClient.connect(url, function (err, db) { // Use connect method to connect to the Server
    if (err) {
      console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
      console.log('< Mongo > Connection established to', url);
      var collection = db.collection('movie');         // Get the documents collection
      var cursor = collection.find({name: 'tutorials point' });        //We have a cursor now with our find criteria
      cursor.each(function (err, doc) {             //Lets iterate on the result
      if (err) {
        console.log(err);
      } else {
        console.log('Fetched:', doc);
      }
    });
  }
  }); */
 // Mongo Block

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