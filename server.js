const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const morgan = require('morgan');
const session = require('express-session');
//new one for comunity page 
const usersController = require('./controllers/users.js');
//
const authController = require('./controllers/auth.js');
const foodsController = require('./controllers/foods.js');
const isSignedIn = require('./middleware/is-signed-in.js');
const passUserToView = require('./middleware/pass-user-to-view.js');
const User = require('./models/user.js');


const port = process.env.PORT ? process.env.PORT : '3000';

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on('connected', () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.get('/', (req, res) => {
  res.render('index.ejs', {
    user: req.session.user,
  });
});

app.get('/vip-lounge', (req, res) => {
  if (req.session.user) {
    res.send(`Welcome to the party ${req.session.user.username}.`);
  } else {
    res.send('Sorry, no guests allowed.');
  }
});
app.use(passUserToView)
app.use('/auth', authController);
app.use(isSignedIn);
// new one
app.use('/users/:userId/foods',foodsController);
//new
// POST /users
//app.post("/users", async (req, res) => {
  //await User.create(req.body);
 // res.redirect("/uers"); // redirect to index fruits

app.use('/users', usersController);   //new

app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});
