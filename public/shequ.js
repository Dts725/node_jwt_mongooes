  var dom = document.getElementById("container");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '坐标轴刻度与标签对齐';



  option = {
    //   color: sqgzz.color,

      //标题
      title: szgc.title,
      legend: {
          // data: ['小学', '中学', '大专/中专', '本科', '硕士', '博士后及以上'],

      },
      tooltip: szgc.tooltip,
 

      //画几个图例
      grid: szgc.grid,

      //x轴设置
      xAxis: szgc.xAxis,
      yAxis: szgc.yAxis,
      dataZoom: szgc.dataZoom,

      //提示设置
      series: szgc.series,
  };;
  if (option && typeof option === "object") {
      myChart.setOption(option, true);
  }