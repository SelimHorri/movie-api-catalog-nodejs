
const express = require("express");
const app = express();
app.use(express.json());

const port = process.env.port || 3000;
app.listen(port, () => console.log(`app listening to port ${port} ...`));

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

app.get(["/", "/app", "/app/api"], (req, res) => {
  res.redirect("/app/api/movies");
});

app.get("/app/api/movies", (req, res) => {
  res.send(movies);
});

app.get("/app/api/movies/:id", (req, res) => {
  
  let movie = movies.find(m => m.id === parseInt(req.params.id));
  
  if (!movie)
    res.send({
      msgException: `### No movie found with id : ${req.params.id} ###` 
    });
  else
    res.send(movie);
});

