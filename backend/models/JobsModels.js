import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  requirements: { type: String },
  location: { type: String, required: true },
//   salary: { type: Number },
  datePosted: { type: Date, default: Date.now },
  company: { type: String, required: true},
  jobType: {type:String, required:true},
  minExperience: {type:Number, required:true},
  maxExperience: {type:Number, required:true},
});

const Job = mongoose.model('Job', jobSchema);

export default Job;
