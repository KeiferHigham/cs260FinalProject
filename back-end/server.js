const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database

mongoose.connect('mongodb://localhost:27017/movies', {
  useNewUrlParser: true,
});

// Configure multer so that it will upload to '../front-end/public/images'
const multer = require('multer')
const upload = multer({
  dest: '../front-end/public/images/',
  limits: {
    fileSize: 10000000
  }
});

const cookieParser = require("cookie-parser");
app.use(cookieParser());

const cookieSession = require('cookie-session');
app.use(cookieSession({
  name: 'session',
  keys: [
    'secretValue'
  ],
  cookie: {
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));


// Create a scheme for movies in the museum: a title and a path to an image.
const movieSchema = new mongoose.Schema({
  title: String,
  path: String,
  year: String,
  favorite: Boolean
});

// Create a model for movies in the museum.
const Movie = mongoose.model('Movie', movieSchema);

const dataSchema = new mongoose.Schema({
  title: String,
  path: String
});

const Data = mongoose.model('Data', dataSchema);

app.post('/api/datas', async (req, res) => {
  const data = new Data({
    title: req.body.title,
    path: req.body.path
  });
  try {
    await data.save();
    res.send(data);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.get('/api/datas', async (req, res) => {
  try {
    let datas = await Data.find();
    res.send(datas);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/datas/:id', async (req, res)=> {
  try {
    await Data.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


// Upload a photo. Uses the multer middleware for the upload and then returns
// the path where the photo is stored in the file system.
app.post('/api/photos', upload.single('photo'), async (req, res) => {
  // Just a safety check
  if (!req.file) {
    return res.sendStatus(400);
  }
  res.send({
    path: "/images/" + req.file.filename
  });
});

// Create a new movie in the museum: takes a title and a path to an image.
app.post('/api/movies', async (req, res) => {
  const movie = new Movie({
    title: req.body.title,
    path: req.body.path,
    year: req.body.year
  });
  try {
    await movie.save();
    res.send(movie);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the movies in the museum.
app.get('/api/movies', async (req, res) => {
  try {
    let movies = await Movie.find();
    res.send(movies);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/movies/:id', async (req, res)=> {
  try {
    await Movie.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/movies/:id', async (req, res) => {
  try {
    let movie = await Movie.findOne({
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

const users = require("./users.js");
app.use("/api/users", users.routes);
const movies = require("./movies.js");
app.use("/api/allmovies", movies.routes);
const reviews = require("./reviews.js");
app.use("/api/review", reviews.routes);
const favorites = require("./favorites.js");
app.use("/api/favorite", favorites.routes);

app.listen(3000, () => console.log('Server listening on port 3000!'));
