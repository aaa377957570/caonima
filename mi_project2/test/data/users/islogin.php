<?php
//data/users/islogin.php
require_once("../init.php");
session_start();
@$uid=$_SESSION["uid"];
if($uid!=null){
	$sql="select uid,uname from xz_user where uid=$uid";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	echo json_encode(["ok"=>1,"uid"=>$row[0],"uname"=>$row[1]]);
}else{
	echo json_encode(["ok"=>0]);
}