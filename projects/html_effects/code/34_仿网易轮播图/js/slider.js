window.onload = function(){
	var js_slider = $("js_slider");
	var slider_main_block = $("slider_main_block"); 
	var imgs = slider_main_block.children;
	var slider_ctrl = $("slider_ctrl");

	//动态生成焦点
	for (var i = 0; i < imgs.length; i++) {
		var span = document.createElement("span");
		span.className = "slider-ctrl-con";
		span.innerHTML = imgs.length-i;  //6-1 倒序插入
		slider_ctrl.insertBefore(span,slider_ctrl.children[1]); //在第二个span前插入
	}

	//设置默认选中的焦点，设置样式
	var spans = slider_ctrl.children;
	spans[1].setAttribute("class","slider-ctrl-con current");

	var scrollWidth = js_slider.clientWidth; //大盒子的宽度，动画移动的距离
	for (var i = 1; i < imgs.length; i++) {

		imgs[i].style.left = scrollWidth + "px";  //初始状态，把所有的其它不显示的图片都统一放在显示的右边
	}

	var iNow = 0; //当前展示的图片标号

	for (var k in spans) {
		//点击焦点 
		spans[k].onclick = function(){

			if (this.className == "slider-ctrl-prev") {  //左侧按钮，上一张
				
				animate(imgs[iNow],{left:scrollWidth}); 

				--iNow < 0 ? iNow = imgs.length - 1 : iNow;
				imgs[iNow].style.left = -scrollWidth + "px";
				animate(imgs[iNow],{left:0});

				setSquare();

			}else if(this.className == "slider-ctrl-next"){ //右侧按钮，下一张
				autoplay();

			}else{        //选择焦点
				var that = this.innerHTML - 1; //选择的焦点序号 0~5
				if (that > iNow) { // 相当于点击右侧按钮，一次或多次
					animate(imgs[iNow],{left: -scrollWidth});   //当前向左动画
					imgs[that].style.left = scrollWidth + "px"; //下一张放在显示的右边

				}else if (that < iNow) {
					animate(imgs[iNow],{left: scrollWidth});     //当前向右动画 
					imgs[that].style.left = -scrollWidth + "px"; //下一张放在显示的左边

				}

				iNow = that;
				animate(imgs[iNow],{left: 0}); //动画显示选中图
				setSquare();	
			}
		}
	}

	//添加定时器
	var timer = null;
	timer = setInterval(autoplay,2000);
	/**
	 *  自动下一张
	 */ 
	function autoplay(){
		animate(imgs[iNow],{left: -scrollWidth});

		++iNow > imgs.length -1 ? iNow = 0 : iNow;
		imgs[iNow].style.left = scrollWidth + "px";

		animate(imgs[iNow],{left: 0});

		setSquare();
	}
	js_slider.onmouseover = function(){
		clearInterval(timer);
	}
	js_slider.onmouseout = function(){
		clearInterval(timer);
		timer = setInterval(autoplay,2000); 
	}
	/**
	 *  设置焦点样式
	 */
	function setSquare(){
		for (var i = 1; i < spans.length-1; i++) {
			spans[i].className = "slider-ctrl-con";
		}
		spans[iNow+1].className = "slider-ctrl-con current";
	}
}