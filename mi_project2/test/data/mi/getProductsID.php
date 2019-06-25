<?php
	//三部分一个对象返回
	//product 保存的是一个对象
	//规格对象 他是一个数组
	//图片 也是一个数组
	//返回数据结构就好了
	/*
		lid 商品编号 
		1.查商品信息$sql 连接数据库 $result  
	*/
	// data/mi/getProductsID.php
	require_once("../init.php");
	$output=[
		"product"=>null,
		// "specs"=>[],
		"pics"=>[]
	];
	@$lid=$_REQUEST["lid"];
	if($lid!=null){	//如果商品 编号不为空
		//商品列表
		// $sql="SELECT * FROM xz_laptop where lid=$lid";
		$sql="SELECT * FROM mi_product_overview";
		$result=mysqli_query($conn,$sql);
		//$输出["产品"]=我的sqli_取出_所有(结果)[0]
		$output["product"]=mysqli_fetch_all($result,1)[0];
		// print_r($output["product"]);
        //查询出你这个商品同系列的所有规格列表
        // print_r($output["product"]);
        $fid=$output["product"]["p_f_id"];
        // echo $fid;
		// $sql="SELECT lid,spec FROM mi_product_overview where family_id=$fid";
		// $result=mysqli_query($conn,$sql);
		// $output["specs"]=mysqli_fetch_all($result,1);

		//查询商品图片(laptop_id 有外键 和lid 相关联 才可以找到这个图片)
        // $sql="SELECT * FROM xz_laptop_pic WHERE laptop_id=$lid";//laptop_id=lid
        $sql="SELECT sm,md FROM mi_product_pic WHERE i_f_id=$fid";
        $result=mysqli_query($conn,$sql);
		$output["pics"]=mysqli_fetch_all($result,1);
        // print_r($output["pics"]);
	}
    echo json_encode($output);
    

    // {"product":{"lid":"5","family_id":"2","title":"\u5c0f\u7c738\u662f\u5c0f\u7c73\u516c\u53f82
    //     018\u5e745\u670831\u65e5\u53d1\u5e03\u76848\u5468\u5e74\u65d7\u8230\u624b\u673a\uff0c\u4ea6
    //     \u662f\u5c0f\u7c73\u6570\u5b57\u7cfb\u5217\u7684\u7b2c\u4e03\u4ee3\u624b\u673a\u3002\u642d\u8f
    //     7d\u9a81\u9f99845\u5904\u7406\u5668\uff0c\u62e5\u6709\u7ea2\u5916\u4eba\u8138\u8bc6\u522b\u3001\u53
    //     cc\u9891GPS\u7b49\u6280\u672f\u3002\u5177\u5907AI\u53cc\u6444\u3001\u5149\u5b66\u53d8\u7126\u548c\u51
    //     49\u5b66\u9632\u6296\u7b49\u529f\u80fd\u3002","subtitle":"\u3010i5 \u72ec\u7acb\u663e\u5361\u3011\u5168\u
    //     9ad8\u6e05\u7a84\u8fb9\u6846 8G\u5185\u5b58 256G\u56fa\u6001\u786c\u76d8 \u652f\u6301SSD\u786c\u76d8\u6269\
    //     u5bb9 \u8584\u81f314.8mm \u8f7b\u81f31.28kg\uff01AKG\u626c\u58f0\u5668\uff01","price":"4999.00","promise":"*\u90
    //     00\u8d27\u8865\u8fd0\u8d39 *30\u5929\u65e0\u5fe7\u9000\u8d27 *48\u5c0f\u65f6\u5feb\u901f\u9000\u6b3e *72\u5c0f\u65f6
    //     \u53d1\u8d27","spec":"\u301013.3\u82f1\u5bf8\u3011I5-6200U 8G 256G","lname":"\u5c0f\u7c73Air","os":"Windows 10","memory
    //     ":"8G","resolution":"\u5168\u9ad8\u6e05\u5c4f(1920*1080)","video_card":"\u5165\u95e8\u7ea7\u6e38\u620f\u72ec\u7acb\u663e\u53
    //     61","cpu":"Intel i5\u4f4e\u529f\u8017\u7248","video_memory":"1G","category":"\u8f7b\u8584\u672c","disk":"256G\u56fa\u6001","d
    //     etails":"
    //     <\/div><\/div>
    //     <\/div><\/div>
    //     <\/div><\/div>
    //     <\/div><\/div>
    //     <\/div><\/div>
    //     <\/div><\/div>
    //     <\/div><\/div>
    //     <\/div><\/div>

// <div class="content_tpl">
//     <div class="formwork">
//         <div class="formwork_img">
//             <br>
//         </div>
//         <div class="formwork_img">    
//             <img alt="" class="" src="img/product/detail/57b15612N81dc489d.jpg">
//         </div>
//     </div>
//     <div class="formwork">
//         <div class="formwork_img">
//             <img alt="" class="" src="//img20.360buyimg.com/vc/jfs/t2683/60/4222930118/169462/233c7678/57b15616N1e285f09.jpg">
//         </div>
//     </div>
//     <div class="formwork">   
//         <div class="formwork_text">    
//             技术规格请前往 www.apple.com/cn/macbook-air/specs.html 查看完整内容。
//         </div>
//     </div>
// </div>

?>