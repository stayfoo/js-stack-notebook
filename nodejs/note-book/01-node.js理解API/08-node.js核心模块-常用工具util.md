# node.js核心模块-常用工具util

> 是一个`node.js`核心模块，提供常用函数的集合，用于弥补核心`JavaScript`的功能过于精简的不足。

## 一、util.inherits(constructor, superConstructor) 

> 是一个实现对象间原型继承的函数。
> `JavaScript`的面向对象特性是基于原型的，与常见的基于类的不同。> `JavaScript`没有提供继承的语言级别特性，而是通过原型复制来实现的。

```js
var util = require('util');

//Animal 对象
function Animal(){
    this.name = 'Tom';
    this.birthday = '1990';
    this.showName = function(){
        console.log('我的名字是：'+this.name);
    };
}
Animal.prototype.eat = function(){
    console.log(this.name + '吃...');
};

//Cat 对象
function Cat(){
    this.name = 'Jack';
}
util.inherits(Cat, Animal); //Cat对象继承了Animal对象的原型


var objAnimal = new Animal();
console.log(objAnimal);
objAnimal.showName();
objAnimal.eat();



var objCat = new Cat();
console.log(objCat);
objCat.eat();
//objCat.showName();   //报错

```

运行结果：
```bash
bogon:code apple$ node util-inherits.js
Animal { name: 'Tom', birthday: '1990', showName: [Function] }
我的名字是：Tom
Tom 吃...
Cat { name: 'Jack' }
Jack 吃...
```

> 说明：
>>1. 定义了一个对象`Animal`, 在构造函数内定义了三个的属性; 在原型中定义了一个函数； 
>>2. 一个继承自 `Animal` 的 `Cat`, 通过  `util.inherits` 实现继承。
>>3. `Cat`仅仅继承了`Animal`在原型中定义的函数
>>4. `Animal`构造函数内部创造的 `birthday` 属性和 `showName` 函数都没有被 `Cat` 继承。
>>5. 在原型中定义的属性不会被`console.log`作为对象的属性输出。


## 二、util.inspect(obj, { showHidden: true, depth: null, colors:true})

> 一个将任意对象转换为字符串的方法，通常用于调试和错误输出。它至少接受一个参数`object`，即要转换的对象。  

> 参数：
>>- `showHidden` ：  是一个可选参数，如果值为`true`,将会输出更多隐藏信息。 
>>- `depth` ： 表示最大递归的层数，如果对象很复杂，你可以指定层数以控制输出信息的多少。如果不指定`depth`，默认会递归`2`层，指定为`null` 表示将不限制递归层数完整遍历对象。
>>- `colors` ：值为`true`，输出格式将会以`ANSI`颜色编码，通常用于在终端显示更漂亮的效果。


> 注意：`util.inspect` 并不会简单地直接把对象转换为字符串，即使该对象定义了 `toString` 方法也不会调用。








