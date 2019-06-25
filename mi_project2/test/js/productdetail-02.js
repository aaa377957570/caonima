//滚动事件
$(()=>{
  $(window).scroll(()=>{
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
     console.log("scrollTop:"+scrollTop)
    if(scrollTop>=150){
      $(".nav-bar-hidden").css("margin-top",0)
      $(".nav-bar-hidden").css("display","block")
    }else{
      $(".nav-bar-hidden").css("margin-top",-60)
    }
    let $proInfo=$(".pro-info")
    let offsetTop = parseInt($proInfo.offset().top)
//		console.log("off:"+offsetTop)
    let h = parseInt($proInfo.css("height"))-parseInt($('.img-con').css('height'))
//    console.log(h)
    if(scrollTop-offsetTop<0){
      $(".pro-view").css({"position":"relative","top":0})
    }else if(scrollTop-offsetTop>0&&scrollTop-offsetTop<=h){
      $(".pro-view").css({"position":"fixed","top":50})
    }else if(scrollTop-offsetTop>h){
      // $(".pro-view").css({"position":"absolute","bottom":0,"top":h})
      $(".pro-view").css({"position":"absolute","top":h})
    }
  })
})
//详情页手机图片轮播
$(function(){
	//1.自动轮播
	var i=0;
	function task(){
		i++;
		if(i>3){
			i=0;
		};
		$(".ui-wrapper .ui-viewport").eq(i).fadeIn(50).siblings().fadeOut(50);
		$(".ui-pager-list .ui-pager-item").eq(i).addClass("actived").siblings().removeClass("actived");
	}
	var timer=setInterval(task,3000);

	$(".ui-viewport,.pro-view>a").hover(function () {
		//console.log(1);
        clearInterval(timer);
        timer=null;
    },function(){
        timer=setInterval(task,3000);
    });
	$(".pro-view").on("click",".ui-prev",function(e){
		e.preventDefault();
		i--;
		if(i==-1){
			i=3;
		};
		$(".ui-wrapper .ui-viewport").eq(i).fadeIn(50).siblings().fadeOut(50);
		$(".ui-pager-list .ui-pager-item").eq(i).addClass("actived").siblings().removeClass("actived");
	});
	$(".pro-view").on("click",".ui-next",function(e){
		e.preventDefault();
		i++;
		if(i>3){
			i=0;
		};
		$(".ui-wrapper .ui-viewport").eq(i).fadeIn(50).siblings().fadeOut(50);
		$(".ui-pager-list .ui-pager-item").eq(i).addClass("actived").siblings().removeClass("actived");
	});
});
$(function(){
	var count = $(".pro-list ul li.totlePrice a").html();
	console.log(count);
		$(".step-list-ones").on("click","li",function(e){
				e.preventDefault();
				var $tar = $(this);
				var i = $tar.index();
			console.log(i);
			$tar.addClass("color-btn").siblings().removeClass("color-btn");
			$tar.children().children(".name").addClass("color-name").siblings();
			$tar.siblings().children().children(".name").removeClass("color-name");
			$tar.children().children(".price").addClass("color-price").siblings();
			$tar.siblings().children().children(".price").removeClass("color-price");
			console.log($(".step-list>.btn-block"));

			var price0 = parseInt($tar.children().children(".price").html());
			console.log(price0);
			if($("ul li").is(".active")){
				var newPrice = parseInt($(".step-list-ones .color-btn .price").html());
				var Pro = $(".step-list-ones .color-btn .name").html();
				console.log("new:"+newPrice);
				console.log("Pro:"+Pro);
			}
			$("#proList ul li .newPrice").html(`${newPrice}元`);
			$("#proList ul li a:eq(0)").html(Pro);
				console.log($("#proList ul li .newPrice").html());
			var oldPrice = parseInt($("#proList ul li del").html())
				console.log("old"+oldPrice);
			if(newPrice>oldPrice){
				$("#proList ul li del").hide()
			}else{
				$("#proList ul li del").show()	
			}
			if(i==2){
				$(".step-list>.btn-block").show();	
			}else{
				$(".step-list>.btn-block").hide();		
			}
		});
		$(".step-list-twos").on("click","li",function(e){
				e.preventDefault();
				var $tar = $(this);
				var i = $tar.index();
				$tar.addClass("color-btn").siblings().removeClass("color-btn");
				$tar.children().children(".color").addClass("color-color");
				$tar.siblings().children().children(".color").removeClass("color-color");
				if($("ul li").is(".color-btn")){
					var color = $(".step-list-twos .color-btn .color").html();
					console.log("color:"+color);
				}
				$("#proList ul li a:eq(1)").html(color);
		});
		//是否添加保险
		var selectIns = true;
		$(".list-choose .step-uls").on("click","li",function(){
			var insPrice = 0;
			if(selectIns){
				$(".list-choose .step-list .active").addClass("color-btn");
				$(".icon-checked").css({border:0,background:"#ff6700"});
				$(".icon-finish").css({border:0,background:"#ff6700"});
				console.log($(".icon-checked"));
				insPrice = parseInt($(".list-choose .step-list .active div .price").html());
				console.log(insPrice);
				selectIns = false;
			}else{
				$(".list-choose .step-list .active").removeClass("color-btn");
				$(".icon-checked").css({border:"1px solid #b0b0b0",background:"transparent"});
				$(".icon-finish").css({border:"1px solid #b0b0b0",background:"transparent"});
				insPrice = 0;
				selectIns = true;
			}
			if(insPrice>0){
				$("#proList ul li .insPrice").html(`${insPrice}+`);
			}else{
				$("#proList ul li .insPrice").html("0.00+");
			}
				var newPrice = parseInt($("#proList ul li .newPrice").html());
				var insPrice = parseInt($("#proList ul li .insPrice").html());
				var totlePrice = newPrice + insPrice;
				$(".pro-list ul li.totlePrice a").html(totlePrice);
		});
		console.log($(".list-wrap"));
		$(".step-list").click(()=>{
				var newPrice = parseInt($("#proList ul li .newPrice").html());
				var insPrice = parseInt( $("#proList ul li .insPrice").html());
				console.log("n"+newPrice);
				console.log("i"+insPrice);
				//var totlePrice = newPrice + insPrice;
				$(".pro-list ul li.totlePrice a").html(newPrice + insPrice);
		})
		$("#buyBtnBox").click(function(e){
			var $tar = $(e.target);
			location = "cart.html";
		})
	})
	//选择地址
$(function(){
	$(".switch-choose-regions").click(function(){
		$(".pro-choose-regions").show();
	})
	$(".pro-choose-regions>.icon-close").click(function(){
		$(".pro-choose-regions").hide();
	})
})
