import jwt from "jsonwebtoken"
import User from "../models/userModel.js"
import cookieParser from "cookie-parser";
import express from "express";

const authenticate =async(req,res,next) => {

   const token = req.cookies["jwt"]

      if (!token) {return res.status(403).send("A token is required for authentication");
        } 
    try { 

      const decoded = jwt.verify(token, process.env.SECRET_KEY);

         const rootUser = await User.findOne({_id:decoded._id, "token:token":token})

         if(!rootUser){
            throw new Error("User Not Found")
         }
          req.verify = decoded;
          req.role = rootUser.role
          return next();
        } catch (err) {
            return res.status(401).send("Invalid Token");
        }};
      
export default authenticate