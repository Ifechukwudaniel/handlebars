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


//create a post fprm
router.get('/create', (req, res) => {
    res.render("admin/posts/create");
});

//submit post data in the databse
router.post('/create', (req, res) => {
    const file = req.files.file
    let filename= file.name
    file.mv('./public/uploads/'+filename, (err)=>{
        if(err)throw err
    })

    let allowcomments = true
    if(req.body.allowcomments && req.body.allowcomments!=="off"){
        allowcomments=true
    } 
    else{
        allowcomments=false
    }

    const newpost = new  post({
        title: req.body.title,
        status:req.body.status,
        allowcomments: allowcomments,
        body: req.body.body
    })

    newpost.save()
    .then(()=>{
         res.redirect('/admin/posts');
    })
    .catch(err=>{
        console.log(` err ${err}`)
    })
});


//edit a post form
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Post.findOne({_id:id})
    .then(post=>{
       res.render("admin/posts/edit", {
           post:post
       });
    })
    .catch(err=>{
     
    })
});

router.post('/edit/:id', (req, res) => {
     Post.findOne({_id:req.params.id})
     .then(post=>{
        let allowComments = true
        if(req.body.allowComments && req.body.allowComments!=="off"){
            allowComments=true
        } 
        else{
            allowComments=false
        }
         post.title = req.body.title
         post.status= req.body.status
         post.allowComments=allowComments,
         post.body = req.body.body
         post.save()
         .then(data=>{
              res.redirect('/admin/posts');;
         })
     })
     .catch(err=>{
         console.log(err)
     })
});

router.post('/delete/:id', (req, res) => {
    Post.deleteOne({_id:req.params.id})
    .then(data=>{
         res.redirect("/admin/posts");
    })

});



module.exports = router

