const router = require("express").Router();
let Exercise = require("../models/exercise.model");

// Get exercises route
router.route("/").get((req, res) => {
  Exercise.find()
    .then((exercises) => res.json(exercises))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Add exercises route
router.route("/add").post((req, res) => {
  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  const newExercise = new Exercise({
    username,
    description,
    duration,
    date,
  });

  newExercise
    .save()
    .then(() =>
      res
        .json("Exercise added!")
        .catch((err) => res.status(400).json(`Error: ${err}`))
    );
});

// Get exercise by ID route
router.route("/:id").get((req, res) => {
  Exercise.findById(req.params.id)
    .then((exercise) => res.json(exercise))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Update exercise route
router.route("/update/:id").put((req, res) => {
  Exercise.findByIdAndUpdate(req.params.id)
    .then((exercise) => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save().then(() => res.json("Exercise Updated!"));
    })
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

// Delete exercise route
router.route("/:id").delete((req, res) => {
  Exercise.findByIdAndDelete(req.params.id)
    .then((exercise) => res.json(`${exercise} deleted!`))
    .catch((err) => res.status(400).json(`Error: ${err}`));
});

module.exports = router;
