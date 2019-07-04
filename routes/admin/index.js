const express = require("express")
const router = express.Router()
const User = require("../../models/Post")
const Faker = require("faker")

router.all('/*', (req, res, next) => {
   req.app.locals.layout ="admin"
   next()
});

router.get('/', (req, res) => {
    res.render("admin/index");
});

router.post('/generate-fake-data', (req, res) => {
    
    for (let index = 0; index < req.body.ammount; index++) {
     const user= new User()
     user.title= Faker.name.jobTitle()
     user.status= "public",
     user.allowComments= Faker.random.boolean()
     user.body = Faker.lorem.paragraphs()
     user.save()
     .then(()=>{
           
     })
    }
     res.redirect('/admin/posts');

});

module.exports = router