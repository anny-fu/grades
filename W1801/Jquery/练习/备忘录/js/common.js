/**
 * 功能：手机备忘录信息
 * 开发人员：Tom.Anny
 * 日期：2018/5/28
 */
/***************************/
/**全局对象定义**/
/***************************/
var GLOBAL = {
//	是否处于编辑状态
	editing: false,
//	编辑列表索引值
	itemIndex: NaN
}


/***************************/
/**页面加载完成后执行部分**/
/***************************/
$(function () {
//	点击按钮进入新增页面和返回按钮点击回到主要页面
	addMemoire();
//	根据输入内容设置保存按钮状态
	setSaveBtnStatus();
//	保存备忘内容并生成视觉列表
	saveMemoireData();
//页面载入时加载本地存储数据列表
	loadMemoireList();
//	根据页面是否存在数据决定是否启用编辑删除按钮和设置页脚
	setEditBtnStatus();
//	点击列表进入编辑页
	toMemoireEditPage();
//	文本域编辑状态的激活
	activeEditor();
})


/**************************/
/***具体功能函数定义部分**/
/**************************/
/*
 * 功能1：进入新增页面和返回主页面
 * */
function addMemoire() {
//进入
	$("#addMemoire").click(function () {
		$("edit-page").css("display", "block").animate({
			"left": "0%"
		}, 300);
	});
//	返回主页
	$("#backMainPage").click(function () {
		var $editPage = $("edit-page");
		$editPage.animate({
			"left": "100%"
		}, 300, function () {
			$editPage.css("display", "none");
			//	清空textarea的val值
			$("#memoireContent").val("");
		})
	});


}

/*
 * 功能2：存储备忘数据和生成列表
 * */
function saveMemoireData() {
	$("#saveMemoire").click(function () {
		//	获取文本域内容
		var content = $("#memoireContent").val();
		//	如果内容为空，或者只包含空格则终止本次操作
		if (content == "" || /^\s+$/.test(content)) {
			return;
		}
			//声明数据对象
			var saveDataObj;
			//判断是否存在
			var hasMemoire = localStorage.getItem('memoireData') !== null;
			//对象存在
			if (hasMemoire) {
				//	设置存储数据
				setMemoireData(content);
				//	获取本地存在的对象
				var localData = localStorage.getItem('memoireData'),
					localData = JSON.parse(localData);

				//如果处于编辑状态
				if (GLOBAL.editing) {
					localData.splice(GLOBAL.itemIndex, 1, saveDataObj);
					var $dataItem = $("#memoireList li").eq(GLOBAL.itemIndex);
					$dataItem.children("p:first").text(localData[GLOBAL.itemIndex].content);
					$dataItem.children("p:last").text(localData[GLOBAL.itemIndex].saveDate);
					//	数据转换
					localData = JSON.stringify(localData);
					localStorage.setItem("memoireData", localData);
					//	清空当前文本域，返回主页，禁用保存按钮，恢复编辑状态为否
					$("#memoireContent").val("");
					$("#backMainPage").trigger('click');
					$("#saveMemoire").prop("disabled", true);
					GLOBAL.editing = false;
					GLOBAL.itemIndex = NaN;
				}
				//	非编辑状态(新增)
				else {
					//为本地存储添加数据
					localData.push(saveDataObj);
					localData = JSON.stringify(localData);
					localStorage.setItem('memoireData', localData);
					locationDataCtrl();
				}
			} else {
				//对象不存在
			setMemoireData(content);
			saveDataObj = JSON.stringify(saveDataObj);
			localStorage.setItem("memoireData", "[" + saveDataObj + "]");
			//	调用本地数据读写操作
			locationDataCtrl();
		}

		//	设置存储数据
		function setMemoireData(data) {
			//得到数据内容
			var text = data;
			//	获取当前时间
			var date = new Date(),
				year = date.getFullYear(),
				month = date.getMonth() + 1,
				day = date.getDate(),
				hour = date.getHours(),
				minutes = date.getMinutes();
			// 处理日期位数显示
			month = formatDate(month);
			day = formatDate(day);
			hour = formatDate(hour);
			minutes = formatDate(minutes);
			//拼接日期时间字符串
			var nowDate = `${year}-${month}-${day} ${hour}:${minutes}`;
			//设置存储对象
			saveDataObj = {
				"content": text,
				"saveDate": nowDate,
				"deleteStatus": false
			}
			;

			function formatDate(time) {
				return String(time).length === 1 ? "0" + time : time;
			}

		}


	});
}

