const mongoose = require('mongoose');
const express = require("express");
const router = express.Router();

const favoritesSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User'
  },
  movie: {
    type: mongoose.Schema.ObjectId,
    ref: 'Movie'
  },
})

const Favorite = mongoose.model('Favorite', favoritesSchema);

const users = require("./users.js");
const User = users.model;
const validUser = users.valid;

const movie = require("./movies.js");
const Movie = movie.model;

router.post("/postfavorite/:id", validUser, async (req, res) => {
  // check parameters
  let movie = await Movie.findOne({
    id: req.params.id
  })

  let favorite = new Favorite({
    user: req.user,
    movie: movie,
  })
  try {
    await favorite.save();
    return res.sendStatus(200);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// gets all of the comments for a photo
router.get('/getfavorites/:id',validUser, async (req, res) => {
  try {
    let favorites = await Favorite.find({
        user: req.user
      }).populate('user');
  res.send(favorites);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

router.delete('/deletefavorite/:id', async (req, res)=> {
  try {
    await Favorite.deleteOne({
      movie: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


module.exports = {
  routes: router,
  model: Favorite,
};
