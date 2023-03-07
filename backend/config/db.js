import mongoose from "mongoose";

const connectDB = async() => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true })
        console.log(`mongoDB connected: ${conn.connection.host}`.green.underline.bold)
    }catch (error){
        console.log(`error ${error.message}`.red.underline);
        process.exit(1)

    }
}

export default connectDB