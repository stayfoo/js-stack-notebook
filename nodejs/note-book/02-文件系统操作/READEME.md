# 文件系统操作
## 一、 相关模块

`fs` ：基础的文件操作API

`path`：提供和路径相关的操作API

`readline`：用于读取大文本文件，一行一行读

`fs-extra`（第三方）： https://www.npmjs.com/package/fs-extra

路径操作模块（`path`）：
在文件操作的过程中，都“必须”使用物理路径（绝对路径）。

`path` 模块提供了一系列与路径相关的API：

`path.join([...paths])` ：连接多个路径

`path.basename(path[, ext])` ：获取文件名

`path.dirname(path)` ：获取文件夹路径

`path.extname(path)` ：获取文件扩展名

`path.format(pathObject)`：

`path.parse(path)` 

`path.relative(from, to)` ：获取从 from 到 to 的相对路径


源码地址： https://github.com/nodejs/node/blob/master/lib/path.js


## 二、 文件读取，同步或异步调用

`fs`模块对文件的几乎所有操作都有同步和异步两种形式。

> 区别：
>>1. 同步调用会阻塞代码的执行，异步则不会。
>>2. 异步调用会读取任务下达到任务队列，直到任务执行完成才会回调。
>>3. 异常处理方面，同步必须使用`try catch` 方式，异步可以通过回调函数的第一个参数。

文件读取：

`fs.readFile(file[, options], callback)`  异步文件读取

`fs.readFileSync(file[, options])`  同步文件读取

`fs.createReadStream(path[, options])` 文件流的方式读取


## 三、buffer 缓冲区

>1. 什么是缓冲区?
>2. 为什么要有缓冲区?
>3. 缓冲区操作?

>- 缓冲区就是内存中操作数据的容器
>- 只是数据容器而已
>- 通过缓冲区可以很方便的操作二进制数据
>- 而且在大文件操作时必须有缓冲区

>- JS比较擅长处理字符串，但是早期的应用场景主要用于处理HTML文档，不会有太大篇幅的数据处理，也不会接触到二进制的数据。
>- 在node.js中操作数据、网络通信时没办法完全以字符串的方式操作的。
>- 所以node.js中引入了一个二进制的缓冲区的实现：`Buffer`。


创建缓冲区：
```js
$ node
// 创建长度为4个字节的缓冲区
> var buffer = Buffer.alloc(4);
undefined
> buffer
<Buffer 00 00 00 00>
```

```js
// 通过指定数组内容的方式创建
> var buffer = Buffer.from([00,01]);;
undefined
> buffer
<Buffer 00 01>
```

```js
// 通过指定编码的方式创建
> var buffer = Buffer.from('hello','utf8');
undefined
> buffer
<Buffer 68 65 6c 6c 6f>
> 
```

`node.js`默认支持的编码：
`Buffer` 和 `JS` 字符串对象之间转换时，需要一个明确的编码方法：

>- `'utf8'` - 多字节编码 Unicode 字符. 大部分网页和文档使用这类编码方式。
>- `'base64'` - Base64 字符编码。()
>- `'ascii'` - 7位的 ASCII 数据。这种编码方式非常快，它会移除最高位内容。
>- `'utf16le'` - 2个或4个字节, little-endian（LE）编码 Unicode 字符. 编码范围 (U+10000 to U+10FFFF) .
>- `'ucs2'` - 'utf16le'的子集.
>- `'latin1'` - 
>- `'binary'` - 仅使用每个字符的头8位将原始的二进制信息进行编码。在需使用 Buffer 的情况下，应该尽量避免使用这个已经过时的编码方式。这个编码方式将会在未来某个版本中弃用。
>- `'hex'` - 每个字节都采用2进制编码。


第三方，编码转换工具包：
`iconv-lite` ：https://www.npmjs.com/package/iconv-lite

## 四、文件流 Stream
> 理解：两个水桶，把一个水桶的水倒入另一个水桶。（借助水瓢，水管）

> 什么是流？文件流、网络流。任何数据的最根本表现形式都是二进制的。

> 文件流：就是以面向对象的概念对文件数据进行的抽象。

> 文件流定义了一些对文件数据的操作方式。



## 五、文件写入

> 使用绝对路径。

> 默认写入操作时覆盖源文件。

`fs.writeFile(file, data[, options], callback)` 异步文件写入

`fs.writeFileSync(file, data[, options])` 同步文件写入

`fs.createWriteStream(path[, options])`  流式文件写入

`fs.appendFile(file, data[, options], callback)` 异步追加
 
`fs.appendFileSync(file, data[, options])`  同步追加


## 六、其他文件操作

验证路径是否存在：
fs.exists(path, callback)  （过时的API）
`fs.existsSync(path)`  返回布尔类型true：存在  false：不存在


获取文件信息：
`fs.stat(path, callback)`  

`fs.statSync(path)`  返回一个 `fs.Stats`实例

> `Class: fs.Stats` ：
>> 实例方法：
>>- `stats.isFile()`
>>- `stats.isDirectory()`

`util.inspect(stats)` 返回文件信息，类似：
```
{
  dev: 2114,
  ino: 48064969,
  mode: 33188,
  nlink: 1,
  uid: 85,
  gid: 100,
  rdev: 0,
  size: 527,
  blksize: 4096,
  blocks: 8,
  atime: Mon, 10 Oct 2011 23:24:11 GMT,
  mtime: Mon, 10 Oct 2011 23:24:11 GMT,
  ctime: Mon, 10 Oct 2011 23:24:11 GMT,
  birthtime: Mon, 10 Oct 2011 23:24:11 GMT
}
```

移动文件
重命名文件或目录

`fs.rename(oldPath, newPath, callback)`

`fs.renameSync(oldPath, newPath)`

删除文件

`fs.unlink(path, callback)`

`fs.unlinkSync(path)`


## 七、目录操作
创建一个目录

`fs.mkdir(path[, mode], callback)`  

`fs.mkdirSync(path[, mode])`

> 注意： 要创建的目录，所在的目录必须存在，不然报错.

> 需求：创建一个`mkdirs.js`, 弥补此错误。

删除一个空目录

`fs.rmdir(path, callback)`

`fs.rmdirSync(path)`

读取一个目录  

`fs.readdir(path[, options], callback)`

`fs.readdirSync(path[, options])`  返回数组（包含文件目录）

## 八、监视文件
  
监视文件变化：

`fs.watch(filename[, options][, listener])`

`fs.watchFile(filename[, options], listener)`



