var express = require('express');
var router = express.Router();

var marked = require('marked'); //markdown => html
var fs = require("fs");

var multer = require('multer'); //文件上传  安装：npm install express multer multer --save
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, "file.md")
  }
});
var uploadMulter = multer({ storage: storage });


marked.setOptions({
    renderer: new marked.Renderer(),
    gfm: true,
    tables: true,
    pedantic: false,
    sanitize: false,
    smartLists: true,
    smartypants: false
});

/*
 * crypto  ：是 Node.js 的一个核心模块，
 * 功能是加密并生成各种散列，使用它计算了密码的散列值。
 */
var crypto = require('crypto'); 

var User = require('../models/user.js');
var Publish = require('../models/publish.js'); //数据库操作 - 文章
var Comment = require('../models/comment.js'); //数据库操作 - 评论



// 中间件 --所有路由都经过
router.use(function timeLog(req,res,next){

    next();
});



//定义路由：
/*
  /publish 、/login 、/register 由于要接受表单信息，因此使用post注册路由。
  /login 、/register 还要显示用户注册时要填写的表单，所以要以get注册。
 */

/* 主页 */
router.get('/', index);
router.get('/blog/', index);
router.get('/blog', index);
/** 更多目录 */
router.get('/blog/archives.html', archive);

/* 后台 - 文章上传 */
// router.post('/publish', checkLogin); //中间件
router.get('/admin/upload.html', uploadHtml);
router.post('/upload', uploadMulter.single('file'),upload);

/** 文章显示路由 */ 
router.get(/\/blog\/(.*)\.html/, article);



module.exports = router;



//定义路由回调

function index(req, res, next){
    
    Publish.getAllOfAuthorPage('孟跃平', 1, 2,function(err,publishs,total){
        //console.log('publishs: ' + publishs.constructor); //类型
        var publish = publishs[0];
        //console.log('publish: ' + publish.constructor); //类型
        
        res.render('content.ejs', {
            publishs: publishs,
            title: publish.title,

            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });

    });

    // Publish.getAllOfAuthor('孟跃平',function(err,publishs){
    //     //console.log('publishs: ' + publishs.constructor); //类型
    //     var publish = publishs[0];
    //     //console.log('publish: ' + publish.constructor); //类型
        
    //     res.render('content.ejs', {
    //         publishs: publishs,
    //         title: publish.title,
    //         // author : publish.author,
    //         // publish: publish.publish,
    //         // day : publish.time.day,
    //         success : req.flash('success').toString(),
    //         error : req.flash('error').toString()
    //     });

    // });
    // throw new Error('An error for test purposes.'); //产生一个错误，测试错误日志记录
};

function archive(req, res, next){
    var page = req.query.p ? parseInt(req.query.p) : 1;
    var pageNo = 2; //每页 pageNo 数
    Publish.getAllOfAuthorPage('孟跃平', page, pageNo,function(err,publishs,total){
        if(err){
            return console.log(err);
        }
        var publish = publishs[0];
        
        res.render('archives.ejs', {
            publishs   : publishs,
            title      : publish.title,
            page       : page,
            total      : total,
            totalPage  : Math.ceil(total / 20), //向上取整
            isFirstPage: (page - 1) == 0 ,
            isLastPage : ((page - 1) * pageNo + publishs.length) == total,
            success : req.flash('success').toString(),
            error : req.flash('error').toString()
        });

    });
};


/**
 * 展示文章页面
 * @param {*} req 
 * @param {*} res 
 */
function article(req, res, next){
    console.log('+++++++++++++++++++++req.query: ',req.url); ///blog/58edb5e4568f707ab48723e1.html
    // var id = req.query.id; //获取参数

    var temp = req.url;
    var t = '/blog/';
    var start = temp.indexOf('/blog/')+t.length;
    var stop = temp.indexOf('.html');
    var id = temp.substring(start,stop)

    Publish.getOneOfId(id, function(err,doc){
        console.log('========doc: ' + doc);
        if(err){
            return console.log(err);
        }
        var timestamp = doc.time.timestamp;
        var url = '/blog/' + timestamp + '.html';
        console.log('url : ' + url);

        res.render('article.ejs', {
                title  : doc.title,
                author : doc.author,
                time   : doc.time.day,
                article: doc.publish
        });
    });

};


/**
 * 上传文件页面 路由回调
 * 
 * @param {*} req 
 * @param {*} res 
 */
function uploadHtml(req, res){
    console.log("req: " + req);
    var title = req.params.title;

    res.render('upload.ejs', {
        title: '上传文章',
    });
};

/**
 * 上传文件 路由回调
 * 
 * @param {*} req 
 * @param {*} res 
 */
function upload(req, res, next){

    console.log('--file ： ', req.file);
    console.log('--files ： ', req.files);
    console.log('--body ： ', req.body);

    //读取上传的markdown文档，并转换成html，存入数据库
    fs.readFile('uploads/file.md', 'utf-8', function(err, data){
            if(err){
                console.log("文件读取失败 - err: " + err);
                req.flash('error', err);
                return res.redirect('/');
            }
            
            console.log("文件读取完毕.....");
            var htmlData = marked(data);

            publish(req,res,htmlData);
    });


    // req.flash('success', '文件上传成功!');
    res.status(200).json({
        file:req.files
    });

    // res.redirect('/admin/upload.html');
};




