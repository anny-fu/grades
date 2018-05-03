/**
 * 功能：滚动轮播特效
 * 开发人员：Tom.Anny
 * 日期：2018/4/24
 */
/***************获取页面元素*****************/
var warp = document.getElementsByClassName('wrap')[0];
var imgbox = warp.getElementsByClassName('imgs-box')[0];
var aIdots = warp.querySelectorAll('.idot-item');
var prev = warp.querySelector('.prev');
var next = warp.querySelector('.next');


/*******************全局变量定义***********************/
/*
 * 1.默认选中图片下标
 * 2.动画执行状态
 * 3.定时器
 * */
var curImgIdx = 1, isAnimatin = false, timer = 0;

/*调用自动播放*/
play();

/*鼠标悬停:动画停止，移开，动画播放*/
warp.onmousemove = stop;
warp.onmouseout = play;

/******************图片切换效果函数******************/
/**
 *参数:滚动距离
 * */
function tab(offset) {
//开启动画
	isAnimatin = true;
// 动画帧(动画时间和切换时间)
	var duration = 500, interval = 15;
//执行多少帧；每一帧移动距离
	var frames = duration / interval;//33.333
	var speed = Math.ceil(offset / frames);//-16

//	获取图片容器的left
	var tabLeft = parseInt(getStyle(imgbox, "left")) + offset;//-520 + -520 = -1040
	// console.log(tabLeft);
//设置定时器（每隔一定时间执行一次）
	var tim = setInterval(function () {
		//	实时获取当前图片left值
		var curLeft = parseInt(getStyle(imgbox, 'left'));// 1.-520 2.-536 .....1040
		//判断执行动画条件:
		// next：必须小于0,大于目标值
		//prev：必须大于0,小于目标值
		if ((offset < 0 && curLeft > tabLeft) || (offset > 0 && curLeft < tabLeft)) {
			imgbox.style.left = (curLeft + speed) + "px";//-536 -552
		} else {
			//关闭动画
			isAnimatin = false;
			//	动画结束，清除定时器，更新当前值
			clearInterval(tim);
			imgbox.style.left = tabLeft + "px";
			//	无限滚动
			curLeft = parseInt(getStyle(imgbox, 'left'));
			if (curLeft < -3120) {
				imgbox.style.left = "-520px";
			} else if (curLeft > -520) {
				imgbox.style.left = "-3120px";
			}
		}
	}, interval)

}
/***
 * 点击下一张事件
 * */
next.onclick = function () {
//	判断动画状态和当前下标索引
	if (isAnimatin) {
		return;
	}
	if (curImgIdx == 6) {
		curImgIdx = 1;
	} else {
		curImgIdx++;
	}
//	调用图片切换效果
	tab(-520);
//	改变小圆点样式
	changeIdots();
}
/***
 * 点击上一张事件
 * */
prev.onclick = function () {
//	判断动画状态和当前下标索引
	if (isAnimatin) {
		return;
	}
	if (curImgIdx == 1) {
		curImgIdx = 6;
	} else {
		curImgIdx--;
	}
//	调用图片切换效果
	tab(520);
//	改变小圆点样式
	changeIdots();
}

/*
 * 小圆点的点击事件
 * */
for (var i = 0; i < aIdots.length; i++) {
//	循环记录li的下标索引
	aIdots[i].index = i + 1;
//	循环绑定事件
	aIdots[i].onclick = function () {
		if (isAnimatin || this.index == curImgIdx) {
			return;
		}
		//跳转的距离 offset = -520 * (目标位置下标 - 当前位置下标 );

		var offset = -520 * (this.index - curImgIdx);
		//	调用切换图片函数
		tab(offset);
	//	更新当前下标
		curImgIdx = this.index;
	//	小圆点样式切换函数
		changeIdots();
	}
}

/*
 * 小圆点样式切换函数
 * */
function changeIdots() {
//	清除所有li的active类
	for (var i = 0; i < aIdots.length; i++) {
		aIdots[i].classList.remove('active');
	}
//	给当前小圆点设置class:active
	aIdots[curImgIdx - 1].classList.add('active');
}

/***
 *
 * 自动播放
 * */
function play() {
	timer = setInterval(function () {
		next.onclick();
	}, 3000)
}

/***
 * 停止播放
 * */
function stop() {
//	清除定时器
	clearInterval(timer);
}

/**
 * 获取非行内样式属性值
 * 参数：元素对象和样式属性
 * */
function getStyle(obj, attr) {
	if (obj.currentStyle) {
		return obj.curentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}



