# node.js中的几个特殊概念
## 一、模块（Module）

文件和模块是一一对应的。
>可以是`JS`代码、`JSON`或编译过的`C/C++`扩展。

eg：`http`是`node.js`的一个核心模块，其内部使用`C++`实现的，外部用`JavaScript`封装。

`nodejs`中提供了 `exports` 和 `require` 两个对象，
>其中：
>>- `exports` ：是模块公开的接口；
>>- `require` ：用于从外部获取一个模块的接口，即所获取模块的`exports`对象。

`require`不会重复加载模块，无论调用多少次`require`，获得的模块都是同一个。
> `node.js`只有在第一次引用到某部分时才会去解析脚本文件，以后都会直接访问内存，避免重复载入，而PHP则总是重新读取并解析脚本（如果没有专门的优化配置）。



## 二、exports对象

### 1、例子1

```js
//文件名：module.js
var name;
exports.setName = function(name){
    name = name;
};
exports.sayHello = function(){
    console.log('Hello ' + name);
};
```

```js
// 文件名：getmodule.js   
// 与module.js在同一个目录下

var myModule = require('./module');
myModule.setName('MengYuePing');
myModule.sayHello();

//运行： node getmodule.js
//结果： Hello MengYuePing
```
> 说明：
>>实例中，`module.js`通过`exports`对象把`setName`和`sayHello`作为模块的访问接口，在`getmodule.js`中通过`require('./module')`加载这个模块，然后就可以直接访问`module.js`中`exports`对象的成员函数了。

### 2、例子2：覆盖exports

```js
// 场景：有时候，我们只想把一个对象封装到模块中
// 文件名： hello.js
function Hello(){
    var name;
    this.setName = function(name){
        name = name;
    };
    this.sayHello = function(){
        console.log('Hello ' + name);
    };
};
exports.Hello = Hello;
```
> 说明：
>> 实例中，其他文件使用`Hello`对象时，需要通过`require('./hello.js').Hello`来获取`Hello`对象，（即为：先拿到`module`的`exports`对象，然后，通过`exports.Hello`获取`Hello`对象），这略显沉余。

简化如下：
```js
//简化后的 hello.js 文件
function Hello(){
    var name;
    this.setName = function(name){
        name = name;
    };
    this.sayHello = function(){
        console.log('Hello ' + name);
    };
};
module.exports = Hello;
```
> 说明：
>> 简化后，通过`require('./hello.js')`获取的即为`Hello`对象。


>- 事实上，`exports`本身仅仅是一个普通的空对象，即 `{}`，它专门用来声明接口，本质上是通过它为模块闭包的内部建立了一个有限的访问接口。
>- 因为它没有任何特殊的地方，所以可以用其他东西来代替。
譬如：上面例子中的`Hello`对象。

> 注意：
>>- 不可以通过对`exports`直接赋值代替对`module.exports`赋值，只能通过指定`module.exports`来改变访问接口。
>>- 原因：`exports`实际上只是一个和`module.exports`指向同一个对象的变量，它本身会在模块执行结束后释放，但`module`不会。

## 三、包（`Package`）
### 1、概述
> 包是在模块基础上更深一步的抽象，`node.js`的包类似于`C/C++`的函数库或者`Java`/`Net`的类库。

> 它将某个独立的功能封装起来，用于**发布**、**更新**、**依赖管理**和**版本控制**。

> `node.js`根据`CommonJS`规范实现了包机制，开发了`npm`来解决包的发布和获取需求。

> `node.js`的包是一个目录，其中包含一个`JSON`格式的包说明文件`package.json`。

> 严格符合`CommonJS`规范的包应该具备特征：
>>- (1)  `package.json`必须在包的顶层目录下；
>>- (2)  二进制文件应该在`bin`目录下；
>>- (3)  `JavaScript`代码应该在`lib`目录下；
>>- (4)  文档应该在`doc`目录下；
>>- (5)  单元测试应该在`test`目录下;

### 2、文件夹（模块）
模块与文件是一一对应的。
> 文件不仅可以是`JavaScript`代码或二进制代码，还可以是一个**文件夹**。
>
> 最简单的包，就是一个文件夹模块。

例子：
```js
// 文件：somepackage/index.js
exports.hello = function(){
    console.log('Hello.');
}
```

```js
// 文件：getpackage.js   位置：在somepackage之外
var somePackage = require('./somepackage');
somePackage.hello();

// 运行： node getpackage.js
// 控制台输出结果： Hello.
```

* 使用这种方法，可以把文件夹封装为一个模块，即所谓的`包`。
* `包`通常是一些模块的集合，在模块的基础上提供了更高层的抽象，相当于提供了一些固定接口的函数库。
* 通过定制`package.json`，可以创建更复杂、更完善、更符合规范的包用于发布。

### 3、package.json
#### 3.1 调用过程

第一步：
`node.js`在调用某个包时，会首先检查包中`package.json`文件的`main`字段，将其作为包的接口模块。

第二步：
如果`package.json`或`main`字段不存在，会尝试寻找`index.js`或`index.node`作为包的接口。

#### 3.2 `package.json`包含的字段

> `package.json`是`CommonJS`规定的用来描述包的文件。

> 完全符合规范的`package.json`文件应该含有字段：
>>- `name`：包的名称，必须是唯一的，由小写英文字母、数字和下划线组成，不能包含空格。
>>- `description`：包的简要说明。
>>- `version`：符合语义化版本识别规范的版本字符串。
>>- `keywords`：关键字数组，通常用于搜索。
>>- `maintainers`：维护者数组，每个元素要包含name、email（可选）、web（可选）字段。
>>- `contributors`：贡献者数组，格式与maintainers相同。包的作者应该是贡献者数组的第一个元素。
>>- `bugs`：提交bug的地址，可以是网址或者电子邮件地址。
>>- `licenses`：许可证数组，每个元素要包含type（许可证的名称）和url（链接到许可证文本的地址）字段。
>>- `repositories`：仓库托管地址数组，每个元素要包含`type`（仓库的类型，如git）、`url`（仓库的地址）和`path`（相对于仓库的路径，可选）字段。
>>- `dependencies`：包的依赖，一个关联数组，由包名称和版本号组成。


