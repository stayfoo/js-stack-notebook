// 动态显示歌词
'use strict';

const fs = require('fs');
const path = require('path');
const iconv = require('iconv-lite');

// 缺点：一次性读入内存
fs.readFile(path.join(__dirname,'../../../testdata/lyrics/爱的代价.lrc'),(err,data) => {
    var dataJS = iconv.decode(data,'gbk'); // 转换成 js string 对象
    var lines = dataJS.split('\n');

    var begin = new Date().getTime(); //此时开始播放音乐

    var regExpBody = /\[(\d{2})\:(\d{2})\.(\d{3})\](.*)/; // \d 相当于 [0-9]   \s ：空白符
    var regExpHead = /\[(.*)\:(.*)\]/;
    lines.forEach((value, index, lines) =>{
        // var matches = regExpBody.exec(value);
        var arr = value.match(regExpBody);
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
            var heads = value.match(regExpHead);
            if(heads){
                var k = heads[1];
                var v = heads[2];
                switch (k) {
                    case 'ti':{
                        // console.log(''+v);
                    }
                        break;
                    case 'ar':{
                        // console.log(''+v);
                    }
                        break;
                    case 'al':{
                        // console.log(''+v);
                    }
                        break;
                    case 'ly':{
                        // console.log(''+v);
                    }
                        break;
                    case 'mu':{
                        // console.log(''+v);
                    }
                        break;
                    case 'ma':{
                        // console.log(''+v);
                    }
                        break;
                    case 'pu':{
                        // console.log(''+v);
                    }
                        break;
                    case 'by':{
                        // console.log(''+v);
                    }
                        break;
                    case 'total':{
                        // console.log(''+v);
                    }
                        break;
                    case 'offset':{
                        // console.log(''+v);
                    }
                        break;
                    default:
                        break;
                }
            }else{
                // console.log(value);
            }
        }
    });
});
