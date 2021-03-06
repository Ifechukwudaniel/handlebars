const express = require("express")
const router = express.Router()
const Post = require("../../models/Post")
const Category = require("../../models/Category")
const User = require("../../models/User")
const bcrypt = require("bcryptjs")
const passport = require("passport")
const LocalStrategy = require("passport-local").Strategy


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
    let errors= []
   if(!req.body.firstname){
       errors.push({"message": "please enter a firstname"})
   }
   if(!req.body.lastname){
    errors.push({"message": "please enter a lastname"})
    }
    if(!req.body.email){
        errors.push({"message": "please enter a email"})
    }
    if(!req.body.password){
        errors.push({"message": "please enter a password"})
    }
    if(!req.body.passwordConfirm){
        errors.push({"message": "please enter a password confirm "})
    }
    if (req.body.password != req.body.passwordConfirm) {
        errors.push({"message": "password did not match"})
    } 
    if(errors.length > 0){
        res.render("home/register", {
            errors: errors,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email
        });

    }
    else{
        User.findOne({email:req.body.email})
        .then(user=>{
          
            if(!user){
                const newUser = new User({
                    firstname:req.body.firstname,
                    lastname:req.body.lastname,
                    email:req.body.email,
                    password:req.body.password
                })
                 bcrypt.genSalt(10,(err,salt)=>{
                     bcrypt.hash(newUser.password ,salt,(err, hash)=>{
                         newUser.password =hash
                         newUser.save()
                         .then(data=>{
                               req.flash("success_message",`Dear ${data.firstname} you have being registered you can now login`)
                              res.redirect('/login/');
                         })
                     })
                 })
            }
            else{
                req.flash("error_message", "This User exist please login")
                 res.redirect('/login/');
            }
        })     

    }

});

//app login
passport.use(new LocalStrategy({usernameField: 'email'}, (email, password, done)=>{
    User.findOne({email: email}).then(user=>{
        if(!user) return done(null, false, {message: 'No user found'});
        bcrypt.compare(password, user.password, (err, matched)=>{
            if(err) return err;
            if(matched){
                return done(null, user);
            } else {
                return done(null, false, { message: 'Incorrect password' });
            }
        });
    });
}));

passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

router.get('/login', (req, res) => {
    res.render("home/login")
});

router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/admin',
        failureRedirect: '/login',
        failureFlash: true
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logOut()
     res.redirect('/login');
});

module.exports = router