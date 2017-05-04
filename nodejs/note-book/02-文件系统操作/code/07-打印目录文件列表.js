'use strict';

const fs = require('fs');
const path = require('path');
require('./dateFormat.js'); 

// 获取当前有没有传入目标路径
var targetFile = path.join(__dirname, process.argv[2] || './');

fs.readdir(targetFile,(err,files) => {
    console.log(files);
    // files 集合元素：文件、目录

    files.forEach((file) => {
        console.time(file);
        fs.stat(path.join(targetFile,file), (err,stats) => {
            console.log(`${stats.mtime.format('yyyy-MM-dd HH:mm') }\t${stats.size}\t${file}\t`);
            console.timeEnd(file);
        });
    }, this);
    
});


