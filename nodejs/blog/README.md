# BLOG系统


```bash
.
├── admin
│   ├── article                  # markdown 文件
│   ├── css
│   └── js
├── bin                          # 启动脚本
├── data
│   └── db
│       ├── diagnostic.data
│       └── journal
├── models                       # model
├── node_modules                 # 依赖
│   ├── body-parser
│   ├── connect
│   ├── connect-flash
│   ├── connect-mongo
│   ├── cookie-parser
│   ├── debug
│   ├── ejs
│   ├── express
│   ├── express-session
│   ├── mongodb
│   ├── morgan
│   └── serve-favicon
├── public                      # 静态文件夹
│   ├── images
│   ├── javascripts
│   └── stylesheets             # css
├── routes                      # controller
└── views                       # 模板
```


## 1、 功能分析

>1. 用户注册和登录功能
>2. 信息发布功能（涉及数据库访问、前端显示）
>3. 信息的评论、转发、圈点用户
>

## 2、 路由规划

|路径            |代表       |用户状态     |  访问 |
|----------------|----------|-----------|-------------|
| `/`            | 首页      |已登录&未登录|http://127.0.0.1:3000/|
| `/user/[user]` | 用户的主页 |已登录&未登录|http://127.0.0.1:3000/|
| `/publish`     | 发表信息   |已登录      |http://127.0.0.1:3000/|
| `/register`    | 用户注册   |未登录      |http://127.0.0.1:3000/|
| `/login`       | 用户登录   |未登录      |http://127.0.0.1:3000/|
| `/logout`      | 用户登出   |已登录      |http://127.0.0.1:3000/|


## 3、 用户注册和登录

>会话机制 -- 记录用户状态
>
>数据库 -- 保存和读取用户信息

### (3.1)、数据库

>`MongoDB` ：开源的 `NoSQL` 数据库 ；
>
>轻巧灵活，适合数据规模很大、事务性不强的场合下使用。
>
>对象数据库，所有数据以文档的形式存储。
>
>文档就是一个关联数组式的对象，它的内部由属性组成，一个属性对应的值可能是一个数、字符串、日期、数组，甚至是一个嵌套的文档。
>
>对数据的操作都是以文档为单位，也可以修改文档的部分属性。
>
>只需要指定文档的任何一个属性，就可在数据库中将满足条件的所有文档筛选出来。
>
>也有文档索引。


>`NoSQL` (`Not Only SQL`) : 主要指非关系型、分布式、不提供ACID（数据库中事务所必须具备的四个特性：原子性、一致性、隔离性、持久性）的数据库系统。
>`NoSQL` 是SQL数据库的一个补充，有着各自不同的适用领域。
>`NoSQL` 没有统一的架构和接口。



电脑上安装、启动 `mongo` ：

```bash
#安装
$ brew install mongodb
#配置数据文件路径（数据存放地点）
$ mongod --dbpath "/Users/aibdai/Desktop/BLOG/data/db"
#启动
$ mongod
```

安装路径：`/usr/local/Cellar/mongodb/`




项目包依赖安装：

```bash
$ npm install MongoDB --save
```




### (3.2)、会话

一种持久的网络协议
完成客户端和服务器之间的交互行为。
一次会话可能包含多次连接，每次连接都被认为是会话的一此操作。
HTTP协议是无状态的，本身不支持会话。


Cookie是为了在无状态的 HTTP 协议之上实现会话。
Cookie是一些存储在客户端的信息，每次连接的时候由浏览器向服务器递交，
服务器也向浏览器发起存储Cookie的请求，依靠这样的手段服务器可以识别客户端。

实现HTTP会话功能过程：
浏览器首次向服务器发起请求时，服务器生成一个唯一的标识符并发送给客户端浏览器，
浏览器将这个唯一的标识符存储在Cookie中，以后每次再发起请求，客户端浏览器都会向服务器传递这个唯一标识符，
服务器通过这个唯一标识符来识别用户。


Express 默认把用户信息存储在内存中，可以把会话信息存储在数据库，持久维护。
connect-mongo

安装：
```bash
$ npm install connect-mongo --save
```

安装：

```bash
$ npm install express-session --save
```

安装：

```bash
$ npm install connect-flash --save
```


`DRY 原则` ：`Once And Only Once`，软件工程设计的一个基本原则。
开发中应该避免相同意义的代码重复出现。


## 4、 发表微博


NodeJS -Express 4.0 用include取代partial , 抛弃partial插件，在Express 3.x中加入了include方法.


## 5、 未实现功能

对注册信息完整验证：用户名规则、密码长短
验证码和邮箱：防止恶意注册
支持OAuth
发表长度限制
首页和用户页面显示有数量限制，分页功能
用户关注、转帖、评论、圈点用户
每次查询数据库要有限制取得的数量
对一些访问频繁的页面增加缓存机制





## 6、 手动启动服务器

> 1. 启动数据库

```bash
$ cd BLOG/
$ mongod --dbpath "/Users/aibdai/Desktop/BLOG/data/db"
```

> 2. 启动服务器 

```bash
$ cd BLOG/
$ node bin/www
```


## 7、 markdown转换html


```bash
# 安装包 marked
# 作用： 把markdown文档转换为html标签
$ npm install marked --save
```

```html
<!-- 作用： 对markdown生成html标签添加样式 -->
<link rel="stylesheet" href="/stylesheets/github-markdown.css" />
```


