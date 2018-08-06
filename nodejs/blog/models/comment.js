/**
 * 用户评论
 */

var ObjectID = require('mongodb').ObjectID;
var mongodb = require('./db');
function Comment(name, day, title, comment){
    this.name    = name;   
    this.day     = day;
    this.title   = title;
    this.comment = comment;
};

module.exports = Comment;

/**
 * 存储一条留言信息
 */
Comment.prototype.save = function(callback){
    var id = this._id;
    var comment  = this.comment;
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
            //通过 id 查找文档，并把一条留言对象添加到该文档的 comments 数组里 
            collection.update({
                "_id" : ObjectID(id)
            }, {
                $push: {"comments" : comment}
            }, function(err){
                mongodb.close();
                if(err){
                    return callback(err);
                }
                callback(null);
            });
        });
    });
};
