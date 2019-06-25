$(".yanzhengma").click(function() {
	y = "";
	read();
});
var read = function createCode(){
	var code;
	var arr = [];
	function rn(min,max){
			var n = Math.random()*(max-min)+min;
			return Math.floor(n);
	}
	//console.log(rn(10,20));
	function rc(min,max){
			var r = rn(min,max);
			var g = rn(min,max);
			var b = rn(min,max);
			return `rgb(${r},${g},${b})`;
	}
	var c3 = document.getElementById("c3");
	var ctx = c3.getContext("2d");
	//随机背景
	ctx.fillStyle = rc(80,180);
	ctx.fillRect(0,0,100,50);
	//随机数字

	var pss = "ABCDEFGHJKLMNOP123456789";
	for(var i=0;i<4;i++){
		code = pss[rn(0,pss.length)];		
		console.log(code)					
		arr.push(code);
		//随机字体大小
		var fs = rn(30,40);
		//随机角度
		var deg = rn(-5,45);
		ctx.font = fs+"px SimHei";
		ctx.fillStyle = rc(80,180);
		ctx.textBaseline = "top";
		ctx.save();
		//平移原点
		ctx.translate(20 * i+20,10);
		//旋转
		ctx.rotate(deg*Math.PI/180);
		ctx.fillText(code,0,0);
		ctx.restore();
		//线条
		//ctx.arc(0,0,25,0.1,0.8);
		ctx.beginPath();
		ctx.arc(rn(0,100),rn(0,50),rn(15,35),Math.random()*0.5,Math.random()*0.5);
		ctx.strokeStyle = rc(80,180);
		ctx.stroke();
	}
	
	arr = arr.join("").toLowerCase();
	//arr = arr;
	console.log("arr:"+arr);
	//随机小点
	ctx.translate(0,0);
	for(var i=0;i<=10;i++){
		if(i<10){
				ctx.fillStyle = rc(80,180);
				ctx.fillRect(rn(0,100),rn(0,30),rn(3,3),rn(3,3));
		}
	}

	var yzm = $('#yzm')
	var btns = $("#login-button")
	btns.off().click(function(e){
		console.log(55555555555555555555)
		e.preventDefault();
		var uname = $("#username").val();
		var upwd = $("#pwd").val();
		var y = $("#yzm").val();
			y = y.toLowerCase();
		var reg = /^[a-z0-9]{3,12}$/i;
		var regupwd = /^[a-zA-Z0-9_]{6,12}$/;
		if(uname==''){
			$(".useruname").html("用户名不能为空");
			$(".useruname").fadeOut(1500)
			return 
		}else if(upwd==''){
			$(".userupwd").html("密码不能为空");
			$(".userupwd").fadeIn(500).fadeOut(1500)
			return 
		}
		if(!reg.test(uname)){
			$(".useruname").html("用户名格式不正确，请检查");		
			$(".useruname").fadeIn(500).fadeOut(1500)
			return;
		}
		if(!reg.test(upwd)){
			$(".userupwd").html("密码格式不正确，请检查");
			$(".userupwd").fadeIn(500).fadeOut(1500)			
			upwd = "";
			y = "";
			console.log(2222222222);
			return;
		}		
		// console.log(y==arr);
		console.log("arr"+arr);
		console.log("y"+y);
		if(y==''){
			$(".useryzm").html("验证码不能为空！");	
			$(".useryzm").fadeIn(500).fadeOut(1500)			
			y = "";
			read();
			y = "";
			upwd = "";
			return;
		}else{
			if(y!==arr){
				$(".useryzm").html("验证失败！");	
				$(".useryzm").fadeIn(500).fadeOut(1500)
				y = "";
				read();
				y = "";
				upwd = "";
				console.log(3333333333);
				return;
			}else{
				// $(".useryzm").html("验证成功！");	
				$.ajax({
					type:"post",
					url:"data/01_adminlogin.php",
					data:{uname:uname,upwd:upwd},
					success:function(data){
						console.log(data.code)
						if(data.code>0){
							//兼容购物车界面临时加入
							//var storage = window.localStorage;
							//storage["uid"] = data.uid;
							//$(".userupwd").html(data.msg);
							// sessionStorage.setItem("uname",uname);
							localStorage.setItem("uname",uname);
							alert("登录成功！");
				//            setTimeout(function(){
				//            },3000)
							var back=location.search.slice(6);
							// location.href=back;				
							location.href = "index.html";
						}else{
							// $(".userupwd").html("");
							// $(".userupwd").fadeOut(2000)
							$('#pwd').val('')
							$('#yzm').val('')
							alert(data.msg)
						}
					},
					error:function(){
						alert("网络故障，请检查s");
					}
				})
			}
		}
	})
	// var yzm = $('#yzm')
	// console.log(yzm)
	// var btns = $("#login-button")
	yzm.onkeydown=function(e){
		console.log(11111111111111111)
		// e.preventDefault()
		if(e.keycode===13){
			btns.click()
		}
	}
	// $txtSearch.onkeydown=function(e){
	// 	if(e.keycode===13){
	// 		$searchbtn.click();
	// 	}
	// }		
}
//切换登录方式
$(()=>{
    $(".nav_tabs_panel>.nav_tabs>.navtab-link").click((e)=>{
        let $tar = $(e.target);
        let $qwd=$("#login-main-form")
        let $qr=$(".tabs-con .tab_qrcon")
        $tar.addClass('now').siblings().removeClass('now');
        if($tar.html() === '账号登录'){
          console.log($tar.html());
          $qwd.removeClass('hide');
          $qr.addClass('hide');
        }else if($tar.html() === '扫码登录'){
					console.log($tar.html());
          $qwd.addClass('hide');
          $qr.removeClass('hide');
        }
    })
})


