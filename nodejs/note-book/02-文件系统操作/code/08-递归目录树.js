// 递归目录树
'use strict';

const fs = require('fs');
const path = require('path');


function loaddir(target, depth, maxDepath){
    // depth  = ''
    // depth 0 = '│ '
    // depth 1 = '│ │ '
    var prefix = new Array(depth + 1).join('│ ');
    
    let fileArr = [];  // 存储目标文件夹下的：文件名字
    try {
        fileArr = fs.readdirSync(target);
        // console.log(fileArr);
    } catch (error) {
        console.log(error);
    }

    let files = []; // 存储文件
    let dirs = [];  // 存储目录

    fileArr.forEach((file) => {
        try {
            let stats = fs.statSync(path.join(target, file));
            if(stats.isDirectory()){ //目录
                dirs.push(file);
            }else if(stats.isFile()){ //文件
                files.push(file);
            } else{
            }
        } catch (error) {
            console.log(error);
        }
    }, this);

    // ┃ ━   ┣  ┗   ├ ─   ├    └  │
    dirs.forEach((dir) => {
        console.log(`${prefix}├─ ${dir}`);
        
        if(depth+1 > maxDepath) return;
        console.log('depth: ' + depth);
        // 当前是一个目录 需要深入进去
        loaddir(path.join(target,dir), depth + 1);
    }, this);

    let count = files.length - 1;
    files.forEach((file) => {
        let temp = count-- ? '├' : '└';
        console.log(`${prefix}${temp}─${file}`);
    }, this);
}


// 获取当前有没有传入目标路径 
let targetFile = path.join(__dirname, process.argv[2] || './');

loaddir(targetFile, 0, 1);


// let fileArr = []; // 存储目标文件夹下的：文件名字
// try {
//     fileArr = fs.readdirSync(targetFile);
//     // console.log(fileArr);    
// } catch (error) {
//     console.log(error);
// }

// let files = []; // 存储文件
// let dirs = [];  // 存储目录
// fileArr.forEach((file) => {
//     try {
//         let stats = fs.statSync(path.join(targetFile, file));
//         if(stats.isDirectory()){ //目录
//             dirs.push(file);
//         }else if(stats.isFile()){ //文件
//             files.push(file);
//         } else{
//         }
//     } catch (error) {
//         console.log(error);
//     }
// }, this);

// console.log(`\n`);

// // ┃ ━   ┣  ┗   ├ ─   ├    └  │
// dirs.forEach((dir) => {
//     console.log(`├─ ${dir}`);
//     load(path.join(targetFile,dir),1);
// }, this);

// let count = files.length - 1;
// files.forEach((file) => {
//     let temp = count-- ? '├' : '└';
//     console.log(`${temp}─${file}`);
// }, this);

// console.log(`\n`);

