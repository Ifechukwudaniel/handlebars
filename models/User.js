const mongoose = require("mongoose")
const Schema = mongoose.Schema

const UserSchema = Schema({
    firstname:{
        type:String,
        required:true
    },
    lastname:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    }
})

UserSchema.methods.testMethod= function(){
    console.log("jdendednewdnewdwwdwa")
}

module.exports= mongoose.model("users",UserSchema)