const express = require('express');
const router = express.Router();
const ctrlParcel = require('../controllers/parcel');

router.get('/',ctrlParcel.getAllParcel);
//route to delete the last added located
router.delete('/delLocated',ctrlParcel.deleteLocated);
//Route to see all the located of a parcel
router.get('/located/:id',ctrlParcel.locateParcel);
//Route to add a located to a parcel
router.post('/located', ctrlParcel.addLocatParcel);


router.get('/customers', ctrlParcel.getAllCustomers);
//On another page
//See all parcel by customer (customer's parcel)
router.get('/customers/:id', ctrlParcel.getCustomerParcel);
//Add a parcel
router.post('/',ctrlParcel.addParcel);
//Add a customer
router.post('/customer',ctrlParcel.addCustomer);
//Find the parcel's customer:
router.get('/:idCustomer',ctrlParcel.getParcelCustomer);


module.exports = router;