var fs = require('fs');
fs.readFile('./fs-readFile.js', (err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

/**
 * 以二进制的模式读取了文件的内容，data的值是Buffer对象。
bogon:code apple$ node fs-readFile.js 
<Buffer 76 61 72 20 66 73 20 3d 20 72 65 71 75 69 72 65 28 27 66 73 27 29 3b 0a 66 73 2e 72 65 61 64 46 69 6c 65 28 27 2e 2f 66 73 2d 72 65 61 64 46 69 6c 65 ... >
 */

fs.readFile('./fs-readFile.js', 'utf8', (err,data) => {
    if(err){
        console.log(err);
    }else{
        console.log(data);
    }
});

/**
 * 当读取文件出现错误时，err将会是Error对象。
 * 如果读取的文件不存在，不存在./ss文件，报错：
 { [Error: ENOENT: no such file or directory, open './ss'] errno: -2, code: 'ENOENT', syscall: 'open', path: './ss' }
 */


