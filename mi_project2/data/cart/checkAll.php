<?php
//data/cart/checkAll.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
@$checked=$_REQUEST["checked"];
if($uid!=null&&$checked!=null){
	$sql="update xz_shoppingcart_item set is_checked=$checked where user_id=$uid";
	mysqli_query($conn,$sql);
};