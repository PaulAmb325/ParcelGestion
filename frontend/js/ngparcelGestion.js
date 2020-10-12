locApp = angular.module('angParcelApp', []);

locApp.controller('ParcelGestionController',  function($scope, $http) {
	
    //ROUTES DE L'API
    const getAllParcel = "http://etu-web2.ut-capitole.fr:3004/api/parcel/";
    const getAllCust = "http://etu-web2.ut-capitole.fr:3004/api/parcel/customers";
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
    
    $http.get(getAllParcel).then(function(response) {
        $scope.Parcels = response.data;
        //console.log("oui");
    });
    
    $http.get(getAllCust).then(function(response) {
        $scope.Customers = response.data;
        //console.log("oui");
    });
    
    $scope.resetScopes = function(){
      console.log("reset start")
      $http.get(getAllParcel).then(function(response) {
        $scope.Parcels = response.data;
        //console.log("oui");
       });
    
        $http.get(getAllCust).then(function(response) {
            $scope.Customers = response.data;
            //console.log("oui");
        });
        $scope.Locateds = [];
        $scope.currentCustomer = [];
        $scope.currentParcel = [];
        console.log("reset end")
    };
    
    $scope.getLocated = function(id){
        var fullUrl = getLocated + id;
        $http.get(fullUrl).then(function(response) {
            $scope.currentParcel = $scope.Parcels.filter(parc => parc.parcelID === id);
            console.log($scope.currentParcel);
            $scope.Locateds = response.data;
            //Setup the ony customer in the Customer view to be the Customer of the parcel we want to track
            $scope.getParcelCustomer($scope.currentParcel[0].custID);
        });
    };
    
    $scope.getCustomerParcel = function(id){
        var fullUrl = getCustomerParcel + id;
        $http.get(fullUrl).then(function(response) {
            $scope.currentCustomer = $scope.Customers.filter(cust => cust.CustID === id);
            //console.log($scope.currentCustomer);
            $scope.Parcels = response.data;
            //if($scope.Parcels[0].CustID !== $scope.currentCustomer[0].CustID){
              //  $scope.Locateds = [];
            //}
        });
    };
    
    $scope.getParcelCustomer = function(id){
        var fullUrl = getParcelCustomer + id;
        $http.get(fullUrl).then(function(response) {
            $scope.Customers = response.data;
        });
    };
    
    $scope.addLocated = function() {
        if(!$scope.Locateds.some(located => located.operation === "delivery")){
            var data = {parcelID: $scope.newParcID,
                    locID: $scope.newLocID,
                    date: $scope.newDate,
                    time: $scope.newTime,
                    operation: $scope.newOperation
            };
            $http.post(addLocated,data).then(function(response) {
                console.log(data);
                $scope.Locateds.push(data);
                $scope.lastAdded = data;
            });
        };  
    };
    
    $scope.delLoc = function(parcelID, locID){
        var fullUrl = delLocated + `?parcelID=${parcelID}` + `?locID=${locID}`;
        $http.delete(fullUrl).then(function(response) {
                $scope.Locateds.splice($scope.Locateds.findIndex(x => x === $scope.lastAdded),1);
        });
    };
    
    $scope.delLast = function() {
        //console.log("OUII");
        if($scope.lastAdded.length !== 0){
            //console.log("OUII",$scope.lastAdded);
            var fullUrl = delLocated + `?parcelID=${$scope.lastAdded.parcelID}` + `&locID=${$scope.lastAdded.locID}`; 
            $http.delete(fullUrl).then(function(response) {
                //console.log("OUII",response.data);
                $scope.Locateds.splice($scope.Locateds.findIndex(x => x === $scope.lastAdded),1);
            });
        };    
    };
    
    $scope.addParcel = function() {
        var data = {
            weight: $scope.parc_newWeight,
            custID: $scope.parc_newCustId,
            finalLoc: $scope.parc_newFinalLoc
        };
        $http.post(addParcel,data).then(function(response){
            console.log(data);
            $scope.Parcels.push(data);
        });
    };
    
    $scope.addCustomer = function() {
        var data = {
            CustName: $scope.cust_newCustName,
            CustomerLocation: $scope.cust_newCustomerLocation
        };
        $http.post(addCustomer,data).then(function(response){
            console.log(response.data);
            $scope.Customers.push(data);
        });
    };
	
});

