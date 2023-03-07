import mongoose from "mongoose";
import internal from "stream";

// Define candidate job application schema
const clientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  client_id: { type: Number,required:true},
  phone: { type: Number},
  email :{type:String, required:true}
//   candidateId: { type: mongoose.Schema.Types.ObjectId, required: true }
});


const ClientModel = mongoose.model('Client', clientSchema)

export default ClientModel
