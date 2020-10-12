const express = require('express');
const router = express.Router();

router.get('/parcel', function(req, res) {
     
    res.setHeader('Content-Type', 'text/html');
    console.log(__dirname);
    res.sendFile( __dirname +'/views' + '/parcelGestion.html');
});


router.get('/ngparcelGestion.js', function(req, res) {
     
    // send the angular app
    res.setHeader('Content-Type', 'application/javascript');
    res.sendFile( __dirname + '/js' + '/ngparcelGestion.js');
    });

module.exports = router;
