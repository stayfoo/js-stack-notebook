# node.js核心模块-HTTP

Class: 类型，构造函数

>属性：
>>- `http.METHODS`
>>- `http.STATUS_CODES`  
>>- `http.globalAgent` 
>方法：
>>- `http.createServer([requestListener])` ：创建了一个http.Server对象 （提供的便利方法）
>>- `http.get(options[, callback])` 创建了一个http.ClientRequest对象（提供的便利方法）； 作为客户端向HTTP服务器发起请求。
>>- `http.request(options[, callback])` ：作为客户端向HTTP服务器发起请求。

## 一、Class: http.Server
### 1.1 使用
> 是`http`模块中的`HTTP`服务器对象，用`node.js`做的所有基于`HTTP`协议的系统，
如网站、社交应用甚至代理服务器，都是基于`http.Server`实现的。  

> 它提供了一套封装级别很低的`API`，仅仅是`流控制`和`简单的消息解析`，所有的高层功能都要通过它的接口来实现。 

```js
//使用 http 对象实现一个简单的服务器：
var http = require('http');

http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>node.js</h1>');
    res.end('<p>Hello node.js</p>');
}).listen(3000);

console.log("HTTP server is listening at port 3000.");
```
> 说明： 
>>1. `http.createServer`创建了一个`http.Server`的实例，自动添加`Event: 'request'`。
>>2. `request` ： `<http.IncomingMessage>` 请求对象（`req`）。
>>3. `response`： `<http.ServerResponse>` 响应对象（`res`）
>>4. 在函数内，`res`做的事情：
>>>- 写回了响应代码`200`（表示请求成功）；
>>>- 指定响应头为 `'Content-Type':'text/html'`；
>>>- 写入响应体 `'<h1>Node.js</h1>'`；
>>>- 通过`res.end`结束并发送。
>>5. 最后该实例还调用了 `listen`函数，启动服务器并监听`3000`端口。

上面例子，相当于：
```js
var http = require('http');
var server = new http.Server();

server.on('request', function(req,res){
    res.writeHead(200, {'Content-Type':'text/html'});
    res.write('<h1>node.js</h1>');
    res.end('<h1>Hello node.js</h1>');
});
server.listen(3000);
console.log("HTTP server is listening at port 3000.");
```

### 1.2 http.Server 提供的事件

`http.Server`是一个基于事件的`HTTP`服务器，所有的请求都被封装为独立的事件，开发者只需要对它的事件编写响应函数，即可实现`HTTP`服务器的所有功能。

>它继承自`EventEmitter`，提供了以下几个事件：  
>>1. `Event: 'request'` ：当客户端请求到来时，该事件被触发，提供两个参数`req`和`res`，分别是 `<http.IncomingMessage>` 和 `<http.ServerResponse>`  的实例，表示请求和响应信息。
>>2. `Event: 'connection'` ： 当`TCP`连接建立时，该事件被触发，提供一个参数`socket`，为`net.Socket` 的实例。`connection`事件的粒度要大于`request`，因为客户端在 `Keep-Alive` 模式下可能会在同一个连接内发送多次请求。
>>3. `Event: 'close'`: 当服务器关闭时，该事件被触发。注意不是在用户连接断开时。

>实现复杂的`HTTP`服务器的时候才会用到：
>>- `Event: 'connect'`
>>- `Event: 'checkContinue'`
>>- `Event: 'checkExpectation'`
>>- `Event: 'clientError'`
>>- `Event: 'upgrade'`

### 1.3 http.Server 属性

>- `server.listening`
>- `server.maxHeadersCount`
>- `server.timeout`


### 1.4 http.Server 方法

>- `server.close([callback])`
>- `server.listen(handle[, callback])`
>- `server.listen(path[, callback])`
>- `server.listen([port][, hostname][, backlog][, callback])`
>- `server.setTimeout([msecs][, callback])`


## 二、Class: http.ServerResponse

`http.Server` 的 `'request'`事件的第二个参数。

### 2.1 http.ServerResponse 提供的事件

`Event: 'close'`
`Event: 'finish'`

