// import mongoose from "mongoose";
// import dotenv from "dotenv";
// import colors from "colors";
// import Users from "./data/users.js";
// import products from "./data/products.js";
// import UserModel from "./models/userModel.js";
// import productModel from "./models/productModel.js"
// import connectDB from "./config/db.js";

// dotenv.config()
// connectDB()

// const importData = async() => {
//     try{
//         await UserModel.deleteMany()  //This line of code deletes all the existing records from the User collection.
//         // await productModel.deleteMany() //This line of code deletes all the existing records from the productModel collection.
//         const createdUser = await UserModel.insertMany(Users) //This line of code inserts an array of new users (Users) into the User collection, and the createdUser constant holds the result of this operation.
//         // const AdminUser = createdUser[0]._id // This line of code sets the AdminUser constant to the _id of the first user in the createdUser array.
//         // const sampleProduct = productModel.map((p) => {
//         //     return {...productModel, user:AdminUser}
//         // })
//         // await productModel.insertMany(sampleProduct)
//         console.log("data imported".green.inverse )
//         process.exit(1)
//     }catch (error){
//         console.log(`${error}`.red.inverse)
//         process.exit(1)

//     }
// }
// const destroyData = async() => {
//     try{
//         await UserModel.deleteMany()
//         // await productModel.deleteMany()

        
//        console.log("data destroyed".red.inverse)
//         process.exit(1)
//     }catch (error){
//         console.log(`${error}`.red.inverse)
//         process.exit(1)


//     }
// }

// if(process.argv[2]=== '-d'){
//     destroyData()
// }
// else{
//     importData()
// }