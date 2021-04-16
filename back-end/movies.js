const express = require("express");
const mongoose = require('mongoose');

const router = express.Router();


const movieSchema = new mongoose.Schema({
  title: String,
  path: String,
  year: String,
  id: String,
  isYourMovie: Boolean
});



// Create a model for movies in the museum.
const AllMovies = mongoose.model('AllMovies', movieSchema);

let isMoviesAdded = false;


router.post('/', async (req, res) => {
  const movie = new AllMovies({
    title: req.body.title,
    path: req.body.path,
    year: req.body.year,
    id: req.body.id,
    isYourMovie: true
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.post('/all', async (req, res) => {
   const checker = await AllMovies.findOne({
     title: req.body.title
   });
  if(!checker) {
  const movie = new AllMovies({
    title: req.body.title,
    path: req.body.path,
    year: req.body.year,
    id: req.body.id,
    isYourMovie: false
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
}
else {
  res.sendStatus(200);
}
});

router.get('/newmovie', async (req, res) => {
  try {
    let movies = await AllMovies.find({isYourMovie: true});
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let movie = await AllMovies.findOne({id: req.params.id});
    return res.send(movie);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});


router.get("/usermovies/:id", async (req, res) => {
  try {
    let movie = await AllMovies.findOne({_id: req.params.id});
    return res.send(movie);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500);
  }
});

// Create a new movie in the museum: takes a title and a path to an image.
router.post('/newmovie', async (req, res) => {
  const movie = new AllMovies({
    title: req.body.title,
    path: req.body.path,
    year: req.body.year,
    id: req.body.id,
    isYourMovie: true
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the movies in the museu

router.delete('/newmovies/:id', async (req, res)=> {
  try {
    await AllMovies.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

router.put('/newmovies/:id', async (req, res) => {
  try {
    let movie = await AllMovies.findOne({
      _id: req.params.id
    })
    movie.title = req.body.title;
    movie.year = req.body.year;
    movie.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

module.exports = {
  routes: router,
  model: AllMovies,
};
