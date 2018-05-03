/**
 * 功能：AJAX封装
 * 开发人员：Tom.Anny
 * 日期：2018/4/26
 */
/***************************/
/*数据请求构造函数*/
/*****************************/
function RequestData(){
	/**
	 * 请求JSON数据
	 * 参数：URL(String);callback(Function)
	 *
	 * */
	this.getJSON = function(url,data,callback){
		var xhr = new XMLHttpRequest();
		// xhr.open("POST",url);
		xhr.open("GET",url);
		// POST方式发送数据，必须要设置请求头信息
		// xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded; charset=UTF-8");
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var jsonText = xhr.responseText;
				var result = JSON.parse(jsonText);
				callback(result);
			}
		}
	}

	/**
	 * 请求Script数据
	 * 参数：URL(String);callback(Function)
	 *
	 * */
	this.getScript = function(url,callback){
		var xhr = new XMLHttpRequest();
		xhr.open("GET",url);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var data = xhr.responseText;
				callback(data);
			}
		}
	}

	/**
	 * 请求数据
	 * 参数：URL(String);callback(Function),type(String)
	 *
	 * */
	this.get = function(url,callback,type){
		var xhr = new XMLHttpRequest();
		xhr.open("GET",url);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(xhr.readyState === 4 && xhr.status === 200){
				var data = xhr.responseText;
				switch(type){
					case "html":
						return callback(data);
					case "txt":
						return callback(data);
					case "json":
						var obj = JSON.parse(data);
						return callback(obj);
					case "js":
						return callback(data);
					default:
						return callback(data);
				}
			}
		}
	}

}
//实例化构造函数
window.$ajax = new RequestData();

/**
 * 参数序列化
 * 参数：原生对象(Object)
 *
 * */
function param(obj){
	var typeVal = Object.prototype.toString.call(obj),
		 typeVal = typeVal.slice(typeVal.indexOf(' ')+1,
			 typeVal.lastIndexOf(']')).toLowerCase();
//异常排除
	if(typeVal !== "object"){
		console.error("该函数的参数只能是一个原生对象！");
		return typeof(typeVal);
	}
var paramArr = [],paramStr = "";
	for(var x in obj){
		//encodeURI()
		paramStr = x +"="+ encodeURIComponent(obj[x]);
		paramArr.push(paramStr);
	}
//	将数组以&分割
	var result = paramArr.join("&");
	return result;
};









