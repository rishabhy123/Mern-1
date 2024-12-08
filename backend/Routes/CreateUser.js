 const express = require('express');
 const { check, validationResult } = require('express-validator');
const router = express.Router();
 const User = require("../models/User");
 const bcrypt = require("bcryptjs");
 router.post("/createuser",[
     check('name', 'Name length should be 10 to 20 characters')
                     .isLength({ min: 1, max: 20 }),
    check('email', 'Email length should be 10 to 30 characters')
                    .isEmail().isLength({ min: 10, max: 30 }),
    check('location', 'Name length should be 10 to 20 characters')
    .isLength({ min: 4, max: 20 }),
    check('password', 'Password length should be 8 to 10 characters')
                    .isLength({ min: 5, max: 10 })
], async(req,res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(req.body.password, salt);
    try {
      await User.create({
            name:req.body.name,
            location:req.body.location,
            email:req.body.email,
            password:securePassword
        })
    res.json({success:true});
    } catch (error) {
        console.log(error);
        res.json({success:false});
    }
 })
 module.exports = router;