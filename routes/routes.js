const express = require('express');
const router = express.Router();

router.get('/sign', async (req, res)=>{
    res.render('login.ejs');
});

router.get('/', (req, res)=>{
    res.render('index');
});

exports.router = router;
