import mongoose from "mongoose";
import jwt from "jsonwebtoken"

const userSchemas= mongoose.Schema({
    
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    },
    phone:{
        type:Number, 
        unique:true,
        required:true
    },
    role:{
        type:Number,
        required:true
    },
    tokens:[{
        token:{
            type:String,
            required:true
        }
    }]
})



// /we are generating authToken 
userSchemas.methods.generateAuthToken = async function () {
        const tokenExpiration = '1h'; // set the token expiration time

    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY, { expiresIn: tokenExpiration })
        this.tokens= this.tokens.concat({token:token})
         await this.save()
         return token
    }
    catch (err) {
        console.log(err)
    }
}
const User = mongoose.model('auth_user', userSchemas)

export default User