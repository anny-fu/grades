/**
 * 功能：图片切换效果
 * 开发人员：Tom.Anny
 * 日期：2018/4/12
 */
//文档载入事件
window.onload = function(){
//	获取所有的超链接
	var whichpic = getEle('a');
	var whic_len = whichpic.length;
//	循环给每个a绑定点击事件
	for(var i = 0 ;i<whic_len;i++){
/*		whichpic[i].onclick = function(event){
		//	阻止超链接默认跳转事件
			event.preventDefault();
		//	调用图片切换函数
			showPic(this);
		}*/

whichpic[i].onclick = showPic;


	}
}

function showPic(event){
//	阻止超链接默认事件
event.preventDefault();
//	获取img元素和文本显示元素
	var piace = getEle('#ku00'),
		textEl = getEle('#description');
//	获取当前点击a元素的href属性和title属性的值
	var source = this.getAttribute('href'),
		txt = this.getAttribute('title');
	console.log(source+"===text:"+txt);
//	给img元素设置src，p元素设置内容
	piace.setAttribute('src',source);
	piace.setAttribute('title',txt);
	textEl.textContent = txt;
}




