const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/', async (req, res)=>{
    res.render('login.ejs');
});

router.get('/', (req, res)=>{
    //res.render('index');
});

exports.router = router;
