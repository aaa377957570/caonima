<?php
@$h=$_REQUEST["uname"];
require_once("init.php");
if($h!=null){
	$sql="select count(uid) from xz_user where phone='$h'";
	$result=mysqli_query($conn,$sql);
	$row=mysqli_fetch_row($result);
	if($row!==0){
		echo '{"code":1,"msg":"用户名可用"}';
	}else{
		echo '{"code":-1,"msg":"用户名已被占用"}';
	}
}

