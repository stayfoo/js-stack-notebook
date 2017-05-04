//  Created by mengyueping 
//  Copyright © 2017年 www.mengyueping.com . All rights reserved.
//
/************************************************
 *                                               *
 *            Node.js  API  Absorbed             *
 *                                               *
 *                  字符画动画                     *
 ************************************************/


function demo_01(params) {
    var stdin = process.stdin;

    stdin.on("data", (params) => {
        // console.log('\033[aJ');
        var lines = process.stdout.getWindowSize()[1];
        for (var i = 0; i < lines; i++) {
            console.log('\r\n');
        }
        console.log("you entered: [" + params.toString().trim() + "]");
    });
}


function demo_02(params) {
    const readline = require('readline');
    const rl = readline.createInterface({
        input: process.stdin,
        stdout: process.stdout
    });


    rl.question('What do you think of Node.js?', (answer) => {
        console.log('Thank you for your valuable feedback:', answer);
        rl.close();
    });
}



//字符画
var frames = [];

frames[frames.length] = `
                    ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
                    ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
                    ▍．∴∵∴∵．∴▅███████████☆ ★∵
                    ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
                    ． ◥███████████████████◤
                    .．.．◥████████████████■◤
`;
frames[frames.length] = `
                ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
                ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
                ▍．∴∵∴∵．∴▅███████████☆ ★∵
                ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
                ． ◥███████████████████◤
                .．.．◥████████████████■◤
`;
frames[frames.length] = `
            ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
            ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
            ▍．∴∵∴∵．∴▅███████████☆ ★∵
            ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
            ． ◥███████████████████◤
            .．.．◥████████████████■◤
`;
frames[frames.length] = `
        ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
        ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
        ▍．∴∵∴∵．∴▅███████████☆ ★∵
        ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
        ． ◥███████████████████◤
        .．.．◥████████████████■◤
`;
frames[frames.length] = `
    ...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
    ．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
    ▍．∴∵∴∵．∴▅███████████☆ ★∵
    ◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
    ． ◥███████████████████◤
    .．.．◥████████████████■◤
`;
frames[frames.length] = `
...．．∵ ∴★．∴∵∴ ╭ ╯╭ ╯╭ ╯╭ ╯∴∵∴∵∴
．☆．∵∴∵．∴∵∴▍▍ ▍▍ ▍▍ ▍▍☆ ★∵∴
▍．∴∵∴∵．∴▅███████████☆ ★∵
◥█▅▅▅▅███▅█▅█▅█▅█▅█▅███◤
． ◥███████████████████◤
.．.．◥████████████████■◤
`;



function demo_03(params) {

    var index = 0;

    setInterval(() => {
        process.stdout.write('\033[0f');
        process.stdout.write('\033[2J');

        if (index === frames.length) index = 0;
        console.log(frames[index++]);

    }, 200);
}



function demo_04(params) {

    var index = 0;

    setInterval(() => {
        var lines = process.stdout.getWindowSize()[1];
        for (var i = 0; i < lines; i++) {
            console.log('\n');
        }

        if (index === frames.length) index = 0;
        console.log(frames[index++]);

    }, 200);
}





function demo_05(params) {
    function clear(params) {
        var stdout = "";

        if (process.platform.indexOf("win" != 0)) {
            stdout += "\033[2J";
        } else {
            var lines = process.stdout.getWindowSize()[1];

            for (var i = 0; i < lines; i++) {
                stdout += "\r\n";
            }
        }

        stdout += "\033[0f";
        process.stdout.write(stdout);
    }


    var index = 0;
    setTimeout((params) => {
        clear();
        if (index === frames.length) {
            index = 0;
        }
        console.log(frames[index++]);
    }, 200);
}




function demo_06(params) {
    process.title = 'my-application';

    setInterval(() => {
        process.stdout.write('hello world');
    }, 1000);

    var questions = ['What\'s your name?', 'How old are your?', 'Do you like me?'];
    var answers = [];
    var current = 0;
    console.log(questions[current]);

    process.stdin.on('data', (data) => {
        answers[current++] = data;
        if (current === questions.length) {
            for (var i = 0; i < answers.length; i++) {
                console.log(answers[i].toString());
            }
            process.exit();
        } else {
            console.log(questions[current]);
        }
    });

}



