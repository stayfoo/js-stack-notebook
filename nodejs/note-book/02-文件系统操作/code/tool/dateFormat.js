/**
 * 
 * 对 Date 的扩展，将 Date 指定格式转换
 * 
 * 年（y）：可以用 1-4 个占位符
 * 月（M）、日（d）、小时（h）、分（m）、秒（s）、季度（q） ：可以用1-2个占位符
 * 毫秒（S）只能用 1 个占位符（是 1-3 位的数字）
 * 
 * 使用：
 *  (new Date()).format('yyyy-MM-dd HH:mm:ss.S');  // 2017-04-26 21:32:05.739
 *  (new Date()).format('yyyy-M-d H:m:s.S');
 */ 

'use strict';
 
Date.prototype.format = function (format){
    let mat = {
        "M+": this.getMonth() + 1,  //月份  
        "d+": this.getDate(),       //日
        "H+": this.getHours(),      //小时
        "m+": this.getMinutes(),    //分
        "s+": this.getSeconds(),    //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
    };

    // 处理：年 yyyy
    let reg_y = /(y+)/;  // + 号代表前面的字符必须至少出现一次
    if( reg_y.test(format) )
    {
        let regExpStr_y = RegExp.$1; // 匹配的字符串
        let data_y = this.getFullYear().toString().substr(4 - regExpStr_y.length);
        format = format.replace(regExpStr_y, data_y);
    }

    // 处理：月份、日、小时、分、秒、季度、毫秒
    for(let k in mat)
    {
        let reg_k = new RegExp("("+k+")");  // 生成正则表达式：  /(M+)/
        if(reg_k.test(format))
        {
            let regExpStr_k = RegExp.$1;
            let data_k = (regExpStr_k.length == 1) ? (mat[k]) : (("00" + mat[k]).substr(("" + mat[k]).length));
            format = format.replace(regExpStr_k, data_k);
        }
    }

    // 处理： 毫秒
    let reg_S = /(S)/; 
    if(reg_S.test(format))
    {
        let regExpStr_S = RegExp.$1;
        let data_S = this.getMilliseconds().toString();
        format = format.replace(regExpStr_S, data_S);
    }

    return format;
};

var d = new Date(); 
d.format('yyyy-MM-dd HH:mm:ss.S');
// d.format(' HH:mm:ss yyyy/MM/dd');

/**
 * substr(start,length) 
 * start必需. 要抽取的子串的起始下标。必须是数值。
 * 如果是负数，那么该参数声明从字符串的尾部开始算起的位置。
 * 也就是说，-1 指字符串中最后一个字符，-2 指倒数第二个字符，以此类推。
 */