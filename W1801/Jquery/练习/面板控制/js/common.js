/**
 * 功能：面板控制
 * 开发人员：Tom.Anny
 * 日期：2018/5/21
 */
$(function () {
//	显示隐藏面板
	$(".toggleSet").click(function () {
		if ($(this).text() === "显示设置面板") {
			$(this).text("隐藏设置面板");
		} else {
			$(this).text("显示设置面板");
		}

		$(".setContent").slideToggle(300);
	})
//生成创建内容
	$('.createListItem').on('click', function () {
		$(this).closest('.setContent').slideUp();
		//	获取输入框的值
		var titleContent = $('.listTitle').val();
		var content = $('.listContent').val();

		//	生成列表
		$('.contentUl').append(`<li>
		<a>${titleContent}<i></i></a>
		<div>${content}</div>
</li>`);

	//	清空设置框内容
		$('.listTitle, .listContent').val('');
	});

//	显示隐藏列表下拉内容
	$(".contentUl").on('click','li>a',function(){
		$(this).parent().toggleClass('checked');
		$(this).next().slideToggle(300);
	//	除去当前点击的元素父级之外的其他同级都要移除checked样式,子元素div要收起
		$(this).parent().siblings().removeClass('checked').children('div').slideUp();
	});

//	删除当前项
	$(".contentUl").on('click','li > a > i',function(e) {
		e.stopPropagation();
		$(this).closest('li').fadeOut(300,function(){
			$(this).remove();
		})
	})

})


