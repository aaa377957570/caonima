$(".yanzhengma").click(function() {
	y = " ";
	read();
});
var read = function createCode(){
	var code;
	var arr = [];
	function rn(min,max){
			var n = Math.random()*(max-min)+min;
			return Math.floor(n);
	}
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
	//随机小点
	ctx.translate(0,0);
	for(var i=0;i<=10;i++){
		if(i<10){
				ctx.fillStyle = rc(80,180);
				ctx.fillRect(rn(0,100),rn(0,30),rn(3,3),rn(3,3));
		}
	}
	$("#login-button").click(function(e){
		e.preventDefault();
		var uname = $("#username").val();
		var upwd = $("#pwd").val();
		var y = $("#yzm").val();
			y = y.toLowerCase();
		var reg = /^[a-z0-9]{3,12}$/i;
		var regupwd = /^[a-zA-Z0-9_]{6,12}$/;
		if(!reg.test(uname)){
			$(".useruname").html("用户名格式不正确，请检查");		
			return;
		}
		if(!reg.test(upwd)){
			$(".userupwd").html("密码格式不正确，请检查");
			upwd = " ";
			y = " ";
			return;
		}		
		if(y!==arr){
			$(".useryzm").html("验证通过");	
			y = " ";
			read();
			y = " ";
			upwd = " ";
		}
		$.ajax({
			type:"post",
			url:"data/users/login.php",
			data:{uname:uname,upwd:upwd},
			success:function(data){
				if(data.code>0){
					var storage = window.localStorage;
					storage["uid"] = data.uid;
					alert("登录成功!");
					var back=location.search.slice(6);
					location.href=back;
				}else{
					$(".userupwd").html("");
				}
			},
			error:function(){
				alert("网络故障，请检查");
			}
		})
	})
}



