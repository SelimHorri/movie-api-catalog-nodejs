
const express = require("express");
const movieRoute = express.Router();

const movies = [
  {id: 1, name: "Interstellar", director: "Christopher Nolan"},
  {id: 2, name: "TENET", director: "Christopher Nolan"},
  {id: 3, name: "Inception", director: "Christopher Nolan"},
  {id: 4, name: "The Dark Knight Trilogy", director: "Christopher Nolan"},
  {id: 5, name: "Inglorious Basterds", director: "Quentin Tarantino"},
  {id: 6, name: "Once upon a time in hollywood", director: "Quentin Tarantino"},
  {id: 7, name: "Titanic", director: "James Cameron"},
  {id: 8, name: "Avatar", director: "James Cameron"},
  {id: 9, name: "Dunkirk", director: "Christopher Nolan"}
];

movieRoute.get("/movies", (req, res) => {
  res.send(movies);
});

movieRoute.get("/movies/:id", (req, res) => {
  
  let movie = movies.find(m => m.id === parseInt(req.params.id));
  
  if (!movie)
    res.send({
      msgException: `### No movie found with id : ${req.params.id} ###` 
    });
  else
    res.send(movie);
    
});

movieRoute.post("/movies", (req, res) => {
  
  let movie = {
    id: movies.length + 1,
    name: req.body.name,
    director: req.body.director
  }
  
  movies.push(movie);
  res.send(movie);
  
});

movieRoute.put("/movies", (req, res) => {
  
  let movie = {};
  
  movies.forEach(m => {
    if (m.id === parseInt(req.body.id))
      movie = m;
  });
  
  if (!movie)
    res.send({msgException: `Movie not found with id : ${req.body.id}`});
  else {
    movie.name = req.body.name;
    movie.director = req.body.director;
    res.send(movie);
  }
  
});

movieRoute.delete("/movies/:id", (req, res) => {
  
  let movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie)
    res.status(404)
        .send({msgException: `Movie does not exist with id: ${req.body.id}`});
  else {
    movies.splice(movies.indexOf(movie), 1);
    res.status(200)
        .send(`Movie with id: ${movie.id} is deleted successfully`);
  }
  
});

module.exports = movieRoute;