### 2.2 http.ServerResponse 属性

三个重要的成员函数：（返回响应头、响应内容以及结束请求）

>- `response.finished`
>- `response.headersSent`
>- `response.sendDate`
>- `response.statusCode`
>- `response.statusMessage`


### 2.3 http.ServerResponse 方法

> `response.writeHead(statusCode[, statusMessage][, headers])`：向请求的客户端发送响应头。
`statusCode` 是`HTTP状态码`，如`200`（请求成功）、`404`（未找到）等。
`headers`是一个类似关联数组的对象，表示响应头的每个属性。 该函数在一个请求内最多只能调用一次，如果不调用，则会自动生成一个响应头。

> `response.write(chunk[, encoding][, callback])` ： 向请求的客户端发送响应内容。
`chunk`： 类型：`<String> | <Buffer>`
`encoding`：类型：`<String>` ， 默认：`'utf8'` 
返回值类型：`<Boolean>`

`chunk`是一个`Buffer`或字符串，表示要发送的内容。
如果`chunk`是字符串，那么需要指定`encoding`来说明它的编码方式，默认是utf-8 。
在`response.end`调用之前，`response.write` 可以被多次调用。


> `response.end([data][, encoding][, callback])` ：结束响应，告知客户端所有发送已经完成。 
当所有要返回的内容发送完毕的时候，该函数必须被调用一次。
它接受参数，意义和`response.write`相同。
如果不调用该函数，客户端将永远处于等待状态。


>- `response.addTrailers(headers)`
>- `response.getHeader(name)`
>- `response.removeHeader(name)`
>- `response.setHeader(name, value)`
>- `response.setTimeout(msecs, callback)`
>- `response.writeContinue()`


## 三、Class: http.IncomingMessage
### 3.1 http.IncomingMessage 事件

>- `Event: 'aborted'`
>- `Event: 'close'`

### 3.2 http.IncomingMessage 属性

>- `message.headers`
>- `message.httpVersion`
>- `message.method`
>- `message.rawHeaders`
>- `message.rawTrailers`
>- `message.statusCode`
>- `message.statusMessage`
>- `message.socket`
>- `message.trailers`
>- `message.url`

### 3.3 http.IncomingMessage 方法

>- `message.destroy([error])`
>- `message.setTimeout(msecs, callback)`



## 四、Class: http.ClientRequest

`HTTP`请求一般可以分为两部分：请求头（`Request Header`）和请求体（`Request Body`）。 以上内容由于长度较短都可以在请求头解析完成后立即读取。

> `http.ClientRequest`是`http.request`或`http.get`返回产生的对象，表示一个已经产生而且正在进行中的`HTTP`请求。




### 4.1 http.ClientRequest 事件

用于控制请求传输。 （请求体可能相对较长， 需要一定的时间传输）

>- `Event: 'abort'`
>- `Event: 'aborted'`
>- `Event: 'connect'`
>- `Event: 'continue'`
>- `Event: 'response'`
>- `Event: 'socket'`
>- `Event: 'upgrade'`

### 4.2 http.ClientRequest 属性

`request.aborted`


### 4.3 http.ClientRequest 方法

>- `request.abort()` ： 终止正在发送的请求。
>- `request.end([data][, encoding][, callback])` ：向服务器发送请求，必须通过 req.end() 结束请求， 否则服务器将不会收到信息。
>- `request.flushHeaders()`
>- `request.setNoDelay([noDelay])`
>- `request.setSocketKeepAlive([enable][, initialDelay])`
>- `request.setTimeout(timeout[, callback])` ：设置请求超时时间，timeout为毫秒数。当请求超时以后，callback将会被调用。
>- `request.write(chunk[, encoding][, callback])`

> `write`和`end`函数，用于向服务器发送请求体，通常用于`POST`、`PUT`等操作。
> 所有写结束以后必须调用`end`函数以通知服务器，否则请求无效。



## 五、http.request(options[, callback])

`callback`：传递一个参数，为 `http.ServerResponse` 的实例。

> 返回： `http.ClientRequest` 实例

