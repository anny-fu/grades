/**
 * 功能：章节练习
 * 开发人员：Tom.Anny
 * 日期：2018/5/17
 */
/***************/
/*页面加载完成后执行*/
/**************/
$(function () {
//	初始化表格功能
	var tbCtrl = table.init();
	//全选操作
	tbCtrl.allCkd();
	tbCtrl.childCkd();
	tbCtrl.delRow();
})

//实例化表格对象
var table = new Table();

/***************/
/*构造函数*/
/**************/
function Table() {
//	获取所有的复选框
	var $checkedBox = $("#goodsInfo tbody input[type='checkbox']"),
		allCount = $checkedBox.length;
	//全选框元素
	var $ckdAllBox = $("input[name='allCkb']");
	/*
	 * 功能1：全选/反选操作
	 * */
	function allChecked() {
//	给全选框设置点击事件
		$ckdAllBox.on("click", function () {
			//	获取选中元素的个数
			var ckdCount = $checkedBox.filter(':checked').length;
			//全选框的选中状态
			var isCkd = $(this).prop('checked');
			if (isCkd) {
				$checkedBox.prop("checked", true);
			} else {
				$checkedBox.prop("checked", false);
			}
			//	如果处于半选中状态,再次点击全选框，就要实现全选
			if (allCount !== ckdCount && ckdCount !== 0) {
				// $(this)[0].indeterminate = true;
				$(this).prop("indeterminate", false);
				$(this).prop("checked", true);
				$checkedBox.prop("checked", true);
			}
		});
	}

	/*
	 * 功能2：表内容的复选框操作
	 * */
	function childCheckedBox() {
		$checkedBox.on('click', function () {
			//获取被选中元素个数
			var ckdCount = $checkedBox.filter(':checked').length;
//	全不选
			if (ckdCount === 0) {
				$ckdAllBox.prop("checked", false);
				$ckdAllBox.prop("indeterminate", false);
			}
			//全选中
			else if (allCount === ckdCount) {
				$ckdAllBox.prop("checked", true);
				$ckdAllBox.prop("indeterminate", false);
			}
//	部分选中
			else {
				$ckdAllBox.prop("indeterminate", true);
			}
		});
	}

	/*
	 * 功能3：删除当前行
	 * */
	function delCurrentRow() {
		$("#goodsInfo tbody [name='deleData']").on('click', function () {
			$(this).closest("tr").addClass("watingDele");
			//	调用弹出框函数
			PopupBox({
				confirm: function () {
					//		删除当前class为watingDele的tr
					$("tr.watingDele").remove();
					//	隐藏弹出框
					$(this).closest('component').fadeOut(600,function(){
						$(this).remove();
					});
				},
				cancel: function () {
					//	删除当前tr为watingDele的class
					$("tr.watingDele").removeClass('watingDele');
					//	隐藏弹出框
					$(this).closest('component').fadeOut(600,function(){
						$(this).remove();
					});
				}
			});
		});
	}

	/*
	 * 初始化方法集
	 * */
	this.init = function () {
		return {
			allCkd: allChecked,
			childCkd: childCheckedBox,
			delRow:delCurrentRow
		}
	}


}


/*
 * 功能：弹出框函数
 * 参数:
 * param.confirm：确认按钮的回调函数功能（Function）
 * param.cancel:取消按钮的回调函数功能（Function）
 * */
function PopupBox(param) {
//	创建弹出框
	$("body").append(`
<component>
	<div class="maskLayer"></div>
	<div class="popupBox">
		<div class="popupBox-content">确定要删除本条数据？</div>
		<div calss="popupBox-ctrl">
			<button class="confirmBtn" type="button">确认</button>
			<button class="cancelBtn" type="button">取消</button>
		</div>
	</div>
</component>
`);
//	确认操作
	$(".confirmBtn").on("click", function () {
		//	调用确认操作回调函数;并绑定this指向当前按钮
		param.confirm.bind(this)();
	});
//	取消操作
	$(".cancelBtn").on("click", function () {
		//	调用取消操作回调函数
		param.cancel.bind(this)();
	});
}