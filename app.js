const express= require("express")
const path = require('path')
const app = express()
const exphan= require("express-handlebars")
const mongoose =require("mongoose")

//mongoose connetion
mongoose.connect("mongodb://localhost/cms", {useNewUrlParser:true})
.then(db=>{
    console.log("conneted to databse")
})
.catch(err=>{
    console.log(err)
})

app.use(express.static(path.join(__dirname,'public')));

app.engine("handlebars", exphan({defaultLayout:"home"}))
app.set('view engine', 'handlebars');

//home route
//admin route
const admin = require("./routes/admin/index")
const home= require("./routes/home/index")
const posts = require("./routes/admin/post")
app.use("/admin", admin);
app.use("/home", home);
app.use("/admin/post", posts);

app.listen(3000, () => {
    console.log(`Server started on port`);
});