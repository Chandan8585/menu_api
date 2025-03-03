const express = require('express');
const { userAuth } = require('../../middlewares/userAuth');
// const User = require('../../models/user');
const profileRouter = express.Router();

profileRouter.get("/view", userAuth, async (req, res)=>{
        try {
            const {user} =await req.user;
            
            res.send(user);
        } catch (error) {
            throw new Error("Something went wrong");
        }
});


module.exports = {profileRouter};