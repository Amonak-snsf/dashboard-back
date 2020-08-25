const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var employeSchema = new Schema({
    name: {type: String, required:true},
    function: {type: String, required:true},
    department: {type: String, required:true},
    project: {type: String, required:true},
    salary: {type: Number, required:true},
});
var Employee = mongoose.model('Employee',employeSchema);
module.exports = {Employee} ;