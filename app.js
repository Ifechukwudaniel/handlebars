const express= require("express")
const path = require('path')
const app = express()
const exphan= require("express-handlebars")

app.use(express.static(path.join(__dirname,'public')));

app.engine("handlebars", exphan({defaultLayout:"home"}))
app.set('view engine', 'handlebars');

//home route
const home = require("./routes/home/index")
app.use('/',home);
//admin route
const admin = require("./routes/admin/index")
app.use("/admin", admin);

app.listen(3000, () => {
    console.log(`Server started on port`);
});