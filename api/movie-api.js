
const express = require("express");
const movieRoute = express.Router();
const mongoose = require("mongoose");
const Movie = require("../model/Movie");

const username = 'Reese';
const password = 'Dashwood';
const dbName = 'movie_catalog_db';

const dbUrl = `mongodb+srv://${username}:${password}@cluster0.x0b5m.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((response) => console.log("Connected!"))
        .catch((error) => console.log(error));



movieRoute.get("/movies", (req, res) => {
  Movie.find()
      .then((response) => res.send(response))
      .catch((error) => console.log(error));
});

movieRoute.get("/movies/:id", (req, res) => {
  Movie.findById(req.params.id)
        .then((response) => res.send(response))
        .catch((error) => console.log(error));
});

movieRoute.get("/movies/movieId/:movieId", (req, res) => {
  
  Movie.find({movieId: parseInt(req.params.movieId)})
        .then((response) => res.send(response))
        .catch((error) => console.log(error));
});

movieRoute.post("/movies", (req, res) => {
  
  Movie.find()
    .then((list) => {
      
      const movie = new Movie({
        movieId: list.length + 1,
        name: req.body.name,
        director: req.body.director
      });
  
      movie.save()
        .then((response) => res.send(response))
        .catch((error) => console.log(error));
      
    })
    .catch((error) => console.log(error));
  
});

movieRoute.put("/movies", (req, res) => {
  
  let movie = {};
  
  movies.forEach(m => {
    if (m.movieId === parseInt(req.body.movieId))
      movie = m;
  });
  
  if (!movie)
    res.send({msgException: `Movie not found with movieId : ${req.body.movieId}`});
  else {
    movie.name = req.body.name;
    movie.director = req.body.director;
    res.send(movie);
  }
  
});

movieRoute.delete("/movies/:movieId", (req, res) => {
  
  let movie = movies.find(m => m.movieId === parseInt(req.params.movieId));
  if (!movie)
    res.status(404)
        .send({msgException: `Movie does not exist with movieId: ${req.body.movieId}`});
  else {
    movies.splice(movies.indexOf(movie), 1);
    res.status(200)
        .send(`Movie with movieId: ${movie.movieId} is deleted successfully`);
  }
  
});

module.exports = movieRoute;
