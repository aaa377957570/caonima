//鼠标移入右侧导航事件
(function(){
	setTimeout(()=>{
		$(".floor .home-main #homeelec .tab-list").on("mouseenter","li",function(e){
			e.preventDefault();	
			var $tar = $(this);
			var $i = $tar.index();
			$($tar).children().addClass('active').parent().siblings().children().removeClass('active')
			var $div = $tar.parents('.home-main').find('.tab-container')
			$($div.eq($i)).addClass('active').siblings().removeClass('active')
		})
	},500)
})()