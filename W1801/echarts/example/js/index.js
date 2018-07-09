/*
 * @Author: tom.anny 
 * @Date: 2018-06-12 14:10:56 
 * @Last Modified by: tom.anny
 * @Last Modified time: 2018-06-12 18:01:02
 */


/* 全局变量*/
var week = ["周一", "周二", "周三", "周四", "周五", "周六", "周日"];


/* ************************************* */
/*文档内容加载完成后执行 */
/* ************************************* */
$(function() {

  // 获取数据
  $.getJSON('data/consume.json')
    // JSON数据获取后回调处理
    .then(function(data) {
      // 调用“表格数据加载”函数
      dataLoad(data);

      //   调用“一周消费总计”函数
      sumExpense();
      //   调用“表格输入重计算功能”函数
      inputRecalc(data);
      //   调用“柱状图表”函数
      barOption(data, "dataBar");
      //   调用“饼状图表”函数
      pieOption(data, "dataPie");

    });

})

/******************************************** */
/**共能函数定义部分 */
/******************************************** */

/* 
功能：表格数据加载
参数1：获取到的JSON数据
*/

function dataLoad(JSON) {

  var $table = $('#weekConsumption'),
    $theadTr = $table.children('thead').children('tr'),
    $tbody = $table.children('tbody');
  // 1.生成表头
  for (var key in JSON) {
    $theadTr.append(`<th>${JSON[key]['name']}</th>`);
  }
  // 2.生成表内容中的第一列数据
  $.each(week, function(index, item) {
    $tbody.append(`<tr><td>${item}</td></tr>`);
  });
  // 3.加载JSON对应数据
  // 获取表体中的所有tr
  var $todyTr = $tbody.children('tr');
  $todyTr.each(function(idx, item) {
    // 在每一个tr中添加9个数据
    for (var y in JSON) {
      $(item).append(`<td data-class="${y}" contenteditable="true">${JSON[y]["value"][idx]}</td>`);
    }
  });

}


/* 
共能：一周消费数据总计 
*/
function sumExpense() {
  // 获取表体的行数
  var tbodyTr = $('#weekConsumption >tbody >tr');
  // 获取一行中的列数
  var tbodyTd = tbodyTr.eq(0).children('td');
  // 表脚的tr
  var tfootTr = $('#weekConsumption >tfoot >tr');
  tbodyTd.each(function(bodyTdIdx, bodyTdItem) {
    //   排除每行的第一列
    if (bodyTdIdx !== 0) {
      // 装每一列的数据
      var arr = [];
      // 求得每列数据总和
      var sumSolum = 0;
      tbodyTr.each(function(tbodyTrIdx, tbodyTrItem) {
        var thisVal = $(tbodyTrItem).children('td').eq(bodyTdIdx).text();
        arr.push(thisVal);
      });
      //   累积求和
      sumSolum = arr.reduce(function(tdCurrent, tdNext) {
        return Number(tdCurrent) + Number(tdNext);
      });
      //  设置页脚的总计值
      $(tfootTr).append(`<td>${sumSolum}</td>`);
    }
  });
}


/* 
功能：数据输入重计算
参数：JSON数据
*/

