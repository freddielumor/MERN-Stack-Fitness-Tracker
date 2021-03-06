const router = require("express").Router();
let User = require("../models/user.model");

// Get users route
router.route("/").get((req, res) => {
  User.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json(`${err}`));
});

// Add users route
router.route("/add").post((req, response) => {
  const username = req.body.username;

  const newUser = new User({ username });

  newUser
    .save()
    .then(() => response.json("User added!"))
    .catch((err) => response.status(400).json(`Error: ${err}`));
});

module.exports = router;
