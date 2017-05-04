var events = require('events');
var emitter = new events.EventEmitter();

emitter.on('someEvent', function(arg1,arg2){
    console.log('listener1 ', arg1,arg2);
});

emitter.on('someEvent', function(arg1,arg2){
    console.log('listener2 ',arg1,arg2);
});

//发射 someEvent 事件
emitter.emit('someEvent', 'www.mengyueping.com', 1990);


emitter.emit('error', new Error('whoops!'));
