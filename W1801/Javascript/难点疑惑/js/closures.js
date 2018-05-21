/**
 * 功能：闭包
 * 开发人员：Tom.Anny
 * 日期：2018/5/9
 */
//	1.变量作用域（全局变量和局部变量）

var he = "hello world";
//声明全局数据变量
var arr = ['img/01.jpg','img/02.jpg','img/03.jpg','img/04.jpg','img/05.jpg'];
var URL_len = arr.length;
// funa();
function funa() {
	var main = document.getElementById('main');

//	临时的字符串变量
	var str ="";
//	循环添加图片
for(var i = 0;i<URL_len;i++){
str += `<div class="imgBox"><img src="${arr[i]}" alt=""></div>`;
}
	//绑定到DOM
	main.innerHTML = str;

	main.addEventListener('click',function(event){
	//	兼容IE
		var e = window.event || event;
		if(e.target.tagName == "IMG"){
			console.log(e.target.src);
		}
	},false);

	function sayHi() {
		main.innerText = "动态添加内容";
		var hjg = "何金果";
		console.log(main);
		console.log(hjg);

		function hello(){
			var age = 12;
			consle.log(age);
		}
	}

	// sayHi();
	console.log("main:" + main);
	// console.log("name is:" + hjg);
}
	//变量声明提升
//console.log(a);
//var a = "Hello";
//console.log(a);
//转换如下：
// 	var a ;
// 	console.log(a);
// 	a = "Hello";
// 	console.log(a);


	/*
	 * 小结：
	 * 1.函数内部定义的变量是局部变量，外部定义的就全局变量
	 * 2.局部变量不能被函数外部直接访问，全局变量可以在任何函数内部被访问
	 * 3.变量会出现声明提升，所有声明的变量都会提前执行。
	 *4.闭包，是指语法域位于某个特定的区域，具体读写位于该区域内自身范围之外的执行域上
	 * 是非持久性变量值能力的段落。
	 * */


	/*
	* 闭包应用：插件
	* */
	//插件代码
/*	var plugin = (function(){
		function sayHi(str = 'Hello'){
			console.log(str);
		}
		return sayHi;
	})();*/


//	自调用匿名函数
/*
(function(a){})(3);
//	等同于
var fu = function(a){};
fu(4);
*/


//调用插件
/*
 plugin('Hi good morning');
 plugin();
 */

//插件代码升级、
var plugin = (function(){
	var _sayhi = function(str = 'Hello'){
		console.log(str);
	}
	var _sayhello = function(){
		console.log('新增的一个API功能！');
	}
	// return _sayhi;
	return {
		SayHi:_sayhi,
		SayHello:_sayhello
	};
})();
plugin.SayHi('Hi good morning');
plugin.SayHello();

