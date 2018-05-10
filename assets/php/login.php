<?php 

// 接收用户名，并且判断用户名是否存在
$username = $_GET['username'];
$password = $_GET['password'];
// 判断是否存在
/*
	真正的服务器：链接数据库，查询该用户名是否存在
	通过数组模拟
*/
$arr = ['zhangsan' => '123abc', 'handsomeBoy' => 'abcd1234', 'jack_zhang' => 'aabbcc123'];

// 定义空数组存储键
$keys = [];
foreach($arr as $key => $val) {
	array_push($keys, $key);
}
// var_dump($keys);
// echo count($keys);

if(in_array($username, $keys)) {
	if($arr[$username] == $password) {
		echo '{"success":0, "text":"用户名密码正确"}';
	} else {
		echo '{"success":1, "text":"用户名或密码错误"}';
	}
} else {
	echo '{"success":1, "text":"用户名或密码错误"}';
}
