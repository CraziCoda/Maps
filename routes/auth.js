const User = require("../database/db.model");
const passport = require("passport");
const express = require("express");
const jwtSecret = require("../config/jwtSecret").secret;
const jwt = require("jsonwebtoken");
const encrypt = require("../encrypt/index");

const router = express.Router();

router.post("/register", (req, res, next) => {
  console.log(req.body);
  passport.authenticate("register", (err, user, info) => {
    if (err) return console.log(err);
    if (info != undefined) {
      console.log(info);
      return res.redirect("/forms");
    }
    req.logIn(user, (err) => {
      const data = {
        phone: req.body.phone,
        email: req.body.email,
      };
      User.findOne({ email: data.email }).then((user) => {
        User.updateOne({
          phone: data.phone,
        }).then(() => {
          console.log("created");
          res.cookie("info", "Account Created");
          res.redirect("/forms");
        });
      });
    });
  })(req, res, next);
});

router.post("/login", (req, res, next) => {
  passport.authenticate("login", (err, user, info) => {
    if (err) return console.log(err);
    if (info != undefined) {
      res.cookie("info", info.message);
      return res.redirect("/forms");
    }
    req.logIn(user, (err) => {
      User.findOne({ email: user.email }).then(async (user) => {
        if (await encrypt.confirm(req.body.password, user.password)) {
          const token = jwt.sign({ id: user.email }, jwtSecret);
          res.cookie("token", token, { signed: true });
          res.redirect("/");
        }
      });
    });
  })(req, res, next);
});

module.exports = router;
