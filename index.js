const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const  {mongoose} = require('./db.js');
const  employeeController = require('./controller/employeeController.js');
const  userController = require('./controller/userController.js')
var app = express();
app.use(bodyParser.json());

app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(4000,()=>{
    console.log('Server started ')
});

app.use('/employees', employeeController); 
app.use('/users', userController);