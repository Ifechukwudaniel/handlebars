const express= require("express")
const path = require('path')
const app = express()
const exphan= require("express-handlebars")
const mongoose =require("mongoose")
const bodyParser = require("body-parser")
const upload = require("express-fileupload")
const session = require("express-session")
const flash = require("connect-flash")

//plugin mongoose function

mongoose.Promise = global.Promise

// helper  function
const {select,formatDate} = require("./helpers/helper-handlebars")

//use body parser 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//use express fileupload
app.use(upload());

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

//using flash 
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true,
  }))

//flash
app.use(flash())

//Flash to local variable
app.use((req, res, next) => {

    res.locals.success_message= req.flash("success_message")   
    next()

});

//handlebar 
app.engine("handlebars", exphan({defaultLayout:"home",helpers:{select: select,formatDate:formatDate}}))
app.set('view engine', 'handlebars');

//home route
//admin route
const admin = require("./routes/admin/index")
const home= require("./routes/home/index")
const posts = require("./routes/admin/post")
app.use("/admin", admin);
app.use("/", home);
app.use("/admin/posts", posts);

app.listen(3000, () => {
    console.log(`Server started on port`);
});