# node.js的REPL模式
## 一、REPL模式
`Read eval print loop`  输入-求值-输出循环

>`REPL`全称：`Read`, `Eval`, `Print`, `Loop`
>>接收用户输入 -> 执行用户输入 -> 打印执行结果到控制台 -> 循环到下一次 -> 接收用户输入...

```bash
# 进入REPL环境：
node  
node --use_strict

# 退出REPL环境：
> .exit          # 方法一
> process.exit() # 方法二
> ^C    #方法三：连续按两次 Control + C 

# REPL特殊变量：
> _   # 下划线（ _ ）表示上一个命令的返回结果
```

运行无参数的 `node` 将会启动一个`JavaScript`的交互式`shell`;

帮助命令：
```bash
node --help 
```
运行脚本命令： 
```bash
node 脚本名.js
node -e "console.log('Hello World');"
```

## 二、node.js 的基本使用
### 2.1 脚本执行

执行脚本字符串：
```bash
node -e 'console.log("Hello, Node")'
```

运行脚本文件：
```bash
node index.js
node path/index.js
node path/index
```

查看帮助：
```bash
node --help
```

### 2.2 全局作用域成员

>全局对象：
>>- `global` ：类似于客户端`JavaScript`运行环境中的`window`。
>>- `process` ：用于获取当前的`Node`进程信息，一般用于获取环境变量之类的信息。
>>- `console` ：`Node`中内置的`console`模块，提供操作控制台的输入输出功能，常见使用方式与客户端类似。

>全局函数：
>>- `setInterval(callback, millisecond)`
>>- `clearInterval(timer)`
>>- `setTimeout(callback, millisecond)`
>>- `clearTimeout(timer)`
>>- `Buffer:Class`（用于操作二进制数据）


### 2.3 node.js 调试

>- (1). `console.log()`
>- (2). `node.js` 原生的调试 [debugger文档](https://nodejs.org/api/debugger.html)
>- (3). 第三方模块提供的调试工具：
```bash
npm install node-inspector –g
npm install devtool -g
```
>- (4). 开发工具的调试
`Visual Studio Code`  [官网](https://code.visualstudio.com)
`WebStorm`