import mongoose from "mongoose";
import internal from "stream";
// import autoIncrement from "mongoose-auto-increment"

// autoIncrement.initialize(mongoose.connection);

// Define candidate job application schema
const BookingSchema = new mongoose.Schema({
  title:{type:String},
  start: { type: Date, required: true },
  end: { type: Date, default: Date.now },
  allDay: {type:Boolean},
  resource: { type: mongoose.Schema.Types.ObjectId, required: true },
  cabin_info : { type: mongoose.Schema.Types.ObjectId, required: true }
});


// BookingSchema.plugin(autoIncrement.plugin, {
//   model: 'BookingModel',
//   field: 'auto_id',
//   startAt: 1,
//   incrementBy: 1
// });

const BookingModel = mongoose.model('Bookings', BookingSchema)

export default BookingModel
