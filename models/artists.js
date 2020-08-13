const Sequelize = require("sequelize");
const db = require("../config/sequelize");
const Movies = require("./movies");
const Movie = require("./movies");

const Artist = db.define("artists", {
  artistId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
  },
  gender: {
    type: Sequelize.STRING,
  },
  art: {
    type: Sequelize.STRING,
  },
});

Movie.hasMany(Artist, { foreignKey: "movieId" });
Artist.hasMany(Movie, { foreignKey: "movieId" });
Artist.sync().then(() => {
  console.log("table created");
});
module.exports = Artist;
