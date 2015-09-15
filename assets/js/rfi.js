'use strict';

app.controller('ctrl',["$rootScope", "$scope","$attrs", "$http", "$window", "Upload", "$timeout", "$location", "$interval", "ServicesFtry", "DataFtry", "RFIConfig", function($rootScope, $scope, $attrs, $http, $window, Upload, $timeout, $location, $interval, ServicesFtry, DataFtry, RFIConfig ){

    $scope.requestor;
    $scope.caseDto = {caseId : "", isCST: false };
    $scope.childrenList = [];
    $scope.csawList = [];
    $scope.guardianList = [];
    $scope.uhrList = [];
    $scope.extRequestorList = [];
    $scope.requestorCheckbox;
    $scope.childCheckbox;
    $scope.uhrCheckbox;
    $scope.csawCheckbox;
    $scope.guardianCheckbox;
    $scope.childCstCheckbox;
    $scope.childFamilyAbductionCheckbox;
    $scope.csawUnidentifiedCheckbox;
    $scope.csawCstCheckbox;
    $scope.csawFamilyAbductionCheckbox;
    $scope.physicalTypeDropdown;
    $scope.onlineActivityDropdown;

    $scope.init = function (){
        $rootScope.loggedIn = false; // If the "logout" link needs to be displayed
    }
    $scope.UHR = { value: "false"  };
    $scope.caseNumber = {  value: "" };
  
    // DISABLE AND ENABLE THE LOAD CASE BUTTON 
    $scope.$watch("caseDto.caseId.length", function () {
        if($("#caseNumber").val().length == 7){
                $scope.loadCaseBtn = "btn-primary";
                $scope.isCaseLoadable = false;
            }else {
                $scope.loadCaseBtn = "btn-disabled";
                $scope.isCaseLoadable = true;
        }
    })
   // var contextPath = "http://172.20.2.13:8080/rfi";
    var contextPath = RFIConfig.contextPath;

    function setRequestor(){
        var delay;
        // GET REQUESTOR INFO ///////////////////////////////////////////////
        var requestor = ServicesFtry.getRequestor();
         // IF REQUESTOR IS DEFINED  => POPULATE THE REQUESTOR INFO ///////////////////////////////////////////////
        if(requestor.department != undefined) {
            $scope.requestor = {
                department  : requestor.department,
                title       : requestor.title,
                phoneNumber : requestor.phoneNumber,
                firstName   : requestor.name.firstName,
                lastName    : requestor.name.lastName,
                email       : requestor.email,
                searches    : []
            }
           delay = $interval(function(){
                        disableFields();
                        $interval.cancel(delay);
                    }, 300);
        } else {
            // IF THE REQUESTOR IS UNDEFINED => REDIRECTS TO THE LOGIN PAGE ///////////////////////////////////////////////
          $location.path('/login');
        }
    }

    // WHEN THE LAST PERSON IS REMOVED IT CLOSE THE GAPS //////////////////////////////////////
    $scope.$watch("childrenList.length", function () {
        //console.log("WATCH CHILDREN LIST");
        if($scope.childrenList.length == 0){  $('#panelChild').css('display', 'none')};
    });
    $scope.$watch("csawList.length", function () {
        //console.log("WATCH CHILDREN LIST");
        if($scope.csawList.length == 0){  $('#panelCSAW').css('display', 'none')};
    });
    $scope.$watch("guardianList.length", function () {
        //console.log("WATCH CHILDREN LIST");
        if($scope.guardianList.length == 0){  $('#panelGuardian').css('display', 'none')};
    });
    $scope.$watch("uhrList.length", function () {
        //console.log("WATCH CHILDREN LIST");
        if($scope.uhrList.length == 0){  $('#panelUHR').css('display', 'none')};
    });

    // OPEN & CLOSE PANELS ////////////////////////////////////////////////////////////////////////////////////////////
    $scope.closeOpenPanel = function(button, panel) {
       
       if($(panel).css('opacity') < 1){
         // OPEN THE PANEL
        $scope.openPanel(button , panel);
        } else {    
           // CLOSE THE PANEL       
            $scope.closePanel(button , panel);
        }
    };
    // OPEN THE PANEL
    $scope.openPanel = function(button, panel) {
        $(panel).css('display', 'inline-block'); 
       // $(panel).css('padding', 20);
        $(panel).animate({height: '100%'},300, function(){
            $(button ).removeClass( "openPanel-btn" );
            $(button ).addClass( "closePanel-btn" );
            });    
        $(panel).animate({opacity: 1},300);   
        $(button ).find("a").text("Close") ;
    };
    // CLOSE THE PANEL  
    $scope.closePanel = function(button, panel) {
        //console.log("FROM CLOSE PANEL");
        $(panel).animate({opacity: 0},10, function(){
                //$(panel).css('padding', 0);
            });
            $(panel).animate({height: 20},300, function(){
            $(panel).css('display', 'none');
            $(button ).find("a").text("Open") ;
            $(button ).removeClass( "closePanel-btn" );
            $(button ).addClass( "openPanel-btn" );
        }); 
    };

    $scope.removeFromList = function(list, index) {
          list.splice(index, 1);
    } ;

    $scope.addToList = function(list, index) {
        console.log("FROM ADDTO LIST: " + list)
        list.push("");
    };

    $scope.addObjectToList = function(list, index) {
          list.push({});
        };

    $scope.addUhr = function() {
         $scope.uhrList.push({
            person: {names: [{firstName: "", middleName: "", lastName: ""}], gender: "", race: "", birthDates: [""] , isNew: "true", isInReport: false, isSearchable: false},
            scarMarkPhysicalFeatures: [{}],
            //hairColor: "",
            weightRange: {value: "", isNew: true},
            heightRange: {value: "", isNew: true},
            ageRange:  {value: "", isNew: true},
            namus:  {value: "", isNew: true},
            //eyeColor: "",
            searches:[],
            foundLocations: [{}],
            comments: "",
         });
           $scope.openPanel("#closeUHR-btn" ,  "#panelUHR");
    };

    $scope.addGuardian = function() {
         $scope.guardianList.push({
            person: {names: [{firstName: "", middleName: "", lastName: ""}], gender: "", ssns: [""], birthDates: [""], homePhones: [""], cellPhones: [""], isNew: "true", isInReport: false, isSearchable: false},
            searches:[],
            onlineActivities: [{}],
            locations: [{}],
            emails: [{value: "", isNew: true}],
            comments: "",
            relationToChild: {value: "", isNew: true}
         });
          $scope.openPanel("#closeGuardian-btn" ,  "#panelGuardian");
    };

    $scope.addCsaw = function() {
         $scope.csawList.push({
            person: {names: [{firstName: "", middleName: "", lastName: ""}], aliases: [{firstName: "", middleName: "", lastName: ""}], gender: "", ssns: [""], birthDates: [""], homePhones: [""], cellPhones: [""], isNew: "true", isInReport: false, isSearchable: false},
            searches:[],
            scarMarkPhysicalFeatures: [{}],
            onlineActivities: [{}],
            locations: [{}],
            emails: [""],
            weightRange: "",
            heightRange: "",
            ageRange: "",
            comments: "",
            relationToChild: "",
            companionType: "",
            workPhones: [""],
            driverLicenses: [""]
         });
           $scope.openPanel("#closeCSAW-btn" ,  "#panelCSAW");
    };

    $scope.addChild = function() {
         $scope.childrenList.push({
            person: {names: [{firstName: "", middleName: "", lastName: ""}], gender: "", ssns: [""], birthDates: [""], homePhones: [""], cellPhones: [""], isNew: "true", isInReport: false, isSearchable: false},
            searches:[],
            scarMarkPhysicalFeatures: [{}],
            missingLocations: [{}],
            missingDates: [""],
            weightRange: "",
            heightRange: "",
            ageRange: "",
            comments: "",
            nickName: "",
            emails: [""],
            onlineActivities: [{}]
         });
         $scope.openPanel("#closeChild-btn" ,  "#panelChild");
    };

    $scope.getCase = function() {
        var url = RFIConfig.contextPath + "/getCase/" + $scope.caseDto.caseId;
        DataFtry.getData(url).then(function(result){
            $scope.childrenList     = result.data.childrenList;
            $scope.csawList         = result.data.csawList;
            $scope.guardianList     = result.data.guardianList;
            $scope.uhrList          = result.data.uhrList;
            $scope.caseDto          = result.data.caseDto;
            result.data.uhrList.length > 0 ? $scope.UHR.value = 'true' : $scope.UHR.value = 'false';
            // DISABLE FIELDS THAT GETS POPULATED FROM THE DATABASE
            var delay = $interval(function(){
                $interval.cancel(delay);
                disableFields();
            }, 500);
        });
    };

    $(document).on('submit','#sender_container', function(e) {
        e.preventDefault();
        validate();
    });

    function disableFields(){
        // DISABLE INPUT FIELDS ///////////////////////////
        $(':input:text').filter(function(){
            return this.value!=''
        }).prop('disabled', true)
        .addClass('disabled-textinput');
        // DISABLE SELECT DROPDOWNS ///////////////////////
        $('select').filter(function(){
            return this.value!='?'
        }).prop('disabled', true)
        .addClass('disabled-textinput');
        // RE-ENABLE THE CASE NUMBER AND PRIORITY ///////////////////////
         $('#selectPriority, #caseNumber').prop('disabled', false)
        .removeClass('disabled-textinput');
    }

    //$scope.getDropdown = function() {
    function getDropdown(){
        var url = RFIConfig.contextPath + "/formAssets";
        DataFtry.getData(url).then(function(result){
            //$scope.checkbox = result.data.elements[0];
            //$scope.dropdown = result.data.elements[1];
            $scope.initial(result.data);
        });
    }

    $scope.toggleCheck = function(search, searchList) {
        if (searchList.indexOf(search.code) === -1) {
            searchList.push(search.code);
        } else {
            searchList.splice(searchList.indexOf(search.code), 1);
        }
    };

    $scope.sendRequest = function() {
        //copy the list (not necessary, just for demo purposes)
        var copyOfChildrenList = $scope.childrenList.slice();

        var copyOfExtRequestor = $scope.extRequestorList.slice();
        var copyOfCsaw = $scope.csawList.slice();
        var copyOfGuardian = $scope.guardianList.slice();
        var copyOfUhr = $scope.uhrList.slice();
        var copyOfCase = $scope.caseDto;
        var copyOfPriority = $scope.requestor.priority;
        var copyOfRequestDate = $scope.requestor.requestDate;
        //now clear the origninal list, the UI will update (not necessary, just for demo purposes)
        //$scope.childrenList = [];
        var jsonString = JSON.stringify({childrenList: copyOfChildrenList, requestor: copyOfRequestor, csawList: copyOfCsaw, guardianList: copyOfGuardian, caseDto: copyOfCase, uhrList: copyOfUhr, extRequestor: copyOfExtRequestor, priority: copyOfPriority, byDate: copyOfRequestDate});
         console.log("JSON = " + jsonString);

        var url = RFIConfig.contextPath + "/saveRequest";
        DataFtry.sendData(url, jsonString).then(function(message){
             alert("This request is being processed, your confirmation number: " + message);
             $scope.cleanCase();
        });
    };

    $scope.initial = function(data) {
         $scope.requestorCheckbox               = data.requestor;
         $scope.uhrCheckbox                     = data.uhr;
         $scope.csawCheckbox                    = data.csaw;
         $scope.childCheckbox                   = data.child;
         $scope.guardianCheckbox                = data.guardian;
         $scope.childCstCheckbox                = data.childCst;
         $scope.childFamilyAbductionCheckbox    = data.childFamAbduction;
         $scope.csawUnidentifiedCheckbox        = data.csawUnidentified;
         $scope.csawCstCheckbox                 = data.csawCst;
         $scope.csawFamilyAbductionCheckbox     = data.csawFamAbduction;
         $scope.physicalTypeDropdown            = data.physicalType.concat(data.clothingType).concat(data.scarMarks);
         $scope.onlineActivityDropdown          = data.websiteType;
    };

        $scope.$watch('files', function () {
            $scope.upload($scope.files);
        });
        $scope.log = '';

        $scope.upload = function (files) {
            if (files && files.length) {
                for (var i = 0; i < files.length; i++) {
                    var file = files[i];
                    Upload.upload({
                        url: $attrs.contextPath + "/upload",
                        fields: {
                            'username': 'pnguyen'
                        },
                        file: file
                    }).progress(function (evt) {
                        var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                        $scope.log = 'progress: ' + progressPercentage + '% ' +
                                    evt.config.file.name + '\n' + $scope.log;
                    }).success(function (data, status, headers, config) {
                        $timeout(function() {
                               $scope.log =  config.file.name  + '\n' + $scope.log;
                        });
                    });
                }
            }
        };

    $rootScope.logout = function(data) {
        $rootScope.loggedIn = false;
        $scope.log = '';
        $location.path('/login');
        $scope.cleanCase();
    };

    $scope.emptyObject = function (){
        $scope.files = [];
        $scope.log = "";
        $scope.requestor.searches = [];
        $scope.requestor.priority = "";
        $scope.requestor.requestDate = "";
        $scope.cleanCase();
    };

    $scope.cleanCase = function() {
        $scope.childrenList = [];
        $scope.extRequestorList = [];
        $scope.csawList = [];
        $scope.guardianList = [];
        $scope.uhrList = [];
        $scope.caseDto = {};
    };
    //do this when the page loads and the DOM is ready
    angular.element(document).ready(function () {
        setRequestor();
        getDropdown();
    });
}]);