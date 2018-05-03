/**
 * 功能：图片懒加载
 * 开发人员：Tom.Anny
 * 日期：2018/5/3
 */
//图片资源数组
var imgArr = ["img/1.jpg", "img/2.jpg", "img/3.jpg", "img/4.jpg", "img/5.jpg", "img/6.jpg", "img/7.jpg", "img/8.jpg", "img/9.jpg"];

//获取图片容器和图片地址长度
var imgBox = document.getElementById('imgBox');
var imgURL_len = imgArr.length;

//先将图片加载到DOM中
var str ="";
for(var i = 0;i<imgURL_len;i++){
//	先将图片地址存入自定义属性中
	str +=`<li class="img-area">
<img src="" alt="" data-src="${imgArr[i]}"></li>`;
}
imgBox.innerHTML = str;

/************全局变量**********************/
//存储图片加载到的位置，避免每次都从第一张开始遍历
var index = 0;

/**
 *图片懒加载函数
 *
 *
 * */

function lazyLoad(){
//	获取所有img元素和长度
	var imgs = imgBox.getElementsByTagName('img'),imgs_len = imgs.length;
//	循环遍历判断img元素是否出现在可视区域内
	for(var i = 0;i<imgs_len;i++){
		//判断图片元素距离顶部的位置师傅小于屏幕可见高度
		console.log(isInSight(imgs[i]));
		if(isInSight(imgs[i])){
		//如果元素src属性为空，就获取data-src中的值赋给src
			if(imgs[i].getAttribute('src') == ""){
				imgs[i].src = imgs[i].dataset.src;
			}
		//	更新当前加载图片下标索引
			index = i;
		}
	}
}
/*
*元素是否在可视范围内
* 参数;当前元素
 */
function isInSight(el){
//	可视区域高度
	var clientH = window.innerHeight;
//	图片到可视区域顶部距离
	var  clientT = el.getBoundingClientRect().top;

	// var offsetT = el.offsetTop;
	// var clientH = document.documentElement.clientHeight;
	// var scrollT = document.documentElement.scrollTop || document.body.scrollTop || window.pageYOffset;
	// return offsetT - scrollT < clientH + 100;
	return clientT < clientH + 100;
}

/**
 *节流函数
 *参数：function(要执行函数)；mustRun(每次调用函数的间隔时间)
 * return:function
 * */
function throttle(fn,mustRun = 500){
	var previous = null;
	return function(){
		var now = new Date();
		var content = this;
		var args = arguments;
		if(!previous){
			previous = now;
		}
		var remaining = now - previous;
		//如果当前时间-上一次执行时间 >= 间隔时间；就执行函数
		if(mustRun && remaining >= mustRun){
			fn.apply(content,args);
		//	更新上一次时间
			previous = now;
		}
	}
}