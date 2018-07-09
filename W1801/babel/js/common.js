"use strict";

/*
 * @Author: tom.anny 
 * @Date: 2018-06-13 09:48:44 
 * @Last Modified by: tom.anny
 * @Last Modified time: 2018-06-13 14:13:33
 */
// let命令和var命令
{
  // 块级作用域
  var _name = "廖旭";
  // 全局变量
  var age = 30;
}
console.log("name:" + name + "age:" + age);

// 块级作用域：被大括符所包含的，使用let命令声明的变量
// 局部作用域(函数作用域):变量是在函数体内部使用var命令声明
var obj1 = {
  name: "夏翠"
};
if (true) {
  var obj = {
    name: "周楷翔"
  };
}
console.log("name:" + obj.name);
console.log("name1:" + obj1.name);

// 常量：用const命令声明赋值后，后续不能修改它的值

for (var key in obj1) {
  console.log("输出：" + obj1[key]);
  //   if (key == "name") {
  //     key = "age";
  //   }
  console.log("修改后：" + obj1[key]);
}

// rest参数:参数位数不定，并且可以为空，将参数列表转化为数组形式
// 注意：在rest参数后不能再跟参数
function fun() {
  for (var _len = arguments.length, param = Array(_len), _key = 0; _key < _len; _key++) {
    param[_key] = arguments[_key];
  }

  //   for (const key in param) {
  //     console.log(param[key]);
  //   }
  console.log(param);
}
fun();

// 箭头函数：参数 => 函数体,简化回调函数或函数表达是形式的函数写法
var fun = function fun() {
  return "hello";
}; //=== var fun = () =>  "hello"
setTimeout(function () {
  return "hello";
}); //=== setTimeout(() => "hello")
[1, 2, 3].reduce(function (item1, item2) {
  return item1 + item2;
}); //=== [1, 2, 3].reduce((item1,item2) => item1+item2)

// 有参：1个参
var func = function func(a) {
  return a;
};
// 等于
// var func = function(a){return a}

// 有参：多个参
var func = function func(a, b, c) {
  return a + b + c;
};
// 等于
// var func = function(a,b,c){return a+b+c}

// 函数体多于一条语句,必须有返回值
var fc = function fc(a, b) {
  var c = a + b;
  var d = a * c;
  return [c, d];
};
// 等于
var fc = function fc(a, b) {
  return [a * (a + b), a + b];
};

// 函数体多于一条语句,没有返回值
var fc = function fc(a, b) {
  $("div").css('color', "#f00");
};
// 等于
var fc = function fc(a, b) {
  $("div").css('color', "#f00");
};
//# sourceMappingURL=common.js.map