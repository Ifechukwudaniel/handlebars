const express = require('express');
const router = express.Router();
const Post = require("../../models/Post")
const {isEmpty,UploadPath} = require("../../helpers/upload-heplper")
const uuid = require("uuid/v1")
const fs = require("fs")
const Category = require("../../models/Category")

router.all('/*', (req, res, next) => {
    req.app.locals.layout ="admin"
    next()

});

router.get('/', (req, res) => {
    Post.find({})
    .populate("category")
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
     Category.find({})
     .then(categories=>{
        res.render("admin/posts/create", {
            categories:categories
        });
     })
});

//submit post data in the databse
router.post('/create', (req, res) => {
   let errors = []

   if (!req.body.title) {
       errors.push({message:"Please add a Title"})
   }
   
   if (!req.body.title) {
    errors.push({message:"Please add a Description"})
    }


   if (errors.length>0) {
    res.render("admin/posts/create",{
        errors:errors
    }); 
   }
   else{
        let filename= ""
        if (!isEmpty(req.files)) {
            const file = req.files.file
            filename=  `${uuid().toString()}${file.name}`
            file.mv('./public/uploads/'+filename, (err)=>{
            if(err)throw err
        })   
        }
        let allowcomments = true
        if(req.body.allowcomments && req.body.allowcomments!=="off"){
            allowcomments=true
        } 
        else{
            allowcomments=false
        }

        const newpost = new  Post({
            title: req.body.title,
            status:req.body.status,
            allowcomments: allowcomments,
            body: req.body.body,
            file: filename,
            category: req.body.category
        })

        newpost.save()
        .then(savedPost=>{
            req.flash("success_message", `Post ${savedPost.title} was created sucessfully`)
            res.redirect('/admin/posts');
        })
        .catch(err=>{
            console.log(` err ${err}`)
        })
    }
});


//edit a post form
router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    Post.findOne({_id:id})
    .then(post=>{
      Category.find({})
     .then(categories=>{
        res.render("admin/posts/edit", {
            categories:categories,
            post:post
        });
     })
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
        let filename= ""
        if (!isEmpty(req.files)) {
            const file = req.files.file
            filename=  `${uuid().toString()}${file.name}`
            file.mv('./public/uploads/'+filename, (err)=>{
            if(err)throw err
        })}
         post.title = req.body.title
         post.status= req.body.status
         post.allowComments=allowComments,
         post.body = req.body.body
         post.file=filename
         post.category=req.body.category
         post.save()
         .then(data=>{
            req.flash("success_message", `update was created sucessfully`)
            res.redirect('/admin/posts');;
         })
     })
     .catch(err=>{
         console.log(err)
     })
});

router.post('/delete/:id', (req, res) => {
    Post.findOne({_id:req.params.id})
    .then(post=>{
        fs.unlink(UploadPath+post.file, (err)=>{
            if(err) return err
         }
         )
         Post.deleteOne({_id:post._id})
         .then(()=>{
            req.flash("success_message", `Delete was created sucessfully`)
            res.redirect("/admin/posts");
         })
    })

});



module.exports = router

