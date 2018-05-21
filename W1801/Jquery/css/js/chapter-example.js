/**
 * 功能：章节练习
 * 日期：2018/5/16
 **/

/****************************************************/
/* 页面加载完成后执行部分 */
/****************************************************/
$(function () {
//	内容懒加载
	lazyLoad();

//	页面内容载入完成时，将滚动条置顶
	setTimeout(function () {
		$(document).scrollTop(0);
	}, 0);
})


/*******************/
/***内容懒加载函数*****/
/*******************/
function lazyLoad() {

	var $win = $(window);
//	获取所有懒加载元素
	var $lazyEle = $("article > section"),
		lazyEle_len = $lazyEle.length;
	//当前窗口高度
	var winH = $win.height();

//	滚动条高度 ，页面可视高度，当前元素距离文档顶部
//文档添加滚动事件
	$(document).scroll(function () {
		//	滚动条距离顶部高度
		var scroTop = $(this).scrollTop();
//		循环判断懒加载元素是否出现在窗口内
		for (var i = 0; i < lazyEle_len; i++) {
//获取当前元素距离文档顶部的偏移值
			var $currentBlock = $lazyEle.eq(i),
				offsetTop = $currentBlock.offset().top;
//	出现在可视区域： 元素距离顶部位置 < 滚动条高度 + （一屏的高度 - 100）
			if (offsetTop < scroTop + (winH - 100)) {
				//设置元素显示
				$currentBlock.children(".offsetBlock").addClass('show');
			}
		}
	});
}
