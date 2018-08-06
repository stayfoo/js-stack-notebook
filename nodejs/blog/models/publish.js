/*
 * 文章模型对象
 */ 
var ObjectID = require('mongodb').ObjectID;
var mongodb = require('./db');

function Publish(author, title, publish,time,_id){
    this._id     = _id;         //文章id
    this.author  = author;      //作者
    this.title   = title;       //文章标题
    this.publish = publish;     //文章内容
    this.time    = time;        //时间
    this.comments   = [];       //用户留言
};
module.exports = Publish;



/**
 * 存储一篇文章及其相关信息。
 * 
 * publish.prototype.save ： publish 对象实例的方法，用于将对象的变动保存到数据库。
 */
Publish.prototype.save = function save(callback){
    var date = new Date();
    //存储各种时间格式，方便以后扩展
    var time = {
        timestamp : (Date.parse(date) / 1000), //时间戳字符串
        date  : date,
        year  : date.getFullYear(),
        month : date.getFullYear() + "-" + (date.getMonth() + 1),
        day   : date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate(),
        minute: date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + (date.getMinutes() < 10 ? '0' + date.getMinutes():date.getMinutes())
    }
    // 要存入数据库的文档
    var publish = {
        author : this.author,  //作者
        title  : this.title,   //文章标题
        publish: this.publish, //文章内容
        time   : time,         //时间
    };

    // 打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }  

        /**
         * 读取 publishs 集合
         * 
         * {publishs} ：集合的名字
         */
        db.collection('publishs', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            /**
             * 将文档(publish)写入集合(publishs)
             * 
             * {publish} ：要写入的文档数据
             */ 
            collection.insert(publish, {safe: true}, function(err, publish){
                mongodb.close();
                callback(err, publish);
            });
        });
    });
};



/**
 * 读取一条数据
 * 
 *  {id}  : 文档id 
 * callback {doc}  ：数据
 */
Publish.getOneOfId = function(id, callback){
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 publishs 集合
        db.collection('publishs', function(err, col){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //根据文章id，进行查询
            col.findOne({
                "_id": new ObjectID(id),
            },function(err, doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, doc); //返回查询的一篇文章
            });
        });
    });
};


/**
 * 读取一条数据
 * 
 * 条件：
 * {name}  : 作者 
 * {day}   : 时间
 * {title} : 标题
 */
Publish.getOne = function(name, day, title, callback){
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 publishs 集合
        db.collection('publishs', function(err, col){
            if(err){
                mongodb.close();
                return callback(err);
            }
            //根据用户名，发表日期及文章名进行查询
            col.findOne({
                "name":name,
                // "time.day":day,
                "title":title
            },function(err, doc){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null, doc); //返回查询的一篇文章
            });
        });
    });
};



/**
 * 读取相应作者的所有数据
 * 
 * {author}  : 作者名字
 */
Publish.getAllOfAuthor = function get(author, callback){
    // 打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        // 读取 publishs 集合
        db.collection('publishs', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }

            // 查找 author 属性为 author 的文档，如果 author 是 null 则匹配全部
            var query = {};
            if(author){
                query.author = author;
            }
            //根据 query 对象查询文章
            collection.find(query).sort({time: -1}).toArray(function(err, docs){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                // console.log('docs: ' + docs.constructor);

                // 把查询到的所有 Publish 对象，存入集合 publishs中，返回。
                var publishs = [];
                docs.forEach(function(doc, index){
                    var publish = new Publish(doc.author, doc.title, doc.publish, doc.time,doc._id);
                    publishs.push(publish);
                    
                    console.log('publishs: '+publishs);
                });
                callback(null, publishs);
            });
        });
    });
}


/**
 * 分页查找数据
 * 
 * {author}   :作者
 * {page}     :页码 
 * {pageSize} :每页数量
 * 
 * return callback {err}    错误
 * return callback {docs}   数据集合
 * return callback {total}  总数
 */
Publish.getAllOfAuthorPage = function get(author, page, pageSize, callback){
    //打开数据库
    mongodb.open(function(err, db){
        if(err){
            return callback(err);
        }
        //读取 publishs 集合
        db.collection('publishs', function(err, collection){
            if(err){
                mongodb.close();
                return callback(err);
            }
            // 查找 author 属性为 author 的文档，如果 author 是 null 则匹配全部
            var query = {};
            if(author){
                query.author = author;
            }
            //使用 count 返回特定查询的文档数 total
            collection.count(query,function(err,total){
                
                collection.find(query,{
                    skip: (page - 1) * pageSize,
                    limit: pageSize
                }).sort({
                    time: -1
                }).toArray(function(err,docs){
                    mongodb.close();
                    if(err){
                        return callback(err);
                    }
                    callback(null, docs, total);
                });
            });
        });
    });
};

/**
 * 获取文章总数量
 * 
 * {author} 根据作者，如果 null ，查找全部
 * 
 * callback {total}  数据库中文章的总数量
 */
Publish.getAllOfTotalNum = function get(author, callback){
    // 查找 author 属性为 author 的文档，如果 author 是 null 则匹配全部
    var query = {};
    if(author){
        query.author = author;
    }
    //使用 count 返回特定查询的文档数 total
    collection.count(query,function(err,total){
        if(err){
            return callback(err);
        }
        callback(null, total);
    });
};

