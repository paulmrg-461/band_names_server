const {io} = require('../index');

//Socket Messages
io.on('connection', client => {
    console.log('User online')
    client.on('disconnect', () => { 
        console.log('User offline')
     });

     client.on('Message', ( payload ) => {
        console.log(`Message from ${payload.name}`);
        io.emit('Message', { admin: 'New message' });
     });

     client.on('emitir-mensaje', ( payload ) => {
      //Emite a todos los usuarios conectados  
      //io.emit('nuevo-mensaje', payload);
      //Emite a todos los usuarios conectados menos al que lo emitio
      client.broadcast.emit('nuevo-mensaje', payload);
     });
  });