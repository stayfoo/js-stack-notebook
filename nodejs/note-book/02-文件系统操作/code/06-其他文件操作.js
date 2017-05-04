'use strict';

// 1. 移动文件 和 重命名
const fs = require('fs');
const path = require('path');

//1.1 移动 ： 文件路径不相同是移动
// var currentPath = path.join(__dirname, '../../../testdata/lyrics/test.txt');
// var targetPath = path.join(__dirname, '../../../testdata/test.txt');

//1.2 重命名 ：文件路径相同，文件名字不同，是重命名
// var currentPath = path.join(__dirname, '../../../testdata/test.txt');
// var targetPath = path.join(__dirname, '../../../testdata/test_1.txt');

//移动+重命名 ： 文件路径不同，文件名字不同，是移动且重命名
var currentPath = path.join(__dirname, '../../../testdata/test_1.txt');
var targetPath = path.join(__dirname, '../../../testdata/lyrics/test.txt');

fs.rename(currentPath, targetPath);


// 2. 文件追加操作

// setInterval(() => {
//     fs.appendFile(path.join(__dirname, '../../../testdata/lyrics/test.txt'), `${new Date}\n`, (error) => {
//         console.log(error);
//     });
// }, 1000);


setInterval(() => {
    fs.appendFileSync(path.join(__dirname, '../../../testdata/lyrics/test.txt'), `${new Date}\n`);
}, 1000);







