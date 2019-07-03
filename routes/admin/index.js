const express = require("express")
const router = express.Router()
const User = require("../../models/Post")

router.all('/*', (req, res, next) => {
   req.app.locals.layout ="admin"
   next()
});

router.get('/', (req, res) => {
    res.render("admin/index");
});

router.post('/generete-fake-data', (req, res) => {
   const user = new User()

});

module.exports = router