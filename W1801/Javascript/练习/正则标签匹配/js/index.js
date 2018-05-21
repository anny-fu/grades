/**
 * 功能：正则标签匹配
 * 开发人员：Tom.Anny
 * 日期：2018/5/10
 */
window.onload = function () {
//	获取标签元素
	var codeHtml = document.getElementById('code-html');
	var codeHtml_str = codeHtml.innerHTML;

	/*******匹配所有尖括号********/
	codeHtml_str = codeHtml_str.replace(/</g, "&lt;");
	codeHtml_str = codeHtml_str.replace(/>/g, "&gt;");
	/*******匹配所有标签********/
var matchTagArr = codeHtml_str.match(/&lt;\/?.+?&gt;/g);

//数组去重
	var noRepeatArr_tag = [];
	while(matchTagArr.length){
	//	删除第一项
		var currentTag = matchTagArr.shift();
	//	如果在这个“不重复”数组中找不到当前项
		if(noRepeatArr_tag.indexOf(currentTag) === -1){
		//	将原数组中第一项删除，存到不重复数组里
			noRepeatArr_tag.push(currentTag);
		}
	}
	/*将不重复数组里面的字符串替换为嵌套带有样式的span标签*/
	codeHtml_str = replaceElement(codeHtml_str,noRepeatArr_tag,"#f76d6c");


/**************匹配属性名***************/
var matchAttrName = codeHtml_str.match(/\s[a-z\-]+?=/g);
//数组去重
	var noRepeatAttr_attrName = [];
	matchAttrName.forEach(function(item){
		if(noRepeatAttr_attrName.indexOf(item) === -1 && item !== " style="){
			noRepeatAttr_attrName.push(item);
		}
	})
//	将匹配成功的属性字符串替换为span标签
	codeHtml_str = replaceElement(codeHtml_str,noRepeatAttr_attrName,"#8bd12e");

/*****************匹配属性值***************/
	var matchAttrVal = codeHtml_str.match(/[^=]"[\w\-]+?"/g);
//数组去重
	var noRepeatAttr_attrVal = [];
	matchAttrVal.forEach(function(item){
		if(noRepeatAttr_attrVal.indexOf(item) === -1){
			noRepeatAttr_attrVal.push(item);
		}
	})
//	将匹配成功的属性值字符串替换为span标签
	noRepeatAttr_attrVal.forEach(function(item){
		//替换结果中的第一个字符是“>”,替换后会被覆盖，所以需要在替换内容中补上
		codeHtml_str = codeHtml_str.replace(new RegExp(item,"g"),`><span style="color:#ece077">${item.slice(1)}</span>`);
	})




/**
 * 字符串替换span标签函数
 * 参数1:codeHtml_str
 * 参数2：arr
 *参数3：文本颜色
 * */
function replaceElement(codeStr,arr,color){
	arr.forEach(function(item){
		codeStr = codeStr.replace(new RegExp(item,"g"),
			`<span style="color:${color}">${item}</span>`);
	});
	return codeStr;
}




//	将匹配过后的字符串显示到DOM
	codeHtml.innerHTML = codeHtml_str;
}