function demo_07(params) {
    var frames = [];

    frames[frames.length] = `
                                                                                          .---.
                                                                                        (_,/\\ \\
                                                                                        (\`a a(  )
                                                                                        ) \\=  ) (
                                                                                      (.--\' \\\'--.)
                                                                                      / (_\\_/_) \\
                                                                                      | / \\   / \\ |
                                                                                      \\\\ / . \\ //
                                                                                        \\/\\___/\\/
                                                                                        |  \\_/  |
                                                                                        \\  /  /
                                                                                          \\/  /
                                                                                          ( (
                                                                                          |\\ \\
                                                                                          | \\ \\
                                                                                          /_Y/_Y
`;

    frames[frames.length] = `
                                                                              .---.
                                                                            (_,/\\ \\
                                                                            (\`a a(  )
                                                                            ) \\=  ) (
                                                                          (.--\' \\\'--.)
                                                                          / (_\\_/_) \\
                                                                          | / \\   / \\ |
                                                                          \\\\ / . \\ //
                                                                            \\/\\___/\\/
                                                                            |  \\_/  |
                                                                            \\  /  /
                                                                              \\/  /
                                                                              ( (
                                                                              |\\ \\
                                                                              | \\ \\
                                                                              /_Y/_Y
`;

    frames[frames.length] = `
                                                                      .---.
                                                                    (_,/\\ \\
                                                                    (\`a a(  )
                                                                    ) \\=  ) (
                                                                  (.--\' \\\'--.)
                                                                  / (_\\_/_) \\
                                                                  | / \\   / \\ |
                                                                  \\\\ / . \\ //
                                                                    \\/\\___/\\/
                                                                    |  \\_/  |
                                                                    \\  /  /
                                                                      \\/  /
                                                                      ( (
                                                                      |\\ \\
                                                                      | \\ \\
                                                                      /_Y/_Y
`;

    frames[frames.length] = `
                                                          .---.
                                                        (_,/\\ \\
                                                        (\`a a(  )
                                                        ) \\=  ) (
                                                      (.--\' \\\'--.)
                                                      / (_\\_/_) \\
                                                      | / \\   / \\ |
                                                      \\\\ / . \\ //
                                                        \\/\\___/\\/
                                                        |  \\_/  |
                                                        \\  /  /
                                                          \\/  /
                                                          ( (
                                                          |\\ \\
                                                          | \\ \\
                                                          /_Y/_Y
`;

    frames[frames.length] = `
                                                  .---.
                                                (_,/\\ \\
                                                (\`a a(  )
                                                ) \\=  ) (
                                              (.--\' \\\'--.)
                                              / (_\\_/_) \\
                                              | / \\   / \\ |
                                              \\\\ / . \\ //
                                                \\/\\___/\\/
                                                |  \\_/  |
                                                \\  /  /
                                                  \\/  /
                                                  ( (
                                                  |\\ \\
                                                  | \\ \\
                                                  /_Y/_Y
`;

    frames[frames.length] = `
                                      .---.
                                    (_,/\\ \\
                                    (\`a a(  )
                                    ) \\=  ) (
                                  (.--\' \\\'--.)
                                  / (_\\_/_) \\
                                  | / \\   / \\ |
                                  \\\\ / . \\ //
                                    \\/\\___/\\/
                                    |  \\_/  |
                                    \\  /  /
                                      \\/  /
                                      ( (
                                      |\\ \\
                                      | \\ \\
                                      /_Y/_Y
`;


    frames[frames.length] = `
                                .---.
                              (_,/\\ \\
                              (\`a a(  )
                              ) \\=  ) (
                            (.--\' \\\'--.)
                            / (_\\_/_) \\
                            | / \\   / \\ |
                            \\\\ / . \\ //
                              \\/\\___/\\/
                              |  \\_/  |
                              \\  /  /
                                \\/  /
                                ( (
                                |\\ \\
                                | \\ \\
                                /_Y/_Y
`;

    frames[frames.length] = `
     _____                 &&&&_) )
   \\/,---<                &&&&&&\\ \\
   ( )c~c~~@~@            )- - &&\\ \\
    C   >/                \\<   |&/
     \\_O/ - 哇塞          _\`*-\'_/ /
   ,- >o<-.              / ____ _/
  /   \\/   \\            / /\\  _)_)
 / /|  | |\\ \\          / /  )   |
 \\ \\|  | |/ /          \\ \\ /    |
  \\_\\  | |_/            \\ \\_    |
  /_/\`___|_\\            /_/\\____|
    |  | |                  \\  \\|
    |  | |                   \`. )
    |  | |                   / /
    |__|_|_                 /_/|
    (____)_)                |\\_\\_
`;

    frames[frames.length] = `
     _____                 &&&&_) )
   \\/,---<                &&&&&&\\ \\
   ( )c~c~~@~@            )- - &&\\ \\
    C   >/                \\<   |&/
     \\_O/ - 哇塞          _\`*-\'_/ /
   ,- >o<-.              / ____ _/
  /   \\/   \\            / /\\  _)_)
 / /|  | |\\ \\          / /  )   |
 \\ \\|  | |/ /          \\ \\ /    |
  \\_\\  | |_/            \\ \\_    |
  /_/\`___|_\\            /_/\\____|
    |  | |                  \\  \\|
    |  | |                   \`. )
    |  | |                   / /
    |__|_|_                 /_/|
    (____)_)                |\\_\\_
`;

    frames[frames.length] = `
     _____                 &&&&_) )
   \\/,---<                &&&&&&\\ \\
   ( )c~c~~@~@            )- - &&\\ \\
    C   >/                \\<   |&/
     \\_O/ - 哇塞          _\`*-\'_/ /
   ,- >o<-.              / ____ _/
  /   \\/   \\            / /\\  _)_)
 / /|  | |\\ \\          / /  )   |
 \\ \\|  | |/ /          \\ \\ /    |
  \\_\\  | |_/            \\ \\_    |
  /_/\`___|_\\            /_/\\____|
    |  | |                  \\  \\|
    |  | |                   \`. )
    |  | |                   / /
    |__|_|_                 /_/|
    (____)_)                |\\_\\_
`;

    frames[frames.length] = `
     _____                 &&&&_) )
   \\/,---<                &&&&&&\\ \\
   ( )c~c~~@~@            )- - &&\\ \\
    C   >/                \\<   |&/
     \\_O/ - 哇塞          _\`*-\'_/ /
   ,- >o<-.              / ____ _/
  /   \\/   \\            / /\\  _)_)
 / /|  | |\\ \\          / /  )   |
 \\ \\|  | |/ /          \\ \\ /    |
  \\_\\  | |_/            \\ \\_    |
  /_/\`___|_\\            /_/\\____|
    |  | |                  \\  \\|
    |  | |                   \`. )
    |  | |                   / /
    |__|_|_                 /_/|
    (____)_)                |\\_\\_
`;

    frames[frames.length] = `
     _____                 &&&&_) )
   \\/,---<                &&&&&&\\ \\
   ( )c~c~~@~@            )- - &&\\ \\
    C   >/                \\<   |&/
     \\_O/ - 哇塞          _\`*-\'_/ /
   ,- >o<-.              / ____ _/
  /   \\/   \\            / /\\  _)_)
 / /|  | |\\ \\          / /  )   |
 \\ \\|  | |/ /          \\ \\ /    |
  \\_\\  | |_/            \\ \\_    |
  /_/\`___|_\\            /_/\\____|
    |  | |                  \\  \\|
    |  | |                   \`. )
    |  | |                   / /
    |__|_|_                 /_/|
    (____)_)                |\\_\\_
`;

    var index = 0;

    var render = () => {
        process.stdout.write('\033[0f');
        process.stdout.write('\033[2J');

        if (index === frames.length) {
            index = 0;
        }
        console.log(frames[index++]);
        setTimeout(render, 200);
    };

    setTimeout(render, 200);
}





