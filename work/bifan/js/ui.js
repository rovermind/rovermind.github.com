(function(global, $) {
	'use strict';

	var module = (function() {
		var self = {

			'config': {

			},

			'init': function(options) {
				$.extend( self.config, options );
				self.gnb();
				self.lnb();
				self.openSearchBar();
				self.slideQuickMenu();
				self.mainCarousel();
				self.toggleList($('.select-area'));
				self.toggleList($('.family-site'));
				self.toggleTabMenu();
				self.programCarousel();
				self.rollingSponsorBanner();

			},

			'gnb': function() {
				var $menu = $('.gnb-depth1 > li > a');

				$menu.on('mouseenter focus', function(e) {
					var $this = $(this),
						$list = $this.parent(),
						$depth2 = $this.next();

					$depth2.show();
					$this.parent().siblings().find('div').hide();

					($depth2, $('.gnb-area-wrap')).on('mouseleave blur', function() {
						$depth2.hide();
						$this.children('div').hide();
						$('li.big').find('img').attr('src','images/common/big.jpg')

					});

					if ( $this.parent('li').hasClass('big')) {
						$('li.big').find('img').attr('src','images/common/big02.jpg')
					} else {
						$('li.big').find('img').attr('src','images/common/big.jpg')
					}
				})
			},

			'lnb': function() {
				var $menu = $('.lnb-depth1 > li > a');

				$menu.on('mouseenter focus', function(e) {
					var $this = $(this),
						$li = $this.parent(),
						$depth2 = $this.next();

					if ( !$li.hasClass('more') ) {
						console.log('하위메뉴 없음	')
					} else {
						$li.addClass('active');
						$this.css('background-image', 'url(images/common/lnb_plus_hover.png)');
						$depth2.slideDown();

						($depth2, $('.lnb')).on('mouseleave blur', function() {
							$li.removeClass('active');
							$this.css('background-image', 'url(images/common/lnb_plus.png)');
							$depth2.slideUp();
						});
					}

					e.preventDefault();
				})

				$menu.on('click', function(e) {
					console.log(e);
					$('.lnb-depth1 > li').removeClass('active');
					$(this).parent().addClass('active');
				})

			},

			'openSearchBar': function() {
				var $button = $('.unb-menu .btn-search'),
					$img = $button.find('img'),
					$li = $button.parent('li'),
					$search_area = $button.next();

				$button.on('click', function(){
					if ( $button.attr('data-click-state') == 1 ) {
						$button.attr('data-click-state', 0)
						$img.attr('src','images/common/close_btn.jpg');
						$li.css('border-width','0');
						$search_area.show()
					} else {
						$button.attr('data-click-state', 1)
						$img.attr('src','images/common/search_btn01.jpg');
						$li.css({'border-left-width': '1px', 'border-right-width': '1px'});
						$search_area.hide()
					}
				})
			},

			'slideQuickMenu': function() {
				var $quick_menu = $('.quick-menu'),
					$quick = $quick_menu.find('.toggle a');

				$quick.on('click', function(e) {
					if ( $quick.attr('data-click-state') == 1 ) {
						$quick.attr('data-click-state', 0)
						$quick_menu.css('right', 0);
						$quick.find('img').attr('src','images/common/quick_close.png')
						$('.top img').attr('src','images/common/top_btn.jpg')
					} else {
						$quick.attr('data-click-state', 1)
						$quick_menu.css('right', '-97px');
						$quick.find('img').attr('src','images/common/quick_open.png')
						$('.top img').attr('src','images/common/top_btn02.jpg')
					}

					e.preventDefault();

				})

				$('.top').on('click', function(e){
					$('html, body').animate({ scrollTop: 0 }, 'slow')

					e.preventDefault();
				})
			},

			'mainCarousel': function(e) {
				$('#main-slider')
					.css({
						width: '1076px', height: '416px'})
					.unslider({
						autoplay: true,
						animation: 'fade',
						nav: function() {
							return '';
						},
						arrows: {
							prev: '<a href="#" class="button-prev"><img src="images/main/arrow01.png" alt="이전 프로그램 보기"></a>',
							next: '<a href="#" class="button-next"><img src="images/main/arrow02.png" alt="다음 프로그램 보기"></a>',
							stop: '<a href="#" class="button-pause"><img src="images/main/pause_btn.png" alt="일시 정지"></a>',
							start: '<a href="#" class="button-play"><img src="images/main/start_btn.png" alt="재생하기"></a>'
						},
						activeClass: 'active'
					});

				$('<a/>').appendTo('.main-carousel-wrapper .unslider-nav li');
				$('.button-pause').appendTo('.main-carousel-wrapper .unslider-nav');
				$('.button-play').appendTo('.main-carousel-wrapper .unslider-nav').hide();

				$('.button-pause').on('click', function(e) {
					$(this).hide();
					$('.button-play').show();

					e.preventDefault();
				});

				$('.button-play').on('click', function(e) {
					$(this).hide();
					$('.button-pause').show();

					e.preventDefault();
				});

				$('.button-prev').on('click', function(e) {
					e.preventDefault();
				})

				$('.button-next').on('click', function(e) {
					e.preventDefault();
				})
			},

			'toggleList': function(selector) {
				var $select = $(selector).find('>a'),
					$list = $select.next('ul');

				$select.on('click', function(e) {
					$list.slideToggle('fast');

					$list.find('a').on('click', function(e) {
						$select.text( $(this).text());
						$list.slideUp('fast');

						e.preventDefault();
					});

					selector.on('mouseleave', function() {
						$list.slideUp('fast');
					})

					e.preventDefault();
				});

			},

			'toggleTabMenu': function(idx) {
				var idx = idx || 0,
					$tabmenu = $('.tabmenu-area li'),
					$panel = $('.panel'),
					$active = $tabmenu.eq(idx);

				$panel.eq(idx).show();

				$tabmenu.on('click', function(e) {
					if ( $active !== null ) {
						$active.removeClass('active');
						$panel.eq(idx).hide();
					}

					$active = $(this);
					idx = $(this).index();

					$active.addClass('active');
					$panel.eq(idx).show();
					e.preventDefault();

				});
			},

			'programCarousel': function() {
				// $('#program-slider')
				// 	// .css({width: '966px', height: '344px'})
				// 	.unslider({
				// 		nav: function() {
				// 			return '';
				// 		},
				// 		arrows: {
				// 			prev: '<a href="#" class="button-prev"><img src="images/main/arrow03.png" alt="이전 프로그램 보기"></a>',
				// 			next: '<a href="#" class="button-next"><img src="images/main/arrow04.png" alt="다음 프로그램 보기"></a>',
				// 			stop: '<a href="#" class="program-button-pause"><img src="images/main/pause_btn.png" alt="일시 정지"></a>',
				// 			start: '<a href="#" class="program-button-play"><img src="images/main/start_btn.png" alt="재생하기"></a>'
				// 		},
				// 		activeClass: 'active'
				// 	});

				// $('<a/>').appendTo('.program-carousel-wrapper .unslider-nav li');
				// $('.program-button-pause').appendTo('.program-carousel-wrapper .unslider-nav');
				// $('.program-button-play').appendTo('.program-carousel-wrapper .unslider-nav').hide();

				// $('.program-button-pause').on('click', function(e) {
				// 	$(this).hide();
				// 	$('.program-button-play').show();

				// 	e.preventDefault();
				// });

				// $('.program-button-play').on('click', function(e) {
				// 	$(this).hide();
				// 	$('.program-button-pause').show();

				// 	e.preventDefault();
				// });
			},

			'rollingSponsorBanner': function() {
				var $scope = $('.sponsor-area-wrap'),
						$control = $scope.find('.sponsor-area > a'),
						$slide = $scope.find('.carouse-area'),
						$interval,
						namecode = {
							'637': 'Kamill',
							'0421': 'DFI',
							'0489': '경기콘텐츠진흥원',
							'0498': '영화진흥위원회',
							'4411': 'Estrella',
							'5554': 'DHL',
							'6105': '코코믹스',
							'6220': 'BOBBYBOX',
							'6319': 'UCC Coffee',
							'6333': 'Bugs Off',
							'6343': '풀무원',
							'6353': '초정탄산수',
							'6410': '여명808',
							'6421': 'Faith in Face',
							'04239': 'UNIFRANCE',
							'04253': 'Embassy of Sweden',
							'04410': '일본국제교류기금 서울문화센터',
							'04425': '부천희망재단',
							'04445': '부천시민미디어센터',
							'04456': '(사)한국예총부천지부',
							'04513': '부천문화원',
							'04525': '부천문화재단',
							'04558': '부천상공회의소',
							'04723': '성공회대학교',
							'04734': '부천대학교',
							'04752': '가톨릭대학교',
							'04820': '한국만화영상진흥원',
							'04831': '한국문화예술위원회',
							'04845': '한국에너지공단',
							'04936': '판타지아 부천',
							'04947': '굿모닝 경기',
							'04956': '문화체육관광부',
							'43652': 'LG 하이엔텍',
							'44040': 'KB국민은행',
							'44116': 'KEB하나은행',
							'44130': '순천향대학교 부천병원',
							'44142': 'FAIRCHILD',
							'44155': '호로요이',
							'55432': '칸투칸',
							'55519': '해피런',
							'55530': '웅진플레이도시',
							'61016': '생각과자',
							'61027': '명가모',
							'61040': '해품장',
							'61054': 'CJ 올리브네트웍스',
							'61110': 'biznetpia',
							'61135': 'TOUR BUCKET',
							'61150': '고려호텔',
							'64832': 'NOON',
							'65213': 'THE HYUNDAI',
							'65320': 'ip tech'
						};

				for (var code in namecode) {
					var $banner = $('<a href="#" class="sponsor-banner"></a>'),
							$img = $('<img/>');

					$img.attr({
						'src': 'images/uploads/info/sponsor_info_1201606211' + code + '.jpg',
						'alt': namecode[code]
					})

					$img.appendTo($banner);
					$banner.appendTo('.sponsor-area-wrap .carousel-area');
				}

				var move_type = 0; 	// moveType (0:left / 1:right)
				var move_speed = 3000;	// 이동시간간격 3초
				var move_work = false;	// 움직이는 작업중 다시 명령 받지 않음
				var move_pause = false; 	// 일시정지 flag

				$('.btn-play').hide();

				$('.btn-prev').on('click', function(e) {
					move_type = 0;
					e.preventDefault();
				});

				$('.btn-next').on('click', function(e) {
					move_type = 1;
					e.preventDefault();
				});

				$('.btn-pause').on('click', function(e) {
					move_pause = true;
					$(this).hide();
					$('.btn-play').show();
					e.preventDefault();
					console.log('멈춤')
				});

				$('.btn-play').on('click', function(e) {
					goMove();
					$(this).hide();
					$('.btn-pause').show();
					e.preventDefault();
					console.log('재생')
				});

				function imgMove() {
					if( move_work === false) {
						// 0d\일경우 left방향
						if (move_type === 0) {
							// 맨처음 이미지의 폭
							var $width = $('.sponsor-banner:first').width();
							// 롤링마지막에 맨처음의 a태그 추가
							$(".sponsor-area .carousel-area")
								.append("<a href=\"" + $(".sponsor-banner:first")
									.attr("href") + "\" class=\"" + $(".sponsor-banner:first")
									.attr("class") + "\">" + $(".sponsor-banner:first").html() + "</a>");
							// 맨처음이미지를 왼쪽으로 이동시킨다.
							$('.sponsor-banner:first').animate({marginLeft: -$width}, {duration: move_speed, step: function() {
							// 이동중 만약 일시정지 flag가 true라면
								if (move_pause === true) {
									// 이동을 멈춘다
									$(this).stop();
								}
							}, complete: function() {
								// 이동을 마친후 첫번째 a태그를 지워버린다
								$(this).remove();
								// 이미지 움직이는것을 다시 실행
								imgMove();
								}
							});
						} else {
							// 마지막 a태그의 폭
							var $width = $('.sponsor-banner:last').width();
							// a태그 앞에 마지막의 a태그를 생성한다 단 스타일은 마지막 a태그의 폭만큼 빼준다
							$("<a href=\"" + $(".sponsor-banner:last")
								.attr("href") + "\" class=\"" + $(".sponsor-banner:last")
								.attr("class") + "\" + style=\"margin-left:-" + $width + "px\">" + $('.sponsor-banner:last').html()+ "</a>")
								.insertBefore('.sponsor-banner:first');
							// 맨처음 a태그의 margin-left를 다시 0으로 맞춰준다.
							$('.sponsor-banner:first').animate({marginLeft: 0}, {duration: move_speed, step: function() {
								// 이동중 만약 일시정지 flag가 true라면
								if (move_pause === true) {
									// 이동을 멈춘다
									$(this).stop();
								}
							}, complete: function() {
							// 이동을 마친후 마지막 a태그를 지워버린다
							$(".sponsor-banner:last").remove();
								// 이미지 움직이는것을 다시 실행
								imgMove();
								}
							});
						}
					}
				}
				function goMove() {
					// 일시정지가 풀려있을 경우를 대비하여 일시정지를 풀러준다
					move_pause = false;
					// 0d\일경우 left방향
					if (move_type === 0) {
						imgMove();
					} else {
						$('.sponsor-banner:first').animate({marginLeft: 0},{duration: move_speed, step: function() {
							// 이동중 만약 일시정지 flag가 true라면
							if (move_pause === true) {
								// 이동을 멈춘다
								$(this).stop();
							}
						}, complete: function() {
							// 이동을 마친후 마지막 a태그를 지워버린다
							//$(".RollDiv > div > a:last").remove();
							// 이미지 움직이는것을 다시 실행
							imgMove();
							}
						});
					}
				}
				imgMove();
			}
		};

		// this is the "revealed" part of the module
		return {
		    init: self.init
		};

	})();


module.init()

})(this, this.jQuery);
