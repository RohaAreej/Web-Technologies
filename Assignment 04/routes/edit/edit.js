var express = require('express');
var router = express.Router();

// var checkSessionAuth = require("../middlewares/checkSessionAuth")
var Menu = require("../../models/menu")

router.get('/:id', async function(req, res, next) {
    let menu = await Menu.findById(req.params.id);
    res.render('edit', {menu} );
  });
  
  router.post('/:id', async function(req, res, next) {
    let menu = await Menu.findById(req.params.id);
    menu.name = req.body.name;
    menu.price = req.body.price;
    await menu.save();
    res.redirect("/");
  });


module.exports = router;