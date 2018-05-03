/**
 * 功能：注册验证
 * 开发人员：Tom.Anny
 * 日期：2018/4/23
 */
// 事件代理:focusin,focusout
var form = document.querySelector('form');

// 获取焦点事件代理
form.addEventListener('focusin', function (event) {
//	判断如果是input获取焦点,排除checkbox
	var ele = event.target;
	if (ele.tagName.toLowerCase() == 'input' && ele.previousElementSibling) {
		ele.previousElementSibling.style.display = "none";
		//提示信息
		ele.parentElement.nextElementSibling.querySelector('span').innerHTML = ele.getAttribute("data-tip")
	}
})

//失去焦点事件代理
form.addEventListener('focusout', function (event) {
	var ele = event.target;
	//显示提示信息容器
	var msgBox = ele.parentElement.nextElementSibling.querySelector('span');
	if (ele.tagName.toLowerCase() == 'input') {
		//	内容为空
		if (ele.value == "") {
			ele.previousElementSibling.style.display = "inline";
			msgBox.innerHTML = '<i class="i-error"></i><span class="error">内容不能为空！</span>';
		} else {
			//	如果内容不为空
			var input_val = ele.value;
			//	返回结果
			var result = "";
			var pass = document.getElementById('passwd').value;
			switch (ele.getAttribute('id')) {
				case "username":
					result = username(input_val);
					break;
				case "passwd":
					result = passwd(input_val);
					break;
				case "repasswd":
					result = repasswd(pass, input_val);
					break;
				case "phone":
					result = phone(input_val);
					break;
				case "authCode":
					result = authcode(input_val);
					break;
				default:
					return false;
			}
			//	 如何符合规范
			if (result == true) {
				msgBox.innerHTML = '<i class="i-succes"></i><span class="success">验证通过！</span>';
			}else{
			//	验证不通过,显示错误信息
				msgBox.innerHTML = '<i class="i-error"></i><span class="error">'+result+'</span>';


			}
		}
	}
})


//用户名验证
function username(uName) {
//正则匹配
	var reg = /[^\u4e00-\u9fa5\w-]/;
	if (reg.test(uName)) {
		return "格式错误，只支持汉字、字母、数字、下划线和“-”的组合";
	} else if (uName.length < 4 || uName.lenght > 20) {
		return "支持长度在4-20个字符之间";
	} else {
		return true;
	}
}

//密码验证
function passwd(passwd) {
	//获取确认密码
	var repass = document.getElementById('repasswd').value;
	//数字，字母，特殊符号必须两种以上组合
	var reg = /^((?=.*?\d)(?=.*?[A-Za-z])|(?=.*?\d)(?=.*?[!@#$%^&])|(?=.*?[A-Za-z])(?=.*?[!@#$%^&]))[\dA-Za-z!@#$%^&]+$/;
	if (!reg.test(passwd)) {
		return "格式错误!";
	} else if (passwd.length < 6 || passwd.length > 20) {
		return "长度必须在6-20个字符之间。";
	}
	else if(repass !="" && passwd != repass){
		return '两次密码不一致！';
	}else{
		return true;
	}
}
//确认密码验证
function repasswd(pass,repass){
	if(pass !== repass && pass != ""){
		return "两次密码不一致。";
	}else{
		return true;
	}
}

//手机号码验证
function phone(phoneNum){
	var reg =/^1(3|4|5|7|8)\d{9}$/;
	if(reg.test(phoneNum)){
		return true;
	}else{
		return "格式不正确。";
	}
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

//监听同意协议的CheckBox的改变
document.querySelector(".form_agreen>input").onchange = function(){
	if(this.checked){//如果是勾上的，还原样式
		this.parentElement.classList.remove("nochecked");
		this.parentElement.nextElementSibling.querySelector("span").innerHTML = "";
	}else{//如果没有勾上
		this.parentElement.classList.add("nochecked");
		this.parentElement.nextElementSibling.querySelector("span").innerHTML = '<i class="i-error"></i><span class="error">请同意协议并勾选</span>';
	}

}

//设置验证码
//获取装随机函数的span框
var yzm,
	ranDom=document.getElementById("yzm");
ranDom.innerHTML="<span>点击获取</span>";
//随机数生成函数
function randoms(){
	var character='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
	character+='abcdefghijklmnopqrstuvwxyz';
	character+='0123456789';
	var str='';
	for(var i=0;i<4;i++){
		var rand=Math.floor(Math.random()*62);
		str +=character.substring(rand,rand+1)
	}
	return str;
}
ranDom.onclick = function(){
	yzm =randoms();
	this.innerHTML='<i id="yzm">'+yzm+'</i>';
	this.style.letterSpacing ='7px'
}
// 验证码
function authcode(num){
	console.log(yzm);
	return num == yzm ? true : "验证码错误！";
}