/*
 * 功能3：本地数据的读写操作
 * */
function locationDataCtrl() {
//	延迟加载数据
	setTimeout(function () {
		var localData = localStorage.getItem('memoireData');
		localData = JSON.parse(localData);
//	获取数据长度
		var localData_len = localData.length;
		//生成数据列表
		$("#memoireList").append(`
	<li>
	<div>
	<i>√</i>
</div>
<p>${localData[localData_len - 1].content}</p>
<p>${localData[localData_len - 1].saveDate}</p>
</li>
	`);
//清空文本域内容，并返回主页，禁用保存按钮
		$("#memoireContent").val("");
		$("#backMainPage").trigger('click');
		$("#saveMemoire").prop("disabled", true);
	//		根据页面数据内容控制编辑按钮和页脚
		setEditBtnStatus();
	}, 100)
}

/*
 * 功能4：根据是否输入内容设置保存按钮的状态
 * */
function setSaveBtnStatus() {
	var $saveBtn = $("#saveMemoire");
	$("#memoireContent").keyup(function () {
		//	获取输入值
		var thisText = $(this).val();
		//	内容不为空并且不只是空格
		if (thisText !== "" && !(/^\s+$/.test(thisText))) {
			$saveBtn.prop('disabled', false);
		} else {
			$saveBtn.prop('disabled', true);
		}
	});
}

/*
 * 功能5：页面载入时加载本地数据列表
 * */
function loadMemoireList() {
	var hasLocalData = localStorage.getItem('memoireData') !== null;
	if (hasLocalData) {
		//	读取数据
		var localData = localStorage.getItem('memoireData');
		localData = JSON.parse(localData);
		//	获取数组长度
		var locaData_len = localData.length;
		var $memoireList = $("#memoireList");
		//循环遍历数据生成列表
		$.each(localData, function (index, objEle) {
			$memoireList.append(`
				<li>
				<div>
				<i>√</i>
				</div>
			<p>${objEle.content}</p>
			<p>${objEle.saveDate}</p>
			</li>
			`)
		})
	//	调用页脚设置和编辑按钮状态函数
		setEditBtnStatus();
	}
}

/*
* 功能6：设置是否启用编辑删除按钮及页脚设置
* */
function setEditBtnStatus(){
	var list_leng = $('#memoireList')[0].childElementCount;
	var $editBtn = $('#editList');
	if(list_leng === 0){
		$editBtn.prop("disabled",true);
		$("footer h2").text("无备忘录");
	}else{
		$editBtn.prop("disabled",false);
		$("footer h2").text(`${list_leng}个备忘录`);
	}
}

/*
* 功能7：点击列表进入编辑页
* */
function toMemoireEditPage(){
	$("#memoireList").on('click','li',function(e){
		var targetEle = $(e.target);
		//如果点击目标是删除标记按钮则什么都不做
		if(targetEle.is('i') || targetEle.is('div')){
			return;
		}
		//如果当前列表含有禁用的class时也什么都不做
		else if($(this).hasClass('disabled')){
			return;
		}
		//	否则进入编辑页面
		else{
			//	获取列表项索引值
			var idx = $(this).index();
			var localData = localStorage.getItem('memoireData');
			localData = JSON.parse(localData);
			//	为编辑页面设置对应内容
			$("#memoireContent").val(localData[idx].content).prop("readonly",true);
			$("#addMemoire").trigger('click');
			//	改变当前操作状态“编辑状态”
			GLOBAL.editing = true;
			//	设置索引
			GLOBAL.itemIndex = idx;
		}
	});
}

/*
 * 功能8：激活文本编辑域
 * */
function activeEditor(){
	$('#enableEdit').click(function(){
		//	获取文本域内容
		var content = $('#memoireContent').val();
		if(content == "" || /^\s+$/.test(content)){
			return;
		}else{
			$('#memoireContent').prop("readonly",false).focus();
			$("#saveMemoire").prop('disabled',false);
		}
	});
}




