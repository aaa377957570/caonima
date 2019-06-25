<?php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	// $sql="select *,(select sm from xz_laptop_pic where laptop_id=lid limit 1) as sm from xz_shoppingcart_item inner join xz_laptop on product_id=lid where user_id=$uid order by iid desc";

	
	$sql="select *,(select sm from xz_laptop_pic where laptop_id=lid limit 1) as sm from xz_shoppingcart_item inner join xz_laptop on product_id=lid 
	where user_id=$uid order by iid desc";
	
	$result=mysqli_query($conn,$sql);
	echo json_encode(mysqli_fetch_all($result,1));
}
