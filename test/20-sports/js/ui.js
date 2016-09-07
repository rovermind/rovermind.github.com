(function(global, $){
	"use strict";

	var $wrap = $('.landing-wrap'),
		$view_ul = $wrap.find('ul'),
		$view_li = $wrap.find('li'),
		$view_a = $wrap.find('a'),
		$a_view = $('<a href="#" target="_blank" class="view"></a>'),
		$a_view_close = $('<a href="#" class="close">&#x2715;</a>'),
		$view_img = $('<img src="" class="view-img"/>'),
		$view_area = $('<div class="view-area"></div>');

	$view_a.on({
		'mouseenter focus': function(){
			// 팝업 뷰 이미지 조합
			$view_img.appendTo($a_view);
			$a_view.appendTo($view_area);
			$a_view_close.appendTo($view_area);
			$view_area.appendTo($wrap);
		}
	});

	$view_li.each(function(index, item){
		var $this = $(this),
			$a = $this.find('a'),
			$img_src = $this.find('img').prop('src'),
			link_name = "01_sign_up, 02_sign_in, 03_login, 04_intro, 05_preference_phone, 06_preference, 07_profile_filled, 08_profile, 09_wallktrough, 10_wallktrough_2, 11_wallktrough_3, 12_wallktrough_4, 13_home, 14_home_menu, 15_shop, 16_product, 17_product_2, 18_checkout, 19_balance, 20_blog".split(', '),
			link_num = "",
			_link;

		_link = "http://rovermind.github.io/test/20-sports/" + link_name[index] + ".html";


		function openScreenView(){
			$(item).removeClass('no-active').addClass('active');
			$(item).siblings().removeClass('active').addClass('no-active');
			$(item).parent().siblings().children().addClass('no-active')
			$a_view.prop('href', _link);
			$view_img.prop('src', $img_src);
			// console.log(link_name[index]);

			$a_view_close.on('click', function(){
				$(this).parent('.view-area').remove();
			});
		};

		$a.on( 'mouseenter focus', openScreenView );

		$wrap.on({
			'mouseleave' : function(){
				$(item).siblings().removeClass('no-active');
			}
		});
	});

})(this, this.jQuery);