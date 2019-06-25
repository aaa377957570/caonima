//js/header.js
(function(){
	//用过下面四步将head.css样式也添加在index的网页中去
	var link=document.createElement("link");
	link.rel="stylesheet";
	link.href="css/header.css";
	document.head.appendChild(link);
	ajax({//用ajax请求HTML页面（）
		type:"get",
		url:"header_wh.html",
		success:function(html){
			//将header.html网页内容通过ajax添加到index.html网页中
			document.getElementsByClassName("header")[0].innerHTML=html;
			var $searchbtn =  $("#search-btn");
			var $txtSearch = $("#search-input");
			$searchbtn.click(function(e){
				e.preventDefault();
				var inputstr = $txtSearch.val().trim();
				if(inputstr!=""){
					location.href="mi_products_search_list.html?kw="+$txtSearch.val().trim();
				}else{
					$txtSearch.focus();
				}
			});
			$txtSearch.onkeydown=function(e){
				if(e.keycode===13){
					$searchbtn.click();
				}
			}	
		}
	})
	//登录状态切换

	// $(function(){
		setTimeout(()=>{
			var uname = localStorage.getItem("uname");
			console.log("u"+uname);
			if(uname!==null){
				$("#welcomeList").show();
				$("#welcomeList").children(".user-name").html("欢迎:"+uname+"!");
			}else{
				$("#welcomeList").hide();		
			}
			//退出登录操作
	
			$(".user-menu li .logout").off().click(function(){
				$("#welcomeList").hide();
				alert("退出登录成功！");
				localStorage.removeItem("uname");
			})
		},100)
	// })	
})()