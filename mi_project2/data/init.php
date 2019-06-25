<?php
#整个项目的初始化页面
#包含所有其它页面都共同需要的代码


#连接到指定的数据库
$conn = mysqli_connect('127.0.0.1', 'root', '', 'mi', 3306);
#设置一下客户端连接服务器所用的字符集
mysqli_query($conn, "SET  NAMES  UTF8");

