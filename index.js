const express = require('express');
const path = require('path');
require('dotenv').config();

//Express App
const app = express();

// Node Server
const server = require('http').createServer(app);
const io = require('socket.io')(server);

//Socket Messages
io.on('connection', client => {
    console.log('User online')
    client.on('disconnect', () => { 
        console.log('User offline')
     });
  });

//Public path
const publicPath = path.resolve( __dirname, 'public' );
app.use( express.static( publicPath ));

server.listen( process.env.PORT, ( err ) => {
    if ( err ) throw new Error( err ); 
    console.log('Running server in port: ', process.env.PORT);
});