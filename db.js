const mongoose = require('mongoose');
const cors =require('cors');

const uri="mongodb://localhost:27017/CrudBD"
mongoose.connect(uri,{useNewUrlParser: true, useUnifiedTopology:true},(err)=>{
    if(!err) 
       console.log("Mongo Data base connected successfuly");
    else
    console.log('error in  DB connection:'  +json.stringify(err, underfined, 2));
});

module.exports = mongoose;