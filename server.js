// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var Employee   = require('./app/model/employee');
// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8989;        // set our port

var mongoose   = require('mongoose');
mongoose.connect('mongodb://localhost:27017/mern-api'); // connect to our database

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

router.route('/employees')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {

        var employee = new Employee();      // create a new instance of the Bear model
        employee.name = req.body.name;
        employee.designation = req.body.designation;
        employee.salary = req.body.salary;
        employee.dateOfJoining = req.body.dateOfJoining;

        // save the employee and check for errors
        employee.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Employee created!' });
        });

    });
// more routes for our API will happen here

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Running at port ' + port);
