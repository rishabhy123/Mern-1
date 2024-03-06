const express = require('express');
const { check, validationResult } = require('express-validator');
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const privacyJwt = "Hithisissomethingokokthisissomething$!"

router.post("/loginuser", [
    check('email', 'Email length should be 10 to 30 characters').isEmail().isLength({ min: 10, max: 30 }),
    check('password', 'Password length should be 5 to 10 characters').isLength({ min: 5, max: 10 })
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
        const userData = await User.findOne({ email: email });

        if (!userData) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }
        const psCompare = await bcrypt.compare(password, userData.password);
        if (!psCompare) {
            return res.status(400).json({ success: false, error: "Invalid email or password" });
        }
        const data = {
            user:{
                id:userData.id
            }
        }
        const authToken = jwt.sign(data,privacyJwt);
        return res.json({ success: true, authToken:authToken });
    } catch (error) {
        console.error("Login error:", error.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
});

module.exports = router;
