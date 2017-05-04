# node.js核心模块-fs (File System)

> `fs`模块是文件操作的封装，它提供了文件的读取、写入、更名、删除、遍历目录、链接等`POSIX`文件系统操作。
> 与其他模块不同的是，`fs`模块中所有的操作都提供了异步的和同步的两个版本，例如读取文件内容的函数有异步的  `fs.readFile()`  和同步的`fs.readFileSync()` 


## 一、fs.readFile(file[, options], callback)
是最简单的读取文件的函数。
> 参数：
>>- `file`  ：必选参数，要读取的文件路径。
>>- `options`  ：可选.`encoding`- 文件的字符编码,`'utf8'`。
>>- `callback`  ：是回调函数，用于接收文件的内容。  如果不指定`encoding` ,  则`callback` 就是第二个参数。 
>>>- `callback(err, data)`  ：
>>>>- `err`表示有没有错误发生。
>>>>- `data`是文件内容。
>>>>- 如果指定了`encoding` ，`data`是一个解析后的字符串，否则 `data` 将会是以 `Buffer` 形式表示的二进制数据。

```js
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
```

```js
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
```

> 注意：
>>- `node.js` 的异步编程接口习惯是以函数的最后一个参数为回调函数，通常一个函数只有一个回调函数。
>>- 回调函数实际参数中第一个是 `err`,其余的参数是其他返回的内容。
>>- 如果没有发生错误，`err` 的值会是 `null`  或  `undefined`。 
>>- 如果有错误发生，`err` 通常是 `Error` 对象的实例。

## 二、fs.readFileSync(file[, options])

`fs.readFile`同步的版本.

> 它接受的参数和 `fs.readFile` 相同，而读取到的文件内容会`以函数返回值`的形式返回。

> 如果有错误发生，`fs` 将会抛出异常，你需要使用 `try` 和 `catch` 捕捉并处理异常。

> 注意：与同步`I/O`函数不同，`node.js`中异步函数大多没有返回值。


## 三、fs.open(path, flags[, mode], callback)

是 `POSIX`  `open`函数的封装，与`C`语言标准库中的`fopen`函数类似。

> 参数：
>>- `path`  ：为文件的路径，
>>- `flags` ：可以是以下值：
>>>- `r`     ：以读取模式打开文件。
>>>- `r+`    ：以读写模式打开文件
>>>- `w`  ：以写入模式打开文件，如果文件不存在则创建。
>>>- `w+` ：以读写模式打开文件，如果文件不存在则创建。
>>>- `a`  ：以追加模式打开文件，如果文件不存在则创建。
>>>- `a+` ：以读取追加模式打开文件，如果文件不存在则创建。  
>>>- `mode` ：用于创建文件时给文件指定权限，默认`0666`。回调函数将会传递一个文件描述符`fd` 。


## 四、fs.read(fd, buffer, offset, length, position, callback)

是`POSIX read`函数的封装，相比`fs.readFile`提供了更底层的接口。

`fs.read`的功能是从指定的文件描述符`fd`中读取数据并写入`buffer`指向的缓冲区对象。

>参数：
>>- `offset`   ：是`buffer`的写入偏移量。
>>- `length`   ：是要从文件中读取的字节数。
>>- `position` ：是文件读取的起始位置，如果`position`的值为`null`，则会从当前文件指针的位置读取。回调函数传递`bytesRead`和`buffer`,分别表示读取的字节数和缓冲区对象。


```js
//fs.open 和 fs.read 
var fs = require('fs');

fs.open('./010-node.js核心模块-fs','r', function(err,fd){
    if(err){
        console.error(err);
        return;
    }
    var buf = new Buffer(8);
    fs.read(fd, buf, 0.8, null, function(err,bytesRead,buffer){
        if(err){
            console.error(err);
            return;
        }
        console.log('bytesRead: ' + bytesRead);
        console.log(buffer);
    });
});
```

> 注意：一般来说，除非必要，否则不要使用这种方式读取文件，因为它要求你手动管理缓冲区和文件指针，尤其是在你不知道文件大小的时候，这将会是一件很麻烦的事情。







