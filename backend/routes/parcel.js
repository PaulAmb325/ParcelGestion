//First the defining of the express router
const express = require('express');
const router = express.Router();
//We import the functions of the ctrlParcel
const ctrlParcel = require('../controllers/parcel');

//Route to GET all the Parcel 
router.get('/',ctrlParcel.getAllParcel);

//Route to DELETE a located
router.delete('/delLocated',ctrlParcel.deleteLocated);

//Route to GET all the located of a parcel
router.get('/located/:id',ctrlParcel.locateParcel);

//Route to POST a located to a parcel
router.post('/located', ctrlParcel.addLocatParcel);

//Route that GET all the Customers
router.get('/customers', ctrlParcel.getAllCustomers);

//Route that GET all Locations
router.get('/locations',ctrlParcel.getLocations);

//Route to GET all parcel by customer (customer's parcel)
router.get('/customers/:id', ctrlParcel.getCustomerParcel);

//Route to POST a Parcel
router.post('/',ctrlParcel.addParcel);

//Route that POST a Customer
router.post('/customer',ctrlParcel.addCustomer);

//Route that get the parcel's customer
router.get('/:idCustomer',ctrlParcel.getParcelCustomer);

//We export the router to be used in app.js
module.exports = router;