const express = require('express');
const app = express();
const cors = require('cors');

require('dotenv').config({ path : "./config.env"});
const BASE_URL = process.env.BASE_URL;

// use middleware
app.use(cors());
app.use(express.json());

// mongodb connection
const con = require('./db/connection.js');

// using routes
app.use(require('./routes/route'));

con.then(db => {
    if(!db) return process.exit(1);

    // listen to the http server 
    app.listen(BASE_URL, () => {
        console.log(`Server is running on port: :${BASE_URL}`)
    })

    app.on('error', err => console.log(`Failed To Connect with HTTP Server : ${err}`));
    // error in mondb connection
}).catch(error => {
    console.log(`Connection Failed...! ${error}`);
});




