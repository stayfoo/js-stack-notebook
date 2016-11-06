window.onload = function(){
	var wrap = $("wrap");    //大盒子
	var arrow = $("arrow");  
	var slider = $("slide");
	var lis = slider.getElementsByTagName("li");

	wrap.onmouseover = function(){
		animate(arrow,{'opacity':100});
	}
	wrap.onmouseout = function(){
		animate(arrow,{'opacity':0});
	}
	//存储了每个图片的信息
	var json = [
		{ //1
			width:400,
			top:20,
			left:50,
			opacity:20,
			z:2
		},
		{ //2
			width:600,
			top:70,
			left:0,
			opacity:80,
			z:3
		},
		{ //3
			width:800,
			top:100,
			left:200,
			opacity:100,
			z:4
		},
		{ //4
			width:600,
			top:70,
			left:600,
			opacity:80,
			z:3
		},
		{ //5
			width:400,
			top:20,
			left:750,
			opacity:20,
			z:2
		}
	];

	// 两个按钮点击事件
	// 函数节流
	var jieliu = true; //用来控制函数节奏的变量
	var arrows = arrow.children;
	
	change();

	for (var k in arrows) {
		arrows[k].onclick = function(){
			if (this.className == "prev") {  //上一张
				if (jieliu == true) { 
					change(false);
					jieliu = false; 
				}

			}else{                        //下一张
				if (jieliu == true) {
					change(true);
					jieliu = false; 
					console.log('~~~~~'+jieliu);
				}

			}
		}
	}
	/**
	 *  flag：true，点击了下一个；   false，点击了上一个；
	 */
	function change(flag){
		if (flag) {  //把json最后一个元素删除，并且把移除的最后一个元素 放在json开头   ---下一个
			json.unshift(json.pop()); 

		}else{       //移除第一个元素，并且把移除的元素 放在json的末尾               ---上一个
			json.push(json.shift());
		}

		//动画
		for (var i = 0; i < json.length; i++) {
		  console.log('++++  '+i+'  +++++++');                        
			animate(lis[i],{
							width: json[i].width,
							top: json[i].top,
							left: json[i].left,
							opacity: json[i].opacity,
							zIndex: json[i].z
						 },function(){ jieliu = true; console.log('-----  '+i+'  ---------',jieliu);}); 
						 //遍历所有动画执行完毕之后，才会执行回调函数
		}
	}
}