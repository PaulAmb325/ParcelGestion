locApp = angular.module('angParcelApp', []);


locApp.controller('ParcelGestionController',  function($scope, $http) {
	
    //ROUTES DE L'API
    const getAllParcel = "http://etu-web2.ut-capitole.fr:3004/api/parcel/";
    const getAllCust = "http://etu-web2.ut-capitole.fr:3004/api/parcel/customers";
    const getAllLocations = "http://etu-web2.ut-capitole.fr:3004/api/parcel/locations";
    const getLocated = "http://etu-web2.ut-capitole.fr:3004/api/parcel/located/";
    const getCustomerParcel = "http://etu-web2.ut-capitole.fr:3004/api/parcel/customers/";
    const getParcelCustomer = "http://etu-web2.ut-capitole.fr:3004/api/parcel/";
    const addLocated = "http://etu-web2.ut-capitole.fr:3004/api/parcel/located";
    const delLocated = "http://etu-web2.ut-capitole.fr:3004/api/parcel/delLocated";
    const addParcel = "http://etu-web2.ut-capitole.fr:3004/api/parcel/";
    const addCustomer = "http://etu-web2.ut-capitole.fr:3004/api/parcel/customer";
   
    $scope.Parcels = [];
    $scope.Locateds = [];
    $scope.Customers = [];
    
    //For gestion
    $scope.lastAdded = [];
    $scope.currentParcel = [];
    $scope.currentCustomer = [];
    $scope.allParcels = [];
    $scope.allLocations = [];
    $scope.allCustomers = [];
    
    //Executed of start
    $http.get(getAllLocations).then(function(response) {
        $scope.allLocations = response.data;
    });
    
    $http.get(getAllParcel).then(function(response) {
        $scope.allParcels = response.data;
        $scope.Parcels = $scope.allParcels;
    });
    
    $http.get(getAllCust).then(function(response) {
        $scope.allCustomers = response.data;
        $scope.Customers = $scope.allCustomers;
    });
    
    //Function executed to refresh the scopes
    $scope.resetScopes = function(){
      $http.get(getAllParcel).then(function(response) {
        $scope.allParcels = response.data;
        $scope.Parcels = $scope.allParcels;
        });
    
        $http.get(getAllCust).then(function(response) {
            $scope.allCustomers = response.data;
            $scope.Customers = $scope.allCustomers;

        });
        $scope.Locateds = [];
        $scope.currentCustomer = [];
        $scope.currentParcel = [];
    };
     
    //Setup the Scopes accordingly to the parcel we want to track
    $scope.getLocated = function(id){
        var fullUrl = getLocated + id;
        $http.get(fullUrl).then(function(response) {
            $scope.currentParcel = $scope.Parcels.filter(parc => parc.parcelID === id);
            $scope.Locateds = response.data;
            //Setup the only customer in the Customer view to be the Customer of the parcel we want to track
            $scope.getParcelCustomer($scope.currentParcel[0].custID);
        });
    };
    
    //Setup the Scopes accordingly to the customer we want to track
    $scope.getCustomerParcel = function(id){
        var fullUrl = getCustomerParcel + id;
        $http.get(fullUrl).then(function(response) {
            $scope.currentCustomer = $scope.Customers.filter(cust => cust.CustID === id);
            $scope.Parcels = response.data;
          
        });
    };
    
    //Setup the Scopes with the customer that own the Parcel we are tracking
    $scope.getParcelCustomer = function(id){
        var fullUrl = getParcelCustomer + id;
        $http.get(fullUrl).then(function(response) {
            $scope.Customers = response.data;
        });
    };
    
    //Add a Located
    $scope.addLocated = function() {
        //Check if the Parcel wasdelivered or not
        if(!$scope.Locateds.some(located => located.operation === "delivery")){
            //variable with the data that will be send in the body
            var data = {parcelID: $scope.newParcID,
                    locID: $scope.newLocID,
                    date: $scope.newDate,
                    time: $scope.newTime,
                    operation: $scope.newOperation
            };
            //Angular http.post query take the data we want to add as parameter
            $http.post(addLocated,data).then(function(response) {
                //use data to push to the scope
                $scope.Locateds.push(data);
                //Setup the last added
                $scope.lastAdded = data;
            });
        };  
    };
    
    //Delete a Location
    $scope.delLoc = function(parcelID, locID){
        var fullUrl = delLocated + `?parcelID=${parcelID}` + `&locID=${locID}`;
        $http.delete(fullUrl).then(function(response) {
                $scope.Locateds.splice($scope.Locateds.findIndex(x => x.parcelID === parcelID && x.locID === locID),1);
        });
    };
    
    //Delete the last added located by the user (not the last one in time)
    $scope.delLast = function() {
        if($scope.lastAdded.length !== 0){
            var fullUrl = delLocated + `?parcelID=${$scope.lastAdded.parcelID}` + `&locID=${$scope.lastAdded.locID}`; 
            $http.delete(fullUrl).then(function(response) {
                $scope.Locateds.splice($scope.Locateds.findIndex(x => x === $scope.lastAdded),1);
            });
        };    
    };
    
    //Add a Parcel
    $scope.addParcel = function() {
        var data = {
            weight: $scope.parc_newWeight,
            custID: $scope.parc_newCustId,
            finalLoc: $scope.parc_newFinalLoc
        };
        $http.post(addParcel,data).then(function(response){
            var newParcel = {
                //As there no parcelID in the form we use response.data.insertId to get the id of the row we just inserted to update the scope
                parcelID: response.data.insertId,
                weight: data.weight,
                custID: data.custID,
                finalLoc: data.finalLoc
            };
            $scope.Parcels.push(newParcel);
        });
    };
    
    $scope.addCustomer = function() {
        var data = {
            CustName: $scope.cust_newCustName,
            CustomerLocation: $scope.cust_newCustomerLocation
        };
        $http.post(addCustomer,data).then(function(response){
             var newCustomer = {
                    CustID: response.data.insertId,
                    CustName: data.CustName,
                    CustomerLocation: data.CustomerLocation
                };
            $scope.Customers.push(newCustomer);
        });
    };
    
    //Modal Management
    $scope.openAddParcel = function() {
        
        $('.ui.parcel.modal')
                .modal('show');
    };
    
    $scope.openAddCustomer = function() {
        $('.ui.customer.modal')
            .modal('show');
    };
    
    $scope.openAddLocated = function() {
        $('.ui.located.modal')
            .modal('show');
    };
    
    $scope.openHelp= function() {
        $('.ui.help.modal')
            .modal('show');
    };
    
    
	
});

