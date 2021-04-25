const express = require('express');
const ejs  = require('ejs');
const path = require('path');
const app = express();
const http = require('http').createServer(app);
const io = require('socket.io')(http);
const dbConnection = require('./database');

const routes = require('./routes/routes.js');
const signing = require('./routes/signing.route.js');
const PORT = process.env.PORT || 2000;

//pseudodatabase
let database = [];
let users = [];

//this is for testing only 
//to be extracted from a data base
app.use(express.static('views'));

io.on('connection', (socket)=>{
    console.log('Connected');

    //Listening and responding to client
    socket.on('newLocation', (data)=>{
        //Store on DataBase if any
        if(users.includes(data.id)){
            let index = users.indexOf(data.id);
            database[index].lat = data.coordinates.lat;
            database[index].lng = data.coordinates.lng;
        }else{
            if(data.id == null){
                console.log('Null')
            }else{
                users.push(data.id);
                database.push(data.coordinates); 
            }
                       
        }
    });
    setInterval(()=>{
        socket.emit('updateLocation', {database, users});
    }, 5000);
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use('/', routes.router);
app.use('/sign', signing);



http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});