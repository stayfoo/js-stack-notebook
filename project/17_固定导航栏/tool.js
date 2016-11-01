function $(id) { return document.getElementById(id);}

function scroll() {
	if (window.pageYOffset != null) { //ie9+  和其他浏览器
		return {
			left: window.pageXOffset,
			top: window.pageYOffset
		}
	}else if(document.compatMode == "CSS1Compat"){  //声明了 头<!DOCTYPE html>
		//检测是不是怪异模式的浏览器  -- 就是没有  声明 <!DOCTYPE html>
		return {
			left: document.documentElement.scrollLeft,
			top: document.documentElement.scrollTop
		}
	}
	return { //剩下怪异模式的浏览器
		left: document.body.scrollLeft,
		top: document.body.scrollTop
	}
}