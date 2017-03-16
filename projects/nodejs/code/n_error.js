/**
 * 此处的 console 是 Node 平台提供的。
 * 
 */


//demo：
// demo_01();
// demo_02();
// demo_03();
// demo_04();
// demo_05(process.argv.slice(2));
// demo_06();
// demo_07();
// demo_08();
// demo_09();
// demo_10();
// demo_11();
// demo_12();
// demo_13();
// demo_14();
// demo_15();
demo_16();


function demo_01(params) {
    var a = 1;
    console.log(a); //1
    console.error(new Error('error')); //[Error: error]
}


function demo_02(params) {
    var argv = process.argv;
    console.log(argv);
    /*
    [ '/usr/local/bin/node',
      '/Users/aibdai/Desktop/HtmlEffects/projects/nodejs/code/n_error.js' ]
    */
}


function demo_03(params) {
    var argvs = process.argv.slice(2);

    switch (argvs[0]) {
        case 'init':
            console.log('你需要安装INIT');
            break;
        case 'install':
            var installPackageName = argvs[1];
            console.log('你在安装' + installPackageName);
            break;
        case 'uninstall':
            console.log('uninstall');
            break;
    }

    console.log(argvs.toString()); //打印参数
}


function demo_04(params) {
    process.stdout.write('Hello node'); //没有换行
}


function demo_05(params) {
    process.stdout.write(params + '\n');
}


function demo_06(params) {
    var msg = 'Hello';
    var a = 1;
    // 模板字符串 ``
    process.stdout.write(`
        ${msg} word ${a}
    `);
}


function demo_07(params) {
    // 控制台帧动画
    // 不断的切换显示的图形（字符画）
    // 擦除重绘
    // 每个成员就是帧
    var frames = [];
    frames[frames.length] = `
    ╭~~~╮
    (o^.^o)
    `;
    frames[frames.length] = `
    ╭~~~╮
    (o~.~o)
    `;
    frames[frames.length] = `
    ╭~~~╮
    (o@.@o)
    `;
    frames[frames.length] = `
    ╭ ﹌╮
    (o'.'o)
    `;

    var fps = 10;
    var current = 0; //当前显示哪一帧
    var render = () => {
        // 将当前控制台清空
        // var height = process.stdout.getWindowSize()[1];
        // console.log("size：" + process.stdout.getWindowSize());
        // for (var i = 0; i < height; i++) {
        //     process.stdout.write('\r\n');
        // }

        process.stdout.write('\033[aj');
        process.stdout.write('\033[0f');

        //输出新的内容
        if (current === frames.length) {
            current = 0;
        }
        process.stdout.write(frames[current++]);
    };

    setInterval(render, 1000 / fps);
}


function demo_08(params) {
    var fs = require('fs');
    var frames = [];

    for (var i = 1; i < 7; i++) {
        frames[frames.length] = fs.readFileSync(`./frames/${i}.txt`, 'utf-8');
    }
    var fps = 10;
    //当前显示哪一帧
    var current = 0;
    var render = () => {
        //将当前控制台清空
        process.stdout.write('\033[2J');
        process.stdout.write('\033[0f');

        //输出新的内容
        if (current === frames.length) {
            current = 0;
        }
        process.stdout.write(frames[current++]);
    };

    setInterval(render, 1000 / fps);
}


function demo_09(params) {
    // 计时器
    setInterval(() => {
        console.log(1);
    }, 1000);

}


function demo_10(params) {
    process.stdin.resume();

    // 标识当前是否已经按下 Control + C
    var exiting = false;

    process.on('SIGINT', () => {
        if (exiting) {
            // 终止当前 node 进程
            console.log('退出');
            process.exit();
        } else {
            console.log('第一次按下');
            exiting = true;

            setTimeout(() => { exiting = false }, 1000);
        }
        console.log('Got SIGINT. Press Control-D Or Double Control-C to exit');
    });
}


function demo_11(params) {

    process.stdin.setEncoding('utf-8');
    process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write(`data: ${chunk}`);
        }
    });

}


function demo_12(params) {
    process.stdout.write('问题1');
    var res1 = process.stdin.read();
    console.log('打印：' + res1);

    process.stdout.write('问题2');
    var res2 = process.stdin.read();

    process.stdout.write('问题3');
    var res3 = process.stdin.read();
}


function demo_13(params) {

    // 在命令行中用户输入模式。 回车符出现触发。
    process.stdin.on('data', (data) => {
        process.stdout.write(data);
    });

}


function demo_14(params) {

    var users = {
        'admin': '123',
        'user1': '1234',
        'user2': '12345'
    };

    //接收用户输入
    process.stdin.on('data', (input) => {
        process.stdout.write('类型：' + typeof input + '\n');
        /**
         * 1、 input 实际上是一个流 （二进制数组）
         * 2、 输入的字符最后肯定是一个回车符
         */
        input = input.toString().trim();
        process.stdout.write(`*${input}*`);
        //获取一个键值对集合中所有的键
        if (Object.keys(users).indexOf(input) === -1) {
            process.stdout.write('用户名不存在 ' + '\n');

        } else {
            console.log('存在');
        }
    });

}


function demo_15(params) {

    var users = {
        'admin': '123',
        'user1': '1234',
        'user2': '12345'
    };

    process.stdout.write('请输入用户名：\n');

    // var i = 0;
    var isInputUsername = true;
    var username = '';

    //接收用户输入
    process.stdin.setEncoding('utf-8');
    process.stdin.on('data', (input) => {
        // console.log(i++);
        // 要在此处知道到底 input 是啥？ 输入的内容
        input = input.toString().trim();
        console.log('输入的用户名：' + input);

        if (!username) {
            if (Object.keys(users).indexOf(input) === -1) {

                process.stdout.write('用户名不存在' + '\n');
                process.stdout.write('请输入用户名：\n');
                username = '';
            } else {

                process.stdout.write('请输入密码：\n');
                username = input;
            }
        } else {
            // input 传入的是密码. 
            // input 不是上次的输入， 所以拿不到用户名. 使用变量记录上次的输入.  
            if (input === users[username]) {
                console.log('登录成功！');
            } else {
                process.stdout.write('请输入密码：\n');
            }
        }
    });
}


function demo_16(params) {

    console.log('开始执行了');
    console.time('main'); //代码计时器
    for (var i = 0; i < 1000000000; i++) {}

    //不断的循环阻塞了代码的执行
    // setTimeout(() => {
    //     for (var i = 0; i < 10000000000; i++) {}
    //     console.log('循环完了！');
    // }, 0);

    console.timeEnd('main');
    console.log('完成执行了！');

}


function demo_17(params) {

    console.log('main');
    // 耗费时间 （阻塞情况） 1000ms
    setTimeout(() => {
        var data = get('http://www.baidu.com/1.jpg');
        console.log(data);
    }, 0);
    console.log('main');
    console.log('完成执行了');
}