var util = require('util');
function Person(){
    this.name = 'www.mengyueping.com';
    this.toString = function(){
        return this.name;
    };
}
var obj = new Person();

console.log(util.inspect(obj));
console.log(util.inspect(obj, { showHidden: true, depth: null, colors:true}));