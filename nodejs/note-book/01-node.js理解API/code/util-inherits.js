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
    console.log(this.name + ' 吃...');
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

