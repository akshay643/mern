import express, { json, Router } from "express"
import { appendFile } from "fs"
import connectDB from "../config/db.js"
import dotenv from "dotenv";
import User from "../models/userModel.js"
const authRouter = express.Router()
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import authenticate from "../middleware/authenticate.js";
// for connection with DB
import asyncHandler from "express-async-handler";
import cookieParser from "cookie-parser";
dotenv.config()
connectDB()


// ==================Ms Login===================

// import passport from "passport";
// import { OIDCStrategy } from "passport-azure-ad";

// passport.use(new OIDCStrategy({
//     identityMetadata: 'https://login.microsoftonline.com/f5be0725-a81a-4f8c-9123-060e9ec64afb/.well-known/openid-configuration',
//     // identityMetadata: 'https://login.microsoftonline.com/f5be0725-a81a-4f8c-9123-060e9ec64afb/v2.0/.well-known/openid-configuration',
//     clientID: process.env.CLIENT_ID,
//     responseType: 'code id_token',
//     responseMode: 'query',
//     redirectUrl: 'http://localhost:3000',
//     clientSecret: process.env.CLIENT_SECRET,
//     allowHttpForRedirectUrl: true,
//     // passReqToCallback: false,
//     scope: ['openid', 'profile', 'user.read']
// }
// // , (iss, sub, profile, accessToken, refreshToken, done) => {
//     // Handle the user's authenticated profile
// ));


// authRouter.get('/auth/microsoft', passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }), (req, res) => {
//     // Successful authentication, redirect home.
//     console.log(req)
//     res.redirect('/');
// });

// authRouter.post('/auth/microsoft/callback', passport.authenticate('azuread-openidconnect', { failureRedirect: '/login' }), (req, res) => {
//     // Successful authentication, redirect home.
//     res.redirect('/');
// });




// ==================Ms Login===================
// ==================Registration route ==================

authRouter.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "YOUR-DOMAIN.TLD"); 
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type,Accept");
    next();
  });


authRouter.post('/register', async(req,res)=> {
    const {name, email, password,phone,role} = req.body
    if(!name || !email || !password || !phone || !role){
        return res.status(422).json({error:"Empty Fields"})
    }

    try{
        const userExist =  await User.findOne({email:email}) //check if email is already availble in the table
        
        if(userExist){
            return res.json({message:"already exist"})
        }
    
        const newUser = new User({name, email, password:bcrypt.hashSync(password,10),phone, role})

        await newUser.save()
    
        res.status(201).json({message:"successfully registered"})
    
    }
    
   catch(err){
    console.log(err)
   }
});

// ===============Registration Route for Candidates/Non Admin
authRouter.post('/register/:id', async(req,res)=> {
    const {name, email, password,phone} = req.body
    const role = req.params.id                      //this will add the route paramaeter as Role in the auth User
    if(!name || !email || !password || !phone){
        return res.status(422).json({error:"Empty Fields"})
    }

    try{
        const userExist =  await User.findOne({email:email})
        
        if(userExist){
            return res.json({message:"already exist"})
        }
        
        const newUser = new User({name, email, password:bcrypt.hashSync(password,10),phone, role})

        await newUser.save()
    
        res.status(201).json({message:"successfully registered"})
    
    }
    
   catch(err){
    console.log(err)
   }
});



// ==================Login Router=================
authRouter.post('/login', async(req,res) => {
    const email = req.body.email
    const password = req.body.password
    try{
        let token;
        const userEmailExist = await User.findOne({email:email})
        if (!userEmailExist){
            res.status(404).json({message :"User not registered"})
        } else {
            
            const isMatchPassword = await bcrypt.compare(password,userEmailExist.password)

            token =await userEmailExist.generateAuthToken();

       
            // res.cookie('token', token, { maxAge: 900000, httpOnly: true });
            // localStorage.setItem('token', token);

            if(isMatchPassword){    
                res.cookie("jwt", token,{
                    expires:new Date(Date.now() + 360000),
                    httpOnly:false  ,
                    // domain: "localhost:3000",
                    // withCredentials:true              
                })
                res.status(200).json({message:"Login Successfull",Id:userEmailExist._id, role:userEmailExist.role})
            } 
            else
                {
                 res.status(400).json({message:"Invalid Credentials"})

                }
                
        }


    } 
    catch (err){
        console.log(err)

    } 
})



// access the dashboard page
authRouter.get('/dashboard',authenticate,asyncHandler((req,res) => {
    res.json({"message" : "user is authorised"})
    
}))

authRouter.get('/admin',authenticate,asyncHandler((req,res) => {
    // console.log(req.verify)
    console.log(req.role)
    res.json({"message" : "user is authorised", "role":req.role})
    
}))

// =============Get all the Authenticated Users==================


authRouter.get('/users',async(req,res) => {
    let Users = User.find({}, function(err, posts){
        if(err){
            console.log(err);
        }
        else {
            res.json(posts);
        }
    })
})
//Update the Auth_user by the super Admin



authRouter.put('/users/:id',async(req,res) => {
    const user = await User.findByIdAndUpdate({_id:req.params.id},{$set:req.body} )
    res.json(user)

   
})
export default authRouter;