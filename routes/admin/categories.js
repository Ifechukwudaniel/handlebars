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

router.get('/edit/:id', (req, res) => {
      Category.findOne({_id: req.params.id})
      .then(category=>{
        res.render("admin/categories/edit" , {
            category:category
        });
      })
  });

  router.post('/edit/:id', (req, res) => {
    Category.findOne({_id:req.params.id})
    .then(category=>{
        category.name = req.body.name
        category.save()
        res.redirect('/admin/categories/');
    })
 });


  router.post('/delete/:id', (req, res) => {
     Category.deleteOne({_id:req.params.id})
     .then(data=>{
         res.redirect('/admin/categories/');
     })
  });

module.exports = router