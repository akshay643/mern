import mongoose from "mongoose";
import internal from "stream";

const CabinSchema = new mongoose.Schema({
  name:{type:String}
});

const cabinModel = mongoose.model('Cabins_info', CabinSchema)

export default cabinModel
