const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = Schema({

   title:{
       type:String,
       require: true
   },
   status:{
       type:String,
       default:"public"

   },
   allowComments:{
       type:Boolean,
       require:true,
       default:true
   },
   body:{
       type: String,
       require:true
   }
})

module.exports= mongoose.model("posts", PostSchema)