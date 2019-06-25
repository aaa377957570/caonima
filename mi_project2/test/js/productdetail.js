// 轮播图
$(()=>{
  let liWidth=560,moved = 0,liNumber = 3,$ul=$(".ui-wrapper"),$ulPager = $(".ui-pager-list"),timer= null,wait=3000
    function move () {
    $ul.animate({left:-liWidth*moved},0,function () {
      if(moved == liNumber){
        moved = 0
        $ul.css('left',0)
      }
    })
    $ulPager.children(`:eq(${moved})`).addClass("active").siblings().removeClass("active")
  }
  timer = setInterval(()=>{ moved++;move()},wait)
    $('.ui-wrapper,[data-move=left],[data-move=right]').hover(
      ()=>clearInterval(timer)
      ,
      ()=>timer=setInterval(()=>{
        moved++
        move()
      },wait)
    )
    //左右键点击切换
    $('[data-move=left]').click(e=>{
      e.preventDefault()
      clearInterval(timer)
      if(!$ul.is(':animated')){
        if(moved == 0){
          $ul.css('left',-liWidth*liNumber)
          moved = liNumber
        }
        moved--
        $ul.stop(true)
        move()
      }
    })
    $('[data-move=right]').click(e=>{
      e.preventDefault()
      clearInterval(timer)
      if(!$ul.is(':animated')){
        moved++
        $ul.stop(true)
        move()
      }
    })

}
)
//滚动事件
$(()=>{
  $(window).scroll(()=>{
    let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
     // console.log("scrollTop:"+scrollTop)
    if(scrollTop>=200){
      $(".nav-bar-hidden").css("margin-top",0)
    }else{
      $(".nav-bar-hidden").css("margin-top",-60)
    }
    let $proInfo=$(".pro-info")
    let offsetTop = parseInt($proInfo.offset().top)
    let h = parseInt($proInfo.css("height"))-parseInt($('.img-con').css('height'))
    // console.log(h)
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
//修改地址
function  loadaddress() {
    $.get("data/user/isLogin.php").then(data=>{
      var html=""
      if(data.ok==0){
        $(".pro-choose-regions .login-notic").html(`现在 <a href = "login.html">登录</a>，可自动定位`)
        // location="login.html?back="+location.go(-1)
        html=`<span class="item">北京北京市东城区永定门外街道</span>`
        $(".address-info").html(html)
      }else{
        $(".pro-choose-regions .login-notic").html(`<button>确定</button>`)
        $.get("data/user/getadd.php").then(data=>{
          // console.log(data)
          html=`<span class="item">${data[0].address}</span>`
          $(".address-info").html(html)
        })
      }
    })
}
loadaddress()
$(()=>{
  //打开
  $(".switch-choose-regions").click(()=>{
    $(".pro-choose-regions ").css("display","block")
  })
  // 保存地址
  $(".pro-choose-regions .login-notic").on("click","button",e=>{
    var  address = $(".search-input").val()
    $.ajax({
      type:"post",
      url:"data/user/address.php",
      data:{address},
      success:function (data) {
        console.log(data)
        loadaddress()
      },
      error:function () {
        alert("网络故障，请检查")
      }
    })
  })
  // 关闭
  $(".icon-close").click(()=>{
    $(".pro-choose-regions ").css("display","none");
  })
})
//选择版本
$(()=>{
  $(".step-one").on("click","li",e=>{
    var $tar=$(e.target)
    if($tar.is("span")){
      $tar = $tar.parent().parent()
    }else if($tar.is("a")){
      $tar = $tar.parent()
    }
    // console.log($tar)
    $tar.addClass("active").siblings().removeClass("active")
    var  price0 = $tar.children().children('.price').html()
    if($("ul li").is(".active")){
      var newPrice = parseInt($(".list-wrap .step-one .active .price").html())
      var pro = $(".list-wrap .step-one .active .name").html()
    }
    $("#proList ul li .newPrice").html(`${newPrice}元`)
    $("#proList ul li a:eq(0)").html(pro)

    var oldPrice = parseInt($("#proList ul li del").html())
    if(newPrice>oldPrice){$("#proList ul li del").hide()}else{$("#proList ul li del").show()}
    // console.log(oldPrice)
    if($tar.index() == 2){
      $(".step-two").children("li:eq(1)").removeClass("btn-hide disabled")
    }else{
      $(".step-two").children("li:eq(1)").addClass("btn-hide")
    }
  })
  $(".step-two").on("click","li",e=>{
    var $tar=$(e.target)
    if($tar.is("a")){$tar = $tar.parent()}
    // console.log($tar)
    $tar.addClass("active").siblings().removeClass("active")
    if($("ul li").is(".active")){
      var color = $(".list-wrap .step-two .active .color").html()
      console.log(color)
    }
    $("#proList ul li a:eq(1)").html(color)
  })
  //是否添加赠品
  var selectIns = true
	console.log(selectIns);
  $(".list-choose-small ul").on("click",()=>{
    var insPrice = 0
      if(selectIns){
        $(".list-choose-small ul li").addClass("active")
        $(".icon_checkbox").css("border","none").children("em").css("display","block")
        $(".icon-checked").css("border","none").children("em").css("display","block")
        $(".list-choose-small ul .name").css("color","#ff6700")
        insPrice = parseInt($(".list-choose-small ul li .price").html())
        selectIns=false
      }
      else{
        $(".list-choose-small ul li").removeClass("active")
        $(".icon_checkbox").css("border","1px solid #b0b0b0").children("em").css("display","none")
        $(".icon-checked").css("border","1px solid #b0b0b0").children("em").css("display","none")
        $(".name").css("color","#333")
        insPrice = 0
        selectIns = true
      }
    // console.log(insPrice)
    if(insPrice>0){
      $("#proList ul li .insPrice").html(`${insPrice}+`)
    }
    else{
      $("#proList ul li .insPrice").html("")
    }

  })
  //计算小计
  $(".list-wrap").click(()=>{
    var newPrice = parseInt($('#proList li .newPrice').html())
    console.log(newPrice)
    if($("#proList li .insPrice").html()){
      var insPrice = parseInt($("#proList li .insPrice").html())
    }else{
      var insPrice =0
    }
    // console.log(insPrice)
    var totlePrice = newPrice + insPrice
    // console.log(totlePrice)
    $('.totlePrice a').html(totlePrice)
  })
})
$("#buyBtnBox").click(e=>{
  var $tar= $(e.target)
  location = "cart.html"
})
