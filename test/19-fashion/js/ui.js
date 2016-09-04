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
			link_name = "",
			link_num = "",
			_link;

		_link = "http://rovermind.github.io/test/19-fashion/fashion_" + (index+1) + ".html";


		function openScreenView(){
			$(item).removeClass('no-active').addClass('active');
			$(item).siblings().removeClass('active').addClass('no-active');
			$(item).parent().siblings().children().addClass('no-active')
			$a_view.prop('href', _link);
			$view_img.prop('src', $img_src);
			console.log(_link, index.toString());

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