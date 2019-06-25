<?php
//data/cart/emptyCart.php
require_once("../init.php");
@$userid=$_REQUEST["userid"];

if($userid!=null){
   $sql="delete from xz_shoppingcart_item where user_id=$userid";
   mysqli_query($conn,$sql);
}