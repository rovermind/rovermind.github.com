(function(global, angular){
	'use strict';

	var app = angular.module('myApp');

	app.controller('boardController', ['$http', function($http){

		var ctrl = this;
    var table_data;
    var per_page = 10;

		ctrl.articles = [];
    ctrl.active_page = 1;

    ctrl.printData = function(page) {
      var start = (page - 1) * per_page;
      var end = start + per_page;
      ctrl.articles = table_data.slice(start, end);
      ctrl.active_page = page;
    };

		$http({
			'method': 'GET',
			'url': 'json/board.json'
		}).then(successAjaxCall, errorAjaxCall);

		function successAjaxCall(response) {
			// console.log('비동기 통신에 성공하다.');
			table_data = response.data;
      ctrl.printData( ctrl.active_page );
		}

		function errorAjaxCall(response) {
			// console.log('비동기 통신에 실패하다.');
		}

    var $bca = angular.element('.board-control-area');
    var $bca_links = $bca.find('a');
    $.each($bca_links, function(index) {
      var $link = $bca_links.eq(index);
      $link.on('click', function(e) {
        $link.siblings('.active').removeClass('active');
        $link.addClass('active');
        e.preventDefault();
      });
    });

	}]);

})(this, this.angular);