/************************************************************/
/**
 * {PrivateMethod} 工具方法
 */

/**
 * 后台 - 存储文章 html5 内容
 * 
 * @param {any} req 
 * @param {any} res 
 */
function publish(req, res, htmlData){
    // var currentUser = req.session.user; //获取当前用户信息
    // req.body.publish 获取用户发表的内容
    var htmlTitle = htmlData.match('.*\<\/h1\>|.*\<\/H1\>')[0];
    var temp = htmlTitle.match('\>.*\<')[0];
    var start = temp.indexOf('>')+1;
    var stop = temp.indexOf('<');
    var publishTitle = temp.substring(start,stop);
    
    var author  = "孟跃平";      //作者
    var title   = publishTitle; //文章标题
    var publish = htmlData;     //文章内容
    var publish = new Publish(author, title, publish);
    // console.log("publish: " + publish.constructor);

    //存储信息
    publish.save(function(err){ 
        if(err){
          req.flash('error', err);
          return res.redirect('/');
        }
        req.flash('success', '发表成功');
        // res.redirect('/blog/');  //重定向到该文章显示界面
    });
    // res.send('发布');
};





/* 注册. */
// router.get('/register', checkNotLogin); //中间件
// router.get('/register', register);
// router.post('/register', checkNotLogin); //中间件
// router.post('/register', doRegister);
/* 登录. */
// router.get('/login', checkNotLogin); //中间件
// router.get('/login', login);
// router.post('/login', checkNotLogin); //中间件
// router.post('/login', doLogin);
/* 注销. */
// router.get('/logout', checkLogin); //中间件
// router.get('/logout', logout);
/* 用户 */ 
// router.get('/user/:user', getUser);








// function register(req,res){
//   res.render('register',{title : 'BLOG--博客网站'});
//   // res.send('注册-get');
// };
// function doRegister(req,res){

//   /*
//   req.body ：就是 POST 请求信息解析过后的对象，例如我们要访问用户传递的 password 域的值，只需访问 req.body['password']
//   res.redirect ：重定向功能，通过它会向用户返回一个 303 See Other 状态，通知浏览器转向相应页面。
//   */
//   console.log('body==: ' + req.body);

//   // 检验用户两次输入的口令是否一致
//   if(req.body['password-repeat'] != req.body['password']){
//     req.flash('error', '两次输入的口令不一致');
//     return res.redirect('/register');
//   }
//   //生成口令的散列值
//   var md5 = crypto.createHash('md5');
//   var password = md5.update(req.body.password).digest('base64');

//   var newUser = new User({
//     name: req.body.username,
//     password: password,
//   });

//   //检查用户名是否已经存在
//   User.get(newUser.name, function(err, user){
//     if(user){
//       err = 'Username already exists.';
//     }
//     if(err){
//       req.flash('error', err);
//       return res.redirect('/register');
//     }
//     //如果不存在，则新增用户
//     newUser.save(function(err){
//       if(err){
//         req.flash('error', err);
//         return res.redirect('/register');
//       }
//       req.session.user = newUser; //向会话对象写入了当前用户信息，在后面我们会通过它判断用户是否已经登录。 
//       req.flash('success', '注册成功');
//       res.redirect('/');
//     });
//   });
//   // res.send('注册-post');
// };


// function login(req,res){
//   res.render('login', {title: '用户登入'});
//   // res.send('登录-get');
// };
// function doLogin(req,res){
//   //生成口令的散列值
//   var md5 = crypto.createHash('md5');
//   var password = md5.update(req.body.password).digest('base64');

//   User.get(req.body.username, function(err, user){
//     if(!user){
//       req.flash('error', '用户不存在');
//       return res.redirect('/login');
//     }
//     if(user.password != password){
//       req.flash('error', '用户口令错误');
//       return res.redirect('/login');
//     }
//     req.session.user = user;
//     req.flash('success', '登入成功');
//     res.redirect('/');
//   });

//   // res.send('登录-post');
// };
// function logout(req,res){
//   req.session.user = null;
//   req.flash('success', '登出成功');
//   res.redirect('/');
//   // res.send('退出登录');
// };

// function getUser(req, res){
//   User.get(req.params.user, function(err, user){
//     if(!user){ //检查用户是否存在
//       req.flash('error', '用户不存在');
//       return res.redirect('/');
//     }
//     // 从数据库获取该用户的微博
//     Publish.get(user.name, function(err,publishs){
//       if (err) {
//         req.flash('error', err);
//         return res.redirect('/');
//       }
//       // 渲染 user 视图
//       res.render('user', {
//         title: user.name,
//         publishs: publishs,
//       });
//     });
//   });
// };








// // 页面权限控制 
// function checkLogin(req, res, next){
//   if(!req.session.user){
//     req.flash('error', '未登入');
//     return res.redirect('/login');
//   }
//   next();
// }

// function checkNotLogin(req, res, next){
//   if(req.session.user){
//     req.flash('error', '已登入');
//     return res.redirect('/');
//   }
//   next();
// }