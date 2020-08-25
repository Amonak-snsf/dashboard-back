const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var userSchema = new Schema({
    images:[{
        url: String,
        contentType: String
    }],
    username: {type: String, required:true},
    status: {type: String, required:true},
    email: {type: String, required:true},
    password: {type: String, required:true},
    
});
var User = mongoose.model('User',userSchema);
module.exports = User;

