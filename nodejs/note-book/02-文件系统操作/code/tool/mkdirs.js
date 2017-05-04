/**
 * 创建层级目录
 * 
 * 解决问题：
 * 使用 fs.mkdir(path[, mode], callback) 和 fs.mkdirSync(path[, mode]) 创建一个目录，
 * 要创建的目录所在的目录必须存在，不然报错。
 * 即：不能一次创建两层及以上目录。
 * 
 */ 
'use strict';
const fs = require('fs');
const path = require('path');

// 创建文件， 定义模块成员， 导出模块成员， 载入模块， 使用模块

function mkdirs(pathname,callback){
    // let pathname = 'demo1/demo2'; 

    // 调用者的路径
    // 作为模块，不能随便使用 __dirname 
    let root = path.dirname(module.parent.filename);
    console.log(module.parent);

    // 判断传入的是否是一个绝对路径
    pathname = path.isAbsolute(pathname) ? pathname : path.join(root,pathname);

    let relativePath = path.relative(root,pathname);
    var folders = relativePath.split(path.sep); //分割要创建的层级目录 ['demo1','demo2']

    try {
        var pre = '';
        folders.forEach((folder) => {
            var p = path.join(root,pre,folder);
            pre = path.join(pre,folder);

            // 方法一：
            if(fs.existsSync(p)){  
                return;
            }
            fs.mkdirSync(p);

            //方法二：
            // try {
            //     fs.statSync(p);
            // } catch (error) {
            //     fs.mkdirSync(p);
            // }

        });
        callback && callback(null);
    } catch (error) {
        callback && callback(error);
    }
}

module.exports = mkdirs;



/**
 * console.log(module.parent); 
 * 
Module {
  id: '.',
  exports: {},
  parent: null,
  filename: '/Users/apple/Desktop/Node/nodeLearning/doc/文件系统操作/code/09-使用mkdirs创建层级目录.js',
  loaded: false,
  children: 
   [ Module {
       id: '/Users/apple/Desktop/Node/nodeLearning/doc/文件系统操作/code/mkdirs.js',
       exports: [Function: mkdirs],
       parent: [Circular],
       filename: '/Users/apple/Desktop/Node/nodeLearning/doc/文件系统操作/code/mkdirs.js',
       loaded: true,
       children: [],
       paths: [Object] } ],
  paths: 
   [ '/Users/apple/Desktop/Node/nodeLearning/doc/文件系统操作/code/node_modules',
     '/Users/apple/Desktop/Node/nodeLearning/doc/文件系统操作/node_modules',
     '/Users/apple/Desktop/Node/nodeLearning/doc/node_modules',
     '/Users/apple/Desktop/Node/nodeLearning/node_modules',
     '/Users/apple/Desktop/Node/node_modules',
     '/Users/apple/Desktop/node_modules',
     '/Users/apple/node_modules',
     '/Users/node_modules',
     '/node_modules' ] }
 * 
 */ 
