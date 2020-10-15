//This file contain the controllers that handle the HTTP requests

//Controller that return all the parcels
exports.getAllParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    let sql = 'SELECT parcelID, weight, custID, finalLoc FROM PARCELS';
 
    //Process the query if there an error return 500 (error server) else return 200
    let getProcessSQL = function (err, result) {
	if (err) throw res.status(500).json(err);
	else res.status(200).json(result);
    };
    db.query(sql, getProcessSQL);    
};

//Function that return all the LOCATEDS of a parcelID
exports.locateParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');

    let sql = 'SELECT parcelID, locID, date, time, operation FROM LOCATED WHERE parcelID=' + req.params.id ;

    //Process the query if there an error return 500 (error server) else return 200
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, getProcessSQL);    
};

//Function that add a located
exports.addLocatParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    
    //We use req.body there as it is a POST request and information are send using the body for more security
    let parcelID = req.body.parcelID;
    let locID = req.body.locID;
    let date = req.body.date;
    let time = req.body.time;
    let operation = req.body.operation;
    
    let sql = 'INSERT INTO LOCATED(parcelID, locID, date, time, operation) VALUES(?,?,?,?,?)';
    let values = [parcelID, locID, date, time, operation];

    //Process the query if there an error return 500 (error server) else return 200
    let postProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, values, postProcessSQL);    
};

//Function to delete a Located tuple base on parcelID and locID
exports.deleteLocated = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    
    let sqlDel = 'DELETE FROM LOCATED WHERE parcelID = ? AND locID = ?';
    var values = [req.query.parcelID, req.query.locID];
    
    let deleteProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sqlDel,values, deleteProcessSQL);    
};

//Function that return all the Customers
exports.getAllCustomers = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    
    let sql = 'SELECT CustID, CustName, CustomerLocation FROM CUSTOMERS';
    
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    
    db.query(sql,getProcessSQL);
};

//Function that return all the parcels of one customer
exports.getCustomerParcel = (req, res, next) => {
    const {db} = require('../app.js');
    let sql = 'SELECT parcelID, weight, custID, finalLoc FROM PARCELS WHERE custID=' + req.params.id;
    
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    
    db.query(sql,getProcessSQL);
};

//Function that return the customer of a parcel (Parcel's Customer)
exports.getParcelCustomer = (req, res, next) => {
    const {db} = require('../app.js');
    let sql = 'SELECT CustID, CustName, CustomerLocation FROM CUSTOMERS WHERE CustID=' + req.params.idCustomer;
    
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    
    db.query(sql,getProcessSQL);
};

//The function that handle the adding of a Parcel
exports.addParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    
    let weight = req.body.weight;
    let custID = req.body.custID;
    let finalLoc = req.body.finalLoc;
    
    let sql = 'INSERT INTO PARCELS(weight, custID, finalLoc) VALUES(?,?,?)';
    let values = [weight, custID, finalLoc];

    let postProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, values, postProcessSQL);  
};

//The function that handle the adding of a Customer
exports.addCustomer = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    
    let CustName = req.body.CustName;
    let CustomerLocation = req.body.CustomerLocation;
    
    let sql = 'INSERT INTO CUSTOMERS(CustName, CustomerLocation) VALUES(?,?)';
    let values = [CustName, CustomerLocation];

    let postProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, values, postProcessSQL);   
};

//The function that return all the Locations
exports.getLocations = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');

    let sql = 'SELECT locID, locAddress, city FROM LOCATIONS';

    let postProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, postProcessSQL);   
};


