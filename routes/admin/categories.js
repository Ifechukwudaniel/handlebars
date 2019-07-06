const express = require('express');
const router = express.Router();
const Category = require("../../models/Category")

router.use((req,res,next)=>{
    req.app.locals.layout = "admin"
    next()
})

router.post('/create', (req, res) => {
    const newCategory = new Category({
     name: req.body.name
    })
    newCategory.save()
    .then(()=>{
       res.redirect('/admin/categories');
    }
    )
});

router.get('/', (req, res) => {
  Category.find({})
    .then(categories=>{
        res.render("admin/categories/index" , {
            categories:categories
        });
    })
});

module.exports = router