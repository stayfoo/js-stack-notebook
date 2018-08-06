var settings = require('../settings');

var Db = require('mongodb').Db; //数据库对象（通过new调用它创建了一个数据库连接实例）
var Connection = require('mongodb').Connection; //数据库连接对象
var Server = require('mongodb').Server; //数据库服务对象（用于指定一个名字和服务器端口）（new创建一个服务器实例）

/*
 
  要给数据库服务传配置信息，如 host 主机号， post 端口号 可能会有用户名和密码。
 */

//输出创建的数据库链接
module.exports = new Db(settings.db, new Server(settings.host, 27017, {}));

