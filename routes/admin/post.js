const express = require('express');
const router = express.Router();
const Post = require("../../models/Post")

router.all('/*', (req, res, next) => {
    req.app.locals.layout ="admin"
    next()

});

router.get('/', (req, res) => {
    Post.find({})
    .then(posts=>{
        res.render("admin/posts/index",{
            posts: posts
        });
    })
    .catch(err=>{
        console.log(err)
    })
    
});


//create a post
router.get('/create', (req, res) => {
    res.render("admin/posts/create");
});


router.post('/create', (req, res) => {
    let allowComments = true
    if(req.body.allowComments && req.body.allowComments!=="off"){
        allowComments=true
    } 
    else{
        allowComments=false
    }

    const newPost = new  Post({
        title: req.body.title,
        status:req.body.status,
        allowComments: allowComments,
        body: req.body.body
    })

    newPost.save()
    .then(()=>{
         res.redirect('/admin/posts');
    })
    .catch(err=>{
        console.log(` err ${err}`)
    })
});


//edit a post
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Post.findOne({_id:id})
    .then(post=>{
       res.render("admin/posts/edit");
    })
    .catch(err=>{

    })
});

module.exports = router

