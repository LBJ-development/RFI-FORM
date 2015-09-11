'use strict';

var app = angular.module('RFIapp', [
	'ngFileUpload',
	'ngAnimate',
	'ngRoute',
	'ui.router',
	'RFIapp.login',
	'RFIapp.services',
	'RFIapp.utilities',
	'RFIapp.config'
	])
	.config(function ($stateProvider, $urlRouterProvider) {

		$urlRouterProvider.otherwise('/login');
        // Now set up the states
		$stateProvider
			.state('login', {
				url: "/login",
				 templateUrl: 'components/login.html'
				}
			)
			.state('RFI', {
				url: '/RFI',
				views: {
					'': {
						templateUrl: 'components/form.html'
					},
					'requestor@RFI':{
						templateUrl: 'components/requestor.html'
					},
					'children@RFI':{
						templateUrl: 'components/children.html'
					},
					'CSAW@RFI':{
						templateUrl: 'components/CSAW.html'
					},
					'guardian@RFI':{
						templateUrl: 'components/guardian.html'
					},
					'UHR@RFI':{
						templateUrl: 'components/UHR.html'
					}
				}
			});
		});

 
