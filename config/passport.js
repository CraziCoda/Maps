const jwtSecret = require("./jwtSecret").secret;
const encrypt = require("../encrypt/index");

const passport = require("passport"),
  User = require("../database/db.model");
(localStrategy = require("passport-local").Strategy),
  (JWTstrategy = require("passport-jwt").Strategy),
  (ExtractJwt = require("passport-jwt").ExtractJwt);

passport.use(
  "register",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      console.log("Opened");
      try {
        User.findOne({ email: username }).then((user) => {
          console.log(user);
          if (user != null) {
            return done(null, false, { messsage: "username taken" });
          }
          User.create({
            email: username,
            password: encrypt.hash(password),
          }).then((user) => {
            console.log("Account created");
            return done(null, user);
          });
        });
      } catch (error) {
        done(err);
      }
    }
  )
);

passport.use(
  "login",
  new localStrategy(
    {
      usernameField: "username",
      passwordField: "password",
    },
    (username, password, done) => {
      try {
        User.findOne({ email: username }).then((user) => {
          if (user === null)
            return done(null, false, { message: "an error occured" });
          if (encrypt.confirm(password, user.password)) return done(null, user);
          return done(null, false, { message: "Wrong password" });
        });
      } catch (error) {
        done(error);
      }
    }
  )
);

const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies["token"];
  }
  return token;
};

let opts = {
  jwtFromRequest: ExtractJwt.fromExtractors([cookieExtractor]),
  secretOrKey: jwtSecret,
};

passport.use(
  "jwt",
  new JWTstrategy(opts, (jwt_payload, done) => {
    try {
      User.findOne({ email: jwt_payload.id }).then((user) => {
        if (user) return done(null, user);
        return done(null, false);
      });
    } catch (error) {
      done(error);
    }
  })
);
