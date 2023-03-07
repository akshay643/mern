import mongoose from "mongoose";
import internal from "stream";

const educationSchema = new mongoose.Schema({
    degree: { type: String, required: true },
    institution: { type: String, required: true },
    year: { type: Number, required: true },
  });
  

  const candidateSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: { type: Number, required: true },
    phone: { type: String, required: true },
    designation: { type: String, required: true },
    email: { type: String, required: true },
    address: { type: String, required: true },
    skills: [{ type: String }],
    education: [educationSchema],
    status:{type:Number},
    totalExperienceYears :{type:Number},
    totalExperienceMonths :{type:Number}
  });
const Candidate = mongoose.model('Candidates', candidateSchema)
const Education = mongoose.model('Education', educationSchema)

export default Candidate
export {Education}