function inputRecalc(json) {
  // 获取tbody中的所有td
  var $tbodyTd = $('#weekConsumption > tbody td');
  // tfoot
  var $tfoot = $('#weekConsumption > tfoot');
  //   绑定事件
  $tbodyTd.on({
    blur: function() {
      //   获取当前输入的值
      var thisVal = $(this).text();
      // 如果值为空，重置为0
      if (thisVal === "") {
        $(this).text(0);
        $tfoot.find('td').eq(0).text("总计").removeClass('sumErro');
      }
      //   如果包含其他字符
      else if (!/^\d+$/.test(thisVal)) {
        $tfoot.find('td').eq(0).text("有错误").addClass('sumErro');
      } else {
        $tfoot.find('td').eq(0).text("总计").removeClass('sumErro');
      }
      //   调用计算函数
      numCalc(this);
      //   柱状图表配置
      barOption(json, "dataBar");
      // 饼状图表配置
      pieOption(json, "dataPie");
    }
  });

  //   计算函数
  function numCalc(ident) {
    // 获取当前元素的data-class和所在行的索引
    var thisClass = $(ident).attr('data-class');
    var thisIdx = $(ident).index();
    // 空数组和总和变量
    var arr = [],
      sum = 0;
    //   找到同一类型的单元格
    var currentClass = $("#weekConsumption > tbody").find(`td[data-class=${thisClass}]`);

    // 遍历同类型的所有td,取到text值存入数组
    currentClass.each(function(idx, item) {
      var thisTxt = $(item).text();
      arr.push(thisTxt);
    });
    // 求和
    sum = arr.reduce(function(item1, item2) {
      return Number(item1) + Number(item2);
    });

    // 重置页脚总计值
    $tfoot.find('td').eq(thisIdx).text(sum);
  }
}
/* 
功能：生成图表函数
参数1：元素容器ID
参数2：配置项
*/
function createCharts(ident, option) {
  var myEcharts = echarts.init($("#" + ident)[0], "dark");
  myEcharts.setOption(option);
}
/* 
功能：柱状图配置
参数：1.JSON数据 2.元素ID
*/
function barOption(json, ident) {
  // 设置图例数据信息
  function setLegendData() {
    var arr = [];
    for (var key in json) {
      arr.push(json[key]['name']);
    }
    return arr;
  }
  // 图表数据信息
  function getSeriesData() {
    var $tbodyTr = $('#weekConsumption tbody tr');
    var seriesArr = [],
      obj = {},
      arr = [],
      count = 1;
    for (let x in json) {
      // 重置数组
      arr = [];
      // 设置类型为柱状图
      obj = {
          "type": "bar"
        }
        // 设置当前系列名称
      obj.name = json[x]['name'];
      // 遍历除这一列的数据添加到数组
      $tbodyTr.each(function(index, item) {
        var thisVal = Number($(item).children('td').eq(count).text());
        arr.push(thisVal);
      });
      obj.data = arr;
      seriesArr.push(obj);
      count++;
    }
    return seriesArr;
  }
  //   调用生成图表函数
  createCharts(ident, {
    title: {
      text: "本周生活消费数据",
      top: 10,
      textStyle: {
        fontWeight: "normal",
        color: "#bcd9fa"
      }
    },
    tooltip: {},
    legend: {
      orient: "vertical",
      right: 10,
      top: 36,
      itemGap: 15,
      //   原生写法
      //   data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎', '百度', '谷歌', '必应', '其他']
      data: setLegendData()
    },
    grid: {
      left: 34,
      top: 60,
      right: 120,
      bottom: 40
    },
    xAxis: {
      data: week
    },
    yAxis: {},
    series: getSeriesData()
      // 原生写法
      // series: [{
      //     name: '直接访问',
      //     type: 'bar',
      //     data: [320, 332, 301, 334, 390, 330, 320]
      //   },
      //   {
      //     name: '邮件营销',
      //     type: 'bar',
      //     stack: '广告',
      //     data: [120, 132, 101, 134, 90, 230, 210]
      //   }
      // ]
  });
}

/* 
功能:饼状图配置
参数1：JSON数据
参数2：元素ID
*/
function pieOption(json, ident) {
  // 获取表头
  var $headCell = $('#weekConsumption thead th');
  // 获取表格总计值
  var $sumCell = $('#weekConsumption tfoot td');
  //   设置饼状图数据
  function setPieData() {
    var arr = [];
    //   根据表格内容生成数据对象
    $headCell.each(function(idx, item) {
      if (idx !== 0) {
        var obj = {
          name: $headCell.eq(idx).text(),
          value: Number($sumCell.eq(idx).text())
        }
        arr.push(obj);
      }
    });
    return arr;
  }
  // 调用生成图表函数
  createCharts(ident, {
    title: {
      text: "本周生活消费比重",
      top: 10,
      textStyle: {
        fontWeight: "normal",
        color: "#bcd9fa"
      }
    },
    tooltip: {},
    series: [{
      name: "本周生活消费比重",
      type: 'pie',
      radius: "75%",
      center: ['50%', '50%'],
      roseType: 'radius',
      data: setPieData()
        //   data:[
        //       {name:,value:},
        //   ]
    }]
  });

}