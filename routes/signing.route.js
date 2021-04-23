const express = require('express');
const router = express.Router();

router.post('/up', (req, res)=>{
    res.send('<h1>Under Construction </h1>');
});

router.post('/in', (req, res)=>{
    res.send('<h1>Under Construction </h1>')
})

module.exports = router;
