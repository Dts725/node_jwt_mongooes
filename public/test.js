  var dom = document.getElementById("container");
  var myChart = echarts.init(dom);
  var app = {};
  option = null;
  app.title = '坐标轴刻度与标签对齐';
  let dataAllSzgc = [
      ['小学', '中学', '大专/中专', '本科', '硕士', '博士后及以上'],
      ['班长', '三长', '副书记', '书记', '主任'],
      ['20岁~25岁', '25岁~30岁', '25岁~30岁', '35岁~40岁', '40岁~45岁', '45岁~50岁', '50岁~55岁', '55岁~60岁', '60岁以上'],
      ['男', '女'],
      ['群众', '团员', '党员'],
  ]


  option = {
      
      //标题
      title: [{

              text: '学历',
              x: '22%',
              y : '4%',

              textStyle: {
                  color: '#c23531',
                  textAlign: 'center',
                  fontSize: 28,


              }
          },
          {
              text: '职务',
              x: '72%',
              y: '4%',

              textStyle: {
                  color: '#2f4554',

                  textAlign: 'center',
                  fontSize: 28,
              }
          },
          {
              text: '年龄',
              x: '22%',
              y: '47%',
              textStyle: {
                  color: '#61a0a8',

                  textAlign: 'center',
                  fontSize: 28,
              }
          },
          {
              text: '政治面貌',
              x: '80%',
              y: '47%',
              textStyle: {
                  color: '#d48265',

                  textAlign: 'center',
                  fontSize: 28,
              }
          },
          {
              text: '男女比例',
              x: '57%', //位置
              y: '47%',
              textStyle: {
                  color: '#749f83',

                  textAlign: 'center',
                  fontSize: 28,
              }
          },
      ],
      legend: {
          // data: ['小学', '中学', '大专/中专', '本科', '硕士', '博士后及以上'],

      },
      tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
              type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
      },

      //画几个图例
      grid: [{
              width: '35%',
              height: '25%',
              top: '12%',
              left : '5%',
              containLabel: true
          },
          {
              width: '35%',
              height: '25%',
              left: '55%',
              top : '12%',
              
              containLabel: true
          },
          {
              width: '35%',
              height: '25%',
              top: '55%',
              left: '5%',
              containLabel: true
          },
         
      ],

      //x轴设置
      xAxis: [{
              gridIndex: 0,
              min: 0,
              max: 5,
              name: '学历',
              type: 'category',
              data: dataAllSzgc[0],
              nameTextStyle: {
                  color: '#44f',
                  fontSize: 28,
              },
              nameGap: 20,
              nameRotate: 45,
              axisTick: {
                  alignWithLabel: true
              }
          },
          {
              gridIndex: 1,
              min: 0,
              max: 4,
              name: '职务',
              type: 'category',
              data: dataAllSzgc[1],
              nameTextStyle: {
                  color: '#44f',
                  fontSize: 28,
              },
              nameGap: 20,
              nameRotate: 45,
              axisTick: {
                  alignWithLabel: true
              }
          },
          {
              gridIndex: 2,
              min: 0,
              max: 8,
              name: '年龄',
              type: 'category',
              data: dataAllSzgc[2],
              nameTextStyle: {
                  color: '#44f',
                  fontSize: 28,
              },
              nameGap: 20,
              nameRotate: 45,
              axisTick: {
                  alignWithLabel: true
              }
          },
      ],
      yAxis: [{
              gridIndex: 0,
              min: 0,
              max: 400
          },
          {
              gridIndex: 1,
              min: 0,
              max: 400
          },
          {
              gridIndex: 2,
              min: 0,
              max: 400
          },
      ],

      //提示设置
      series: [{
              name: '学历',
              type: 'bar',
              xAxisIndex: 0,
              yAxisIndex: 0,

              //   barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330]
          },
          {
              name: '职务',
              type: 'bar',
              xAxisIndex: 1,
              yAxisIndex: 1,
              //   barWidth: '60%',
              data: [10, 52, 200, 334, 390]
          },
          {
              name: '年龄',
              label: {
                  color: "#e41",
              },
              type: 'bar',
              xAxisIndex: 2,
              yAxisIndex: 2,
              //   barWidth: '60%',
              data: [10, 52, 200, 334, 390, 330, 50, 230, 120]
          },
          {
              name: '男女比例',
              type: 'pie',
              radius: '28%',
              center: ['60%', '68%'],
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              data: [{
                      value: 120,
                      name: '男'
                  },
                  {
                      value: 158,
                      name: '女'
                  }
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          },

          {
              name: '政治面貌',
              type: 'pie',
              radius: '28%',
              center: ['83%', '68%'],
              tooltip: {
                  trigger: 'item',
                  formatter: "{a} <br/>{b} : {c} ({d}%)"
              },
              data: [{
                      value: 10,
                      name: '班长'
                  },
                  {
                      value: 28,
                      name: '三长'
                  },
                  {
                      value: 18,
                      name: '书记'
                  },
                  {
                      value: 36,
                      name: '副书记'
                  }
              ],
              itemStyle: {
                  emphasis: {
                      shadowBlur: 10,
                      shadowOffsetX: 0,
                      shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
              }
          }

      ]
  };;
  if (option && typeof option === "object") {
      myChart.setOption(option, true);
  }