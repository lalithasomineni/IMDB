const Sequelize = require("sequelize");
const db = require("../config/sequelize");

const Movie = db.define("movies", {
  movieId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
  },
  yearOfRelease: {
    type: Sequelize.DATE,
  },
  genre: {
    type: Sequelize.STRING,
  },
  trivia: {
    type: Sequelize.STRING,
  },
  rating: {
    type: Sequelize.FLOAT,
  },
});

Movie.sync().then(() => {
  console.log("table created");
});

module.exports = Movie;
