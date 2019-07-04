const path = require("path")
module.exports= {
      UploadPath : path.join(__dirname,"../public/uploads/"),
      isEmpty:function(obj){
          for (let  key in obj) {
               if(obj.hasOwnProperty(key)) return false
               return true
          }   
       },
       isFile: function(obj) {
          if (obj.file!=null) {
             return true
            }
          return false
       }
}