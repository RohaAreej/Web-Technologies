var express = require('express');
var router = express.Router();
var Menu = require("../models/menu")
var checkSessionAuth = require("../middlewares/checkSessionAuth")
var Contact = require("../models/contactus")

/* GET home page. */
router.get('/', async function(req, res, next) {
  let menu = await Menu.find()
  console.log(menu)
  res.render('index', {menu} );
});

router.get('/add',checkSessionAuth, async function(req, res, next) {
  res.render('add');
});

router.post('/add', async function(req, res, next) {
  let menu = new Menu(req.body)
  await menu.save()
  res.redirect("/")
});

router.post('/contact', async function(req, res, next) {
  let contact = new Contact(req.body)
  await contact.save()
  res.redirect("/")
});

router.get('/edit/:id', async function(req, res, next) {
  let menu = await Menu.findById(req.params.id);
  res.render('edit', {menu} );
});

router.post('/edit/:id', async function(req, res, next) {
  let menu = await Menu.findById(req.params.id);
  menu.name = req.body.name;
  menu.price = req.body.price;
  await menu.save();
  res.redirect("/");
});

router.get('/cart', function (req, res, next) {
  let cart = req.cookies.cart;
  if (!cart) cart = []
  res.render("cart", { cart })
});

router.get('/cart/:id', async function (req, res, next) {
  let menu = await Menu.findById(req.params.id);
  let cart = []
  if (req.cookies.cart) cart = req.cookies.cart
  cart.push(menu)
  res.cookie("cart", cart)
  console.log("Add this product in cart")
  res.redirect("/")
});

router.get('/cart/remove/:id', async function (req, res, next) {
  let cart = []
  if (req.cookies.cart) cart = req.cookies.cart
  cart.splice(cart.findIndex((c) => (c._id == req.params.id)), 1)
  res.cookie("cart", cart)
  console.log("Add this product in cart")
  res.redirect("/cart")
});

router.get('/delete/:id', async function(req, res, next) {
  let menu = await Menu.findByIdAndDelete(req.params.id)
  console.log(menu)
  res.redirect('/');
});


 
module.exports = router;
