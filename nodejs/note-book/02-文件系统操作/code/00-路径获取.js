Object.defineProperty(global, '__STACK__', {
   get: function(){
     var orig = Error.prepareStackTrace;
     Error.prepareStackTrace = function(_, stack){ return stack; };
     
     var err = new Error;
     Error.captureStackTrace(err, arguments.callee);
     var stack = err.stack;

     Error.prepareStackTrace = orig;

     return stack;
   }
});
/**
 * 打印行号
 */
Object.defineProperty(global, '__LINE__', {
   get: function(){
     return __STACK__[1].getLineNumber();
   }
});
/**
 * 打印文件名字
 */ 
Object.defineProperty(global, '__FILE__', {
    get: function () {
        return __STACK__[1].getFileName();
    }
});


var process = require('process');




'use strict';
//path 模块的基本使用
const path = require('path');


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('join 用于拼接多个路径部分， 并转化为正常格式：');
const temp = path.join(__dirname, '..', 'testdata', 'lyrics', './友谊之光.lrc');
console.log(temp);


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取路径中的文件名：');
console.log(path.basename(temp));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取路径中的文件名并排除扩展名');
console.log(path.basename(temp, '.lrc'));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取不同操作系统的路径分隔符');  // Windows是 ;  Linux是 :
console.log(process.platform + '的分隔符为 ' + path.delimiter);


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('一般用于分割环境变量');
console.log(process.env.PATH.split(path.delimiter));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取一个路径中的目录部分');
console.log(path.dirname(temp));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取一个路径中最后的扩展名, 包含. ');
console.log(path.extname(temp));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('将一个路径解析成一个对象的形式（包含文件目录，文件名，扩展名）');
const pathObject = path.parse(temp);
console.log(pathObject);


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('将一个路径对象再转换为一个字符串的形式');
// pathObject.name = '我终于失去了你';
pathObject.base = '我终于失去了你.lrc';
console.log(pathObject);
console.log(path.format(pathObject));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取一个路径是不是绝对路径');
console.log(path.isAbsolute(temp));
console.log(path.isAbsolute('../lyrics/爱的代价.lrc'));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('将一个路径转换为当前系统默认的标准格式，并解析其中的./和../');
console.log(path.normalize('c:/develop/demo\\hello/../world/./a.txt'));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取第二个路径相对第一个路径的相对路径');
console.log(path.relative(__dirname, temp));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('以类似命令行cd命令的方式拼接路径, 与join不同');
console.log(path.resolve(temp, 'c:/', './develop', '../application'));


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('获取不同平台中路径的分隔符（默认）'); // windows:\ linux:/
console.log(path.sep);


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('允许在任意平台下以 WIN32 的方法调用 PATH 对象');
// console.log(path.win32);
console.log(path === path.win32);


console.log('\u001b[31m','文件路径: ',__FILE__,'行号: ',__LINE__,'\u001b[39m');
console.log('允许在任意平台下以 POSIX 的方法调用 PATH 对象');
console.log(path === path.posix);

