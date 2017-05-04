'use strict';
//基本的读取文件
// 所有的文件操作全部基于 fs 模块
const fs = require('fs');
// 无论是同步操作还是异步操作，都必须使用绝对路径的形式操作
const path = require('path');

// 同步的方式读取一个文本文件
try {
    const content = fs.readFileSync(path.join(__dirname,'../testdata/lyrics/友谊之光.lrc'));
    console.log(content);
} catch (error){
    throw error;
}

// 为什么打印的是 <Buffer 
