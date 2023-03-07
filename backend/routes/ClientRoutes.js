import express from "express";
import ClientModel from "../models/ClientModel.js";
import asyncHandler from "express-async-handler";

const clientRouter = express.Router()


// Add a new client

clientRouter.post('/add', async (req, res) => {
    const {name, client_id, phone, email}= req.body

    if(!name || !client_id || !email){
        return res.status(422).json({error:"Empty Fields"})
    }

    try {
        const clientExist =  await ClientModel.findOne({client_id:client_id}) //check if email is already availble in the table
        
        if(clientExist){
            return res.json({message:"Client already exist"})
        }
        
        await ClientModel.create(req.body)
        res.status(201).json({message:"Client successfully registered"})
        
    } 
    catch (error) {
        console.log(err)

        
    }
  });



//   =======Fetch all client==============

clientRouter.get("/getclient",asyncHandler(async (req, res) => {
    const users = await ClientModel.find({})
    
    res.json(users)
}))

  export default clientRouter