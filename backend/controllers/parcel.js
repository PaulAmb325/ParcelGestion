
exports.getAllParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    //
    let sql = 'SELECT parcelID, weight, custID, finalLoc FROM PARCELS';
    console.log('oui');
    //db.query(sql)
        //.then(result => res.status(200).json(result))
        //.catch(err => res.status(400).json({err}));

    let getProcessSQL = function (err, result) {
	if (err) throw err;

	res.status(200).json(result);
    };
    db.query(sql, getProcessSQL);    
};

exports.locateParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    //
    let sql = 'SELECT parcelID, locID, date, time, operation FROM LOCATED WHERE parcelID=' + req.params.id ;

    //db.query(sql)
        //.then(result => res.status(200).json(result))
        //.catch(err => res.status(400).json({err}));

    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, getProcessSQL);    
};

exports.addLocatParcel = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    //
    //console.log("query: ", req.query);
    //console.log("body: ", req.body);
    //Changer query en body
    let parcelID = req.body.parcelID;
    let locID = req.body.locID;
    let date = req.body.date;
    let time = req.body.time;
    let operation = req.body.operation;
    
    let sql = 'INSERT INTO LOCATED(parcelID, locID, date, time, operation) VALUES(?,?,?,?,?)';
    let values = [parcelID, locID, date, time, operation];


    //db.query(sql)
        //.then(result => res.status(200).json(result))
        //.catch(err => res.status(400).json({err}));

    let postProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, values, postProcessSQL);    
};

exports.deleteLocated = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    //
    
    let sqlDel = 'DELETE FROM LOCATED WHERE parcelID = ? AND locID = ?';
    var values = [req.query.parcelID, req.query.locID];
    
    //console.log("values", values);
    let deleteProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sqlDel,values, deleteProcessSQL);    
};

exports.getAllCustomers = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    //
    let sql = 'SELECT CustID, CustName, CustomerLocation FROM CUSTOMERS';
    
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    
    db.query(sql,getProcessSQL);
};

exports.getCustomerParcel = (req, res, next) => {
    const {db} = require('../app.js');
    let sql = 'SELECT parcelID, weight, custID, finalLoc FROM PARCELS WHERE custID=' + req.params.id;
    
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    
    db.query(sql,getProcessSQL);
};

exports.getParcelCustomer = (req, res, next) => {
    const {db} = require('../app.js');
    let sql = 'SELECT CustID, CustName, CustomerLocation FROM CUSTOMERS WHERE CustID=' + req.params.idCustomer;
    
    let getProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    
    db.query(sql,getProcessSQL);
};

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
        else res.status(200).json(result);console.log(result);
    };
    db.query(sql, values, postProcessSQL);  
};


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

exports.getLocations = (req, res, next) => {
    //Use the require here because the other way it is executed before the export is done
    const {db} = require('../app.js');
    console.log("oui");
    let sql = 'SELECT locID, locAddress, city FROM LOCATIONS';

    let postProcessSQL = function (err, result) {
	if (err) res.status(500).json({err});
        else res.status(200).json(result);
    };
    db.query(sql, postProcessSQL);   
};


