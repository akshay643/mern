import Job from "../models/JobsModels.js";

async function getJob(req, res, next) {
    try {
      const job = await Job.findById(req.params.id);
      if (job == null) {
        return res.status(404).json({ message: 'Job not found' });
      }
      res.job = job;
      next();
    } catch (err) {
      return res.status(500).json({ message: err.message });
    }
  }

  export default getJob