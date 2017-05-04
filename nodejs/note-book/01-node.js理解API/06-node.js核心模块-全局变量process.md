# node.js核心模块-全局变量process

## 一、简介
> `process`对象是全局变量，即`global`对象的属性。
> `process`对象功能：
>>- 用于描述当前`node.js`进程状态的对象，提供了一个与操作系统的简单接口。
>>- 通常在写本地命令行程序的时候，使用较多。


## 二、process对象常用的成员方法

>1、 `process.argv`  : 
>> 命令行参数数组，第一个元素是`node`，第二个元素是脚本文件名，从第三个元素开始每个元素是一个运行参数。

>2、 `process.stdout`  : 
>> 标准输出流，通常我们使用的`console.log()`向标准输出打印字符，而`process.stdout.write()`函数提供了更底层的接口。

>3、 `process.stdin`  :  
>> 标准输入流，初始时它是被暂停的，要想从标准输入读取数据，你必须恢复流，并手动编写流的事件响应函数。
```js
process.stdin.resume();
process.stdin.on('data', function(data){
    process.stdout.write('read from console: ' + data.toString());
});
```

>4、 `process.nextTick(callback)`  ：
>> 为事件循环设置一项任务，`node.js`会在下次事件循环响应时调用`callback`。

> 有什么任务不能在当下执行，需要交给下次事件循环响应来做：
>> `node.js`适合`I/O`密集型的应用，而不是计算密集型的应用，因为一个`node.js`进程只有一个线程，因此在任何时刻都只有一个事件在执行。如果这个事件占用大量的`CPU`时间，执行事件循环中的下一个事件就需要等待很久，因此`node.js`的一个编程原则就是尽量缩短每个事件的执行时间。

> `process.nextTick()`提供了一个这样的工具，可以把复杂的工作拆散，变成一个个较小的事件。例如：
```js
funciton doSomething(args, callback){
    somethingComplicated(args);
    callback();
};
doSomething(function onEnd(){
    compute();
});
/*
假设 compute() 和 somethingComplicated() 是两个比较耗时的函数
以上程序在调用 doSomething() 时，会先执行 somethingComplicated()  ，然后立即调用回调函数 callback，在 onEnd() 中又会执行 compute() 
*/
```

```js
//使用 process.nextTick() 改写上面的程序：
function doSomething(args, callback){
    somethingComplicated(args);
    process.nextTick(callback);
};
doSomething(function onEnd(){
    compute();
});
/*
改写后的程序：
会把上面耗时的操作，拆分为两个事件， 减少每个事件的执行时间，提高事件的响应速度。
*/
```
> 注意：不要使用 `setTimeout(fn,0)`代替 `process.nextTick(callback)`, 前者比后者效率要低的多。


