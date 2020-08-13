const Sequelize = require("sequelize");
const db = require("../config/sequelize");
const Movies = require("./movies");

const Review = db.define("reviews", {
  reviewId: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  rating: {
    type: Sequelize.FLOAT,
  },
  review: {
    type: Sequelize.TEXT,
  },
});

Movies.hasMany(Review, { foreignKey: "movieId" });
Review.belongsTo(Movies, { foreignKey: "movieId" });
Review.sync().then(() => {
  console.log("table created");
});
module.exports = Review;
