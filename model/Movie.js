
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  movieId: {
    type: Number,
    required: false
  },
  name: {
    type: String,
    required: false
  },
  director: {
    type: String,
    required: false
  }
}, {timestamps: false});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;

