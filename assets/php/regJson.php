<?php 

// echo '存在';

// 接收用户名，并且判断用户名是否存在
$username = $_GET['username'];
// echo $username;
// 判断是否存在
/*
	真正的服务器：链接数据库，查询该用户名是否存在
	通过数组模拟
*/
$arr = ['handsomeBoy', 'zhangsan'];

// 判断$username是否在$arr中 			JS中的判断：indexOf()
// var_dump(in_array($username,$arr));	// 最终结果是布尔值

if (in_array($username, $arr)) {
	// echo "对不起，用户名已经存在,推荐zhangsan111,lisi333,wangwu666";
	echo '{"success":1, "more": ["zhangsanIsMe","zhangsan123","zhangsan456"]}';
} else {
	// echo "恭喜你，用户名可用";
	echo '{"success":0}';
}
