import express from "express";
import Candidate, { Education } from "../models/CandidateModel.js";
import asyncHandler from "express-async-handler";

import Experience from "../models/ExperienceModel.js";
import authenticate from "../middleware/authenticate.js";
const candidateRouter = express.Router()


// @desc Fetch All Candidates
candidateRouter.get("/",asyncHandler(async (req, res) => {
    const users = await Candidate.find({})
    
    res.json(users)
}))
// @desc Fetch All Candidates along with their experience
// const options = { strictPopulate: false };

// candidateRouter.get("/:id",asyncHandler(async (req, res) =>  {
  
//   try {
//     Experience.findOne({candidateId: req.params.id})
//     .populate('candidate')
//     .exec(function(err, post) {
//       res.json(post);    });    
//   } catch (error) {
//     res.status(500).send(error.message);
//   }
// }))














// ================== @desc Fetch All Candidates======================



candidateRouter.get("/",asyncHandler(async (req, res) => {
    const users = await Candidate.find({})
    
    res.json(users)
}))




// ====================@desc Create New candidate====================




candidateRouter.post("/",asyncHandler(async (req, res) => {
    const {name, age, phone, email, address, skills, education}= req.body

    if(!name || !age || !phone || !email || !address){
        return res.status(422).json({error:"Empty Fields"})
    }

    try{
        const candidateEmailExist =  await Candidate.findOne({email:email}) //check if email is already availble in the table
        const candidatePhoneExist =  await Candidate.findOne({phone:phone}) //check if email is already availble in the table
        
        if(candidateEmailExist){
            return res.json({message:"Email already exist"})
        }
        if(candidatePhoneExist){
            return res.json({message:"Phone already exist"})
        }
    
        // const newCandidate = new Candidate({name,age,phone, email,address,skills, education})

        // await newCandidate.save()
        await Candidate.create(req.body)
    
        res.status(201).json({message:"successfully registered"})
    
    }
    
   catch(err){
    console.log(err)
   };
}))



// ===================update candidate with the ID=======================


candidateRouter.put('/:id', async (req, res) => {
  console.log(req.body)
    try {
      const updatedCandidate = await Candidate.findByIdAndUpdate(
        req.params.id,
        { name: req.body.name, 
          age :req.body.age,
          phone :req.body.phone,
          email :req.body.email,
          designation :req.body.designation,
          address:req.body.address,
          $push: { skills: { $each: req.body.skills }},
          education : req.body.education,
          status : req.body.status,
          totalExperienceYears :req.body.totalExperienceYears,
          totalExperienceMonths : req.body.totalExperienceMonths
        },
        { new: true }
      );
      res.status(201).json({message:"successfully Updated"})


    } catch (err) {
      res.status(500).send(err);
    }
  });



// ==================add Candidate Education==================



candidateRouter.post("/education",asyncHandler(async(req,res)=> {
  await Education.create(req.body)
    
  res.status(201).json({message:"Education added successfully"})
}))

export default candidateRouter  