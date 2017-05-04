/**
 * 作为客户端，向服务器发送 POST 请求 
 */ 

var http = require('http');
var querystring = require('querystring');

// 把参数放在请求体中
var postData = querystring.stringify({
    'classid': '49dcdb2f5105416ab3218f9b485696dc'
});
var options = {
    host: '118.186.18.38',
    port: 8808,
    path:'/linktrust-teachingspace/addressListController/findParentAddressListPage',
    method: 'POST',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': Buffer.byteLength(postData)
    }
};

var req = http.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);  //请求返回的数据
    });

    res.on('end',() => {
        console.log('No more data in response.');
    });
});

req.on('error',(e) => {
    console.log(`problem with request: ${e.message}`);
});

//把数据写入请求体
req.write(postData);
req.end(); //注意：必须通过 req.end() 结束请求， 否则服务器将不会收到信息。

/**
 * write和end函数，用于向服务器发送请求体，通常用于POST、PUT等操作。
 * 所有写结束以后必须调用end函数以通知服务器，否则请求无效。
 */
