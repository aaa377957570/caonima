<?php
//data/products/getProductById.php
require_once("../init.php");
$output=[
  "product"=>null,
  "specs"=>[],
  "pics"=>[]
];
@$lid=$_REQUEST["lid"];
if($lid!=null){
	$sql="SELECT * FROM xz_laptop where lid=$lid";
	$result=mysqli_query($conn,$sql);
	$output["product"]=mysqli_fetch_all($result,1)[0];
	$fid=$output["product"]["family_id"];
	$sql="SELECT lid,spec FROM xz_laptop where family_id=$fid";
	$result=mysqli_query($conn,$sql);
	$output["specs"]=mysqli_fetch_all($result,1);
	$sql="SELECT * FROM xz_laptop_pic WHERE laptop_id=$lid";
	$result=mysqli_query($conn,$sql);
	$output["pics"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);
