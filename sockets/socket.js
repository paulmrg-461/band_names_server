const {io} = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand( new Band( 'Queen' ) );
bands.addBand( new Band( 'Bon Jovi' ) );
bands.addBand( new Band( 'Heroes del Silencio' ) );
bands.addBand( new Band( 'Guns and Roses' ) );

//Socket Messages
io.on('connection', client => {
    console.log('User online')

   client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => { 
        console.log('User offline')
     });

     client.on('Message', ( payload ) => {
        console.log(`Message from ${payload.name}`);
        io.emit('Message', { admin: 'New message' });
     });

     client.on('vote-band', (payload) => {
      bands.voteBand( payload.id );
       io.emit('active-bands', bands.getBands());
     });

     client.on('add-band', ( payload ) => {
        const newBand = new Band( payload.name );
        bands.addBand( newBand );
        io.emit('active-bands', bands.getBands());
     });

     client.on('delete-band', ( payload ) => {
         bands.deleteBand( payload.id );
         io.emit('active-bands', bands.deleteBand());
     });

     /* client.on('emitir-mensaje', ( payload ) => {
      //console.log(payload)
      client.broadcast.emit('nuevo-mensaje', payload);
     }); */
  });