function demo_08(params) {
    var frames = [];

    frames[frames.length] = `
┬┴┬┌─　●─┬─　　│─┼─┐　●├─┤○
┴┬┴├┬　┌─┼─　│◎　│　│　○└┬┘●
─┼─││　│　│　　││─┴─┴　──┼──
●│○││　┴─┼─　　│○　　●　／　│　＼
`;

    frames[frames.length] = `
 /'　\\\\　　 //\\\\ 
　　　\\\\　 //　\`\\ 
　　　 \\\\ //           祝你：
　　　.-'^'-. 
　　.' a___a \`.           春节愉快 合家欢乐！
　 ==　(___)　== 
　　'. ._I_. .'           心想事成 红包拿来！
____\/.\`-----'.\\____ 
   [###(__)####             
`;

    frames[frames.length] = `
                  ,;,,;
                 ,;;'(    马
       __      ,;;' ' \\   ┇
    /'  '\\'~~'~' \\ /'\\.)  到 
 ,;(      )    /  |.      ┇
,;' \\    /-.,,(   ) \\     成
     ) /       ) / )|     ┇ 
     ||        ||  \\)     功
     (_\\       (_\\
`;

    var index = 0;

    var render = () => {
        process.stdout.write('\033[0f');
        process.stdout.write('\033[2J');

        if (index === frames.length) {
            index = 0;
        }
        console.log(frames[index++]);
        setTimeout(render, 200);
    };

    setTimeout(render, 200);
}




