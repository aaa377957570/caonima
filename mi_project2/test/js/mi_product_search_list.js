$(function(){
    function onload(pno,order){
        var golist = $('.goods_list_box .goods_list')
        // var boxs = $('.goods_list_box')
       var kw = window.location.search.slice(4)
       kw = decodeURI(kw)
       console.log(kw)
       $.ajax({
        type:'get',
        url:'data/mi/getMiProductsByKw.php',
        dataType:'json',
        data:{kw,pno,order},
        success:function(data){
            // console.log(data)
            // console.log(data.products.length)
            var {products,pageCount,pageSize,pno,order}=data
            var le = products.length
            var html = ''
            if(le>0){
                // {{each list item}}
                products.forEach(function(item,i){
                    // console.log(item)
                    // console.log(item.img_type)
                    var s = ' '
                    var srcs = item.p_name+s+item.individuality+s+item.memory+'+'+item.disk
                    var detail = item.p_name+s+item.individuality+s+item.memory+s+item.disk+s+item.color
                    var lis= ''
                    // console.log(srcs)
                    item.pics.forEach(function(val,v){
                        // console.log(val.src+srcs+s+val.i_color+s+1)
                        lis += `
                        <li>
                            <a href="#">
                                <img src="${val.src+srcs+s+val.i_color+s+1}.jpg" alt="">
                            </a>
                        </li>                                              
                        `
                    })                    
                    html += `
                    <div class="goods_item">
                        <div class="figure figure_img">
                            <a href="#">
                                <img src="img/mi_product/src/${srcs+s+item.color+s+1}.jpg" alt="">
                            </a>
                        </div>
                        <h2 class="title">
                            <a href="#">${detail}</a>
                        </h2>
                        <p class="pirce">${item.price}元</p>
                        <div class="thumb">
                            <ul class="thumb_list">
                                ${lis}
                            </ul>
                        </div>
                        <div class="flags">
                            <span class="gift">${item.is_GIFT}</span>
                            <span class="amortize" style="${item.is_amortize?'':'display:none'}">${item.is_amortize}</span>
                        </div>
                        <div class="notice"></div>
                    </div>                        
                    `
                })    
                // golist.html(html)  
                var pages = ''
                pages += `
                <div class="xm_pagenavi" style="${pageCount>0?'display:block':'display:none'}">
                    <span class="numbers first">
                        <span class="iconfont">&lt;</span>
                    </span>
                    <span class="numbers current">1</span>
                    <a href="#" class="numbers" data-pager="2">2</a>
                    <a href="#" class="numbers" data-pager="3">3</a>
                    <a href="#" class="numbers" data-pager="4">4</a>
                    <a href="#" class="numbers last">
                        <span class="iconfont">&gt;</span>
                    </a>
                </div>            
                `
                $('.goods_list_box .goods_listPages').html(pages)             
            }else{
                html += `
                    <div class="box_bd"><p>对不起，对应筛选组合下没有找到商品</p><div>
                `     
                // $('.goods_list_box').html(html)   
            }
            golist.html(html)  

        },error:function(error){
            console.log(error)
        }
       })
    }
    // var order = '综合'
    onload(0,'综合')
    setTimeout(()=>{
        $('.goods_item .thumb .thumb_list li').hover(function(e){
            e.preventDefault();	
            var $this = $(this);
            var src = $this.children().children()
            src = src.attr('src')
            var img = $this.parents('.goods_item').find('.figure_img a img')
            img.attr('src',src)
        })
        $('.search_reuslt .reuslt_order .order_list_box .order_list').on('click','li a',function(e){
            e.preventDefault();
            var tar = e.target
            console.log($(this))
            var order = $(this).html()
            console.log(order)
            console.log(tar.nodeName)
            if(order){
                onload(0,order)

            }
        })
    },100)
});