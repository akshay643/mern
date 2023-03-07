import mongoose from "mongoose";

const experienceSchema = new mongoose.Schema({
  company: { type: String, required: true },
  jobTitle: { type: String, required: true },
  description: { type: String },
  candidateId: { type: mongoose.Schema.Types.ObjectId, required: true,ref:'Candidates' },
  startDate: { type: Date
    , required: true 
  },
  endDate: { type: Date
    ,required: true
  }
});

const Experience = mongoose.model('Experience', experienceSchema);

export default Experience;
