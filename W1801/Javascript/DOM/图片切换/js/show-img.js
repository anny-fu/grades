/**
 * 功能：图片切换
 * 开发人员：Tom.Anny
 * 日期：2018/4/12
 */
//img大图容器
var img_conta = getEle('#img_container').children,
//		img列表
	imgBox = getEle('#item'),
	img_item = imgBox.children,
	img_len = img_item.length;

//	存储当前点击的li
var index = 0;
//	循环绑定事件
for (var i = 0; i < img_len; i++) {
	//动态给li绑定一个下标属性index
	img_item[i].index = i;
	img_item[i].onclick = showimg;

}

/**
 * 点击li后显示对应的图片和文本
 *
 * */
function showimg() {
//	清除所有li的class
// 	for(var i = 0;i<img_len;i++){
// 		img_item[i].removeAttribute('class');
// 	}

//	判断当前li是否选择
	if (!this.hasAttribute('on')) {
		// this.setAttribute('class', 'on');
		// this.classList.add('on');
		//	如果不是当前点击的昂元素，就移除class
		if (this.index !== index) {
			// img_item[index].removeAttribute('class');
			// img_item[index].classList.remove("on");
			//	更新记录当前点击li的下标
			index = this.index;
		}
	}
//	获取当前点击li的下面的img的src和title
	var src = (this.children)[0].getAttribute('src'),
		txt = (this.children)[0].getAttribute('title');
//		重新绑定到大图容器元素中显示
	img_conta[0].setAttribute('src', src);
	img_conta[1].textContent = txt;
}