/**
 * 实现思路：
 * 1. 利用 fs 模块的文件监视功能监视指定 markdown 文件
 * 2. 当文件发生变化后，借助 marked 包提供的 markdown to html 功能将改变后的 markdown 文件转换为 html 
 * 3. 再将得到的 html 替换到模板中 
 * 4. 最后利用 BrowserSync 模块实现浏览器自动刷新 
 * 
 */ 
'use strict';
const fs = require('fs');
const path = require('path');
const marked = require('marked');
const browserSync = require('browser-sync');  // https://browsersync.io/

let target = path.join(__dirname,process.argv[2] || '../README.md');

// 转换后 html 文件保存位置
let filename = target.replace(path.extname(target), '.html');
let indexpath = path.basename(filename); // 获取 html 文件名


// 通过 browser-sync 创建一个文件服务器
browserSync({
    notify: false,
    server: path.dirname(target), //网站根目录
    index: indexpath // 默认文档： （如果浏览器访问一个目录的话，默认返回那个文件）
});


// 监视文件变化
fs.watchFile(target, { interval: 200 } , (curr, prev) => {
    // 一旦文件变化， 触发该函数
    // console.log(curr.mtime);
    // console.log(prev.mtime);

    // 判断文件有没有变化
    if(curr.mtime === prev.mtime){ 
        return false;
    }

    // 读取文件 转换为新的 html
    fs.readFile(target, 'utf8', (err, content) => {
        if (err) {
            throw err;
        }
        var html = marked(content);

        // 注入 html 的框架 和 css 样式
        fs.readFile(path.join(__dirname, 'github.css'), 'utf8', (err, css) => {
            html = template.replace('{{{content}}}', html).replace('{{{styles}}}',css);

            // 写入文件
            fs.writeFile(filename, html, 'utf8', (err) => {
                // 通过 browserSync 发送一个消息给浏览器， 浏览器刷新 
                browserSync.reload(indexpath);
                console.log('updated@' + new Date);
            });
        });
    });
    
});

let template = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <style>{{{styles}}}</style>
</head>
<body>
  <div class="vs">
    {{{content}}}
  </div>
</body>
</html>
`;

