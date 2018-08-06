var express = require('express');


var fs = require('fs');
var accessLogfile = fs.createWriteStream('access.log', {flags: 'a'});
var errorLogfile = fs.createWriteStream('error.log', {flags: 'a'});


var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');  //可以使用它记录日志
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');  //单独安装
var MongoStore = require('connect-mongo')(session);  //单独安装
var flash = require('connect-flash');  //单独安装

var settings = require('./settings');


var app = express();



app.use(logger('dev')); //打印到控制台
app.use(logger('combined', {stream: accessLogfile})); //打印到 log 日志文件
//打印错误日志
app.use(function(err, req, res, next){
  var now = new Date();
  var time = now.getFullYear() + '-' + now.getMonth() + '-' + now.getDate() 
              + '' + now.getHours() + ':' + now.getMinutes() + ':' + now.getSeconds();

  var meta = '[' + time + ']' + req.bodyParser.method + ' ' + req.bodyParser.url + '\r\n';
  errorLogfile.write(meta + err.bodyParser.stack + '\r\n\r\n\r\n');
  // logger('combined', {stream: errorLogfile})
  next();
}); 


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
// app.set('view options', {
//   layout: true
// });

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser()); //Cookie解析的中间件
app.use(express.static(path.join(__dirname, 'public')));
app.use(flash()); // 使用 connect-flash 模块

//提供会话支持
app.use(session({  
  secret: settings.cookieSecret,
  // 创建新的 mongodb 数据库
  store: new MongoStore({ //设置store参数为MongoStore实例，把会话信息存储到数据库中
    // host: 'localhost',
    // port: 27017,
    // db: settings.db,
    // url: 'mongodb://localhost:27017/blog'
    url: 'mongodb://localhost:27017/'+settings.db,
    autoRemove: 'native'
  })
}));




app.use(function(req, res, next){
  res.locals.user = req.session.user;

  var err = req.flash('error');
  var succ = req.flash('success');

  res.locals.error = err.length ? err : null;
  res.locals.success = succ.length ? succ : null;
  
  next();
});


var index = require('./routes/index');
// var users = require('./routes/users');

app.use('/', index);

// app.use('/register',index);
// app.use('/login',index);
// app.use('/logout',index);
// app.use('/user/:user', index);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

console.log('Http server is listening at port 3000.');





