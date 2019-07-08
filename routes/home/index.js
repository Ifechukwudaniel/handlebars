const express = require("express")
const router = express.Router()
const Post = require("../../models/Post")
const Category = require("../../models/Category")
const User = require("../../models/User")


router.all('/*', (req, res, next) => {
    req.app.locals.layout ='home'
    next()

});

router.get('/', (req, res) => {
    Post.find({})
    .then(posts=>{
        Category.find({})
        .then(categories=>{
            res.render("home/index",{
                posts: posts,
                categories:categories
            });
        })
    })
});

//get one post
router.get('/post/:id', (req, res) => {
      const id = req.params.id
    Post.findOne({_id:id})
    .then(post=>{
      Category.find({}).then(categories=>{
        res.render("home/post",{
            post: post,
            categories:categories
        })
      })
    })
    .catch(err=>{
        console.log(err)
    })
});

router.get('/about', (req, res) => {
     res.render("home/about")
});

router.get('/register', (req, res) => {
    res.render("home/register")
});

router.post('/register', (req, res) => {
    const newUser = new User({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        password:req.body.password
    })
    res.send(newUser);
});


router.get('/login', (req, res) => {
    res.render("home/login")
});

module.exports = router