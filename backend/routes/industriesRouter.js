import express from "express";
import IndustriesModel from "../models/IndustriesModel.js";
import asyncHandler from "express-async-handler";
import IndustriesData from "../data/IndustriesData.js"
const industriesRouter = express.Router()

industriesRouter.get('/', asyncHandler(async(req,res) => {
    await IndustriesModel.insertMany(IndustriesData)
    const industries = await IndustriesModel.find({})
    res.json(industries)
}))

    



export default industriesRouter