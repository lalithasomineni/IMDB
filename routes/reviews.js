const express = require("express");
const router = express.Router();
const Movies = require("../models/movies");
const Reviews = require("../models/reviews");

//find reviews by movieid
router.get("/movieId", (req, res) => {
  const movieId = req.query.movieId;
  var condition = movieId ? { movieId: { [Op.iLike]: `%${movieId}%` } } : null;

  Reviews.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message || "Some error occurred.",
      });
    });
});
//add a review
router.post("/add/:movieId", (req, res) => {
  let newReview = new Reviews({
    movieId: req.params.movieId,
    rating: req.body.rating,
    review: req.body.review,
  });
  newReview
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//delete review
router.delete("delete/:reviewId", (req, res) => {
  let id = req.params.reviewId;
  Reviews.destroy({ where: { reviewId: id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
