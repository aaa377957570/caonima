$(function(){
	var divPages=document.getElementById("pages");
	var ulList=document.getElementById("show-list");
	function load(pno=0){
		var kw=location.search.slice(4);
		kw = decodeURI(kw)
		console.log(kw)
		console.log(pno)
		$.ajax({
			type:"get",
			url:"data/products/getProductsByKw.php",
			dataType:"json",
			data:{kw,pno},
			success:function(output){
				var {products,pageCount,pno}=output;
				var html="";
				for(var p of products){
					var {lid,md,title,price}=p;
					html+=`<li>
						<a href="product_details.html?lid=${lid}">
						<a href="productdetail.html">
							<img src="${md}" alt="">
						</a>
						<p><span class="price">¥
							${parseFloat(price).toFixed(2)}
							</span>
							<a href="product_details.html?lid=${lid}">
								${title}
							</a>
						</p>
						<div>
							<span class="reduce">-</span>
							<input type="text" value="1">
							<span class="add">+</span>
							<a href="javascript:;" data-lid="${lid}" class="addCart">加入购物车</a>
						</div>
					</li>`
				}
				ulList.innerHTML=html;
				var storage = window.localStorage;
				var uid= storage["uid"];
				$cart_title.attr({"data-uid":uid});
					
				var html=`<a href="javascript:;" class="previous">上一页</a>`;
				for(var i=1;i<=pageCount;i++){
					if(i-1!=pno){
						html+=`<a href="javascript:;">${i}</a>`;
					}else{
						html+=`<a href="javascript:;" class="current">${i}</a>`;
                    }
				}
				html+=`<a href="javascript:;" class="next">下一页</a>`;
				divPages.innerHTML=html;
				if(pno==0){
					divPages.children[0].className="previous disabled";
                }
				if(pno==pageCount-1){
					divPages.lastElementChild.className="next disabled";
                }
			}
		})
	}
	load();


	divPages.onclick=function(e){
		var tar=e.target;
		if(tar.nodeName==="A"
			&&tar.className!=="current"
			&&tar.className.indexOf("disabled")==-1){
			if(tar.className.indexOf("previous")!=-1){
				var pno=divPages.querySelector(".current").innerHTML-1;
				load(pno-1);
			}else if(tar.className.indexOf("next")!=-1){
				var pno=divPages.querySelector(".current").innerHTML-1;
				load(pno+1);
			}else{
				load(tar.innerHTML-1);
			}
		}
	}

	var $cart_title=$("#cart>.title");
	$(ulList)
	.on("click",".add,.reduce,.addCart",function(){
		var $tar=$(this);
		var $input=$tar.siblings("input");
		if($tar.is(".add,.reduce")){	
			var n=parseInt($input.val());
			if($tar.is(".add")){
				n++;
			}else if(n>1){
				n--;
			}
			$input.val(n);
		}else{
			$.ajax({
				type:"get",
				url:"data/users/islogin.php",
				dataType:"json",
				success:function(res){
					if(res.ok==0){
						alert("请先登录!");
						location.href=
							"login_01.html?back="+location.href;
					}else{
						var lid=$tar.attr("data-lid");
						var count=$input.val();
						$.ajax({
							type:"get",
							url:"data/cart/addCart.php",
							data:{lid,count},
							success:function(){
								alert("加入购物车成功!");
								$input.val(1);
								loadCart();
							}
						})
					}
				}
			})
		}
	})
	
	var $cart_content=$(".cart_content");
    var $result=$(".cart-result>span>.result");
	function loadCart(){
		$.ajax({
			type:"get",
			url:"data/cart/getCart.php",
			dataType:"json",
			success:function(items){
				var html="";
				var total= 0;
				for(var {title,count,price,iid} of items){
					total+=(price*count);
					html+=`<div class="item">
						<span title="${title}">${title}</span>
						<div data-iid="${iid}">
							<span class="reduce">-</span>
							<input type="text" value="${count}">
							<span class="add">+</span>
						</div>
						<p><span>¥${(price*count).toFixed(2)}</span></p>
					</div>`;
				}
				$cart_content.html(html);
				$result.html(total.toFixed(2));
			}
		})
	}

	$.ajax({
		type:"get",
		url:"data/users/islogin.php",
		dataType:"json",
		success(res){res.ok==1&&loadCart()}
	})

	$cart_content.on("click",".add,.reduce",function(){
		var $span=$(this);
		var iid=$span.parent().attr("data-iid");
		var count=parseInt($span.siblings("input").val());
		if($span.is(".add")){
			count++;
		}else{
			count--;
		}
		$.ajax({
			type:"get",
			url:"data/cart/updateCart.php",
			data:{iid,count},
			success:function(){
				loadCart();
			}
		})
	})

   
    $cart_title.on("click","a",function(){
		var userid=$cart_title.attr("data-uid");
		$.ajax({
			type:"get",
			url:"data/cart/emptyCart.php",
            data:{userid},
			success:function(){
				loadCart();
			}	

		})	
	})

	

});