// 使用 readline 逐行读取，流的形式读取
'use strict';
const fs = require('fs');
const path = require('path');
const readline = require('readline');
const iconv = require('iconv-lite');

var filename = path.join(__dirname,'../../../testdata/lyrics/爱的代价.lrc');
var readStream = fs.createReadStream(filename)
    .pipe(iconv.decodeStream('gbk'));

var rl = readline.createInterface({
    input: readStream
});

var begin = new Date().getTime();
rl.on('line',(line) => {
    // console.log(line);
    showLyrics(line,begin);
});




var regExpBody = /\[(\d){2}\:(\d{2})\.(\d{3})\](.*)/;
var regExpHead = /\[(.*)\:(.*)\]/;

/**
 * 展示每行歌词
 * @param {*} line  每行数据
 * @param {*} begin 开始时间
 */
function showLyrics(line,begin){
    var arr = regExpBody.exec(line);
    if(arr){
        var m = parseFloat(arr[1]);
        var s = parseFloat(arr[2]);
        var ms = parseFloat(arr[3]);
        var lyrics = arr[4];
        
        var offset = new Date().getTime() - begin; //此时开始播放歌词，与音乐播放有个时间差
        setTimeout(() => {
            console.log(lyrics);
        },m * 60 * 1000 + s * 1000 + ms - offset);
    }else{
        var heads = regExpHead.exec(line);
        if(heads){
            var k = heads[1];
            var v = heads[2];
        }else{
            console.log(line);
        }
    }
}
