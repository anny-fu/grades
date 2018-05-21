/**
 * 功能：正则验证函数封装
 * 开发人员：Tom.Anny
 * 日期：2018/5/10
 */
window.onload = function () {
//	获取表单元素
	var email = document.getElementById('email'), emailStatus = false,
		niceName = document.getElementById('nicename'), niceNameStatus = false;
	var signUp = document.getElementById('signUp');

	/*
	 *邮箱验证
	 * */
	email.onblur = function () {
//	调用验证函数
		emailStatus = regExpFun({
			ident: this, regExp: /^[\w\-]+@[\w\-]+\.[a-z]{2,3}$/g,
			errorTxt: ["内容不能为空！", "请输入正确的格式！"],
			successTxt:"验证通过！"
		});
	}
	niceName.onblur= function(){
		niceNameStatus = regExpFun({
			ident: this, regExp: /^\S+$/g,
			errorTxt: ["内容不能为空！", "请输入正确的格式！"],
			successTxt:"验证通过！"
		})
	}

	/**
	 * 验证函数
	 * 参数：Object{ident:当前元素,regexp:正则表达式,errorTxt:错误提示信息}
	 * return :Boolean值
	 * */
	function regExpFun(expObj) {
//验证结果
		var verified = false;
//	获取当前元素值
		var thisVal = expObj.ident.value;
		console.log(thisVal);
//获取错误信息显示元素
		var errorMesg = expObj.ident.previousElementSibling.previousElementSibling;
//	是否为空值
		if (thisVal == "" || thisVal == null) {
			errorMesg.textContent = (expObj.errorTxt)[0];
			return verified;
		}
//验证通过
		if (expObj.regExp.test(thisVal)) {
			errorMesg.textContent = expObj.successTxt;
			verified = true;
		}
//	验证不通过
		else {
			errorMesg.textContent = (expObj.errorTxt)[1];
			verified = false;
		}
		return verified;

	}


}