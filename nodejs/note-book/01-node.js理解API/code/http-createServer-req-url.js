var http = require('http');
var url = require('url');
var util = require('util');

http.createServer(function(req,res){
    res.writeHead(200, {'Content-Type':'text/plain'});
    res.end(util.inspect(url.parse(req.url,true)));
}).listen(3000);
console.log('HTTP server is listening at port 3000.');

/**
访问：http://localhost:3000/

Url {
  protocol: null,
  slashes: null,
  auth: null,
  host: null,
  port: null,
  hostname: null,
  hash: null,
  search: '',
  query: {},
  pathname: '/',
  path: '/',
  href: '/' }


通过url.parse ，原始的path被解析为一个对象，
其中query就是我们所谓的GET请求的内容，
而路径则是pathname 。

 */