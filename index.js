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
let deliveries = [
    {
        id: "1232",
        lat: 6.600020400000001,
        lng: -1.5573090999999998,
        receivers: ['as20', 'soe3']
    },
    {
        id: "1230",
        lat: 6.622220400000001,
        lng: -1.5573090999999998,
        receivers: ['as22', 'soe3']
    }
]
app.use(express.static('views'));

io.on('connection', (socket)=>{
    console.log('Connected');

    socket.on('location', (data)=>{
        //console.log(data);
        socket.emit('update', deliveries);
    });
});

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use('/', routes.router);


http.listen(PORT, () => {
    console.log(`listening on *:${PORT}`);
});