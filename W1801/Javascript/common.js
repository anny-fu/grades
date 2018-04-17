/**
 * 功能：公共js
 * 开发人员：Tom.Anny
 * 日期：2018/4/3
 */
/*
 *判断数据类型
 */
function typeJudge(val) {
//	获取参数的返回类型(对象或构造函数)
	var valStr = Object.prototype.toString.call(val),
//	获取需要截取的字符位置
		startId = valStr.indexOf(' ') + 1,
		endId = valStr.lastIndexOf(']');
//	截取指定位置字符，转换为小写或大写并返回
	return valStr.slice(startId, endId).toLowerCase();
}

//需要判断类型的数组
var typeVal = ["Null", "Undefined", "Number", "String", "Object", "Function", "Array", "RegExp", "Math", "Date"],
	//自动有typeOf方法
	typeOf = {};
typeVal.forEach(function (arrEle) {
	typeOf["is" + arrEle] = function (valJudge) {
		//	判断传入的参数值和数组中的值是否相等
		return typeJudge(valJudge) === arrEle.toLowerCase();
	}
});

/**
 * 固定区间的随机整数函数
 * 参数：最小值和最大值
 * 返回值：随机整数
 * */
function randomInteger(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}
/**
 * 固定区间的随机整数函数
 * 参数：最小值和最大值;获取的随机数个数
 * 返回值：固定位数的随机数字符串
 * */
function FixedNumRandom(min, max, degree) {
	var str = "";
	// var arr = [];
	for (var i = 0; i < degree; i++) {
		str += Math.floor(Math.random() * (max - min + 1)) + min;
		// arr.push(Math.floor(Math.random() * (max - min + 1)) + min);
	}
	return str;
}
/**
 * 获取数组中固定个数的随机值
 * 参数：数组;个数
 * 返回值：数组或字符串
 * */
function arrNumberRandom(array, num) {
	var str = "";
	var arr = [];
	for (var i = 0; i < num; i++) {
		//产生随机下标
		var rand = Math.floor(Math.random() * array.length);
		//	通过随机下标得到随机值
		str += array[rand];
		// arr.push(array[rand]);
	}
	return str;
}

/**
 *获取随机验证码
 * 参数：字符个数(默认为4个)
 * 返回值：字符串
 * */
function randomCode(n) {
//	判断n是否有值
	n = (n === "undefined") ? 4 : n;
	var str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//	获取随机下标位置字符
	var code = '';
	for (var i = 0; i < n; i++) {
		var rand = Math.floor(Math.random() * str.length);
		code += str.substr(rand, 1);
	}
	return code;
}

/**
 * 数组的成员遍历
 *
 * */
Array.prototype.arrItem = function () {
	this.map(function (item) {
		console.log(item);
	})
}

/**
 * 对象属性值遍历
 *
 * */
Object.prototype.objItem = function () {
	for (var n in this) {
		//排除继承的属性
		if (!this.hasOwnProperty(n)) {
			continue;
		}
		console.log(n + ":" + this[n]);
	}
};

/**
 * 功能：将字符串转换为Unicode
 * 参数：文本字符串
 **/
function codingUnicode(str) {
	if(str.includes("\\u")) {
		return false;
	}
	const leng = str.length;
	let unicodeStr = "";
	// 通过循环添加Unicode前缀“\n”（需要转义）
	for(let i = 0; i < leng; i++) {
		unicodeStr += "\\u" + str.charCodeAt(i).toString(16);
	}
	showUnicode.textContent = unicodeStr;
}

/**
 * 功能：将Unicode转换为字符串
 * 参数：文本字符串
 **/
function codingString(str) {
	/**
	 * 标签模板(模板字符串)的写法
	 */
	var obj = `{"unicodeString": "${str}"}`;
	// 使用JSON方法转换为普通对象
	obj = JSON.parse(obj);
	// 将解析后的对象属性的值写入显示容器元素
	showUnicode.textContent = obj.unicodeString;
}
/**
 * 获取所有同级节点元素
 * 参数：当前节点
 * 返回值：所有同级元素节点集合
 * */
function getSibling(ele){
	var arr = [];
//	找到当前节点父节点，所有子元素节点
	var childs = ele.parentElement.children;
	console.log(childs);
	for(var i= 0 ;i<childs.length ;i++){
		if(childs[i] !== ele){
			arr.push(childs[i]);
		}
	}
	return arr;
}

/***
 *
 * 元素选择器
 * 参数：css选择器(String) === ID Class 标签
 * */
function getEle(param) {
//获取首个字符
	var firstChar = param.charAt(0);
	var result;
//	如果是ID
	if (firstChar === "#") {
		result = document.getElementById(param.slice(1));
	}
//		如果是Class
	else if (firstChar === ".") {
		result = document.querySelectorAll(param);
	}
//		如果标签
	else if (/[a-z]/i.test(firstChar)) {
		result = document.querySelectorAll(param);
	}
	return result;
}


