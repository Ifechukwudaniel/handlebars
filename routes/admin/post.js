const express = require('express');
const router = express.Router();
const Post = require("../../models/Post")

router.all('/*', (req, res, next) => {
    req.app.locals.layout ="admin"
    next()

});

router.get('/', (req, res) => {
    Post.find({})
    .then(post=>{
        res.render("admin/post/index",{
            post: post
        });
    })
    .catch(err=>{
        console.log(err)
    })
    
});


router.get('/create', (req, res) => {
    res.render("admin/post/create");
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

module.exports = router

