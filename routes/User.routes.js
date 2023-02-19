const express = require('express');
const {UserModel}  = require("../model/User.model")
const userRouter = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require('bcrypt');
userRouter.post("/register" , async(req , res)=>{
    const {name ,email, pass} = req.body
    try{
        bcrypt.hash(pass, 5 ,async (err, hash)=> {
            const user = new UserModel({name, email, pass:hash})
            await user.save().then((res)=> res.redirect("/"))

            res.send({"msg":"User has registred successfully"}) 
        });
    }catch(err){
        res.send({"msg":"Something went wrong","err":err.message})
    }
} )

userRouter.post("/login" , async(req , res)=>{
    const {email, pass} = (req.body)
    
    try{
     const user = await UserModel.find({email})
     if(user.length>0){
        bcrypt.compare(pass, user[0].pass, function(err, result) {
            // result == true
           if(result){
            let token = jwt.sign({userId:user[0]._id }, "masai")
            res.send({"msg":"User has Loggined successfully" , "token":token})
           }else {
            res.send({"msg":"Something went wrong"})
           }
        });
         
     }else {
        res.send({"msg":"Something went wrong","err":err.message})
     }
    }catch(err){
        res.send({"msg":"Something went wrong","err":err.message})
      
    }

} )

module.exports = {userRouter};