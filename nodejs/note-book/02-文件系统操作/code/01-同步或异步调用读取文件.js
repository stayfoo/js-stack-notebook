//读取文件
'use strict';

const fs = require('fs');
const path = require('path');


console.time('Async');
// 文本文件，指定编码为 'utf8'
// fs.readFile(path.join(__dirname,'../../../testdata/lyrics/number.txt'),'utf8',(err,data) => {
//     if(err) throw err;
//     console.log(data);
// });

// 不指定编码，默认获取 Buffer
fs.readFile(path.join(__dirname,'../../../testdata/lyrics/number.txt'),(err,data) => {
    if(err) throw err;
    console.log(data);
    console.log(data.toString('utf8'));
});
console.timeEnd('Async');



console.time('Sync');
try {
    var data = fs.readFileSync(path.join(__dirname,'../../../testdata/lyrics/number.txt'),'utf8');
    console.log(data);
} catch (err) {
    throw err;
}
console.timeEnd('Sync');


// 读取图片
fs.readFile(path.join(__dirname,'../../../testdata/google.png'),(err,data) => {
    if(err) throw err;
    console.log(data);
    console.log(data.toString('base64')); //获取 base64 编码
});


