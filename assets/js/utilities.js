'use strict';

angular.module('RFIapp.utilities', [])

// SUMMARY CONTROLLER /////////////////////////////////////////////////////////
.controller('SummaryCtrl', function($scope){
	
	$scope.isSearchable = false;
	$scope.buttonClass = "btn-disabled";
})

// SUMMARY DIRECTIVE /////////////////////////////////////////////////////////
.directive ('summaryDir',function ( $rootScope) {
	return {
	restrict: 'E',
	// scope :{},
	controller: 'SummaryCtrl',
	templateUrl: 'components/summary.html',
	link: function (scope, element, attrs){
		// MAKE SURE THAT THERE IS AT LEAST ONE PERSON IN THE SEARCH REQUEST ////////////////////////////////
		scope.isPersonInSearch = function(){
			for(var i=0; i<scope.childrenList.length; i++){
				if(scope.childrenList[i].person.isSearchable && scope.childrenList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.csawList.length; i++){
				if(scope.csawList[i].person.isSearchable && scope.csawList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.guardianList.length; i++){
				if(scope.guardianList[i].person.isSearchable && scope.guardianList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			for(var i=0; i<scope.uhrList.length; i++){
				if(scope.uhrList[i].person.isSearchable && scope.uhrList[i].searches.length >0){
					scope.isSearchable = true;
					scope.buttonClass = "btn-primary";
					return;
				} else {
 					scope.isSearchable = false;
 					scope.buttonClass = "btn-disabled";
					}
				}
			}
		}
	};
})

// EXT REQUESTOR  DIRECTIVE /////////////////////////////////////////////////////////
.directive ('extRequestorDir',function () {
    return {
    restrict: 'E',
    // scope :{},
   // controller: 'SummaryCtrl',
    templateUrl: 'components/extRequestor.html',
    link: function (scope, element, attrs){

        scope.isNCMECCcase = function(evt) {
            
            scope.cleanCase();

             if($(NCMECcase).is(":checked")) {
                 scope.addExtRequestor();
                } else {
                    scope.extRequestorList = [];
            }
        };
        scope.addExtRequestor = function(evt) {
       
                scope.extRequestorList.push({
                    name:  {firstName: "",  lastName: ""},
                    department: "",
                    title: "",
                    contactNumber: "",
                    cellNumber: "",
                    email: "",
                     });
                };
            }
       };
})

// CALENDAR DIRECTIVE ////////////////////////////////////////////////////////
.directive("datepicker", function() {
    return {
        restrict: "A",
        require: "ngModel",
        link: function(scope, elem, attrs, ngModelCtrl) {
            var updateModel = function(dateText) {
                scope.$apply(function() {
                    ngModelCtrl.$setViewValue(dateText);
                });
            };
            var options = {
                dateFormat: "dd/mm/yy",
                changeMonth: true,
                changeYear: true,
                onSelect: function(dateText) {
                    updateModel(dateText);
                }
            };
           elem.datepicker(options);
        }
    }
});
