项目介绍
==================

Contents
-----------------

* [01_skinTransform](#Demo_01)
* [02_模态框](#Demo_02)
* [03_tab栏切换原理](#Demo_03)
* [04_星座运势](#Demo_04)
* [05_clock](#Demo_05)
* [06_5秒之后自动跳转页面](#Demo_06)
* [07_大图上下滚动效果](#Demo_07)
* [08_无缝滚动](#Demo_08)
* [09_焦点图](#Demo_09)
* [10_左右轮播图](#Demo_10)
* [11_导航条选中效果](#Demo_11)
* [12_点击跟随鼠标](#Demo_12)
* [13_放大镜](#Demo_13)
* [14_拖动水平条](#Demo_14)
* [15_拖动弹出框](#Demo_15)


01_skinTransform <a id="Demo_01"></a>
---------------------

换肤。

#### 逻辑 

>1、更换的是`body`的`background`背景图片
>
>2、一个透明盒子，里面有几个预览小图盒子
>
>3、居中设置样式
>
>4、点击小图，获取事件源，更换`body`为选中的事件源图片

获取所有小图标签，存放到数组pics中：

```javascript
var pics = new Array(5);
for (var i = 0; i < 5 ; i++) {
 	var picNum = 'pic'+(i+1);
 	pics[i] = document.getElementById(picNum);
 }
```

传入一个序号，改变body背景图片，封装操作为函数：

```javascript
var changeThemo = function(num){
	 var pic = "url(images/" + (num + 1) + ".jpg" + ")";
	 document.body.style.backgroundImage = pic;
}
```

#### 技术思想 

* 入口函数：

```javascript
window.onload = function(){}
```

页面加载完毕之后，才执行函数体里面的JS部分。

02_模态框 <a id="Demo_02"></a>
---------------------

弹出模态窗口；

** 逻辑 **

>1、登录时，弹出模态窗口，进行登录
>
>2、遮罩效果，一个div盒子，设置样式，始终在最前面（z-index）
>
>3、一个登录框，在遮罩的前面（z-index比遮罩的大）
>
>4、监听设置：display:none 或 block

设置遮罩的CSS样式：`position: fixed;`保证浏览器下拉时，遮罩位置修复，始终存在在屏幕可见区域；
`z-index: 999;`保证遮罩不影响其他标签布局，在所有层级之上；
`display: none;`遮罩默认设置为隐藏。

```CSS
.mask {
			width: 100%;
			height: 100%;
			background: rgba(0,0,0,.5);
			position: fixed;
			top: 0;
			left: 0;
			z-index: 999;
			display: none;
		}
```

设置弹出登录框的CSS样式：固定定位窗口居中
`top: 50%;`，`margin-top`是高度的一半，`left: 50%;`，`margin-left`是宽度的一半。

```CSS
.box{
			width: 400px;
			height: 250px;
			background-color: #fff;
			position: fixed;
			top: 50%;
			left: 50%;
			margin: -125px 0 0 -200px;
			z-index: 1000;
			display: none;
		}
```

** 技术思想 **

* 固定定位

就是相对浏览器窗口定位。
页面如何滚动，这个盒子显示的位置不变。
固定定位脱标！

* 绝对定位的盒子居中：

绝对定位之后，所有标准流的规则，都不适用了。所以margin:0 auto;失效。
非常简单，当做公式记忆下来。就是：
** left:50%; margin-left:负的宽度的一半**


03_tab栏切换原理 <a id="Demo_03"></a>
---------------------

** 逻辑 **

>1、五个tabBarItem（button标签），放在一个div中；
>
>2、五个内容盒子（div），一个tabBarItem对应一个内容盒子（div）；
>
>3、把这两部分放在一个div中，一个整体，布局设置CSS，居中；
>
>4、五个内容盒子，默认显示第一个，其他的隐藏，设置display:none;
>
>5、js交互：所有的tabBarItem的button标签放进一个数组，所有的内容盒子div标签放进另一个数组；
>
>6、当点击tabBarItem时候，找到相同 标号 的内容盒子数组中的div，设置显示，其他的设置隐藏；
>
>7、tabBarItem对应的button标签设置选中的css样式。在设置之前，记得清空之前选中的button标签设置的样式；
>

自定义属性：`btns[i].index`，给每一个button定义一个index属性，储存序号

```javascript
for (var i = 0; i < btns.length; i++) {
	  btns[i].index = i; //**自定义属性index

	  btns[i].onclick = function(){
    		//清空所有的btn 类名
        for (var j = 0; j < btns.length; j++) {
    			btns[j].className = "";
    		}
    		// 当前的那个按钮 的添加 类名
    		this.className = "purple";

    		// 先隐藏下面所有的 div盒子
    		for (var n = 0; n < divs.length; n++) {
    			divs[n].style.display = "none";
    		}
    		// 点击button的序号,对应的内容盒子, 设置为显示
    		divs[this.index].style.display = "block";
	  }
}
```

代码优化：

```javascript
for (var i = 0; i < btns.length; i++) {
  btns[i].index = i; //**

	btns[i].onclick = function(){
      for (var j = 0; j < btns.length; j++) {
          //清空所有的btn 类名
          btns[j].className = "";
          // 先隐藏下面所有的 div盒子
          divs[j].className = "";
      }
      // 当前的那个按钮 的添加 类名
      this.className = "purple";
      // 点击button的序号,对应的内容盒子, 设置为显示
      divs[this.index].className = "show";
	}
}
```

封装tab栏切换函数：
封装：如果页面中有多个这种tab切换模块，可以进一步进行封装，通过模块最外层div的id进行区分。
多个盒子互不影响，可以通过id给他们分开。

```javascript
function tab(targetId){
    var target = document.getElementById(targetId);
    var btns = target.getElementsByTagName("button");
    var divs = target.children[1].getElementsByTagName("div");

    for (var i = 0; i < btns.length; i++) {
        btns[i].index = i;
        btns[i].onclick = function(){
            for (var j = 0; j < btns.length; j++) {
            	  btns[j].className = "";
            	  divs[j].className = "";
            }
            this.className = "purple";
            divs[this.index].className = "show";
        }
    }
}

tab("clothing");
```

** 技术思想 **

* 排他思想

首先干掉所有人，然后设置我自己。

* margin的塌陷现象

标准文档流中，竖直方向的margin不叠加，以较大的为准。
如果不在标准流，比如盒子都浮动了，那么两个盒子之间是没有塌陷现象的。

* 盒子居中`margin:0 auto;`

margin的值可以为auto，表示自动。
当left、right两个方向，都是auto的时候，盒子居中了：

```
margin-left: auto;
margin-right: auto;
```

简写为：
`margin:0 auto;`

注意：
>1）使用`margin:0 auto;` 的盒子，必须有width，有明确的width
>
>2）只有标准流的盒子，才能使用margin:0 auto; 居中。
也就是说，当一个盒子浮动了、绝对定位了、固定定位了，都不能使用margin:0 auto;
>
>3）`margin:0 auto;`是在居中盒子，不是居中文本;
文本的居中，要使用`text-align:center;`

`margin:0 auto;`   → 让这个div自己在大容器中居中。
`text-align: center;`  → 让这个div内部的文本居中。

* 善于使用父亲的padding，而不是儿子的margin

>例子：
>如果父亲有border，那么儿子使用margin-top踹父亲，达到我们要的效果，让儿子顶部距离父亲顶部有一段距离。
>
>如果父亲没有border，那么儿子的margin实际上踹的是“流”，踹的是这“行”。所以，父亲整体也掉下来了

margin这个属性，本质上描述的是兄弟和兄弟之间的距离；
最好不要用这个`marign`表达父子之间的距离。
所以，我们一定要善于使用父亲的`padding`，而不是儿子的margin。


04_星座运势 <a id="Demo_04"></a>
---------------------

** 逻辑 **

>1、分析整个星座运势，布局部分。
第一层，整体分为上下两部分：星座运势标题、星座内容；
第二层，星座内容分为上下两部分：图标选择指数、星座运程描述；
第三层，图片选择指数分为左右两部分：左边星座图、右边选择运势指数；
第四层，右边分上下两部分：选择星座、今日运势指数；
>
>2、先布局整体，box盒子，使用简单的`margin: 100px auto;`居中；
>
>3、第三层，左边星座图box，添加浮动，与右边选择运势指数排列在一行；
添加浮动，父标签使用`overflow:hidden;`清除浮动；
使用 `精灵图` 默认位置 `background-position: 0px 0px;`;
>
>4、第四层，布局今日运势指数的星星，`精灵图`的使用，使用两个span标签，
空心星星是父span标签，实心星星是子span标签，
通过控制子span标签的宽度，来控制父星星的个数。
>
>5、js控制交互：监听`<select>`的`onchange`的`value`变化；
控制星座标志的精灵图的`.style.backgroundPosition`；
控制进入运势指数的星星图的精灵图的`.style.width`；
>

精灵图使用的时候注意：
`background-position: 0px 0px;` x、y之间是空格，不是逗号；
`icon.style.backgroundPosition = "0 " + (-this.value*50)+"px";`，
第二个数字前面要加一个空格；

```
background: url("images/astroIcon.png") no-repeat;
background-position: 0px 0px;
```

js操作精灵图：

```javascript
// 索引号乘以 50 ，精灵图向下移动，是负数
icon.style.backgroundPosition = "0 " + (-this.value*50)+"px";
content.innerHTML = txtArr[this.value];
// 星✨图 盒子一共是80px，一共分成10份，每一份是8像素
star.style.width = arr[this.value] * 8 + "px";
```

** 技术思想 **

* 清除浮动方法4：`overflow:hidden;`

>overflow就是“溢出”的意思， hidden就是“隐藏”的意思。
>
>`overflow:hidden;` 表示“溢出隐藏”。所有溢出边框的内容，都要隐藏掉。
>
>本意就是**清除溢出到盒子外面的文字**。但是，前端开发工程师又发现了，它能做偏方。

一个父亲不能被自己浮动的儿子，撑出高度。
但是，只要给父亲加上`overflow:hidden;` 那么，父亲就能被儿子撑出高了。
这个现象，不能解释，就是一个浏览器的小偏方。并且,** overflow:hidden;能够让margin生效**。


* div & span

>div和span是非常重要的标签，都是最最重要的“盒子”。
>
>`div`：语义是division“分割”；
>`span`：语义就是span“范围、跨度”。

div在浏览器中，默认是不会增加任何的效果改变的，但是语义变了，**div中的所有元素是一个小区域**。
div标签是一个容器级标签，里面什么都能放，甚至可以放div自己。

span也是表达“小区域、小跨度”的标签，但是是一个**“文本级”的标签**。
就是说，**span里面只能放置文字、图片、表单元素**。 span里面不能放p、h、ul、dl、ol、div。

span里面是放置小元素的，div里面放置大东西的。
div标签是最最重要的布局标签。

`“div+css”模式`：div标签负责布局，负责结构，负责分块。css负责样式。

* `display:inline`、`block`、`inline-block`的区别

block元素的特点是：
总是在新行上开始；
高度，行高以及顶和底边距都可控制；
宽度缺省是它的容器的100%，除非设定一个宽度；
`<div>`, `<p>`, `<h1>`, `<form>`, `<ul>` 和 `<li>`是块元素的例子。

display:inline就是将元素显示为行内元素.
inline元素的特点是：
和其他元素都在一行上；
高，行高及顶和底边距不可改变；
宽度就是它的文字或图片的宽度，不可改变。
`<span>`, `<a>`, `<label>`, `<input>`, `<img>`, `<strong>` 和`<em>`是inline元素的例子。

inline-block的元素特点：
将对象呈递为内联对象，但是对象的内容作为块对象呈递。
旁边的内联对象会被呈递在同一行内，允许空格。
(准确地说，应用此特性的元素呈现为内联对象，周围元素保持在同一行，但可以设置宽度和高度的块元素的属性)


05_clock <a id="Demo_05"></a>
---------------------

圆盘时钟效果。

** 逻辑 **

>1、布局大盒子，背景为表盘，三个小盒子，为时针、分针、秒针；
>
>2、JS：使用定时器，按极短的时间间隔，获得现在的时分秒；然后根据时分秒，旋转时针、分针、秒针；
>

根据获取的时间，旋转时针、分针、秒针：

```javascript
var hour = document.getElementById("hour");
var minute = document.getElementById("minute");
var second = document.getElementById("second");

//开始定时器
var s = 0,m=0,h=0,ms=0;
setInterval(function(){
  	//内容就可以了
  	var date = new Date(); //得到最新的时间
  	ms = date.getMilliseconds(); //得到毫秒数
  	s = date.getSeconds() + ms /1000; //得到秒数
  	m = date.getMinutes() + s / 60; //得到的是分数
  	h = date.getHours() % 12 + m / 60;

  	//旋转角度：一圈 360度， 一共60秒，每秒6度，现在是s秒
  	second.style.WebkitTransform = "rotate("+ s*6 +"deg)";
  	minute.style.WebkitTransform = "rotate("+ m*6 +"deg)";
  	// 360度， 12格，每格30度
  	hour.style.WebkitTransform = "rotate("+ h*30 +"deg)";

  	second.style.MozTransform = "rotate("+ s*6 +"deg)";
  	minute.style.MozTransform = "rotate("+ m*6 +"deg)";
  	hour.style.MozTransform = "rotate("+ h*30 +"deg)";
},100);
```


** 技术思想 **

* 子绝父相

父亲相对定位，做儿子绝对定位的参考。
相对定位不脱标，真实位置是在老家，只不过影子出去了，可以到处飘。
绝对定位的盒子，是脱离标准文档流的。

* 定时器：setInterval 和 setTimeout

`setInterval`是排队执行的。
假如 间隔时间是1秒， 而执行的程序的时间是2秒，上次还没执行完的代码会排队，
上一次执行完下一次的就立即执行，这样实际执行的间隔时间为2秒。
每隔设定的时间，执行一次函数。

`setTimeout`延迟时间为1秒执行，要执行的代码需要2秒来执行，那这段代码上一次与下一次的执行时间为3秒。
到了设定的时间间隔，只执行一次函数。


06_5秒之后自动跳转页面  <a id="Demo_06"></a>
---------------------

页面自动跳转；

** 逻辑 **

>1、JS函数回调：每隔 1 秒回调一次函数。（递归调用）
>
>2、定义计数器，每次回调，对计数器减1，当计数器为0或小于0，跳转。
>

```javascript
window.onload = function(){
  	var demo = document.getElementById("demo");
  	var count = 5;
  	var speed = 1000;

  	setTimeout(goIndexPage,speed);
  	function goIndexPage(){
    		// console.log(arguments.callee);
    		count--;
    		demo.innerHTML = "<a href='https://www.baidu.com'>本页将在第"+count+"秒之后跳转</a>";
    		if (count <= 0) {
    			//如果count 小于等于0 就是倒计时结束，应该跳转页面
    			window.location.href = "https://www.baidu.com";
    		}else{
    			setTimeout(arguments.callee,speed); //递归调用，自己调用自己
    		}
  	}
}
```

** 技术思想 **

*  this

函数中的`this`指向的是 事件的调用者，或者是函数的使用者。

* JS 页面跳转

`window.location.href = "http://www.itcast.cn";`  ------BOM  

* arguments 对象

`arguments` 对象 只在正在使用的函数内使用。

`arguments.length;` ：返回的是  实参的个数（调用函数时传入的参数的个数）。

`arguments.callee;` ：返回的是正在执行的函数。
也是在函数体内使用。
在使用函数递归调用时推荐使用`arguments.callee`代替函数名本身。


07_大图上下滚动效果  <a id="Demo_07"></a>
---------------------

大图，鼠标放在上半部分，向上滚动；放在下半部分，向下滚动。

** 逻辑 **

>1、布局：整体的大盒子，固定宽高、居中、清除溢出盒子的内容、作为子标签绝对定位的标准；
>
>2、一个img盒子，两个span盒子；两个span盒子，一个上半部分，一个下半部分；
宽度和父盒子一样，高度一半；
绝对定位，上边的位置：top:0,left:0;  下边的位置：bottom:0,left:0;
>
>3、img盒子，使用绝对定位，改变top，来动态显示图片的不同位置，达到滚动效果；
>
>4、JS：动态改变img盒子的top；
定义计数器，记录位置移动；
使用计时器，对计数器进行不断更改，改变img盒子top，制作动画效果；
>

使用js修改top时，需要加上px：
`$("pic").style.top = num + "px"`

** 技术思想 **

* 绝对定位

>绝对定位比相对定位更灵活。

绝对定位脱标：
绝对定位的盒子，是脱离标准文档流的。
所以，所有的标准文档流的性质，绝对定位之后都不遵守了。
绝对定位之后，标签就不区分所谓的行内元素、块级元素了，不需要`display:block;`就可以设置宽、高了：

参考点：
绝对定位的参考点，如果用top描述，那么定位参考点就是页面的左上角，而不是浏览器的左上角。
如果用bottom描述，那么就是浏览器首屏窗口尺寸，对应的页面的左下角。

以盒子为参考点：
一个绝对定位的元素，如果父辈元素中出现了也定位了的元素，那么将以父辈这个元素，为参考点。
要听最近的已经定位的祖先元素的，不一定是父亲，可能是爷爷。

不一定是相对定位，任何定位，都可以作为参考点。
“子绝父相”有意义，父亲没有脱标，儿子脱标在父亲的范围里面移动。

绝对定位的儿子，无视参考的那个盒子的padding。

绝对定位的盒子居中：
绝对定位之后，所有标准流的规则，都不适用了。所以margin:0 auto;失效。
非常简单，当做公式记忆下来。就是：** left:50%; margin-left:负的宽度的一半**。


08_无缝滚动 <a id="Demo_08"></a>
---------------------

** 逻辑 **

>1、布局：一个大容器div，无缝滚动显示4张图片；
每次完整显示两个图片；
ui-li容器列表，li需要4+2个，存放图片img盒子；
从上到下顺序：1.jpg-2.jpg-3.jpg-4.jpg-1.jpg-2.jpg ；
ul绝对定位，改变top和left来切换图片；
>
>2、JS交互：定时器、计数器；
可见区域宽度600px，每张图片盒子宽度是300px，1200刚好是四个图片盒子；
当计数器为-1200时，刚好把1.jpg-2.jpg-3.jpg-4.jpg显示完成;
刚好正在显示后面两个1.jpg-2.jpg，完全显示出来，
此时可以，切换计数器为0，刚好回到下一个循环的1.jpg-2.jpg；
>


```javascript
window.onload = function(){
			var scroll = document.getElementById("scroll");
			var ul = scroll.children[0];

			var num = 0;          //控制左侧值 left
			var timer = null;     //定时器
			timer = setInterval(autoPlay,20);

			function autoPlay(){
  				num--;
  				num <= -1200 ? num = 0 : num;  
  				//1200：能够同时显示两个图片，一个图片300px，可见区域宽度是600
  				// 当-1200：刚好把显示到1->2->3->4->1->2 , 然后切换num=0, 刚好是1->2
  				ul.style.left = num + "px";
			}
			scroll.onmouseover = function(){  //鼠标经过大盒子   停止定时器
				  clearInterval(timer);
			}
			scroll.onmouseout = function(){
				  timer = setInterval(autoPlay,20);  //开启定时器
			}
}
```

** 技术思想 **

* 计数器、定时器
* 1->2->3->4->1->2


09_焦点图  <a id="Demo_09"></a>
---------------------

** 逻辑 **

>1、布局：大盒子div，盛放小盒子div-ul-li，li为要展示的图；下面有ol-li为焦点；
>
>2、JS交互：定时器，缓动动画公式计算步长距离，修改`ul.style.left`，达到缓动动画效果；
>

给数组自定义属性index，来绑定序号：

```javascript
olLis[i].index = i;
```


```javascript
      var jd = document.getElementById("jd");
 			var ul = jd.children[0].children[0];
 			var ol = jd.children[1];
 			var olLis = ol.children;

 			var leader = 0, target = 0; //target 目标位置

 			for (var i = 0; i < olLis.length; i++) {
   				olLis[i].index = i;  //每个li的索引号，给数组自定义属性index，来绑定序号

   				olLis[i].onmouseover = function(){
     					for (var j = 0; j < olLis.length; j++) {
     						olLis[j].className = ""; //清空标签的class
     					}
     					//给当前选中标签 赋值class
     					this.className = "current";
     					target = -this.index * 490;
     					//目标位置：当前的索引号 乘以 一个盒子的宽度
   				}
 			}
 			// 根据索引 切换图片   每隔30ms检查一次
 			setInterval(function(){
   			  // 计算直到 (target - leader) == 0  此时leader == -490 不再变化，起到了动画的效果
   				leader = leader + (target - leader) /10;  // 0 + (-490-0) / 10  = -49
   				ul.style.left = leader + "px";
 			},30);
```


** 技术思想 **

* 缓动动画

初始值：leader = 0；
目标值：target；

```javascript
leader = leader + (target - leader) /10; //缓动动画公式
ul.style.left = leader + "px";
```

当每次计算，盒子移动后，距离目标target剩下的距离，
都会重新分割成相等的份数（例如：10份）；
然后自此以后，每次分割的份数都会变小，从而达到动画速度改变的效果，就是缓动。
直到 target == leader 的时候，leader = leader 此时动画结束。


10_左右轮播图  <a id="Demo_10"></a>
---------------------

** 逻辑 **

>1、与焦点图不同之处：加点图是图片数和按钮焦点数相同，
而此左右轮播图，之后向左、向右两个按钮控制图片展示；
>
>2、通过控制target的数值，向右按钮：target -= 490，一张图片的宽度；
向左按钮：target += 490，一张图片的宽度；
然后调用定时器，判断target，进行缓动动画
>

```javascript
      function $(id) {
				  return document.getElementById(id);
			}

			var box = $("box");
			box.onmouseover = function(){
				  $("arr").style.display = "block";
			}
			box.onmouseout = function(){
				  $("arr").style.display = "none";
			}

			$("right").onclick = function(){
				  target -= 490;
			}
			$("left").onclick = function(){
				  target += 490;
			}

			// 缓动动画
			var leader = 0, target = 0;
			setInterval(function(){
  				if (target >= 0) {
  					target = 0;
  				}else if(target <= -1960){
  					target = -1960;
  				}
  				leader = leader + (target - leader) / 10;
  				$("imgs").style.left = leader + "px";
			},30);
```

** 技术思想 **

* 缓动动画、定时器


11_导航条选中效果  <a id="Demo_11"></a>
---------------------

** 逻辑 **

>1、鼠标悬停时，移动 背景 到悬停的li。
通过改变背景盒子的`.style.left`；
鼠标悬停位置的ul-li的`offsetLeft`，即为要移动位置的目标值target；
>
>2、设置变量current，记录当前点击选中的导航ul-li的`offsetLeft`；
当点击，改变选中ul-li时，就改变current的值；并且鼠标移开时target = current;

```Javascript
      var cloud = document.getElementById("cloud");
			var nav = document.getElementById("nav");
			var lis = nav.children[1].children;

			var current = 0; //用于存放点击时候的offsetLeft
			for (var i = 0; i < lis.length; i++) {
  				lis[i].onmouseover = function(){
  					target = this.offsetLeft;  //把左侧的位置，给target，鼠标悬空时候的li的offsetLeft
  				}
  				lis[i].onmouseout = function(){
  					target = current;         //鼠标离开，target是 刚才我们点击的位置
  				}
  				lis[i].onclick = function(){
  					current = this.offsetLeft; //点击的时候 把当前位置 存储一下
  				}
			}
			//缓动公式
			var leader = 0, target = 0;
			setInterval(function(){
  				leader = leader + (target - leader) / 10;
  				cloud.style.left = leader + "px";
			},10);
```

** 技术思想 **

* 缓动动画、定时器

* `offsetLeft`  `offsetTop`：

返回距离上级盒子（最近的带有定位）左边的位置，
如果父级都没有定位则以body 为准，
这里的父级指的是所有上一级 不仅仅指的是 父亲 还可以是 爷爷 曾爷爷 曾曾爷爷。
总结一下：就是子盒子边框 到 定位的父盒子边框 的距离。


12_点击跟随鼠标  <a id="Demo_12"></a>
---------------------

** 逻辑 **

>1、捕获点击事件对象，从事件对象中获取clientX、clientY
>
>2、计算移动距离：
targetX = event.clientX - image.offsetWidth /2;
targetY = event.clientY - image.offsetHeight /2;
>


```javascript
      var image = document.getElementById("image");
		  document.onclick = function(){
				  var event = event || window.event;
				  targetX = event.clientX - image.offsetWidth /2;
				  targetY = event.clientY - image.offsetHeight /2;
				  //clientY : 可视区域的为基准 	
				  //offsetWidth：以带定位的父级元素为基准，如果没有就是body。此处是body
			}
			//缓动
			var leaderX = 0,
				  leaderY = 0,
				  targetX = 0,
				  targetY = 0;
			setInterval(function(){
				  leaderX = leaderX + (targetX - leaderX) / 10;
				  leaderY = leaderY + (targetY - leaderY) / 10;
				  image.style.left = leaderX + "px";
				  image.style.top = leaderY + "px";
			},10);
```

** 技术思想 **

* 缓动动画、定时器

* 事件对象：`event`

在触发DOM上的某个事件时，会产生一个事件对象event，这个对象中包含着所有与事件有关的信息。
所有浏览器都支持event对象，但支持的方式不同。
比如鼠标操作时候，会添加鼠标位置的相关信息到事件对象中。

|event 常见属性：|   |
|---------|------------------------|
|`data`   |返回拖拽对象的URL字符串（dragDrop）|
|`width`  |该窗口或框架的宽度                |
|`height` |该窗口或框架的高度                |
|`pageX`  |光标相对于该网页的水平位置（ie无）|
|`pageY`  |光标相对于该网页的垂直位置（ie无）|
|`screenX`|光标相对于该屏幕的水平位置|
|`screenY`|光标相对于该屏幕的垂直位置|
|`target` |该事件被传送到的对象|
|`type`   |事件的类型|
|`clientX`|光标相对于该网页的水平位置 （当前可见区域为基准）|
|`clientY`|光标相对于该网页的竖直位置|

`screenX`、`screenY` ：是以我们的电脑屏幕 为基准点   测量

`pageX`、`pageY` ： 以我们的  文档（绝对定位）的基准点 对齐  

`clientX`、`clientY` ：以 可视区域 为基准点   类似于    固定定位


13_放大镜  <a id="Demo_13"></a>
---------------------

** 逻辑 **

>1、一个大容器，盛放小图片盒子，大图片盒子；
大图盒子初始display:none;
小盒子内有一个遮罩盒子，即为放大镜；
>
>2、第一步：计算鼠标移动，显示遮罩放大镜；
第二步，随着鼠标移动，显示放大镜预览大图；
>
>3、关键：计算鼠标在小图盒子内的坐标：
`x = event.clientX - this.offsetParent.offsetLeft;`
`y = event.clientY - this.offsetParent.offsetTop;`
>
>计算遮罩放大镜盒子 在小盒子中的位置坐标，要保证鼠标位于遮罩放大镜盒子的中心位置：
`x = event.clientX - this.offsetParent.offsetLeft - mask.offsetWidth / 2;`
`y = event.clientY - this.offsetParent.offsetTop - mask.offsetHeight / 2;`
>
>当x==0||y==0时，放大镜遮罩盒子到了小图盒子`左||上`边缘部分;
当x > small.offsetWidth - mask.offsetWidth || y > small.offsetHeight - mask.offsetHeight时，
放大镜遮罩盒子到了小图盒子`右||下`边缘部分;
此种情况，需要固定x、y不变就OK了。
>
>4、按大图盒子 / 小图盒子 比例，等比例计算大图盒子的`.style.left`和`.style.top`
>

```javascript
      //鼠标在small 内移动
			var x = 0 , y = 0;
			small.onmousemove = function(event){
				  var event = event || window.event;
				  //  在某个盒子内的坐标
				  x = event.clientX - this.offsetParent.offsetLeft - mask.offsetWidth / 2;
				  y = event.clientY - this.offsetParent.offsetTop - mask.offsetHeight / 2;

  				if (x < 0) {
  					  x = 0;
  				}else if(x > small.offsetWidth - mask.offsetWidth){
  					  x = small.offsetWidth - mask.offsetWidth;
  				}

  				if (y < 0) {
  				  	y = 0;
  				}else if (y > small.offsetHeight - mask.offsetHeight){
  					  y = small.offsetHeight - mask.offsetHeight;
  				}
  				mask.style.left = x + "px";
  				mask.style.top = y + "px";
  				/*
  					计算：
  					小明一顿饭吃 2 个馒头，小红一顿饭 4 个馒头
  					问：小明今天吃了 3 个馒头 ，小红应该吃几个？
  					4/2 = 2倍  ；  3 * 2 == 6个

  					大图盒子 / 小图盒子  = 倍数
  					在小图移动的距离 * 倍数 == 大图的位置
  				*/
  				bigImage.style.left = -x * big.offsetWidth / small.offsetWidth + "px";
  				bigImage.style.top = -y * big.offsetHeight / small.offsetHeight + "px";
			}
```

** 技术思想 **

* `offsetWidth`  `offsetHeight`：
得到对象的宽度和高度(自己的，与他人无关)。

`offsetWidth =  width  + border  +  padding `

为什么不用 `div.style.width` ：因为这东西 只能得到行内的数值。

* `offsetLeft`  `offsetTop`：
返回距离上级盒子（最近的带有定位）左边的位置，
如果父级都没有定位则以body 为准，
这里的父级指的是所有上一级 不仅仅指的是 父亲 还可以是 爷爷 曾爷爷 曾曾爷爷。
总结一下：  就是子盒子边框 到 定位的父盒子边框 的距离。

* `offsetParent` ：  
返回改对象的父级 （带有定位） 不一定是亲的爸爸。
与返回父亲(亲的)parentNode有所区别。
如果当前元素的父级元素没有进行CSS定位（position为absolute或relative），offsetParent为body。
如果当前元素的父级元素中有CSS定位（position为absolute或relative），offsetParent取最近的那个父级元素。

* `offsetTop` `style.top` 的区别：
最大区别在于  offsetLeft  可以返回没有定位盒子的距离左侧的位置。
而 style.top 不可以  只有定位的盒子 才有 left  top right 。
offsetTop 返回的是数字，而 style.top 返回的是字符串，除了数字外还带有单位：px。
offsetTop 只读，而 style.top 可读写。
如果没有给 HTML 元素指定过 top 样式，则 style.top 返回的是空字符串。
最重要的区别  style.left 只能得到 行内样式     offsetLeft 随便 。


14_拖动水平条  <a id="Demo_14"></a>
---------------------

** 逻辑 **

>1、一个div水平条盒子，里面放一个div的拖动bar盒子，还有一个轨迹盒子；
>
>2、拖动bar盒子，改变它的`.style.left`，移动的效果；
它的`.style.left`刚好等于轨迹盒子的`.style.width`；
>
>3、需要判断：限定bar盒子`.style.left`的范围，要保证在水平条盒子内；
>

```javascript
var scrollBar = document.getElementById("scrollBar");
var bar = scrollBar.children[0];
var mask = scrollBar.children[1];
var demo = document.getElementById("demo");

bar.onmousedown = function(event){
  	var event = event || window.event;
    //水平条盒子左端 距离该网页左边的距离（相对可见区域）
  	var leftVal = event.clientX - this.offsetLeft;

  	//拖动一定要放在 down 里面才可以
  	var that = this;
  	document.onmousemove = function(){
    		var event = event || window.event;
    		that.style.left = event.clientX - leftVal + "px";

    		var val = parseInt(that.style.left);
    		if (val < 0) {
    			   that.style.left = 0;
    		}else if(val > 390){
    			   that.style.left = "390px";
    		}
    		mask.style.width = that.style.left;  //遮罩盒子的宽度

    		//计算百分比
    		demo.innerHTML = "已经走了：" + parseInt(parseInt(that.style.left) / 390 * 100) + "%";

    		// 防止选择拖动（按下鼠标然后拖拽，可以选择文字）
    		window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
  	}

  	   document.onmouseup = function(){
  		 document.onmousemove = null; //弹起鼠标不做任何操作
  	}
}
```


** 技术思想 **

* 防止选择拖动（按下鼠标然后拖拽，可以选择文字）

```javascript
window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
```

15_拖动弹出框  <a id="Demo_15"></a>
---------------------



16
---------------------






17
---------------------
