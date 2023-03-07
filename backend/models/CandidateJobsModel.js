import mongoose from "mongoose";
import internal from "stream";

// Define candidate job application schema
const candidateJobApplicationSchema = new mongoose.Schema({
  // candidateName: { type: String, required: true },
  jobTitle: { type: String, required: true },
  // company: { type: String, required: true },
  // resume: { type: String, required: true },
  // coverLetter: { type: String, required: true },
  dateApplied: { type: Date, default: Date.now },
  status: { type: String, enum: ['pending', 'reviewed', 'rejected', 'selected'] },
  candidateId: { type: mongoose.Schema.Types.ObjectId, required: true }
});


const CandidateJobs = mongoose.model('Candidate_job', candidateJobApplicationSchema)

export default CandidateJobs
