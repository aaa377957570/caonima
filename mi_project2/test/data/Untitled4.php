<?php
//1:修改响应头格式为json
header("Content-Type:application/json;charset=utf-8");
//2:获取二个参数  uname upwd
//2.11 获取用户输入验证码
@$yzm = $_REQUEST["yzm"];
//2.12 获取php程序生成验证码
session_start();
$code = $_SESSION["code"];
//2.13 比较内容是否相同
//2.14 不同停止
if($code != $yzm){
    die('{"code":-1,"msg":"验证码有误"}');
}
@$uname = $_REQUEST["uname"];
@$upwd = $_REQUEST["upwd"];
//3:创建二个正则表达式验证 uname upwd
$reg = '/^[a-zA-Z0-9_]{3,12}$/';
$rs = preg_match($reg,$uname);
if($rs == 0){
  die('{"code":-1,"msg":"用户名格式不正确"}');
}
$regupwd = '/^[a-zA-Z0-9_]{8,12}$/';
$rs = preg_match($regupwd,$upwd);
if($rs == 0){
  die('{"code":-1,"msg":"密码格式不正确"}');
}
//4:连接数据库
$conn = mysqli_connect("127.0.0.1","root","","xz",3306);
//5:修改数据库编码
mysqli_query($conn,"SET NAMES UTF8");
//6:创建sql
$sql  = " SELECT count(uid) FROM xz_admin ";
$sql .= " WHERE uname='$uname' AND upwd=md5('$upwd')";
$rs = mysqli_query($conn,$sql);  //发送sql语句
if(mysqli_error($conn)){
  echo mysqli_error($conn);
}
//echo 1;
$row = mysqli_fetch_row($rs);   //抓取一行结果
//7:发送sql语句并且获取返回结果
if($row[0]=="1"){
  echo '{"code":1,"msg":"登录成功"}';
}else{
  echo '{"code":-1,"msg":"用户名或密码有误"}';
}
//8:输出结果
//http://127.0.0.1/