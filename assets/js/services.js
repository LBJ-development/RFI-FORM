'use strict';

//  SETTER AND GETTER FOR THE REQUESTOR ///////////////////////////////////////////////////////////
angular.module('RFIapp.services', [])

.factory('ServicesFtry', function() {

    var requestorInfo = {};

    var setRequestor = function(requestor) {
        requestorInfo = requestor;
     };

    var getRequestor = function() {
        return requestorInfo;
     }; 
    return {
          setRequestor: setRequestor,
        getRequestor: getRequestor
    };
})

//  DATA FACTORY ///////////////////////////////////////////////////////////
.factory('DataFtry', [ '$http' , '$q' , 'RFIConfig',   function($http, $q, RFIConfig) {

  var getData = function(url){
    var $promise =  $http({
        method: 'GET',
        url:  url,
        headers: {'Content-Type': 'application/json'}
      });
      var deferred = $q.defer();
      $promise.then(function(result){
/*        console.log("FROM GETDATA");
        console.log(result);*/
        if(result.data.status.status == 'SUCCESS'){
          deferred.resolve(result);
        } else  if(result.data.status.status == 'FAILED') {
          alert(result.data.status.message);
        }
      });
      return deferred.promise;
    };

  var sendData = function(url, data){

    console.log("FROM DATA SEND");
    console.log(data);


    var $promise =  $http({
      method: 'POST',
      url:  url,
      headers: {'Content-Type': 'application/json'},
      data: data
    });
    var deferred = $q.defer();
    $promise.then(function(result){

      if(result.data.status == 'SUCCESS'){
        deferred.resolve(result.data.message);
        } else {
          alert('Woops something wen wrong with the AJAX call');
        }
      });
      return deferred.promise;
    };

    return {
      getData   : getData,
      sendData  : sendData
  };
}]);

        //url: contextPath  + "/getCase/" + "1113129", // UHR CASE EXAMPLE
        //url: contextPath  + "/getCase/" + "1248911", // CHILD CASE EXAMPLE
        //url: contextPath  + "/getCase/" + "1248912", // CHILD CASE EXAMPLE
        //url: contextPath  + "/getCase/" + "1115328", // UHR CASE EXAMPLE
        //url: contextPath  + "/getCase/" + "1242386", // CHILD CASE EXAMPLE
        //url: contextPath  + "/getCase/" + "1242388", // CHILD CASE EXAMPLE
