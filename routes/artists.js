const express = require("express");
const router = express.Router();
const Movies = require("../models/movies");
const Artists = require("../models/artists");
const sequelize = require("sequelize");
const Op = sequelize.Op;
router.get("/", (req, res) => {});
//get all artists
router.get("/", (req, res) => {
  Artists.findAll()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//find artist by id
router.get("/:artistId", (req, res) => {
  let id = req.params.artistId;
  Artists.findAll({ where: { artistId: id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//find artist by movieid

router.get("/search/movies", (req, res) => {});

//add an artist
router.post("/add", (req, res) => {
  let movieArtist = new Artists({
    movieId: req.body.movieId,
    name: req.body.name,
    gender: req.body.gender,
    art: req.body.art,
  });
  movieArtist
    .save()
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
//update an artist data
router.put("/update/:artistId", (req, res) => {
  const id = req.params.artistId;
  Artists.findOne({ where: { artistId: id } })
    .then((result) => {
      result
        .update({
          movieId: req.body.movieId,
          name: req.body.name,
          gender: req.body.gender,
          art: req.body.art,
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
//delete an artist
router.delete("/:artistId", (req, res) => {
  let id = req.params.artistId;
  Artists.destroy({ where: { artistId: id } })
    .then((result) => {
      res.json({ result });
    })
    .catch((err) => {
      console.log(err);
    });
});
module.exports = router;
