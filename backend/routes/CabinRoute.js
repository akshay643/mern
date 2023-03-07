import express from "express";
import cabinModel from "../models/CabinModel.js";
import CabinData from "../data/CabinData.js"
import BookingModel from "../models/BookingModel.js";
const CabinRouter = express.Router()

CabinRouter.get("/",async (req, res) => {
    // cabinModel.insertMany(CabinData)
    const cabin = await cabinModel.find({})
    res.json(cabin)
})



// ===========get all booking with Cabin Id

CabinRouter.get("/booking/:cabin_id",async (req, res) => {
    if(req.params.cabin_id === "" || req.params.cabin_id === "undefined"){
        res.json({"message":"Please Select Cabin"})
    }else{

        const cabin = await BookingModel.find({cabin_info : req.params.cabin_id})
        res.json(cabin)
    }
})




export default CabinRouter