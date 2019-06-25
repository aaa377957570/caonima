//js/header.js
(function(){
	//用过下面四步将head.css样式也添加在index的网页中去
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/index-floor.css";
	document.head.appendChild(link);
	ajax({//用ajax请求HTML页面（）
		type:"get",
		url:"index-floor.html",
		success:function(html){
			//将header.html网页内容通过ajax添加到index.html网页中
			document.getElementsByClassName("floor")[0].innerHTML=html;
		}
	})
})()