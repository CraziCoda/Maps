const express = require('express');
const ejs  = require('ejs');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const routes = require('./routes/routes.js');


const PORT = process.env.PORT || 2000;



//this is for testing only 
//to be extracted from a data base
app.use(express.static('views'));

io.on('connection', (socket)=>{
    console.log('Connected');
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', routes.router);


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});