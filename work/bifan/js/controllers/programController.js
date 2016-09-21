(function(global, angular){
	'use strict';

	var app = angular.module('myApp');

	app.controller('programListController', ['$http', function($http){

		var ctrl = this;

		ctrl.program = [];

		$http({
			'method': 'GET',
			'url': 'json/data.json'
		}).then(successAjaxCall, errorAjaxCall);

		function successAjaxCall(response) {
			// console.log('비동기 통신에 성공하다.');
			ctrl.program = response.data;
		}

		function errorAjaxCall(response) {
			// console.log('비동기 통신에 실패하다.');
		}

	}]);

})(this, this.angular);