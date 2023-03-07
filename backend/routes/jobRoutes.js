// routes/jobs.js
import express from "express";
import Job from "../models/JobsModels.js";
import getJob from "../middleware/job.js";
const jobRouter = express.Router()



// =============================Create a new job======================


jobRouter.post('/', async (req, res) => {
//   const job = new Job({
//     title: req.body.title,
//     description: req.body.description,
//     requirements: req.body.requirements,
//     location: req.body.location,
//     // salary: req.body.salary,
//     company: req.body.company // assumes req.body.company contains the ObjectId of the company that posted the job
//   });

  try {
    const savedJob = await Job.create(req.body);
    res.json(savedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});





// ==================Get all jobs====================



jobRouter.get('/alljobs', async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a specific job
jobRouter.get('/:id', getJob, (req, res) => {
  res.json(res.job);
});




// ================== Update a specific job==================




jobRouter.patch('/:id', getJob, async (req, res) => {
  if (req.body.title != null) {
    res.job.title = req.body.title;
  }

  if (req.body.description != null) {
    res.job.description = req.body.description;
  }

  if (req.body.requirements != null) {
    res.job.requirements = req.body.requirements;
  }

  if (req.body.location != null) {
    res.job.location = req.body.location;
  }

  if (req.body.company != null) {
    res.job.company = req.body.company;
  }
  if (req.body.jobType != null) {
    res.job.jobType = req.body.jobType;
  }

  try {
    const updatedJob = await res.job.save();
    res.json(updatedJob);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// // Delete a specific job
// router.delete('/jobs/:id', getJob, async (req, res) => {
//   try {
//     await res.job.remove();
//     res.json({ message: 'Job deleted' });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// });

export default jobRouter
