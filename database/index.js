const mongoose = require("mongoose");

//initialize database
const mongoUrl =
  "";
let mongoUrlLocal = "mongodb://localhost:27017/maps";

mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(`Error: ${err}`);
    console.log("Database connected");
  }
);
