# node.js核心模块-全局变量console

`console`对象用于向标准输出流（`stdout`）或标准错误流（`stderr`）输出字符。

`console.log()`  ： 向标准输出流打印字符并以换行符结束。

```js
console.log('Hello World');   //Hello World
console.log('vary %d good'); // vary %d good
console.log('vary %d good', 1990); //vary 1990 good
```

`console.error()`  : 向标准错误流输出。

`console.trace()`  : 向标准错误流输出当前的调用栈。
```js
bogon:~ apple$ node
> console.trace();
Trace
    at repl:1:9
    at REPLServer.defaultEval (repl.js:262:27)
    at bound (domain.js:287:14)
    at REPLServer.runBound [as eval] (domain.js:300:12)
    at REPLServer.<anonymous> (repl.js:431:12)
    at emitOne (events.js:82:20)
    at REPLServer.emit (events.js:169:7)
    at REPLServer.Interface._onLine (readline.js:212:10)
    at REPLServer.Interface._line (readline.js:551:8)
    at REPLServer.Interface._ttyWrite (readline.js:828:14)
undefined
> 
```
