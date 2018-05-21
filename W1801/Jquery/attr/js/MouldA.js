/**
 * 功能：模块A
 * 开发人员：Tom.Anny
 * 日期：2018/5/17
 */
function moduleA(){
	console.log("输出模块A。");
}

var objModule  = (function(){
	function moduleA(){
		console.log("对象模块A");
	}
	function moduleB(){
		console.log("对象模块B");
	}
	return {
		a:moduleA,
		b:moduleB
	}
})();