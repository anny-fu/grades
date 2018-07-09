/**
 * 功能：jQuery AJAX请求
 * 开发人员：Tom.Anny
 * 日期：2018/5/22
 */
/******************/
/*页面载入完成后执行*/
/******************/
$(function () {
//	载入导航
	$.ajax({
		type: "GET",
		url: "pages/header.html",
		context: $("header"),
		dataType: "html"
	}).done(function (elements) {
		//加载到页面中
		$(this).html(elements);
		//		设置导航第一个默认选中
		$(`header`).find('a').eq(0).trigger('click');
	});

//	导航载入数据后绑定click事件
	$(`header`).on('click', 'a', function (e) {
		$(this).addClass('ckd').parent().siblings().children().removeClass('ckd');
		var anchorTxt = $(this).text();
		switch (anchorTxt) {
			case "$.get":
				loadTextFile();
				break;
			case "$.getJSON":
				loadJSONFile();
				break;
			case "$.getScript":
				loadJavaScriptFile();
				break;
			case "$.post":
				loadHTMLFile();
				break;
			case "$.ajax":
				loadOtherFile('GET', 'pages/ajaxHTMLFile.html', 'html', {});
				break;
			case "jsonp":
				testGetParam('https://api.douban.com/v2/book/30180756');
				break;
			default:
				console.log("没有任何请求！");
		}
	});
})

/**************************/
/*请求函数部分*/
/**************************/
/*载入Text文件*/
function loadTextFile() {
	// $.get(url,success);
	$.get('plugin/doc/textFile.txt', function (data) {
		$("main").html(data);
	});
}

/*载入JSON文件*/
function loadJSONFile() {
	$.getJSON('plugin/json/test.json', function (data) {
		var $main = $('main');
		$main.html(`
<div class="userInfo">
<div class="infoLine">
<label>姓名：</label>
<span>${data.name}</span>
</div>
<div class="infoLine">
<label>年龄：</label>
<span>${data.age}</span>
</div>
<div class="infoLine">
<label>职业：</label>
<span>${data.profession}</span>
</div>
<div class="infoLine">
<label>技能：</label>
<span></span>
</div>
</div>
`);
		var str = "";
		$.each(data.skill, function (index, item) {
			str += item + "、";
		})
		//	去除最后一个字符“、”
		str = str.slice(0, str.lastIndexOf('、'));
		$main.find('.infoLine').eq(3).children('span').text(str);
	});
}

/*载入就是文件*/
function loadJavaScriptFile() {
	//加载并执行脚本
	$.getScript('plugin/js/javascriptFile.js');
}

/*载入HTML文件*/
var dataObj = {
	userName: "周楷翔",
	pwd: "123456"
};
function loadHTMLFile() {
	$.post('pages/htmlFile.html', dataObj, function (data) {
		$('main').html(data);
	});
}

/*$.ajax载入HTML文件
 * 参数：1.请求方法;2.地址;3.数据类型
 * */
function loadOtherFile(type, url, dataType, data) {
	$.ajax({
		type: type,
		url: url,
		cache: true,//默认值，type为“GET”时才有效
		dataType: dataType,
		data: data,
		success: function (elements) {
			$('main').html(elements);
		}
	});
}

/*跨域请求
 * 参数:url地址
 * */
/**
 * 官网：https://book.douban.com/
 * 豆瓣api：https://api.douban.com/v2/book/[id]30180756/
 *
 * */
function testGetParam(url) {


	$.ajax({
		type: "GET",
		url: url,
		dataType: "jsonp",
		// jsonp: "callback",
		//回掉函数名的参数名，默认callback，服务端通过它来获取到回调函数名
		// jsonpCallback: 'successCallback',
		//  回掉函数名，默认jquery自动生成
		//两个参数可以随后台确定，如果你传入后端，那么后端需要调用这个回调函数，函数的参数data才会得到结果
		success: function (bookInfo) {
			console.log("success");
			console.log(bookInfo);
			var $main = $('main');
			$main.html(`
			<div class="bookInfo">
			<h1><span>${bookInfo.title}</span></h1>
			<div id="content">
			<div id="mainpic">
			<img src="${bookInfo.images.medium}" alt="${bookInfo.title}">
</div>
</div>
</div>
			`);
		}
	});


	function successCallback(data) {
		console.log("successCallback");
		console.log(data);
	}

}