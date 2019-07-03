const express= require("express")
const path = require('path')
const app = express()
const exphan= require("express-handlebars")
const mongoose =require("mongoose")
const bodyParser = require("body-parser")

//plugin mongoose function

mongoose.Promise = global.Promise

// helper  function
const {select} = require("./helpers/helper-handlebars")

//use body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//mongoose connetion
mongoose.connect("mongodb://localhost/cms", {useNewUrlParser:true})
.then(db=>{
    console.log("conneted to database")
})
.catch(err=>{
    console.log(err)
})

//for our public dir
app.use(express.static(path.join(__dirname,'public')));

//handlebar 
app.engine("handlebars", exphan({defaultLayout:"home",helpers:{select: select}}))
app.set('view engine', 'handlebars');

//home route
//admin route
const admin = require("./routes/admin/index")
const home= require("./routes/home/index")
const posts = require("./routes/admin/post")
app.use("/admin", admin);
app.use("/home", home);
app.use("/admin/posts", posts);

app.listen(3000, () => {
    console.log(`Server started on port`);
});