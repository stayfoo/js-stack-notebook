'use strict';
// 缓冲区操作
// 创建一个缓冲区对象 （第二个参数：缓冲区中内容的编码）
var buffer1 = new Buffer('hello world', 'utf8');
console.log(buffer1);
// 将缓冲区中的数据提取出来
console.log(buffer1.toString('utf8'));


