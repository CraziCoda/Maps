const express = require('express');
const router = express.Router();
const passport = require('passport');


router.get('/', passport.authenticate('jwt', {  session: false, successRedirect: '/', failureRedirect: '/login'}), async (req, res)=>{
    res.render('index.ejs');
});

router.get('/login', (req, res) =>{
    res.render('login.ejs')
});

exports.router = router;
