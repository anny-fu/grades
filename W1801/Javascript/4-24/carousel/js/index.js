/**
 * 功能：图片轮播封装
 * 开发人员：Tom.Anny
 * 日期：2018/4/25
 */

/**
 * HTML结构说明：
 * <div id="主容器ID">
 *   <div calss="图片列表容器"></div>
 *   <div calss="控制点列表容器"></div>
 *   <div calss="左右切换按钮容器"></div>
 *  </div>
 *  只需传入一个主容器ID
 * */
/*
 * 功能：图片轮播构造函数
 * @param:图片轮播主容器ID(String)
 * @param:图片RUL数组（array）
 * @param:轮播的时间间隔(Number)
 * @param:是否反向播放(Boolean;true:反向，false：正向，默认值)
 * @param:是否显示控制点(Boolean;true:显示，默认值；false：不显示)
 *
 * */
function Imgcarousel(ident,imgURL_list, timeInterval, reverse, pointShow) {
//主容器
	this.container = document.getElementById(ident);
//	图片列表容器
	this.imageList = this.container.firstElementChild;
//	控制点列表容器
	this.pointList = this.imageList.nextElementSibling;
//	图片URL个数
	this.imageLength = imgURL_list.length;
//根据第四个参数设置是否显示控制点
	if (!pointShow) {
		this.pointList.style.opacity = '0';
	}
	/*
	* 初始化方法
	* */
	this.init= function(){
		// 调用“生成图片和控制点”方法
		this.createImageAndPoint();
		// 调用“图片自动轮播定时器”方法
		this.imageCarousInterval();
		// 调用“左右翻页按钮功能”方法
		this.flip();
		// 调用“点击控制点切换图片”方法
		this.tabImageShow();

	}


	/*
	 * 功能1：生成图片和控制点
	 *
	 * */
	this.createImageAndPoint = function () {
		//	临时字符串变量
		var imgStr = '', pointStr = '';
		for (var i = 0; i < this.imageLength; i++) {
			//	图片元素添加
			imgStr += '<img src="' + imgURL_list[i] + '">';
			//	控制点元素
			pointStr += '<i></i>';
		}
		//	将图片和控制点渲染到DOM
		this.imageList.innerHTML = imgStr;
		this.pointList.innerHTML = pointStr;
		//初始化显示订一张图片和设置第一个控制点选中
		this.imageList.firstElementChild.className = "show";
		this.pointList.firstElementChild.className = "checked";
	}

	/*
	 * 功能2：左右翻页按钮功能
	 *
	 * */
	this.flip = function () {
		//	存储控制点列表和图片列表
		var thisPoint = this.pointList;
		var thisImage = this.imageList;
		//	翻页控件容器
		var flipCtrl = this.container.lastElementChild;
		//存储图片切换方法
		var toPrev = this.prevImageShow;
		var toNext = this.nextImageShow;
		//	上一张按钮点击事件
		flipCtrl.firstElementChild.onclick = function () {
			toPrev(thisPoint, thisImage);
		}
		//	下一张按钮点击事件
		flipCtrl.lastElementChild.onclick = function () {
			toNext(thisPoint, thisImage);
		}
	}
	/*
	 *
	 * 功能3：显示下一张图片
	 * @param1:当前控制点
	 * @param2：当前图片
	 *
	 * */
	this.nextImageShow = function (point, image) {
		//	获取当前选中的图片和控制点
		var cdkPoint = point.getElementsByClassName('checked')[0];
		var showImg = image.getElementsByClassName('show')[0];
		//移除当前控制点和图片选中效果
		cdkPoint.className = '';
		showImg.className = '';
		//	找到下一个控制点/图片
		var nextPoint = cdkPoint.nextElementSibling;
		var nextImage = showImg.nextElementSibling;
		//	如果后方任然存在同级元素节点就继续
		if (nextPoint) {
			nextImage.className = 'show';
			nextPoint.className = 'checked';
		} else {
			point.firstElementChild.className = 'checked';
			image.firstElementChild.className = 'show';
		}

	}
	/*
	 *
	 * 功能4：显示上一张图片
	 * @param1:当前控制点
	 * @param2：当前图片
	 *
	 * */
	this.prevImageShow = function (point, image) {
		//	获取当前选中的图片和控制点
		var cdkPoint = point.getElementsByClassName('checked')[0];
		var showImg = image.getElementsByClassName('show')[0];
		//移除当前控制点和图片选中效果
		cdkPoint.className = '';
		showImg.className = '';
		//	找到下一个控制点/图片
		var prevPoint = cdkPoint.previousElementSibling;
		var prevImage = showImg.previousElementSibling;
		//	如果后方任然存在同级元素节点就继续
		if (prevPoint) {
			prevImage.className = 'show';
			prevPoint.className = 'checked';
		} else {
			point.lastElementChild.className = 'checked';
			image.lastElementChild.className = 'show';
		}
	}
	/*
	 * 功能5：图片自动轮播
	 *
	 * */
	this.imageCarousInterval = function () {
//	存储控制点列表和图片列表
		var thisPoint = this.pointList;
		var thisImage = this.imageList;
//	声明定时执行方法
		var carousel;
//	根据参数3判断使用哪种播放方法
//	反向
		if (reverse === true) {
			carousel = this.prevImageShow;
		} else {
			//	正向播放
			carousel = this.nextImageShow;
		}
//	声明定时器，执行图片轮播函数
		var timer = setInterval(function () {
			carousel(thisPoint, thisImage);
		}, timeInterval);

		//	鼠标移入自动轮播暂停
		this.container.onmousemove = function () {
			//	清除定时器
			clearInterval(timer);
		}
		//	鼠标移出自动播放
		this.container.onmouseout = function () {
		//	重设定时器
			timer = setInterval(function(){
				carousel(thisPoint,thisImage);
			},timeInterval)
		}

	}
/*
* 功能6：点击控制点切换效果
*
* */
this.tabImageShow = function(){
//	获取图片列表集合和控制点列表集合
	var img = this.imageList.children;
	var point = this.pointList.children;
//	存储图片列表和控制点列表
	var thisImgList = this.imageList;
	var thisPointList = this.pointList;

//	循环清除所有控制点和图片选中效果，
// 并且设置当前点击时的下标索引对应的控制点和图片添加class
	for(var i = 0;i<this.imageLength;i++){
	//	给小圆点存储下标索引
		point[i].index = i;
		point[i].onclick = function(){
		//	清除图片和控制点的所有class
			thisImgList.getElementsByClassName('show')[0].className = '';
			thisPointList.getElementsByClassName('checked')[0].className = '';
		//为当前点击的控制点和图片设置选中效果
			this.className = 'checked';
			img[this.index].className = 'show';
		}
	}



}



}





