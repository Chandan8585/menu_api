const express = require('express');
const User = require('../models/user');
const validateSignup = require('../utils/validateSignup');
const authRouter = express.Router();
const bcrypt = require('bcrypt');
const { userAuth } = require('../middlewares/userAuth');
require("dotenv").config();
const jwt = require("jsonwebtoken");

authRouter.post('/signup', async(req, res)=>{ 
    try { 
        const isUserDataSafe = await validateSignup(req);
        if(isUserDataSafe){
            const {email, password, firstName, lastName} = req.body;
            // const hashedPassword =await bcrypt.hash(password, 10);
             
            const userObject = {
                firstName, 
                lastName,
                email,
                password
            };
            const newUser = new User(userObject);
          await newUser.save();
          res.send("user Added successfully");
          
        }else{
            res.send("user details invalid hai");
        }
    }
      catch (error) {
        res.status(401).send(error.message);
      
    }
})

authRouter.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Login attempt for email:", email);

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            console.log("User not found!");
            return res.status(400).json({ message: "User not found. Please sign up first." });
        }

        console.log("User found:", user);

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        console.log("Password validation result:", isPasswordValid);

        if (!isPasswordValid) {
            console.log("Incorrect password!");
            return res.status(400).json({ message: "Incorrect password." });
        }

        // Generate JWT token
       
        const token = jwt.sign({ _id: user._id, email: user.email }, process.env.JWT_KEY, { expiresIn: "1d" });
        console.log("JWT Token generated:", token);

    
        res.cookie("token", token, {
            httpOnly: true,  
            secure: process.env.NODE_ENV === "production", 
            sameSite: "strict", // Prevents CSRF attacks
            maxAge: 24 * 60 * 60 * 1000 // 1 day
        });
        res.status(200).json({ message: "Login successful!"});
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: "Server error. Please try again later." });
    }
});



authRouter.post('/logout', async(req , res)=>{
    try {
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("Logout Successfull!!!");
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.post('/forgotPassword', async(req , res)=>{
    try {
        res.cookie("token", null, {expires: new Date(Date.now())});
        res.send("Logout Successfull!!!");
    } catch (error) {
        res.status(401).send(error.message);
    }
});

authRouter.get('/verify', userAuth ,async (req, res)=> {
      try {
        req.user.isVerifed = true;
      } catch (error) {
        res.status(500).send("Failed to verify the user.");
      }
}) 



module.exports = authRouter;