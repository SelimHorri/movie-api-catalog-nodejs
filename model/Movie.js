
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieId: {
    type: String,
    required: false
  },
  name: {
    type: String,
    required: true
  },
  director: {
    type: String,
    required: true
  }
}, {timestamps: true});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

