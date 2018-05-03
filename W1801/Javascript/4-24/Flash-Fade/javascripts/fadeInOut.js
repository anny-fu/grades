/**
 * 功能：图片淡入淡出效果
 * 开发人员：Tom.Anny
 * 日期：2018/4/24
 */
/***************获取页面元素*****************/
var warpBox = document.getElementsByClassName('wrap')[0];
var aImgs = warpBox.querySelector('.imgs-box').children;
var aIdots = warpBox.querySelectorAll('.idot-item');
var prev = warpBox.querySelector('.prev');
var next = warpBox.querySelector('.next');
/*******************全局变量定义***********************/
/*
 * 1.默认选中图片下标
 * 2.定时器
 * 3.动画状态(避免在点击过程中，动画执行加快)
 * */
var curImgIdx = 0, timer = 0,isAnimation = false;
//初始化显示
wrap();
/*自动播放*/
play();

/*
 * next事件
 * */
next.onclick = function () {
	//异常处理
	if(isAnimation){return;}
	curImgIdx = curImgIdx == 5 ? 0 : ++curImgIdx;
	wrap();
}
/*
 * prev事件
 * */
prev.onclick = function () {
	//异常处理
	if(isAnimation){return;}
	curImgIdx = curImgIdx == 0 ? 5 : --curImgIdx;
	wrap();
}
/*
 * 循环绑定小圆点点击事件
 * */
for (var i = 0; i < aIdots.length; i++) {
	aIdots[i].idx = i;
	addEvent(aIdots[i], 'click', function () {
		if (isAnimation || this.classList.contains('active')) {
			return;
		}
		//更新当前下标索引
		curImgIdx = this.idx;
		wrap();
	});
}

/*鼠标悬停和移除播放*/
warpBox.onmousemove = stop;
warpBox.onmouseout = play;


/*
 * 自动播放
 * */
function play() {
	console.log('paly');
	timer = setInterval(function () {
		next.onclick();
	}, 4000);
}
/***
 * 停止播放
 * */
function stop() {
	console.log('stop');

//	清除定时器
	clearInterval(timer);
}


/*初始化函数*/
function wrap() {
	//重置播放状态
	isAnimation = true;
	for (var i = 0; i < aImgs.length; i++) {
		//	初始化第一张图片和小圆点
		if (aIdots[i].classList.contains('active')) {
			aIdots[i].classList.remove('active');
			fades(aImgs[i], 0);
			aImgs[i].style.zIndex = '1';
			// break;
		}
		aIdots[curImgIdx].classList.add('active');
		//图片切换函数
		fades(aImgs[curImgIdx], 100, 1000,function(){
			isAnimation = false;
		});
		//	控制li元素的层级关系
		aImgs[curImgIdx].style.zIndex = "2";
	}
}


/*切换效果:淡入淡入
 * 参数1：执行元素
 * 参数2：目标值
 * 参数3：持续时间
 * 参数4：回调函数
 * */
function fades(ele, target, duration,completed) {
//异常处理
	if (!ele || target == undefined) {
		throw '函数参数不完整！';
	}
//默认参数设置
	duration = duration ? duration : 1000;
//	获取元素不透明度
	var curOpa = getCurrentOpacity(ele);
	//转换目标值
	var offset = target - curOpa;
	var interval = 30;
//	每次变换的值
	var speed = offset > 0 ? Math.ceil(offset / (duration / interval)) : Math.floor(offset / (duration / interval));

//设置定时器
	var t = setInterval(function () {
		//	获取实时的透明图值
		curOpa = getCurrentOpacity(ele);
		if ((offset > 0 && curOpa < target) || (offset < 0 && curOpa > target)) {
			ele.style.opacity = (curOpa + speed) / 100;
		} else {
			//过渡动画完成
			ele.style.opacity = target / 100;
			clearInterval(t);
		//	回调函数
			if(completed){
				completed();
			}
		}
	}, interval);
}

/*
 * 获取元素透明度样式
 * 参数：目标元素
 * */
function getCurrentOpacity(ele) {
	var opacitys = 0;
	if (ele.currentStyle) {
		opacitys = ele.currentStyle['opacity'] * 100;
	} else {
		opacitys = getComputedStyle(ele, false)['opacity'] * 100;
	}
	return opacitys;
}

/*
 * 事件添加函数
 * 参数1：事件对象
 * 参数2：事件类型
 * 参数3：回到函数
 * */
function addEvent(element, type, callback) {
//兼容IE10以下
	if (element.attachEvent) {
		element.attachEvent('on' + type, callback);
	} else {
		element.addEventListener(type, callback, false);
	}
}