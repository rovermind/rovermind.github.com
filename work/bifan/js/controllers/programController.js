(function(global, angular){
	'use strict';

	var app = angular.module('myApp');

	app.controller('programListController', ['$http', '$scope', function($http, $scope){

    $http({
      'method': 'GET',
      'url': 'json/data.json'
    }).then(successAjaxCall, errorAjaxCall);

    function successAjaxCall(response) {
      $scope.program = response.data;
    }
    function errorAjaxCall(response) {
      console.error('비동기 통신에 실패하다.');
    }

    // --------------------------------------------------------------------------------

    $scope.search_model    = { 'category': 'choice' };
    $scope.filtered_medium = [];
		$scope.program         = [];

    // @function 카테고리 선택
    $scope.choiceCategory = function(category) {
      $scope.search_model = { 'category': category };
      $carousel_wrapper.css('left', 0);
    };
    // @function 쿼리 타이틀/감독
    $scope.queryTitleDirector = function(query, $event) {
      if (!query && $event.type === 'keydown') { return; }
      if ( ($event.target.nodeName === 'BUTTON') || ($event.type === 'keydown' && $event.keyCode === 13) ) {
        $scope.search_model = { '$': query };
        $carousel_wrapper.css('left', 0);
        if ($event.target.nodeName === 'INPUT' ) { $event.target.value = ''; }
      }
    };
    // @watch filtered_medium
    var width;
    var gutter;
    $scope.$watch('filtered_medium', function(newValue, oldValue, scope) {
      var $target = $carousel_wrapper.find('li:eq(1)');
      width = $target.outerWidth();
      gutter = parseInt($target.css('margin-left'), 10);
      var set_width = ( newValue.length * (width + gutter) ) - gutter;
      if( newValue.length > 1 ) {
        $carousel_wrapper.css( 'width', set_width );
      } else {
        $carousel_wrapper.css( 'width', '100%' );
      }
    });

    // --------------------------------------------------------------------------------

    var $program_carousel = angular.element('.program-carousel-wrapper');
    var $carousel_wrapper = angular.element('.carousel-area ul.carousel-block');
    $carousel_wrapper.css('position', 'absolute'); // CSS로 옮길 것.
    var $btns = $program_carousel.find('.button-prev, .button-next');
    var animating = false;
    var count = 1;
    var duration = 300;

    $.each($btns, function(idx) {
      var $btn = $btns.eq(idx);
      var is_prev = $btn.hasClass('button-prev');
      var dir, callback, set_width, last_index;
      if ( is_prev ) {
        dir = '+=';
        callback = function() {
          $carousel_wrapper.children().slice(0, count).appendTo($carousel_wrapper);
        };
      } else {
        dir = '-=';
        callback = function() {
          last_index = $carousel_wrapper.children().length - (count+1);
          $carousel_wrapper.children().slice(last_index, last_index + count).prependTo($carousel_wrapper);
          $carousel_wrapper.css('left', -1 * set_width);
        };
      }

      $btn.on('click', function(e) {
        e.preventDefault();
        set_width = (width + gutter) * count;
        var len = $carousel_wrapper.children().length;
        if (!animating && len > count) {
          animating = true;
          // !is_prev && callback();
          var left_pos = parseInt($carousel_wrapper.css('left'),10);
          var d = dir + set_width;
          if ( is_prev && left_pos >= -set_width ) {
            d = 0;
          }
          if ( !is_prev && left_pos <= ( -1 * (len - 4) * set_width )) {
            d = -1 * (len - 4) * set_width;
          }
          $carousel_wrapper.animate({
            'left': d
          }, duration, function() {
            // is_prev && callback();
            // $carousel_wrapper.css('left', 0);
            animating = false;
          });
        }
      });

    }); // each

	}]);

})(this, this.angular);
