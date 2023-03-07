import express from "express";
import BookingModel from "../models/BookingModel.js";
const BookingRouter = express.Router()
import moment from "moment";
import 'moment-timezone';
 
BookingRouter.post("/:id",async (req, res) => {
    
    const start = req.body.start
    const end = req.body.end
    const title = req.body.title
    const description = req.body.description
    const allDay = req.body.allDay
    const resource = req.params.id
    const cabin_info = req.body.cabin_info
    const newBooking = new BookingModel({title, start, end, description,allDay, resource, cabin_info});
    console.log(newBooking); 
    await newBooking.save();
    res.json({"message":"created Successfully"})
})


BookingRouter.get("/",async (req, res) => {
    const users = await BookingModel.find({})
    res.json(users)
})

BookingRouter.delete("/:auto_id",async (req, res) => {
    const users = await BookingModel.findOneAndDelete({_id : req.params.auto_id})
    res.json({"message":"deleted Successfully"})
})

export default BookingRouter

