<?php
//1:修改响应头格式为json
header("Content-Type:application/json;charset=utf-8");
//2:获取二个参数  uname upwd
@$uname = $_REQUEST["uname"];
@$upwd = $_REQUEST["upwd"];
//3:创建二个正则表达式验证 uname upwd
$reg = '/^[a-zA-Z0-9_]{3,12}$/';
$rs = preg_match($reg,$uname);
if($rs == 0){
  die('{"code":-1,"msg":"用户名格式不正确"}');
}
$regupwd = '/^[a-zA-Z0-9_]{6,12}$/';
$rs = preg_match($regupwd,$upwd);
if($rs == 0){
  die('{"code":-1,"msg":"密码格式不正确"}');
}
//4:连接数据库
$conn = mysqli_connect("127.0.0.1","root","","mi",3306);
//5:修改数据库编码
mysqli_query($conn,"SET NAMES UTF8");
//6:创建sql
// $sql  = " SELECT count(uid) FROM xz_user ";
$sql  = " SELECT uid FROM xz_user ";
$sql .= " WHERE uname='$uname' AND upwd='$upwd'";
$rs = mysqli_query($conn,$sql);  //发送sql语句
if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
//echo 1;
$row = mysqli_fetch_row($rs);   //抓取一行结果
//7:发送sql语句并且获取返回结果
// echo 111111111
// var_dump('$row')
// $n = '1';
// print_r($row);
// print_r($row[0]);
// print $n;
// echo $n;
// var_dump($n);
if($row[0]){
  session_start();
  $_SESSION["uid"]=$row[0];
  echo '{"code":1,"msg":"登录成功","uid":'.$row[0].'}';
}else{
  echo '{"code":-1,"msg":"用户名或密码有误"}';
}
//8:输出结果
//http://127.0.0.1/