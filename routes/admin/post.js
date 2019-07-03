const express = require('express');
const router = express.Router();

router.all('/*', (req, res, next) => {
    req.app.locals.layout ="admin"
    next()

});

router.get('/', (req, res) => {
    res.render("admin/post/index");
});


router.get('/create', (req, res) => {
    res.render("admin/post/create");
});

module.exports = router

