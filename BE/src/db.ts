import mongoose from "mongoose";
const Schema = mongoose.Schema
mongoose.connect('mongodb+srv://Mukul:fRQc8NLbccqwkPmV@cluster0.nbxxwdx.mongodb.net/patym-db')

const User = new Schema({
    firstName : String,
    lastName : String,
    password : String,
    email : {
        type : String,
        unique : true        
    }
}) 
export const UserModel = mongoose.model("User",User)