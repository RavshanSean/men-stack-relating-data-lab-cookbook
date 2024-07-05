const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get("/", async (req, res) => {
    const allUsers = await User.find();
    console.log(allUsers);
    res.render("users/index.ejs", { users: allUsers });
  });

  router.get("/:userId", async (req, res) => {
    const foundUser = await User.findById(req.params.userId);
    res.render("users/show.ejs", { users: foundUser });
  });

/*router.get('/users', (req, res) => {
    res.render('./users/index.ejs')
   //res.send('this is working');
})*/

module.exports = router;




/*const express = require('express');
const router = express.Router();
const User = require('../models/user.js');

router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err) {
            console.log(err);
        } else {
            res.render('users/index.ejs', { allUsers: allUsers });
        }
    });
});

module.exports = router;*/




/*const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
router.get('/', async (req, res) => {
  try {
    const allUsers = await User.find({});
    res.render('users/index', { allUsers: allUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;*/
