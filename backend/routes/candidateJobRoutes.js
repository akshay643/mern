import express from "express";
import CandidateJobs from "../models/CandidateJobsModel.js";
import asyncHandler from "express-async-handler";
const candidateJobRouter = express.Router()


// @desc Fetch All CandidateJobs
candidateJobRouter.get("/:id",asyncHandler(async (req, res) => {
    const users = await CandidateJobs.find({candidateId : req.params.id} )
    res.json(users)
}))



// ============Candidate Applying Job==================

candidateJobRouter.post("/", asyncHandler(async(req,res) => {
    const {jobTitle, status}= req.body

    if(!jobTitle || !status){
        return res.status(422).json({error:"Empty Fields"})
    }

    try {
        await CandidateJobs.create(req.body)
        res.status(201).json({message:"successfully Assigned Job"})

    } catch (error) {
       console.log(`message : ${error}`) 
    }
}))



// ============Edit candidate Job
candidateJobRouter.put("/:id", asyncHandler(async(req,res) => {
    const _id = req.params.id
    // const candidateId = req.params.candidateId
   try {
    // const candidateJob = await CandidateJobs.findOne({ jobId, candidateId });
    // const result = await candidateJob.updateOne({ jobId, candidateId }, req.body);
    const result = await CandidateJobs.updateOne(
        {_id },
        { $set: { status : "selected" } });
    res.json(result);

   } catch (error) {
    
   }
}))




export default candidateJobRouter  