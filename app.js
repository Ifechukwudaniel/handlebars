const express= require("express")
const path = require('path')
const app = express()
const exphan= require("express-handlebars")


app.use(express.static(path.join(__dirname,'public')));

app.engine("handlebars", exphan({defaultLayout:"home"}))
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
    res.render("home/index");
});

app.get('/about', (req, res) => {
     res.render("home/about")
});

app.get('/register', (req, res) => {
    res.render("home/register")
});


app.get('/login', (req, res) => {
    res.render("home/login")
});

app.listen(3000, () => {
    console.log(`Server started on port`);
});