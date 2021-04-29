const jwtSecret = require('./jwtSecret').secret;
const encrypt = require('../encrypt/index');

const passport = require('passport'),
    User = require('../database/db.model');
    localStrategy = require('passport-local').Strategy,
    JWTstrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;

passport.use('register', 
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done)=>{
        try {
            User.findOne({email: username}).then(user => {
                if(user != null){
                    console.log('Username taken');
                    return done(null, false, {messsage: 'username taken'});
                }
                User.create({username, password: encrypt.hash(password)}).then(user=>{
                    console.log('Account created');
                    return done(null, user);
                });
            })
        } catch (error) {
            done(err);
        }
}));

passport.use('login', 
    new localStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, (username, password, done)=>{
        try{
            User.findone({username: username}).then(user => {
                if(user === null) return done(null, false, {message: 'an error occured'});
                if(encrypt.confirm(password, user.password)) return done(null, user);
                return done(null, false, {message: "Wrong password"});
            })
        }catch(error){
            done(error);
        }
}));