import express from "express";
import Experience from "../models/ExperienceModel.js"
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";
import Candidate from "../models/CandidateModel.js";
const experienceRouter = express.Router()

// Add a new experience for a candidate

experienceRouter.post('/:id/', async (req, res) => {
    
  const experience = new Experience({
    company: req.body.company,
    jobTitle: req.body.jobTitle,
    description: req.body.description,
    candidateId: req.params.id,
    startDate:  new Date(req.body.startDate),
    endDate:  new Date(req.body.endDate)

  });

  try {
    const savedExperience = await experience.save();
    res.json(savedExperience);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all experiences for a candidate
experienceRouter.get('/:id', async (req, res) => {
  try {
    const experiences = await Experience.find({ candidateId: req.params.id });
    res.json(experiences);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});



// =========get experience with candidate ID================


async function getCandidate(req, res, next) {
    try {
      const candidate = await Candidate.findById(req.params.id);
      if (candidate == null) {
        return res.status(404).json({ message: 'Candidate not found' });
      }
      res.candidate = candidate;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }


  experienceRouter.get('/candidate/:id/',getCandidate, async (req, res) => {
    try {
      const experiences = await Experience.find({ candidateId: req.params.id });
      res.json({Experiences:experiences, CanidateInfo:res.candidate});
    } catch (err) {
        res.status(500).json({ message: err.message });
      }
    });

export default experienceRouter  