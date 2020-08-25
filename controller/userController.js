
const {ObjectId}= require('bson')

const express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');
let password;
bcrypt.hash(password, 8, function(err, hash) {
  
});

var  User = require('../models/user');

router.get('/', (req, res)=>{
    User.find((err, users)=>{
        if (!err) { res.send(users);}
        else { console.log('error in Retriving Users :' +json.stringify(err, underfined, 2));}
    });
}); 
router.get('/:id', (req, res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id :' +req.params.id);

    User.findById(req.params.id,(err,use)=>{
        if(!err) res.send(use);
        else console.log('Error in Retriving User:' +json.stringify(err, undefined, 2)); });
});

router.put("/:id",(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id :' +req.params.id);
    var use ={
        username:req.body.username,
        status:req.body.status,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 4),
    };

    User.findByIdAndUpdate(req.params.id,req.body,{ $set: emp }, { new: true },(err,use)=>{
        if(!err) res.send("User updated successfuly");
        else console.log('Error in  User Update:' +json.stringify(err, undefined, 2)); })
        
});

router.delete("/:id",(req,res)=>{
    if (!ObjectId.isValid(req.params.id))
    return res.status(400).send('No record with given id :' +req.params.id);

    User.findByIdAndDelete(req.params.id,(err)=>{
        if(!err) res.send("User deleted successfuly");
        else console.log('Error in User Deleted:' +json.stringify(err, undefined, 2)); })
    
});

router.post('/signin', (req, res) =>{
    const username = req.body.username;
    const password = bcrypt.hashSync(req.body.password, 4);
    var userss = [];
    User.find({username: username})
        .then(users => {
            if (!users || users === null || !users.length){
                res.status(400).json("user not found");
            }else{
                users.forEach(user => {
                    let isMatch = bcrypt.compareSync(password, user.password);
                    if (password === user.password){
                        userss.push(user);
                    }
                });
                console.log(userss)
                if(userss.length >= 1){
                    res.json(users[0]);
                }else{
                    res.status(404).json("password incorrect");
                }
            }
        }).catch(err => {
            res.status(500).json(err);
        }
    );
})

// exports.signin = (req, res) => {
//     let data = [];
//     User.find({username: req.body.username}, "-__v")
//         .then(users => {
//             if(!users || users === null || !users.length){
//                 res.status(404).json({message: "User Not found !"});
//             }else{
//                 users.forEach(user => {
//                     isMatch = bcrypt.compareSync(req.body.password, user.password);
//                     if(isMatch){
//                         data.push(user);
//                     }
//                 });
//                 if(data.length === 1){
//                     if(data[0].status === 'disabled'){
//                         res.status(401).json({message: 'Your account has not been verified.'});
//                     }else{
//                         let token = jwt.sign({ id: data[0]._id }, config.secret, {
//                             expiresIn: 86400
//                         });
    
//                         res.json({
//                             accessToken: token,
//                             user: data[0]
//                         });
//                     }
//                 }else if(data.length > 1){
//                     res.json({
//                         accessToken: null,
//                         users: data
//                     });
//                 }else{
//                     res.status(401).json({
//                         accessToken: null,
//                         message: "Invalid Password !"
//                     });
//                 }
//             }
//         }
//     );
// };




router.post('/', (req, res) =>{
    var use = new User({
        username:req.body.username,
        status:req.body.status,
        email:req.body.email,
        password:bcrypt.hashSync(req.body.password, 4),
        
    });
    use.save( (err, dov) =>{
        if (!err) { res.send(dov);}
        else { console.log('error in Retriving Users :' +json.stringify(err, underfined, 2));}

    });
});



module.exports = router;