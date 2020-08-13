const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const db = require("./config/sequelize");
const port = 3001;

db.authenticate()
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/movies", require("./routes/movies"));
//app.use("/artists", require("./routes/artists"));
//app.use("/reviews", require("./routes/reviews"));
app.listen(port, () => {
  console.log(`connectedd..`);
});
