<?php
//data/getProductsByKw.php
require_once("../init.php");
@$kw=$_REQUEST["kw"];
@$pno=$_REQUEST["pno"];
$output=["count"=>0,"pageSize"=>8,"pageCount"=>0,"pno"=>0,"products"=>[]];
if($kw!=null&&$pno!=null){
	// $kw = '小米';
	// $pno = 0;
	$kws=explode(" ",$kw);
	for($i=0;$i<count($kws);$i++){
		$kws[$i]=" title like '%".$kws[$i]."%'";
    }
	$where=" where ".implode(" and ",$kws);
	$sql="select count(*) from xz_laptop $where";
	$result=mysqli_query($conn,$sql);
	$output["count"]=mysqli_fetch_row($result)[0];
    


	$output["pageCount"]=Ceil($output["count"]/$output["pageSize"]);
	$output["pno"]=$pno;
	$limit=" limit ".$output["pageSize"]*$pno.",".$output["pageSize"];
	$sql="select *, ".
"(select md from xz_laptop_pic where laptop_id=lid limit 1)"
		." as md from xz_laptop $where $limit ";
	$result=mysqli_query($conn,$sql);
	$output["products"]=mysqli_fetch_all($result,1);
}
echo json_encode($output);
?>