// 流的形式读取文件
'use strict';
const fs = require('fs');
const path = require('path');
const line = require('readline');
const iconv = require('iconv-lite');

var readStream = fs.createReadStream(path.join(__dirname,'../../../testdata/lyrics/爱的代价.lrc'));

var chunks = [];
readStream.on('data',(chunk) => {
    // console.log(chunk);
    chunks.push(chunk);
});

readStream.on('end',() => {
    // console.log(chunks);
    var lines = iconv.decode(Buffer.concat(chunks),'gbk').split('\n');
    var begin = new Date().getTime();
    showLyrics(lines,begin);
});



var regExpBody = /\[(\d{2})\:(\d{2})\.(\d{3})\](.*)/;  
var regExpHead = /\[(.*)\:(.*)\]/;

/**
 * 展示每行歌词
 * @param {*} lines 每行集合
 * @param {*} begin 开始时间
 */
function showLyrics(lines,begin){
    lines.forEach((line) => {
        // var arr = regExpBody.exec(line);
        var arr = line.match(regExpBody);
        if(arr){
            var m = parseFloat(arr[1]);
            var s = parseFloat(arr[2]);
            var ms = parseFloat(arr[3]);
            var lyric = arr[4]; 

            // 由于下达输出任务的时刻不同
            var offset = new Date().getTime() - begin; //此时开始播放歌词，与音乐播放有个时间差
            setTimeout(() => {
                console.log(lyric);    
            }, m * 60 * 1000 + s * 1000 + ms - offset);
        }else{
            var heads = line.match(regExpHead);
            if(heads){
                var k = heads[1];
                var v = heads[2];
                // console.log(k);
                // console.log(v);
            }else{
                // console.log(line);
            }
        }
    }, this);
}
