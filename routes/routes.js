const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return console.log(err);
    if (info != undefined) {
      res.cookie("info", info.message);
      return res.redirect("/forms");
    }
    return res.render("index", { id: user._id });
  })(req, res, next);
});

router.get("/forms", (req, res) => {
  res.cookie("info", "");
  res.render("login.ejs", { info: req?.cookies["info"] });
});

exports.router = router;
