//Import the different module installed in the project
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

//Import the routes from the concerned files
const parcelRoutes = require('./routes/parcel');
const globalRoutes = require('../frontend/globalRoutes');

const app = express();

//Declare the database
const db = mysql.createConnection({
    host: 'etu-web2.ut-capitole.fr',
    user: '21802456',
    password: '01875F',
    database: 'db_21802456'
  });
  
//Allow CORS
app.use((req, res, next) => {;
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

//Connect the database
db.connect((err) => {
  if (err) throw err;
});

//Set up middleware
app.use(bodyParser.json());

//Routes a utiliser
app.use('/api/parcel', parcelRoutes);
app.use('/',globalRoutes);

//Export the app and the database
module.exports.app  = app;
module.exports.db  = db;
