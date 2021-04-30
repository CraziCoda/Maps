const express = require("express");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  passport.authenticate("jwt", { session: false }, (err, user, info) => {
    if (err) return console.log(err);
    if (info != undefined) return res.redirect("/login");
    return res.render("index");
  })(req, res, next);
});

router.get("/login", (req, res) => {
  res.render("login.ejs");
});

exports.router = router;