> `options`对象： （类似关联数组，表示请求的参数）
>>- `host`： 类型`<String>`，域名或`IP`地址，默认是`'localhost'`。 请求网站的域名或IP地址。
>>- `hostname`：类型`<String>`，`host`的别名，支持： `url.parse()`, `hostname` 比 `host`优先选择。
>>- `port`：类型`<Number>`，远程服务器端口，默认是：`80`。请求网站的端口。
>>- `path`：类型`<String>`，请求路径，默认：`'/'`，E.G. `'/index.html?page=12'`， 当path包含非法字符时，抛出异常。一般，只有空格被拒绝，未来可能会改善。 请求的相对于根的路径。
>>- `method`：类型`<String>`，指明`HTTP`请求方法，默认：`'GET'`。
>>- `headers`：类型`<Object>`，包含请求头。 一个关联数组对象，为请求头的内容。
>
>>- `protocol`： 类型`<String>`，默认是`'http:'`。
>>- `family`：类型`<Number>`，解析`host`和`hostname`时使用的`IP`地址协议族，可选值`4`或`6`，没有详细说明二者都使用（`IP v4`和`IP v6`）。 
>>- `localAddress`：类型`<String>`，本地接口绑定网络连接。
>>- `socketPath`：类型`<String>`，UNIX域套接字 (使用：`host:port` 或 `socketPath`)。
>>- `auth`：类型`<String>`，基本的授权认证，i.e. 使用`'user:password'`匹配`Authorization header`。
>>- `agent`：类型`<http.Agent>`或`<Boolean>`可能的值:
>>>- `undefined` (default): use http.globalAgent for this host and port.
>>>- `Agent object`: explicitly use the passed in Agent.
>>>- `false`: causes a new Agent with default values to be used.
>>- `createConnection` <Function> A function that produces a socket/stream to use for the request when the agent option is not used. This can be used to avoid creating a custom Agent class just to override the default createConnection function. See agent.createConnection() for more details.
>>- `timeout <Integer>`： A number specifying the socket timeout in milliseconds. This will set the timeout before the socket is connected.



## 六、http.get(options[, callback])

`http`模块提供的更加简单的方法用于处理`GET`请求，
`http.request`的简化版，
唯一的区别在于`http.get`自动将请求设为了`GET`请求，
同时不需要手动调用`req.end()`。


> 获取 `http.ClientRequest` 方式

> 返回：`http.ClientRequest`对象

> 回调：`callback(res)` 
>> `res` 是 `http.IncomingMessage`对象 

```js
"use strict";
var http = require('http');

http.get('http://nodejs.org/dist/index.json', (res) => {
  const statusCode = res.statusCode;
  const contentType = res.headers['content-type'];

  let error;
  if (statusCode !== 200) {
    error = new Error(`Request Failed.\n` +
                      `Status Code: ${statusCode}`);
  } else if (!/^application\/json/.test(contentType)) {
    error = new Error(`Invalid content-type.\n` +
                      `Expected application/json but received ${contentType}`);
  }
  if (error) {
    console.log(error.message);
    // consume response data to free up memory
    res.resume();
    return;
  }

  res.setEncoding('utf8');
  let rawData = '';
  res.on('data', (chunk) => rawData += chunk);
  res.on('end', () => {
    try {
      let parsedData = JSON.parse(rawData);
      console.log(parsedData);
    } catch (e) {
      console.log(e.message);
    }
  });
}).on('error', (e) => {
  console.log(`Got error: ${e.message}`);
});
```


> `http.get(options[, callback])`它提供了一个`response`事件,
>> 方式一： `http.request`或`http.get`第二个参数指定的回调函数的绑定对象。
```js
"use strict";
var http = require('http');

http.get('http://nodejs.org/dist/index.json', (res) => {
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {});
}).on('error', (e) => {});
```
>> 方式二： 
```js
"use strict";
var http = require('http'); 

var clientRequestGet = http.get('http://nodejs.org/dist/index.json');
clientRequestGet.on('response', (res) => {
    res.on('data', (chunk) => rawData += chunk);
    res.on('end', () => {});
});
clientRequestGet.on('error', (e) => {});
```