function demo_09(params) {
    // GIF动画
    var fs = require('fs');
    var path = require('path');

    var dirinfo = fs.readdirSync(path.join(__dirname, './frames'));
    // console.log(dirinfo);

    var files = [];

    dirinfo.forEach((item) => {
        files[files.length] = fs.readFileSync(path.join(__dirname, './frames', item), 'utf8');
    });
    // for(var i = 0; i<)

    var index = 0;

    var render = () => {
        process.stdout.write('\033[0f');
        process.stdout.write('\033[2J');

        if (index === files.length) {
            index = 0;
        }
        console.log(files[index++]);
        setTimeout(render, 200);
    };

    setTimeout(render, 80);
}


function demo_10(params) {
    // 人机交互
    var questions = {
        text: '你的兴趣爱好',
        answers: {
            '抽烟': {
                text: '你喜欢抽什么牌子的烟呢？',
                answers: {
                    '大前门': '你个屌丝，还抽烟',
                    '中华': '你个屌丝，没钱还抽中华',
                }
            },
            '喝酒': {
                text: '你能喝多少？',
                answers: {
                    '二两': '喝酒有害 健康',
                    '一斤': '走喝酒去',
                    '一直喝': '吹什么牛波',
                }
            },
            '烫头': {
                text: '你想要烫个什么造型',
                answers: {
                    '杀马特': '杀马特杀马特',
                    '洗剪吹': '洗剪吹洗剪吹洗剪吹',
                }
            }
        }
    };

    process.stdout.write('你的兴趣爱好是？');

    // process.stdin.

    process.stdin.setEncoding('utf8');

    process.stdin.on('readable', () => {
        var chunk = process.stdin.read();
        if (chunk !== null) {
            process.stdout.write(`data: ${chunk}`);
            if (chunk.trim() === 'q') {
                process.exit();
            }
        }
    });

    // process.stdin.on('end', () => {
    //   process.stdout.write('end');
    // });
}


function demo_11(params) {
    //异步回调函数


    /**
     * 同步的方式获取数据
     */
    function getUser() {
        // 模拟耗时操作
        for (var i = 0; i < 1000000000; i++) {}
        return { name: '赵小黑' };
    }

    /**
     * 异步的回调的方式获取数据
     */
    function getUserAsync(callback) {
        // 既然有可能耗时，那就一边呆着去，有空再来
        // 先挑简单的来做，大头放后面
        setTimeout(function() {
            // 模拟耗时操作
            for (var i = 0; i < 1000000000; i++) {}
            callback({ name: '赵小黑' });
        }, 0);
    }


    // console.time('sync');
    // var user = getUser();
    // console.log(user);
    // console.timeEnd('sync');


    console.time('async');
    getUserAsync(function(user) {
        console.log(user);
    });
    console.timeEnd('async');
}


function demo_12(params) {

    /**
     * 错误优先的回调函数
     * node 约定： 所有的回调函数默认都是错误优先的， 即回调函数的第一个参数都是一个错误对象。
     * 如果错误对象里面有数据， 那就证明这个过程发生了错误。 如果是null，那就证明这个过程没有错误。
     * 
     * 强调错误优先：
     *  因为之后的操作大多数都是异步的方式， 无法通过 try catch 捕获异常。 
     */


    /**
     * 异步的回调的方式获取数据
     */
    function isOddOrEvenAsync(number, callback) {
        if (number && typeof number === 'number') {
            if (number % 2) {
                callback(null, '奇数');
            } else {
                callback(null, '偶数');
            }
        } else {
            callback(new Error('你传的不是合法参数'));
        }
    }


    isOddOrEvenAsync(19, function(error, msg) {
        if (error) {
            console.error(error);
            return false;
        }
        console.log(msg);
    });

    isOddOrEvenAsync(10, function(error, msg) {
        if (error) {
            console.error(error);
            return false;
        }
        console.log(msg);
    });

    isOddOrEvenAsync(0, function(error, msg) {
        if (error) {
            console.error(error);
            return false;
        }
        console.log(msg);
    });

    isOddOrEvenAsync('aa', function(error, msg) {
        if (error) {
            console.error(error);
            return false;
        }
        console.log(msg);
    });
}