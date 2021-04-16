const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const reviewSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie'
  },
  created: {
    type: Date,
    default: Date.now
  },
  review: String,
})

const Review = mongoose.model('Review', reviewSchema);

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const movie = require("./movies.js");
const Movie = movie.model;


router.post("/postreview/:id", validUser, async (req, res) => {
  // check parameters
  let movie = await Movie.findOne({
    id: req.params.id
  })
  let review = new Review({
    user: req.user,
    movie: movie,
    review: req.body.review,
  })
  try {
    await review.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// gets all of the comments for a photo
router.get('/getreviews/:id', async (req, res) => {
  try {
  let movie = await Movie.findOne({
      id: req.params.id
    })
  const review = await Review.find({movie: movie}).populate('user');
  res.send(review);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: Review,
};
