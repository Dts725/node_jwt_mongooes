//双报告双报道数据
let sbgsbd
let dataAll = [
    ['小学', '初中', '高中', '中专或大专', '本科', '研究生','博士及以上'],
    ['班长', '三长', '副书记', '书记', '主任'],
    ['为老服务', '文艺体育', '社会工作', '宠物饲养', '医疗服务', '心理疏导', '社区调节', '教育咨询', '电脑技术','政策解读','环境保护','花草养护','法律维权','物业维修','理论研究','其他'],
    ['男', '女'],
    ['群众', '团员', '党员'],
]

let dataAnalysis = [
    [],
    [],
    [],
    [],
    [],
    [],
    [],
];
$.ajax({
    type : 'get',
    url: url + '/registed_party_member_analysis',
    success : function (res) {

       //年龄分析
        for (let el  in res.data.user.education) {
            dataAnalysis[0].push(res.data.user.education[el])
        }


        
        // 党龄分析
        for (let el in res.data.join_party_years) {
            dataAnalysis[2].push(res.data.join_party_years[el])
        }
     

        // 区域分析
        // for (let el  in res.data.user.education) {
        //     dataAnalysis[3].push(res.data.user.education[el])
        // }
     

        // 特长分析
        for (let el in res.data.speciality) {
            dataAnalysis[4].push(res.data.speciality[el])
        }
     

        // 男女比例信息
        for (let el  in res.data.user.education) {
            dataAnalysis[5].push(res.data.user.education[el])
        }
     

        // 政治面貌分析
        for (let el in res.data.property) {

        switch (el) {
            case 'is_incumbency':
                 dataAnalysis[6].push({

                    name: '在职党员',
                   value : res.data.property[el]
                 })
                break;
            case 'is_retire': 
           dataAnalysis[6].push({
               name :'退休党员',
               value: res.data.property[el]
           })
                break;
            case 'other':
                       dataAnalysis[6].push({
                          name : '其他',
                          value : res.data.property[el]
                       })
                break;
        
            default:
                break;
        }
           
        }
     
    
        sbgsbd = {

            color: ['#c23531', '#2f4554', '#61a0a8', '#d48265', '#91c7ae', '#749f83', '#ca8622', '#bda29a',
                '#6e7074', '#546570',
                '#c4ccd3'
            ],

            //标题
            title: [{

                    text: '学历分析',
                    x: '13%',
                    y: '4%',

                    textStyle: {
                        color: '#c23531',
                        textAlign: 'center',
                        fontSize: 28,


                    }
                },

                {
                    text: '党龄分析',
                    x: '40.5%',
                    y: '4%',

                    textStyle: {
                        color: '#2f4554',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                // {
                //     text: '区域分析',
                //     x: '55%',
                //     y: '4.5%',

                //     textStyle: {
                //         color: '#2f4554',

                //         textAlign: 'center',
                //         fontSize: 28,
                //     }
                // },
                {
                    text: '特长分析',
                    x: '48%',
                    y: '45%',
                    textStyle: {
                        color: '#61a0a8',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                {
                    text: '党员属性',
                    x: '84.5%',
                    y: '4%',
                    textStyle: {
                        color: '#d48265',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                {
                    text: '男女比例分析',
                    x: '61.5%', //位置
                    y: '4%',
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
                    width: '20%',
                    height: '25%',
                    top: '12%',
                    left: '5%',
                    containLabel: true
                },

                {
                    width: '90%',
                    height: '25%',
                    top: '55%',
                    left: '5%',
                    containLabel: true
                },

            ],

            //x轴设置
            xAxis: [{
                    gridIndex: 0,


                    type: 'category',
                    data: dataAll[0],
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },
                    axisLabel: {
                         rotate: 50,
                        interval: 0
                    },
                    nameGap: 20,
                    nameRotate: 45,
                    axisTick: {
                        alignWithLabel: true
                    }
                },
 
                {
                    gridIndex: 1,

                    type: 'category',
                    data: dataAll[2],
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },
                    axisLabel: {
                         rotate: 50,
                        interval: 0
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
                        name: '人'

                },
     
                {
                    gridIndex: 1,
                        name: '人'

                },
            ],

            //提示设置
            series: [
                
                
                {
                    name: '人',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,

                    //   barWidth: 20,
                    data: dataAnalysis[0]
                },
                
                {
                    name: '人',
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,

                    //   barWidth: 20,
                    data: dataAnalysis[4]
                },


               
                {
                    name: '男女比例',
                    type: 'pie',
                    radius: '15%',
                    center: ['68%', '22%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.sex.male,
                            name: '男'
                        },
                        {
                            value: res.data.sex.female,

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
                    name: '党员属性',
                    type: 'pie',
                    radius: '15%',
                    center: ['89%', '22%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: dataAnalysis[6],

                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                {
                    name: '党龄',
                    type: 'pie',
                    radius: '15%',
                    center: ['45%', '22%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: dataAnalysis[2][0],
                            name: '0-5年'
                        },
                        {
                            value: dataAnalysis[2][1],
                            name: '5-10年'
                        },
                        {
                            value: dataAnalysis[2][2],
                            name: '10-15年'
                        },
                        {
                            value: dataAnalysis[2][3],
                            name: '15-20年'
                        },
                        {
                            value: dataAnalysis[2][4],
                            name: '20-25年'
                        },
                        {
                            value: dataAnalysis[2][5],
                            name: '25-30年'
                        },
                        {
                            value: dataAnalysis[2][6],
                            name: '30-35年'
                        },
                        {
                            value: dataAnalysis[2][7],
                            name: '35-40年'
                        },
                        {
                            value: dataAnalysis[2][8],
                            name: '40-45年'
                        },
                        {
                            value: dataAnalysis[2][9],
                            name: '45年及以上'
                        },
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                // {
                //     name: '地区',
                //     type: 'pie',
                //     radius: '15%',
                //     center: ['57%', '22%'],
                //     tooltip: {
                //         trigger: 'item',
                //         formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                //     },
                //     data: [{
                //             value: res.data.area_type.local,
                //             name: '本区'
                //         },
                //         {
                //             value: res.data.area_type.outer,
                //             name: '外区'
                //         },
                //         {
                //             value: res.data.area_type.unknow,
                //             name: '未知'
                //         },

                //     ],
                //     itemStyle: {
                //         emphasis: {
                //             shadowBlur: 10,
                //             shadowOffsetX: 0,
                //             shadowColor: 'rgba(0, 0, 0, 0.5)'
                //         }
                //     }
                // },

            ]
        };
    }
})


//三长工程
let szgc,
    szAgeList = [],
    szSex = [],
    szEducation = [],
    szPolitical = [],
    szNameList = [],
    dataAllSzgcList = [],
    dataAllSzgc = [
        ['党小组长', '楼组长', '团队负责人', '妇女小组长', '居民小组长', '业委员会成员', '其他群众骨干'],
        ['安宁一', '北街', '沧二', '沧三', '电二', '电四', '电五', '电一', '东三', '东一', '凤凰景苑', '富仕', '高二', '高三', '好第坊', '合二', '合三', '合四', '合一', '河东', '鹤北三', '鹤北四', '鹤北一', '鹤庆二', '鹤庆一', '红六', '红七', '红三', '红四', '红五', '红旗', '华二', '华一', '假日景苑', '金平', '昆阳', '兰二', '兰一', '满庭春雅苑', '汽三', '汽一', '瑞丽海赋', '瑞丽', '新闵', '永南一', '紫藤'],
        ['20岁~25岁', '25岁~30岁', '30岁~35岁', '35岁~40岁', '40岁~45岁', '45岁~50岁', '50岁~55岁', '55岁~60岁', '60岁~65岁', '65岁~70岁', '70岁~75岁', '75岁~80岁', '80及岁以上'],
        ['男', '女'],
        ['群众', '团员', '党员'],
    ]
/**
 *[[党小组长], [楼组长], [村民小组长或联络员], [社区群众团队活动负责人],
  [妇女小组长], [居民小组长], [业委员会成员], [其他群众骨干]]
 */
$.ajax({
    url: url + '/three_work_analysis',
    type: 'get',
    success: function (res) {

        let agelist = ['20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50-55', '55-60', '60-65', '65-70', '70-75', '75-80', '80'],


            szAgeList = agelist.map((x => {
                return res.data.age[x]
            }))


        let duty = []
        for (let i in res.data.job) {
            duty.push(res.data.job[i])
        }

        for (let el in res.data.threework_project.education) {
            //学历分布
            szEducation.push(res.data.threework_project.education[el])
        }
        console.time('测试')
        let cityName = []
        let job = res.data.threework_distribution
        for (let el in job) {

            //个居民区三张数量
            let data = []
            for (let j in job[el]) {

                switch (j) {
                    case 'building_team_leader':
                        data[0] = job[el][j]
                        break;
                    case 'community_member':
                        data[1] = job[el][j]
                        break;
                    case 'femal_team_leader':
                        data[2] = job[el][j]
                        break;
                    case 'other_members':
                        data[3] = job[el][j]
                        break;
                    case 'party_team_leader':
                        data[4] = job[el][j]
                        break;
                    case 'resident_team_leader':
                        data[5] = job[el][j]
                        break;
                    case 'team_leader':
                        data[6] = job[el][j]
                        break;
                    default:
                        break;
                }


            }
            cityName.push(el)
            dataAllSzgcList.push(data);
        }
        let list = [
            [],
            [],
            [],
            [],
            [],
            [],
            []
        ]
        dataAllSzgcList.forEach((el) => {
            el.forEach((el, index) => {

                switch (index) {
                    case 0:
                        list[0].push(el)
                        break;
                    case 1:
                        list[1].push(el)

                        break;
                    case 2:
                        list[2].push(el)

                        break;
                    case 3:
                        list[3].push(el)

                        break;
                    case 4:
                        list[4].push(el)

                        break;
                    case 5:
                        list[5].push(el)

                        break;
                    case 6:
                        list[6].push(el)

                        break;

                    default:
                        break;
                }
            })

        })


        //性别分布
        szSex = (res.data.threework_project.sex)
        // 政治面貌
        szPolitical = (res.data.threework_project.political)
        let nameList = ['楼组长', '业委员会成员', '妇女小组长', '其他群众骨干', '党小组长', '居民小组长', '社区群众团队活动负责人'] //类别

        szgc = {
            //标题
            title: [{

                    text: '职务分析',
                    x: '12%',
                    y: '4%',

                    textStyle: {
                        color: '#c23531',
                        textAlign: 'center',
                        fontSize: 28,


                    }
                },
                {
                    text: '学历分析',
                    x: '55%',
                    y: '4%',

                    textStyle: {
                        color: '#2f4554',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                {
                    text: '政治面貌分析',
                    x: '82.8%',
                    y: '4%',

                    textStyle: {
                        color: '#2f4554',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                {
                    text: '年龄结构分析',
                    x: '33%',
                    y: '4%',
                    textStyle: {
                        color: '#61a0a8',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                {
                    text: '各居民区三长数情况统计',
                    x: '45%',
                    y: '46%',
                    textStyle: {
                        color: '#61a0a8',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },

                {
                    text: '男女比例分析',
                    x: '68%', //位置
                    y: '4%',
                    textStyle: {
                        color: '#749f83',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
            ],
            legend: {



            },
            tooltip: {
                trigger: 'axis',
                axisPointer: { // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                }
            },

            //画几个图例
            grid: [{
                    width: '18%',
                    height: '25%',
                    top: '12%',
                    left: '5%',
                    zlevel: 0,
                    containLabel: true
                },
                {
                    width: '18%',
                    height: '25%',
                    top: '12%',
                    left: '28%',
                    zlevel: 1,

                    containLabel: true
                },
                {
                    width: '100%',
                    height: '40%',
                    top: '55%',
                    left: '0%',
                    zlevel: 2,

                    containLabel: true
                },

            ],
            dataZoom: [{
                    show: true,
                    start: 94,
                    end: 100
                },
                {
                    type: 'inside',
                    start: 94,
                    end: 100
                },
                {
                    show: true,
                    yAxisIndex: 2,
                    filterMode: 'empty',
                    width: 30,
                    height: '80%',
                    showDataShadow: false,
                    left: '93%'
                }
            ],

            //x轴设置
            xAxis: [{
                    gridIndex: 0,
                    zlevel: 0,

                    type: 'category',
                    data: dataAllSzgc[0],
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 50,

                    },
                    nameGap: 20,
                    nameRotate: 45,
                    axisTick: {
                        alignWithLabel: true
                    }
                },

                {
                    gridIndex: 1,
                    zlevel: 1,

                    type: 'category',
                    data: dataAllSzgc[2],
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 50,
                    },
                    nameGap: 20,
                    nameRotate: 45,
                    axisTick: {
                        alignWithLabel: true
                    }
                },
                {
                    gridIndex: 2,
                    zlevel: 2,

                    type: 'category',
                    data: cityName,
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },
                    axisLabel: {
                        interval: 0,
                        rotate: 50,
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
                        name: '人'
                },

                {
                    gridIndex: 1,
                        name: '人'
                },
                {
                    gridIndex: 2,
                        name: '人'
                },

            ],
            tooltip: {
                trigger: 'axis',

                // formatter: "{a} <br/>{b} : {c}人"
            },
            //提示设置
            series: [{
                    name: '人',
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,
                    zlevel: 0,

                    //   barWidth: '60%',
                    data: duty
                },

                {
                    name: '人',
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    //   barWidth: '60%',
                    data: szAgeList
                },

                //安宁一
                {
                    zlevel: 1,

                    name: nameList[0],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[0]
                },
                {
                    name: nameList[1],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[1]
                },
                {
                    name: nameList[2],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[2]
                },
                {
                    name: nameList[3],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[3]
                },
                {
                    name: nameList[4],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[4]
                },
                {
                    name: nameList[5],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[5]
                },
                {
                    name: nameList[6],
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 2,
                    yAxisIndex: 2,
                    // stack: areaList[0],
                    //   barWidth: '60%',
                    data: list[6]
                },

                {
                    zlevel: 2,

                    name: '男女比例',
                    type: 'pie',
                    radius: '15%',
                    center: ['73%', '25%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: szSex.male,
                            name: '男'
                        },
                        {
                            value: szSex.female,
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
                    id: 'stu',
                    name: '学历分布',
                    type: 'pie',
                    radius: '15%',
                    center: ['58%', '25%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: 3334,
                            name: '初中及以下'
                        },
                        {
                            value: 649,
                            name: '高中'
                        },
                        {
                            value: 458,
                            name: '中专或大专'
                        },
                        {
                            value: 124,
                            name: '本科'
                        },
                        {
                            value: 7,
                            name: '研究生及以上'
                        },
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
                    radius: '15%',
                    center: ['86%', '25%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: szPolitical.jiusan_society,
                            name: '九三学社社员'
                        },
                        {
                            value: szPolitical.democratic_league,
                            name: '民盟盟员'
                        },
                        {
                            value: szPolitical.masses,
                            name: '群众'
                        },
                        {
                            value: szPolitical.communist,
                            name: '中共党员'
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
        };
    }
})

//社区工作者
let sqgzz
$.ajax({
    tyep: "get",
    url: url + '/community_worker_analysis',
    success: function (res) {

        let sqgzzAge = ['20-25', '25-30', '30-35', '35-40', '40-45', '45-50', '50']
        sqgzzAge = sqgzzAge.map((x => {
            return res.data.age[x]
        }))
        let job= []
           
        //现任职务分析数据
        for (let k in res.data.job) {
            job.push(res.data.job[k])
        }
        let dataAllSqgzz = [
            ['筹备组组长助理', '筹备组副组长', '副站长', '站长助理', '居委主任', '居委副主任', '居委干部', '副书记'],
            ['班长', '三长', '副书记', '书记', '主任'],
            ['20岁~25岁', '25岁~30岁', '25岁~30岁', '35岁~40岁', '40岁~45岁', '45岁~50岁', '50岁及以上'],
            ['男', '女'],
            ['群众', '团员', '党员'],
        ];


        sqgzz = {
            //标题
            title: [{

                    text: '现任职务分析',
                    x: '20%',
                    y: '5%',

                    textStyle: {
                        color: '#c23531',
                        textAlign: 'center',
                        fontSize: 28,


                    }
                },
                {
                    text: '年龄结构分析',
                    x: '22%',
                    y: '53%',
                    textStyle: {
                        color: '#61a0a8',

                        textAlign: 'center',
                        fontSize: 28,
                    }
                },
                {
                    text: '学历分析',
                    x: '57.2%',
                    y: '6%',
                    textStyle: {
                        color: '#61a0a8',

                        textAlign: 'center',
                        fontSize: 20,
                    }
                },
                {
                    text: '专技职称结构分析',
                    x: '56.5%',
                    y: '33%',
                    textStyle: {
                        color: '#61a0a8',

                        textAlign: 'center',
                        fontSize: 20,
                    }
                },
                {
                    text: '政治面貌分析',
                    x: '79.8%',
                    y: '61%',
                    textStyle: {
                        color: '#d48265',

                        textAlign: 'center',
                        fontSize: 20,
                    }
                },
                {
                    text: '现任职级分析',
                    x: '79.8%',
                    y: '33%',
                    textStyle: {
                        color: '#d48265',

                        textAlign: 'center',
                        fontSize: 20,
                    }
                },
                {
                    text: '进入形式分析',
                    x: '79.8%',
                    y: '6%',
                    textStyle: {
                        color: '#d48265',

                        textAlign: 'center',
                        fontSize: 20,
                    }
                },
                {
                    text: '男女比例分析',
                    x: '56.5%', //位置
                    y: '61%',
                    textStyle: {
                        color: '#749f83',

                        textAlign: 'center',
                        fontSize: 20,
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
                    top: '15%',
                    left: '5%',
                    containLabel: true
                },
                {
                    width: '35%',
                    height: '25%',
                    top: '62%',
                    left: '5%',
                    containLabel: true
                },


            ],

            //x轴设置
            xAxis: [{
                    gridIndex: 0,


                    type: 'category',
                    data: dataAllSqgzz[0],
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },

                    nameGap: 20,
                    nameRotate: 45,
                    axisTick: {
                        alignWithLabel: true,
                        interval: 0
                    },
                    axisLabel: {
                        rotate: 50,
                        interval: 0
                    }

                },
                {
                    gridIndex: 1,
                    type: 'category',
                    data: dataAllSqgzz[2],
                    nameTextStyle: {
                        color: '#44f',
                        fontSize: 28,
                    },

                    nameGap: 20,
                    nameRotate: 45,
                    axisTick: {
                        alignWithLabel: true
                    },
                    axisLabel: {
                        rotate: 50,
                        interval: 0
                    }
                },
            ],
            yAxis: [{
                    gridIndex: 0,
                    name: '人'
                },

                {
                    gridIndex: 1,
                    name: '人'
                },
            ],

            //提示设置
            series: [{
                    name: '人', //现任人物分析
                    type: 'bar',
                    xAxisIndex: 0,
                    yAxisIndex: 0,

                    //   barWidth: '60%',
                    data: job
                },

                {
                    name: '人', //年龄分析
                    label: {
                        color: "#e41",
                    },
                    type: 'bar',
                    xAxisIndex: 1,
                    yAxisIndex: 1,
                    //   barWidth: '60%',
                    data: sqgzzAge
                },
                {
                    name: '男女比例',
                    type: 'pie',
                    radius: '15%',
                    center: ['60%', '76%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.sex.male,
                            name: '男'
                        },
                        {
                            value: res.data.sex.female,
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
                    name: '专技职称结构分析 ',
                    type: 'pie',
                    radius: '15%',
                    center: ['60%', '48%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.technical_title.none,
                            name: '无'
                        },
                        {
                            value: res.data.technical_title.deputy_social_work,
                            name: '助理社工师'
                        },
                        {
                     value: res.data.technical_title.social_work,
                            name: '社工师'
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
                    name: '进入形式',
                    type: 'pie',
                    radius: '15%',
                    center: ['83%', '22%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.admission_type.exam,
                            name: '考任'
                        },
                        {
                            value: res.data.admission_type.election,
                            name: '选任'
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
                    name: '现任职级',
                    type: 'pie',
                    radius: '15%',
                    center: ['83%', '48%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.job_level.charger,
                            name: '负责人'
                        },
                        {
                            value: res.data.job_level.director,

                            name: '主管'
                        },
                        {
                            value: res.data.job_level.officer,

                            name: '工作人员'
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
                    name: '最高学历',
                    type: 'pie',
                    radius: '15%',
                    center: ['60%', '22%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.education.undergraduate,
                            name: '本科'
                        },
                        {
                            value: res.data.education.college,
                            name: '大专'
                        },
                        {
                            value: res.data.education.senior_high,

                            name: '高中'
                        },
                        {
                            value: res.data.education.technical,
                            name: '技校'
                        },
                        {
                            value: res.data.education.special_secondary,
                            name: '中专'
                        },
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
                    radius: '15%',
                    center: ['83%', '76%'],
                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c}人 ({d}%)"
                    },
                    data: [{
                            value: res.data.political.league_member,
                            name: '共青团员'
                        },
                        {
                            value: res.data.political.masses,
                            name: '群众'
                        },
                        {
                            value: res.data.political.probationary_member,
                            name: '预备党员'
                        },
                        {
                            value: res.data.political.communist,

                            name: '中共党员'
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
        };
    }
})