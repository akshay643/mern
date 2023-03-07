import express from "express";
import Documents from "../models/DocumentsModel.js";
import asyncHandler from "express-async-handler";
import authenticate from "../middleware/authenticate.js";
import multer from "multer";

const DocumentRouter = express.Router()


const storage = multer.diskStorage({
    destination:"backend/uploads", 
    filename:(req,file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)

        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
})

const upload = multer({
    storage: storage
})
.single('testImage')

DocumentRouter.post('/uploads/:id', asyncHandler(async(req,res) => {
    upload(req, res, (err) => {
        if(err){
            console.log(err)
        }else {
            const newImage = new Documents({
                name :req.body.name,
                file:{
                    data:req.file.file,
                    contentType: 'image/png'
                },
                candidateId : req.params.id
        
            })
            newImage.save().then(() => res.send("Uploaded Successfully")).catch(err => console.log(err))
        }
    })
}))

export default DocumentRouter
