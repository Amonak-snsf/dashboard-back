
const {ObjectId}= require('bson')

const express = require('express');
var router = express.Router();


var { Employee } = require('../models/employee');

router.get('/', (req, res)=>{
    Employee.find((err, docs)=>{
        if (!err) { res.send(docs);}
        else { console.log('error in Retriving Employees :' +json.stringify(err, underfined, 2));}
    });
}); 
router.get('/:id', (req, res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id :' +req.params.id);

    Employee.findById(req.params.id,(err,doc)=>{
        if(!err) res.send(doc);
        else console.log('Error in Retriving Employee:' +json.stringify(err, undefined, 2)); });
});

router.put("/:id",(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id :' +req.params.id);

    var emp = {
        name: req.body.name,
        function: req.body.function,
        department: req.body.department,
        project: req.body.project,
        salary: req.body.salary,
    };
    Employee.findByIdAndUpdate(req.params.id,{ $set: emp }, { new: true },(err,doc)=>{
        if(!err) res.send("Employee updated successfuly");
        else console.log('Error in  Employee Update:' +json.stringify(err, undefined, 2)); })
        
});

router.delete("/:id",(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id :' +req.params.id);

    Employee.findByIdAndDelete(req.params.id,(err)=>{
        if(!err) res.send("Employee deleted successfuly");
        else console.log('Error in Employee Deleted:' +json.stringify(err, undefined, 2)); })
        
});

router.post('/', (req, res) =>{
    var emp = new Employee({
        name: req.body.name,
        function: req.body.function,
        department: req.body.department,
        project: req.body.project,
        salary: req.body.salary,
    });
    emp.save( (err, doc) =>{
        if (!err) { res.send(doc);}
        else { console.log('error in Retriving Employees :' +json.stringify(err, underfined, 2));}

    });
});

module.exports = router;