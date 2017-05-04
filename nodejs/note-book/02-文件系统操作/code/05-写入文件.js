// 写入文件
'use strict';
const fs = require('fs');
const path = require('path');

var filename = path.join(__dirname,'../../../testdata/lyrics/test.txt');
// 没有文件，会自动创建
// 写入已有文件，会覆盖原内容
// 直接写入对象： [object Object]
// JSON.stringify() json 序列化
// JSON.parse() json 反序列化
var data = JSON.stringify({'code':'200'});
fs.writeFile(filename,data,(err) => {
    if(err){
        // 读取文件：是文件不存在才报错
        // 意外错误
        // 文件权限问题
        // 文件夹找不到 （不会自动创建文件夹）
        console.log(err);
    }else{
        console.log('success');
    } 
});


/**
 * 写入报错情况：
 情况一：目录找不到
{ Error: ENOENT: no such file or directory, open '/Users/aibdai/Desktop/Node/nodeLearning/testdata/lyric/test.txt'
    at Error (native)
  errno: -2,
  code: 'ENOENT',
  syscall: 'open',
  path: '/Users/aibdai/Desktop/Node/nodeLearning/testdata/lyric/test.txt' }

情况一：没有权限
{ Error: EACCES: permission denied, open '/Users/aibdai/Desktop/Node/nodeLearning/testdata/lyrics/test.txt'
    at Error (native)
  errno: -13,
  code: 'EACCES',
  syscall: 'open',
  path: '/Users/aibdai/Desktop/Node/nodeLearning/testdata/lyrics/test.txt' }
 */


