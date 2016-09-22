window.setTimeout('location.reload();', 63000)

var batman = $('#batman'),
	batSignal = $('#bat-signal'),
	pLocs = [0, -138.34, -207.51, -276.68, -345.85, -415.02, -484.19, 553.36, 622.53, 691.7],
	curFrm = 0,
	lastStep = 0,
	animationCycle, backPosY;

skrollr.init({
	beforerender: function(o){
		if(o.curTop < 10000){
			animationCycle=7;
			backPosY='0px';
		}else{
			animationCycle=4;
			backPosY='-207px';
		}
		
		if(o.curTop > lastStep + 150){
			if (curFrm>=animationCycle-1){curFrm=-1;}
			batman.css('background-position', pLocs[++curFrm] + 'px ' + backPosY);
			lastStep=o.curTop;
			
			
		}else if(o.curTop < lastStep - 50){
			if (curFrm<=0){curFrm=animationCycle;}
			batman.css('background-position', pLocs[--curFrm] + 'px ' + backPosY);
			lastStep = o.curTop;

		}
	},
});

$(document).on('keydown', function(e) {
	if (e.which === 39) {
		// $(window).scroll();
	} else if (e.which === 37) {
		
	}
})

$(window).on('scroll', function(){
    skrollr.get().refresh();
})