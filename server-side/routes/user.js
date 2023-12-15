
const express = require("express");
const User = require("../models/user.js");
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');

const router = express.Router();
router.post('/register', async (req, res) => {
    try {
        const { university,rollNo, username, password, gmail } = req.body;
        // const admin=await User.findOne({university});
        // if(admin){
        // return res.json({message :'University has already registered'});
        // }
        const requiredFields = ['university','rollNo', 'username', 'password', 'gmail'];
        const missingFields = requiredFields.filter(field => !req.body[field]);

        if (missingFields.length > 0) {
            return res.json({ message: 'fields are required', missingFields });
        }

        const unique=await User.findOne({username});
        if(unique){
            return res.json({message :'Username already exist.'});
        }
        const unique1=await User.findOne({gmail});
        if(unique1){
            return res.json({message :'Duplicate key for gmail'});
        }
        const passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/;
        if (!passwordRegex.test(password)) {
            return res.json({message :'Password must contain at least one capital letter, one number, and one special character(!@#$%^&*)'});
        }
        //password should have atleast one capital letter , number and one special character
        const newUser = new User({ university,rollNo, username, password, gmail });
        console.log(newUser);
        const savedUser = await newUser.save();
        
        res.status(201).json({
            message: 'User registered successfully.',
            data: savedUser  
        });
    } catch (error) {
        console.error('Error during registration:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/login',async(req,res) =>{
    const { username, password }=req.body;
    const fetchuser=await User.findOne({username});
    if(!fetchuser){
        return res.json({message :'Username does not exist'});
    }
    const isPassword = await bcrypt.compare(password,fetchuser.password);
    if(!isPassword){
        return res.json({message :"password is incorrect"});
    }
    
    const token =jwt.sign({id :fetchuser._id},'secret');
    
    res.json({token,adminID:fetchuser._id});
});

module.exports = router;
