const mongoose = require("mongoose")
const Schema = mongoose.Schema

const PostSchema = Schema({
    category:{
      type:Schema.Types.ObjectId,
      ref:"categories"
    },
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
   },
   file:{
       type:String
   },
   date:{
       type:Date,
       default:Date.now()
   }
})

module.exports= mongoose.model("posts", PostSchema)