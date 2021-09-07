
const express = require("express");
const app = express();
app.use(express.json());

const movieRouter = require("./api/movie-api");
app.use("/app/api", movieRouter);

const port = process.env.port || 3000;
app.listen(port, () => console.log(`app listening to port ${port} ...`));

app.get(["/", "/app", "/app/api"], (req, res) => {
  res.redirect("/app/api/movies");
});
