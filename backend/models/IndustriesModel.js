import mongoose from "mongoose";
import internal from "stream";

// Define candidate job application schema
const industriesSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

const IndustriesModel = mongoose.model('Industries', industriesSchema)

export default IndustriesModel
