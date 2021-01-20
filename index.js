const express = require('express');
const app = express();

app.listen( 3000, ( err ) => {
    if ( err ) throw new Error( err ); 
    console.log('Running server in port: ', 3000);
});