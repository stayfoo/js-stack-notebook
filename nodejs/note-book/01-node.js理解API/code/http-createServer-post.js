var http = require('http');
var querystring = require('querystring');
var util = require('util');

http.createServer(function(req,res){
    var post = '';
    req.on('data', function(chunk){
        post += chunk;
    });
    req.on('end', function(){
        post = querystring.parse(post);
        res.end(util.inspect(post));
    });
}).listen(3000);

console.log('HTTP server is listening at port 3000');

/**
POST请求的内容全部都在请求体中。   

node.js默认是不会解析请求体的， 当你需要的时候需要手动来做,
原因：
http.ClientRequest 并没有一个属性内容为请求体，
原因是等待请求体传输可能是一件耗时的工作，譬如上传文件。         
而很多时候我们可能并不需要理会请求体的内容，
恶意的POST请求会大大消耗服务器的资源。 

 */
/**
说明：
上面代码，并没有在请求响应函数中向客户端返回信息，
而是定义了一个post变量，用于在闭包中暂存请求体的信息。
通过req的data事件监听函数，每当接受到请求体的数据，就累加到post变量中。
在end事件触发后，通过querystring.parse将post解析为真正的POST请求格式，然后向客户端返回。

注意：
不要在真正的生产应用中使用上边这种简单的方法来获取POST请求，
因为它有严重的效率问题和安全问题，这只是一个帮助理解的实例。

 */