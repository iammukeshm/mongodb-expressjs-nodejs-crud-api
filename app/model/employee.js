// app/models/employee.js

var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var EmployeeSchema   = new Schema({
    name: 
    {
        type: String,
        unique:true
    },
    designation: String,
    salary : Number,
    dateOfJoining : Date
});

module.exports = mongoose.model('Employee', EmployeeSchema);