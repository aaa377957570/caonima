//小米闪购
//倒计时
$(function(){
	setInterval(function(){
		var date = new Date();
		var thour = date.getHours()+1;
		$(".time-title").html(`${thour}:00场`);
		var minutes = date.getMinutes();
		var tminutes = 60-minutes-1;
		if(tminutes<10){
			$(".minutes").html(`0${tminutes}`);
		}else{
			$(".minutes").html(`${tminutes}`);
		}
		var seconds = date.getSeconds();
		var tseconds = 60-seconds-1;
		if(tseconds<10){
			$(".seconds").html(`0${tseconds}`);
		}else{
			$(".seconds").html(`${tseconds}`);
		}
	},1000);
});

//单品分页
$(function(){
	var liWidth = 248,liLength = 8,wait=8000,duration=1000,moved=0;
	var html='';
	for(var i=0;i<4;i++){
		html+=`<li class="good-item-${i+1}">
			<a href="#" class="thumb">
				<img src="img/products/md/phone/mix2320-220.png">
			</a>
			<h3 class="title">
				<a href="#">小米mix2</a>
			</h3>
			<p class="desc">全面屏2.0</p>
			<p class="price">3299元起</p>
		</li>
		`;
	}

	for(var i=4;i<8;i++){
		html+=`<li class="good-item-${i+1}">
			<a href="#" class="thumb">
				<img src="img/index/pic/starhuan.png">
			</a>
			<h3 class="title">
				<a href="#">小米6</a>
			</h3>
			<p class="desc">变焦双摄</p>
			<p class="price">2299元起</p>
		</li>
		`;
	}
	var $ulist = $(".goods-list");
	$ulist.html(html).css("width",liWidth*liLength);

	
	//定义动画
	function move(){
		$ulist.animate(
			{left:-liWidth*moved},
			0,
			function(){
				if(moved == liLength){
					moved = 0;
					$ulist.css("left",0);
				}
				$(".more").children(`:eq(${moved/4})`).css("color","#e0e0e0").siblings().css("color","");
			}
		)
	}

	function autoPlay(){
		timer = setInterval(function(){
			moved += liLength/2;
			move();
		},duration)
	}

	autoPlay();


	$(".goods-list li").hover(
		function(){
			clearInterval(timer);
		},
		function(){
			timer = setInterval(function(){
				moved += liLength/2;
				move();
			},wait)
		}
	);

	$(".ck-prev").click(function(e){
		e.preventDefault();
		var $tar = $(e.target);
		if(!$ulist.is(':animated')){
			if(moved == 0){
				$ulist.css("left",0);
			}
			$tar.attr("href","#");
			moved = 0;
			$ulist.stop(true);
			move();
			$tar.disabled
		}
	
	});

	$(".ck-next").click(function(e){
		e.preventDefault();
		var $tar = $(e.target);
		if(!$ulist.is(':animated')){
			if(moved == 0){
				$ulist.css("right",0);
			}
			$tar.attr("href","#");
			moved = liLength/2;
			$ulist.stop(true);
			move();
			$tar.disabled
		}
	
	});











	




});


			
			
			