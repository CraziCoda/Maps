const mongoose = require("mongoose");

//initialize database
const mongoUrl =
  "mongodb+srv://crazecode:mongoaccess014@cluster0.saa1c.mongodb.net/maps?retryWrites=true&w=majority";
let mongoUrlLocal = "mongodb://localhost:27017/maps";

mongoose.connect(
  mongoUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) return console.log(`Error: ${err}`);
    console.log("Database connected");
  }
);
