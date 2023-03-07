import express from "express";
import dotenv from "dotenv";
import connectDB from "../backend/config/db.js"
import colors from "colors"
import authRouter from "./routes/auth.js"
import experienceRouter from "./routes/ExperienceRoutes.js"
import { runInNewContext } from "vm";
import cors from 'cors';
import cookieParser from "cookie-parser";
import candidateRouter from "./routes/candidateRoutes.js";
import candidateJobRouter from "./routes/candidateJobRoutes.js";
import jobRouter from "./routes/jobRoutes.js";
import DocumentRouter from "./routes/DocumentRoutes.js";
import clientRouter from "./routes/ClientRoutes.js";
import industriesRouter from "./routes/industriesRouter.js";
import BookingRouter from "./routes/BookingRoute.js";
import CabinRouter from "./routes/CabinRoute.js";
dotenv.config()
const app = express()
app.use(cookieParser())

var corsOptions = {
    origin: 'http://127.0.0.1:3000',
    credentials:true,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }
app.use(cors(corsOptions))

connectDB()


app.use(cookieParser());
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Credentials', true);
  next();
});// app.use(function(req, res, next) {
//     res.header("Access-Control-Allow-Origin", 'http://127.0.0.1:3000');
//     res.header("Access-Control-Allow-Credentials", true);
//     res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
//     res.header("Access-Control-Allow-Headers", 'Origin,X-Requested-With,Content-Type,Accept,content-type,application/json');
//     next();
// });

// app.get("/",middleware, (req, res) => {
//     res.send("API Working")
// })


app.use(express.json());


// link Auth route
app.use("/",authRouter)
app.use("/candidate", candidateRouter)
app.use("/candidate/experience", experienceRouter)
app.use("/job/", jobRouter)
app.use("/candidatejob/", candidateJobRouter)
app.use("/", DocumentRouter)
app.use("/client", clientRouter)
app.use("/industries", industriesRouter)
app.use("/booking", BookingRouter)
app.use("/cabin", CabinRouter)



const PORT = process.env.PORT || 5500
app.listen(PORT, console.log(`Server is running in ${process.env.NODE_ENV} 5500 port ${PORT}`.yellow.underline))