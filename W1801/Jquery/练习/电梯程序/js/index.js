/**
 * 功能：电梯程序
 * 开发人员：Tom.Anny
 * 日期：2018/5/21
 */
/*
 * 全局对象定义
 * */
//电梯状态
var elevStatus = {
	//电梯
	elevato: $(".elevato"),
//	电梯所在层
	onoFloor: 1,
//	总楼层
	storeyTotal: $(".storey").length
}

/**************************/
/****页面元素加载完成后执行****/
/**************************/
$(function () {
//电梯按钮点击事件
	$('.ctroller button').click(function () {
		//	判断按钮是否已经点击
		var ckd = $(this).hasClass('checked');
		if (ckd) {
			return;
		} else {
			//	添加选择效果
			$(this).addClass('checked');
			//	获取楼层下标，计算楼层数
			var idx = $(this).closest('.storey').index(),
				//		当前楼层
				storeyFloor = (elevStatus.storeyTotal - idx),
				//		层高
				floorHeight = ($('.storey').height()) + 1,
				//		电梯的移动量：基数为0像素
				amountMove = storeyFloor - 1;
			//	电梯移动到对应楼层
			switch (storeyFloor) {
				case 1:
					elevatorMove(storeyFloor, floorHeight * amountMove, this);
					break;
				case 2:
					elevatorMove(storeyFloor, floorHeight * amountMove, this);
					break;
				case 3:
					elevatorMove(storeyFloor, floorHeight * amountMove, this);
					break;
				case 4:
					elevatorMove(storeyFloor, floorHeight * amountMove, this);
					break;
				case 5:
					elevatorMove(storeyFloor, floorHeight * amountMove, this);
					break;
				case 6:
					elevatorMove(storeyFloor, floorHeight * amountMove, this);
					break;
			}
		}
	});

})


/**
 * 电梯移动对应楼层
 * param1:当前楼层数
 * param2:移动距离
 * param3:楼层按钮
 *
 * */
function elevatorMove(num, measure, btn) {
//获取电梯所在当前楼层数
	var elevatorNum = elevStatus.onoFloor;
//	计算出电梯所在层和当前楼层的差值
	var diffFloorVal = Math.abs(elevatorNum - num);
//	移动电梯
	elevStatus.elevato.css({
		"transitionDuration": diffFloorVal + "s",
		"bottom": measure + "px"
	});
//	添加电梯开关门动画Class效果
	$(".elevato-left,.elevato-right").addClass('toggle')
		.css("animationDelay",diffFloorVal+"s");
//消除按钮点击效果
	setTimeout(function(){
		$(btn).removeClass('checked');
	},diffFloorVal * 1000);
//	延迟关闭电梯门动画Class
	setTimeout(function(){
		$(".elevato-left,.elevato-right").removeClass('toggle');
	},diffFloorVal * 1000 + 3000)
//将电梯流程设置为当前楼层数，便于下次判断
	elevStatus.onoFloor = num;


}




