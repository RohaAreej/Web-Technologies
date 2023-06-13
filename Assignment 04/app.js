var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expresslayouts = require('express-ejs-layouts')
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var editRouter = require('./routes/edit/edit');
const mongoose = require("mongoose");
const session = require("express-session");
const sessionAuth = require("./middlewares/sessionAuth");
var app = express();
app.use(session({
  secret:'keyboard cat',
  cookie: {maxAge:60000}
}))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expresslayouts)
app.use(sessionAuth)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// app.use(require("./middlewares/checkSession"));


app.use('/', indexRouter);
app.use('/edit', editRouter);
app.use('/', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
mongoose.connect('mongodb://127.0.0.1/finaldb',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

var db = mongoose.connection;

db.on('error',()=>console.log("Error in Connecting to Database"));
db.once('open',()=>console.log("Connected to Database"))

// app.get('/signup', (req,res) => {
//   res.render("signup");
// })

// app.get('/login', (req,res) => {
//   res.render('login');
// })

// app.get('/admin', (req,res) => {
//   res.render('admin');
// })

// app.post("/signup",(req,res)=>{
//   var name = req.body.name;
//   var email = req.body.email;
//   var phno = req.body.phno;
//   var password = req.body.password;
//   var admin = false;
// if(req.body.isAdmin=='on') admin = true;

//   var data = {
//       "name": name,
//       "email" : email,
//       "phno": phno,
//       "password" : password,
//       "isAdmin":admin
//   }

//   db.collection('users').insertOne(data,(err,collection)=>{
//       if(err){
//         console.log(err);
//       }
//       console.log("Record Inserted Successfully");
//   });

//   return res.render('login')

// })

// app.post("/login", (req, res) => {
//   var name = req.body.name;
//   var password = req.body.password;

//   // Check if the user exists in the database
//   db.collection('users').findOne({ name: name }, (err, user) => {
//     if (err) {
//       console.log(err)
//     }

//     if (!user) {
//       // User is not signed up, show error message
//       return res.send("Please sign up before logging in.");
//     }

    
//     if (password != user.password) {
//       // Incorrect password, show error message
//       return res.send("Incorrect password.");
//     }

//     // Login successful
//     req.setFlash("success", "Logged in Successfully");
//     console.log("Login Successfully");
//     req.session.user = user;
//     return res.redirect("/");
//   });
// });

// // Defining User schema
// const userSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     unique: true,
//     required: true
//   }, 
//   email: {
//     type: String,
//     unique: true,
//     required: true
//   }, 
//   phno: {
//     type: Number,
//     required: true
//   }, 
//   password: {
//     type: String,
//     required: true
//   },
//   isAdmin: {
//     type: Boolean,
//     required: true
//   }
// })
// // Defining User model
// const monmodel = mongoose.model('User', userSchema)

module.exports = app;
