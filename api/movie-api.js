
const express = require("express");
const movieRoute = express.Router();
const mongoose = require("mongoose");

const username = 'Reese';
const password = 'Dashwood';
const dbName = 'movie_catalog_db';

const dbUrl = `mongodb+srv://${username}:${password}@cluster0.x0b5m.mongodb.net/${dbName}?retryWrites=true&w=majority`;
mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true})
        .then((response) => console.log("Connected!"))
        .catch((error) => console.log(error));

const movies = [];
/*
const movies = [
  {movieId: 1, name: "Interstellar", director: "Christopher Nolan"},
  {movieId: 2, name: "TENET", director: "Christopher Nolan"},
  {movieId: 3, name: "Inception", director: "Christopher Nolan"},
  {movieId: 4, name: "The Dark Knight Trilogy", director: "Christopher Nolan"},
  {movieId: 5, name: "Inglorious Basterds", director: "Quentin Tarantino"},
  {movieId: 6, name: "Once upon a time in hollywood", director: "Quentin Tarantino"},
  {movieId: 7, name: "Titanic", director: "James Cameron"},
  {movieId: 8, name: "Avatar", director: "James Cameron"},
  {movieId: 9, name: "Dunkirk", director: "Christopher Nolan"}
];
*/

movieRoute.get("/movies", (req, res) => {
  res.send(movies);
});

movieRoute.get("/movies/:movieId", (req, res) => {
  
  let movie = movies.find(m => m.movieId === parseInt(req.params.movieId));
  
  if (!movie)
    res.send({
      msgException: `### No movie found with movieId : ${req.params.movieId} ###` 
    });
  else
    res.send(movie);
    
});

movieRoute.post("/movies", (req, res) => {
  
  let movie = {
    movieId: movies.length + 1,
    name: req.body.name,
    director: req.body.director
  }
  
  movies.push(movie);
  res.send(movie);
  
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
