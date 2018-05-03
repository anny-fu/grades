main.innerHTML = `<div class="ajaxJS">异步请求的JS内容</div>`;
console.log("如果在控制台内看到这一句话，说明这个被请求的JS文件被执行。");
let count = 0;
let ajaxInterval = setInterval(function () {
	console.log(`持续执行${++count}`);
	if(count == 5) {
		clearInterval(ajaxInterval);
		alert(`AJAX请求的JS文件执行完毕！`);
	}
},800);