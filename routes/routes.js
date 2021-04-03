const express = require('express');
const router = express.Router();
const request = require('request');

router.get('/', async (req, res)=>{
    res.render('index');
});


exports.router = router;
