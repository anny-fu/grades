/*
 * @Author: tom.anny 
 * @Date: 2018-06-08 11:04:49 
 * @Last Modified by: tom.anny
 * @Last Modified time: 2018-06-11 15:51:59
 */

$(function() {
  //调用折线图函数
  setLine("echarts-1", {
    backgroundColor: '#d3d1b1',
    title: {
      text: '互联网行业入职五年的薪资统计'
    },
    tooltip: {
      trigger: 'axis'
    },
    toolbox: {
      feature: {
        magicType: {
          type: ['line', 'bar']
        }
      }
    },
    legend: {
      right: 100,
      width: 260,
      data: ['Web前端', 'Java开发', 'Python开发', '测试', 'AI设计']
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: ['一年', '两年', '三年', '四年', '五年']
    },
    yAxis: {},
    series: [{
        name: 'Web前端',
        type: 'line',
        data: [4000, 6000, 9500, 12000, 18000]
      },
      {
        name: 'Java开发',
        type: 'line',
        data: [5500, 8500, 10000, 15000, 22000]
      },
      {
        name: 'Python开发',
        type: 'line',
        data: [6000, 8500, 11000, 18000, 25000]
      },
      {
        name: '测试',
        type: 'line',
        data: [3500, 4500, 6000, 8000, 12000]
      },
      {
        name: 'AI设计',
        type: 'line',
        data: [5000, 8500, 11000, 15600, 21000]
      }
    ]
  });
  // 调用柱状图
  setBar("echarts-2", {
    backgroundColor: '#bdd3c7',
    // 图表标题
    title: {
      text: '主流浏览器在2014年至2018年使用情况'
    },
    // 工具栏
    tooltip: {},
    // 图表图注
    legend: {
      data: ['IE', 'Chrome', '搜狗高速', '猎豹', 'QQ'],
      orient: 'vertical',
      right: 0,
      top: 140
    },
    // X轴设置
    xAxis: {
      data: ["2014年", "2015年", "2016年", "2017年", "2018年"]
    },
    // Y轴设置
    yAxis: {},
    // 系列设置
    series: [{
        name: 'IE',
        type: 'bar',
        data: [49.49, 38.78, 29.05, 43.15, 47.05]
      },
      {
        name: 'Chrome',
        type: 'bar',
        data: [28.1, 35.12, 39.49, 24.42, 21.97]
      },
      {
        name: '搜狗高速',
        type: 'bar',
        data: [4.77, 4.65, 4.19, 4.51, 4.44]
      },
      {
        name: '猎豹',
        type: 'bar',
        data: [2.48, 2.59, 2.24, 0, 0]
      },
      {
        name: 'QQ',
        type: 'bar',
        data: [2.23, 2.96, 4.84, 6.35, 6.25]
      }
    ],
    grid: {
      left: "10%",
      top: "12%",
      right: "14%",
      bottom: "12%"
    }
  });
  // 调用饼状图函数
  setPieType("echarts-3", {
    backgroundColor: '#f1cdd4',
    // 图表标题
    title: {
      text: '2018年手机系统使用比重'
    },
    // 工具栏
    tooltip: {},
    // 数据源
    series: [{
      name: "访问来源",
      type: "pie",
      radius: [100, '75%'],
      data: [{
          name: 'Android',
          value: 3.9845
        },
        {
          name: 'iPhone',
          value: 2.5000
        },
        {
          name: 'Window Phone',
          value: 1.2346
        },
        {
          name: '其他',
          value: 0.5836
        }
      ],
      // 定义饼状样式
      itemStyle: {
        emphasis: {
          // 阴影大小
          shadowBlur: 60,
          // 阴影颜色
          shadowColor: '#0bc88c'
        }
      }
    }]
  });
  // 调用南丁格尔图函数
  setRoseType("echarts-4", {
    backgroundColor: '#c2bcda',
    title: {
      text: '生活消费比例',
      subtext: '纯属虚构',
    },
    series: [{
      name: '半径模式',
      type: 'pie',
      // 设圆的内半径和外半径
      radius: [50, "75%"],
      // radius: '75%',
      // roseType: 'radious',
      // 面积模式
      roseType: 'area',
      data: [
        { value: 2000, name: '饮食' },
        { value: 500, name: '交通' },
        { value: 1100, name: '购物' },
        { value: 780, name: '居家' },
        { value: 500, name: '娱乐' },
        { value: 400, name: '医疗' },
        { value: 2700, name: '金融' },
        { value: 720, name: '其他' }
      ]
    }]
  });
})

/* ********************************** */
/* 
实例功能函数定义部分
*/
/* ********************************** */
/* 
功能：折线图函数
参数：1.ident(图表容器id)；2.option（图表配置项）
*/
function setLine(ident, option) {
  var echarts1 = echarts.init($("#" + ident)[0]);
  echarts1.setOption(option);
}

/* 
功能：柱状图函数
参数：1.ident(图表容器id)；2.option（图表配置项）
*/
function setBar(ident, option) {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init($("#" + ident)[0]);
  // 加载数据前调用loading效果
  myChart.showLoading();
  // 使用刚指定的配置项和数据显示图表。
  setTimeout(function() {
    myChart.hideLoading();
    myChart.setOption(option);
  }, 1500);
}
/* 
功能：饼状图函数
参数：1.ident(图表容器id)；2.option（图表配置项）
*/
function setPieType(ident, option) {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init($("#" + ident)[0]);
  // 加载数据前调用loading效果
  myChart.showLoading();
  // 使用刚指定的配置项和数据显示图表。
  setTimeout(function() {
    myChart.hideLoading();
    myChart.setOption(option);
  }, 1500);
}
/* 
功能：南丁格尔图函数
参数：1.ident(图表容器id)；2.option（图表配置项）
*/
function setRoseType(ident, option) {
  // 基于准备好的dom，初始化echarts实例
  let myChart = echarts.init($("#" + ident)[0]);
  // 使用刚指定的配置项和数据显示图表。
  myChart.setOption(option);

}