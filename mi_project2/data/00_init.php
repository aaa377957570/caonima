<?php
//学子商城后台程序输出数据都是json
header("Content-Type:application/json;charset=utf-8");
$conn = mysqli_connect("127.0.0.1","root","","mi",3306);
mysqli_query($conn,"SET NAMES UTF8");