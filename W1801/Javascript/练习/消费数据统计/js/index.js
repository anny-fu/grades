/**
 * 功能：消费数据统计
 * 开发人员：Tom.Anny
 * 日期：2018/5/10
 */
/*********全局变量********/
var expensData = [];
window.onload = function () {
//	表单元素集合
	var inputGroup = document.getElementsByClassName('data-create-group')[0].getElementsByTagName('input');
//添加数据按钮
	var creatData = document.getElementById('creatData');
//	按钮点击事件
	creatData.onclick = function () {
		//	添加数据函数
		setExpensData(inputGroup, expensData);
	}

//	调用设置元素样式改变函数
	changeLabelColor(inputGroup,"focusStyle");
}

/**
 * 设置消费数据
 * 参数1：表单元素集合
 * 参数2：消费数据值存储对象数组
 */
function setExpensData(inputs, data) {
	/**
	 * 当前点击时间获取到的值存入一个临时对象
	 * */
	var temporaryObj = {
		food: Number(inputs[0].value),
		shopping: Number(inputs[1].value),
		aodu: Number(inputs[2].value),
		traffic: Number(inputs[3].value),
		entertainment: Number(inputs[4].value),
		socialContact: Number(inputs[5].value),
		financial: Number(inputs[6].value),
		medical: Number(inputs[7].value),
		other: Number(inputs[8].value)
	}
	//将临时对象存入数据数组
	data.push(temporaryObj);
	//找到tbody，添加一行新的tr
	var tbody = document.getElementById('expenseData').getElementsByTagName('tbody')[0];
	tbody.innerHTML += `<tr></tr>`;
	//	找到最新添加的tr
	var tr = tbody.getElementsByTagName('tr'),
		newTr = tr[tr.length - 1];
	//	对临时对象值进行遍历
	for (var x in temporaryObj) {
		newTr.innerHTML += `<td>￥${temporaryObj[x].toFixed(2)}</td>`;
	}
//总值
	var sum = 0;
//	消费数据长度
	var data_len = data.length;
//	计算总消费
	for (var i = 0; i < data_len; i++) {
		for (var y in data[i]) {
			sum += data[i][y];
		}
	}
//计算平均消费
	var avgExpense = sum / data_len;
console.log(sum);
console.log(sum);
//	获取设置平均值和总值的td
	var avgExpenseTd = document.getElementsByClassName('avgExpense')[0];
	var sumExpenseTd = document.getElementsByClassName('sumExpense')[0];

//	渲染平均值
	avgExpenseTd.innerHTML = `￥${avgExpense.toFixed(2)}`;
//总值设置
	sumExpenseTd.innerHTML = `￥${sum.toFixed(2)}`;
}

/**
 *
 * 表单元素获取焦点改变统计lable样式
 * 参数1：表单元集合
 * 参数2：需要添加的class
 *
 * */
function changeLabelColor(identArr, focusStyle) {
	var identArr_len = identArr.length;
	for (var i = 0; i < identArr_len; i++) {
		//	获取焦点事件
		identArr[i].onfocus = function () {
			//	找到当前元素的上一个同级label元素
			var currentLabel = this.previousElementSibling;
			currentLabel.className +=" "+focusStyle;
			console.log(currentLabel);
			// currentLabel.classList.add(focusStyle);
		}
		//	失去焦点事件
		identArr[i].onblur = function () {
			var currentLabel = this.previousElementSibling;
			// currentLabel.className = currentLabel.className.replace(focusStyle,"");
			currentLabel.classList.remove(focusStyle);
		}
	}
}