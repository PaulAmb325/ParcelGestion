const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const parcelRoutes = require('./routes/parcel');

const globalRoutes = require('../frontend/globalRoutes');

const app = express();

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

db.connect((err) => {
  if (err) throw err;
  
  console.log('Connected!');
});
//21400267::20695Z
//Middlewares
app.use(bodyParser.json());
//app.use(express.static('../frontend/js'));

//Routes a ajouter
app.use('/api/parcel', parcelRoutes);
app.use('/',globalRoutes);
//app.use('/api/auth', userRoutes);

module.exports.app  = app;
module.exports.db  = db;
