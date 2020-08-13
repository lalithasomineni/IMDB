const express = require("express");
const app = express();
const router = express.Router();
const Movies = require("../models/movies");
const Artists = require("../models/artists");
const db = require("../config/sequelize");
const Op = db.Sequelize.Op;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//search by title
router.get("/search", (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.iLike]: `%${title}%` } } : null;

  Movies.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
});
//seach by genre
router.get("/search/genre", (req, res) => {
  const genre = req.query.genre;
  var condition = genre ? { genre: { [Op.iLike]: `%${genre}%` } } : null;

  Movies.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving.",
      });
    });
});

//get all movies
router.get("/", (req, res) => {
  Movies.findAll()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//find movie by id
router.get("/:movieId", (req, res) => {
  let id = req.params.movieId;
  Movies.findAll({ where: { movieId: id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});

//add a movie
router.post("/add", (req, res) => {
  if (
    !req.body.title ||
    !req.body.yearOfRelease ||
    !req.body.genre ||
    !req.body.trivia ||
    !req.body.rating
  ) {
    res.json({ error: "pass all the parameters!" });
  } else {
    let newMovie = new Movies({
      title: req.body.title,
      yearOfRelease: req.body.yearOfRelease,
      genre: req.body.genre,
      trivia: req.body.trivia,
      rating: req.body.rating,
    });
    newMovie
      .save()
      .then((result) => {
        res.json({ result });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
//update an movie data
router.put("/update/:movieId", (req, res) => {
  const id = req.params.artistId;
  Movies.findOne({ where: { artistId: id } })
    .then((result) => {
      result
        .update({
          title: req.body.title,
          yearOfRelease: req.body.yearOfRelease,
          genre: req.body.genre,
          trivia: req.body.trivia,
          rating: req.body.rating,
        })
        .then((update) => {
          res.json({ update });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
});
//delete movie
router.delete("/:movieId", (req, res) => {
  let id = req.params.movieId;
  Movies.destroy({ where: { movieId: id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
