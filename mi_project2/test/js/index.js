////登录状态切换
//$(function(){
	//var uname = sessionStorage.getItem("uname");
	//console.log(uname);
	//if(uname){
				////sessionStorage.setItem("uname");
			//var welcome = document.getElementById("welcomeList");
			//$("#welcomeList").children(".user-name").html("欢迎:"+uname+"!");
							//$("#welcomeList").show();
	//}
		//sessionStorage.removeItem("uname");
//})
////退出登录操作
//$(".user-menu li .logout").click(function(){
	//alert("退出登录成功！");
	//sessionStorage.removeItem("uname");
	//$("#welcomeList").hide();
//})

//楼层事件
$(function(){
	$(window).scroll(function(){
		var scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			// console.log("scrollTop:"+scrollTop);
		//scrollTop获得的是html页面的滚动距离
		$("#lift>.lift_list").on("click","li",function(e){
			e.preventDefault();
			var $tar = $(this);
			var i =$tar.index();
			$tar.addClass("lift_item_on").siblings().removeClass("lift_item_on");
		})
			var $f1 = $(".home-main:first");
			// console.log($f1);
		if($f1.length>0){
			var offsetTop = $f1.offset().top;
			//offset().top获得的是当前元素距离HTML页面最顶边的高度
			console.log("offTop:"+offsetTop);
			if(offsetTop <= (scrollTop+innerHeight/2)){//635/2
				console.log("innnerHeight:"+innerHeight);
				//innerHTML指的是整个网页窗口的高度
				$("#lift").show()
			}else{
				$("#lift").hide()
			}
			var $floor = $(".home-main");
			for(var i=0;i<$floor.length;i++){
				console.log("i:"+i);
				var $f = $($floor[i])
					console.log("$f:"+$f);
				if($f.offset().top>(scrollTop+innerHeight/2))
					break;
			}
			$(`#lift>ul>li:eq(${i-1})`)
				.addClass("lift_item_on")
				.siblings().removeClass("lift_item_on")
			$("#lift>ul").on("click","a.lift_btn",function(){
				let $a = $(this)
				let i = $a.parent().index()
				let offsetTop = $(`.home-brick-box:eq(${i})`).offset().top
				$("html").stop(true).animate({
					scrollTop:offsetTop-50
				},500)
			})			
		}
	})
})
