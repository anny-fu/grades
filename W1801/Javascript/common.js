/**
 * 功能：公共js
 * 开发人员：Tom.Anny
 * 日期：2018/4/3
 */
/*
*判断数据类型
*/
function typeJudge(val){
//	获取参数的返回类型(对象或构造函数)
	var valStr = Object.prototype.toString.call(val),
//	获取需要截取的字符位置
	 startId = valStr.indexOf(' ') + 1,
	 endId = valStr.lastIndexOf(']');
//	截取指定位置字符，转换为小写或大写并返回
	return valStr.slice(startId,endId).toLowerCase();
}

//需要判断类型的数组
var typeVal = ["Null","Undefined","Number","String","Object","Function","Array","RegExp","Math","Date"],
	//自动有typeOf方法
typeOf = {};
typeVal.forEach(function(arrEle){
	typeOf["is"+arrEle] = function(valJudge){
	//	判断传入的参数值和数组中的值是否相等
		return typeJudge(valJudge) === arrEle.toLowerCase();
	}
});