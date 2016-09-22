(function(global, $){
  'use strict';

  new WOW().init();

  $('.section-jump.back').on('click', function(e){
  	$('html, body').animate({ scrollTop: 0 }, 1400 );
		e.preventDefault();
   });

   $('.section-jump.go').on('click', function(e){
 		$('html, body').animate({ 
		scrollTop: $(document).height()-$(window).height()}, 1400 );
		e.preventDefault();
   });
  
})(this, this.jQuery);
