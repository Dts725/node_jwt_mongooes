$(document).ready(function () {
  if (loginType === 2) {
    $.ajax({
      url: url + "/secretary_show_party_members",
      type: "get",
      success: function (res) {
        let str = res.data.splice(0, 45);

        let strs = "";
        let num = Math.floor(str.length / 12);

        for (let i = 0; i < num; i++) {
          if (i > 5) {
            strs += `<p style="text-align:justify;">${str.splice(
              0,
              str.length
            )}</p>`;
            return;
          }
          strs += `<p style="text-align:justify;">${str.splice(0, 12)}</p>`;
          if (i === Math.ceil(str.length / 10)) {
            strs += `<p>${str.splice(0, str.length)}</p>`;
          }
        }
        $(".dwgk-dylp").append(strs);
      }
    });
  }
  $(function () {
    //班长工程
    // $(".lhdw").on("click", ".lhdw_a", function (e) {

    //     // let data = communityWorker.slice(0, 1)[0];
    //     // data.imgUrl = 'images/班长-顾倩倩.jpg';
    //     cardList(secretary,'班工程');
    //     // easyAlert.init(data);
    //     // branchCard(['照片', '姓名', '职务', '联系方式', '工作职责'], secretary, '顾倩倩', '班长工程', false);
    //     // $(".layui-layer-content").on("click", "table tr", function (e) {
    //     //     easyAlert.init(secretary[$(this).index()]);
    //     // });
    // });
    //社区工作者
    $(".lhdw").on("click", ".lhdw_b", function (e) {
      if (loginType === 2) {
        communityWoker("/admin/community_worker?paginate=20");
        return;
      }
      canvasCreste("社区工作者", "95%", "90%");
      //详情
      // $(".layui-layer-content").on("click", "table tr", function (e) {
      //     easyAlert.init(communityWorker[$(this).index()]);
      // });
    });
    //领航载体
    $(".tabs-box-con").on("click", ".lhzt", function (e) {
      // window.location.href = "index.html?num=" + 5;
      mySwiper.slideTo(2, 500, false);
      liCallBack(5);
    });
    //班长工程
    $(".lhdw").on("click", ".lhdw_a", function (e) {
      // window.location.href = "index.html?num=" + 3;

      if (loginType === 2) {
        bzWokerOpen("/secretary?paginate=20");
        return;
      }
      mySwiper.slideTo(2, 500, false);
      liCallBack(6);
    });
    //三长工程
    $(".lhdw").on("click", ".lhdw_c", function (e) {
      if (loginType === 2) {
        mySwiper.slideTo(2, 500, false);
        liCallBack(3);
      } else {
        canvasSanzhang("三长工程", "95%", "90%");
      }
    });

    //领航核心

    $(".lhhx_a").on("click", function (e) {
      // window.location.href = "index.html?num=" + 3;
      mySwiper.slideTo(2, 500, false);
      liCallBack(0);
    });

    //双报道双报告mhdw_b
    $(".mhdw_b").on("click", function (e) {
      // window.location.href = "index.html?num=" + 3;
      if (loginType === 2) {
        mySwiper.slideTo(3, 500, false);
        liCallBack(2);
        return;
      }
      canvarsSbgsbd("双报道双报告", "95%", "90%");
    });

    //区域化单位
    $(".mhdw_a").on("click", function (e) {
      // window.location.href = "index.html?num=" + 3;
      mySwiper.slideTo(2, 500, false);
      liCallBack(5);
    });

    //项目清单
    $(".mhdw_c").on("click", function (e) {
      layer.closeAll();
      let str;
      //region_unit_project_alone
      if (loginType === 2) {
        let url = locallUrl + "/admin/region_unit_community_proj_alone";
        str = `
                <div class="item-region flex-center">

                <ul class="flex-around">
                    <li onclick = "projectListItem('${url}')"><img src="./images/i01.png"/> <p>项目清单</p></li>
                   
                </ul>
               
                
                </div>`;
      } else {
        str = `
                <div class="item-region flex-center">

                <ul class="flex-around">
                    <li onclick = "projectList('/region_unit_project_alone')"><img src="./images/i01.png"/> <p>项目清单</p></li>
                    <li onclick = "projectListRegion('/region_unit_require_alone')"><img src="./images/i02.png"/><p>需求清单</p></li>
                    <li onclick = "projectListResouse('/region_unit_resource_alone')"><img src="./images/i03.png"/> <p>资源清单</p></li>
                </ul>
               
                
                </div>`;
      }

      layer.open({
        type: 1,
        title: false,
        area: ["600px", "300px"],

        content: str,
        zIndex: layer.zIndex,
        shadeClose: true,
        //      offset: ['300px', '1000px'],
        // btn: ['确定'],
        yes: function (index, layero) {
          layer.close(index);
        },
        cancel: function () {
          //右上角关闭回调
          //return false 开启该代码可禁止点击该按钮关闭
        },
        success: function (layero) {
          layer.setTop(layero); //窗口置顶
        }
      });
      // projectList()
    });

    //党员亮牌
    $(".dwgk-dylp").on("click", "p", function (e) {
      // window.location.href = "index.html?num=" + 1;
      mySwiper.slideTo(2, 500, false);
      liCallBack(1);
    });
    //支部亮牌
    $(".dwgk-zblp").on("click", "img", function (e) {
      console.log(e)
      let data = leader[Number(e.currentTarget.dataset.indexs)];
      let str = `<div class="bgz-map-parent" style="min-height:500px;"> 
    <div class="chid1">
        <ul style="height : 82%;">
            <li> <img style = "width:162px;"
            src = "${imgUrl + data.image}"
            alt = "${data.name}"/> </li>
            <li style="display: flex;
                        flex-flow: column;
                        justify-content: center;
                        align-items: center;">
                <img style="height:30px;" src="./images/bgz_phone.png" alt="">
                  <span>${data.phone}</span>
            </li>
   
        </ul>
    </div>
    <div class="child2" style="height:100%;">
          <div>
            <p class="color-99 fw700" style="line-height:2em;">姓名</p>
            <p class="color-33 fw700">${data.name}</p>
        </div>
          <div>
            <p class="color-99 fw700" style="line-height:2em;">职务</p>
            <p class="color-33 fw700">${data.job}</p>
        </div>
          <div>
            <p class="color-99 fw700" style="line-height:2em;">职责</p>
            <p class="color-33 fw700">${data.duty}</p>
        </div>

    </div>
</div>
`;

      openWindowsNewCreat(str, data.community_name, 810);

      // easyAlert.init(leader[$(this).index()]);
      // debugger
      // console.dir(leader[$(this).index()])
      // console.dir(leader[$(this)])
      // console.dir(leader)
      // console.dir(e)
    });
    //支部制度
    $(".dwgk-zbzd").on("click", "p", function (e) {
      openWindows(
        branchSystem[$(this).index()].content,
        branchSystem[$(this).index()].title,
        1000
      );

      window.document.querySelector(".layui-layer-content").style.display =
        "block";
    });
  });
});

//创建canvas 创建图标

function canvasCreste(tittle, width, height) {
  let str = ' <div id="container" style="height: 100%;width : 100%;"></div>';
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      tittle +
      "</h3>" +
      "</p>",
    area: [width, height],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },

    success: function (layero) {
      layer.setTop(layero); //窗口置顶
      layer.ready(function () {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        app.title = "坐标轴刻度与标签对齐";

        option = {
          //标题
          title: sqgzz.title,
          //   legend: sqgzz.legend,
          tooltip: sqgzz.tooltip,

          //画几个图例
          grid: sqgzz.grid,

          //x轴设置
          xAxis: sqgzz.xAxis,
          yAxis: sqgzz.yAxis,
          //提示设置
          series: sqgzz.series
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    }
  });
}
//三长工程

function canvasSanzhang(tittle, width, height) {
  let str = ' <div id="container" style="height: 100%;width : 100%;"></div>';
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #444;font-weight: bold;">' +
      tittle +
      "</h3>" +
      "</p>",
    area: [width, height],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },

    success: function (layero) {
      layer.setTop(layero); //窗口置顶
      layer.ready(function () {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        app.title = "坐标轴刻度与标签对齐";
        option = {
          // legend: szgc.legend,
          //标题
          title: szgc.title,

          tooltip: szgc.tooltip,

          //画几个图例
          grid: szgc.grid,

          //x轴设置
          xAxis: szgc.xAxis,
          yAxis: szgc.yAxis,
          //提示设置
          series: szgc.series
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    }
  });
}

//双报告双报道

function canvarsSbgsbd(tittle, width, height) {
  let str = ' <div id="container" style="height: 100%;width : 100%;"></div>';
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      tittle +
      "</h3>" +
      "</p>",
    area: [width, height],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },

    success: function (layero) {
      layer.setTop(layero); //窗口置顶
      layer.ready(function () {
        var dom = document.getElementById("container");
        var myChart = echarts.init(dom);
        var app = {};
        option = null;
        app.title = "坐标轴刻度与标签对齐";

        option = {
          color: sbgsbd.color,

          //标题
          title: sbgsbd.title,
          //  legend: {
          //      // data: ['小学', '中学', '大专/中专', '本科', '硕士', '博士后及以上'],

          //  },
          tooltip: sbgsbd.tooltip,

          //画几个图例
          grid: sbgsbd.grid,

          //x轴设置
          xAxis: sbgsbd.xAxis,
          yAxis: sbgsbd.yAxis,

          //提示设置
          series: sbgsbd.series
        };
        if (option && typeof option === "object") {
          myChart.setOption(option, true);
        }
      });
    }
  });
}

//支部亮牌 let arr = ['照片', '姓名', '职务', '联系方式', '工作职责', '格言']; branchCard(arr,leader,'顾倩倩', title = '支部亮牌');
function branchCard(head, data, name, title = "支部亮牌", isInfo = true) {
  let table =
    '<table class="layui-table SheQuGongZuoZhe" id="SheQuGongZuoZhe"  lay-even lay-skin="line" style="table-layout: fixed;">' +
    "<colgroup>" +
    "<col width=" +
    150 +
    ">" +
    "<col  width=" +
    150 +
    ">" +
    "<col  width=" +
    150 +
    ">" +
    "<col  width=" +
    300 +
    ">" +
    "</colgroup>";
  let thead = "";
  let tbody = "";
  console.log(data);
  data.forEach((element, i) => {
    if (i < head.length) thead += "<th>" + head[i] + "</th>";
    if (isInfo) {
      // if (element.name == name) {
      //     tbody = '<td>' + element.imgUrl + '</td>' +
      //         '<td>' + element.name + '</td><td>' + element.job + '</td><td>' + element.phone + '</td>' +
      //         ' <td>' + element.duty + '</td> <td>' + element.motto + '</td>';
      // }
    } else {
      //有数据了更改 images/班长-顾倩倩.jpg 为 element.image
      // tbody += '<tr style="cursor:pointer;" leaderName=' + element.name + '>' + '<td><img src ='+'images/班长-顾倩倩.jpg'+'></td>'
      //     +'<td>' + element.name + '</td><td>' + element.job + '</td><td>' + element.phone + '</td>' +
      //     ' <td style="width:200px;">' + element.duty + '</td>' + '<td style="color:#007fff;">' + '详情' + '</td></tr>';
    }

    if (head.length === 5) {
      tbody +=
        '<tr style="cursor:pointer;" leaderName=' +
        element.name +
        ">" +
        "<td><img src =" +
        "images/班长-顾倩倩.jpg" +
        ' style="width:45px;"></td>' +
        "<td>" +
        element.name +
        "</td><td>" +
        element.job +
        "</td><td>" +
        element.phone +
        "</td>" +
        ' <td style="width:200px;">' +
        element.duty +
        "</td>" +
        '<td style="color:#007fff;">' +
        "详情" +
        "</td></tr>";
    }

    if (head.length === 4) {
      tbody +=
        '<tr style="cursor:pointer;" leaderName=' +
        element.name +
        ">" +
        "<td>" +
        element.name +
        "</td><td>" +
        element.job +
        "</td><td>" +
        element.phone +
        "</td>" +
        ' <td style="width:200px;">' +
        element.duty +
        "</td>" +
        '<td style="color:#007fff;">' +
        "详情" +
        "</td></tr>";
    }
  });

  tbody = "<tbody>" + tbody + "</tbody ></table> ";
  if (isInfo) thead = "<thead>" + thead + "</thead>";
  else thead = "<thead>" + thead + "<th>操作</th>" + "</thead>";
  let str = "<div>" + table + thead + tbody + "</div>";
  openWindows(str, title, 1200);
}

//打开弹窗
function openWindows(con, title, width) {
  let wdh = 1100;
  if (width.typeOf() === "Number") {
    wdh = width + "px";
  } else {
    wdh = width;
  }

  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      title +
      "</h3>" +
      "</p>",
    area: wdh,
    content: con,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

//打开弹窗
function openWindowsNewCreat(con, title, width, height) {
  if (height) {
    wdh = [width + "px", height + "px"];
  } else {
    wdh = width + "px";
  }

  layer.open({
    type: 1,
    title: false,
    area: wdh,
    content: con,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    // btn: ['确定'],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

//党组织
function cardList(data) {
  //班长

  let abstract = data.name;
  if (data.is_general_branch == 1 && data.establishment_date) {
    abstract += "党总支部成立于" + data.establishment_date.substr(0, 10);
  } else {
    if (data.establishment_date) {
      abstract += "党支部成立于" + data.establishment_date.substr(0, 10);
    }
  }

  if (!data.showcase_img) {
    data.showcase_img = "./images/photo2.png";
  } else {
    // data.showcase_img = "//file.shyunhua.com/" + data.showcase_img;
  }
  if (!data.qrcode) {
    data.qrcode = "./images/qcard.png";
  } else {
    // data.qrcode = "//file.shyunhua.com/" + data.qrcode;
  }

  //标注地图跳动点儿
  setAnimation(data.address, data, arrField, 0, 0, "tr", "map");
  window.sessionStorage.setItem("dzz", JSON.stringify(data));

  let strs = `<div class="bgz-map-parent h100" style="height:100%">
        <div class="chid1">
            <ul style ="height:85%;">
  
                <li><img style="max-width:256px;" st src="//file.shyunhua.com/${
                  data.showcase_img
                }" alt=""></li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/bgz_phone.png" alt="">
                    <span>${data.phone}</span>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/mpa_bgz.png" alt="">
                    <span>${data.address}</span>
                </li>
                <li>
                    <img style="width:162px;" src="//file.shyunhua.com/${data.qrcode}" alt="">
                </li>
            </ul>
        </div>
        <div class="child2">
            <div>
                <p class="color-99 fw700">党组织名称</p>
                <p class="color-33 fw700">${data.name}</p>
            </div>
                 <div>
                <p class="color-99 fw700">简介</p>
                <p class="color-33 fw700">${data.intro}</p>
            </div>
                 <div>
<p class="color-33 fw700"><span class="color-99 fw700" style="width :6em; letter-spacing:0.25em;">成立日期:</span><span style="margin-left: 1em;">${
    data.establishment_date == null ? "" : data.establishment_date.substr(0, 10)
  }</span></p>
<p class="color-33 fw700"><span class="color-99 fw700" style="width :6em;">党组织领域:</span><span style="margin-left: 1em;"></span>${
    data.industry
  }</span></p>
            </div>
            <div>
            </div>

            <div class="center">
                <ul>
                    <li>
                        <p>书记名</p>
                        <p>联系人</p>
                        <p class='hid'>党员数量</p>

                    </li>
                    <li>
                        <p>${data.secretary}</p>
                        <p>${data.linkman}</p>
                        <p class='hid'>${data.member_count}</p>

                    </li>
                </ul>
            </div>
            <div class="color-99 fw700 hid" ><p>组织生活开展情况</p>
            <div class="flex-space-between">
                <div class="bottom-party quhu_flex-center">
                <h2 class="fw700" style="color:#333;">三会一课</h2>
                <a class="fw700" onclick ="projectListSh(${0})" href="JavaScript:;"> ${
    data.orglife_count
  }次</a>
                 </div>
                <div class="bottom-party quhu_flex-center">
                <h2 class="fw700"  style="color:#333;">主题党日</h2>
                <a class="fw700" onclick ="projectListSh(${1})" href="JavaScript:;"> ${
    data.thematic_party_day_count
  }次</a>
                 </div>
            </div>
            </div>
        </div>
    </div>`;

  // let dirtyStr = `

  // <div class="">
  //     <div class="chid1">
  //         <ul style="height : 82%;">
  //             <li><img style="width:162px;" src="${data.showcase_img}" alt=""></li>
  //             <li style="display: flex;
  //                         flex-flow: column;
  //                         justify-content: center;
  //                         align-items: center;">
  //                 <img style="height:30px;" src="./images/bgz_phone.png" alt="">
  //                   <span>${data.phone}</span>
  //             </li>
  //             <li style="display: flex;
  //                         flex-flow: column;
  //                         justify-content: center;
  //                         align-items: center;">
  //                 <img style="height:30px;" src="./images/mpa_bgz.png" alt="">
  //                  <span>${data.address}</span>
  //             </li>
  //         </ul>
  //     </div>
  //     <div class="child2">
  //           <div>
  //             <p class="color-99 fw700">党组织名称</p>
  //             <p class="color-33 fw700">${data.name}</p>
  //         </div>
  //         <div class="center" style="height:22%;">
  //             <ul>
  //                 <li>
  //                     <p>书记名</p>
  //                     <p>联系人</p>
  //                     <p>党员数量</p>

  //                 </li>
  //                 <li>
  //                     <p>${data.secretary}</p>
  //                     <p>${data.linkman}</p>
  //                     <p>${data.member_count}</p>

  //                 </li>
  //             </ul>
  //         </div>

  //         <div class="flex-around">
  //             <div>
  //                 <p class="color-99 fw700">组织生活开展情况</p>

  //                  <span class="fw700" style="color:#333;">三会一课<a class="fw700" onclick ="projectListSh(${0})" href="JavaScript:;"> ${data.orglife_count}次</a></span>
  //             </div>
  //                  <img style="width:162px;" src="${data.qrcode}" alt="">
  //         </div>

  //     </div>
  // </div>
  // `
  openWindowsNewCreat(strs, data.community_name, 900, 720);
}

//需求清单
function projectList(tolUrl = "/region_unit_project_alone") {
  layer.closeAll();
  let str = `<div style="width: 100%; padding:40px 20px 20px 20px;">

        <ul class="party-mpdule">
            <li class="w5">序号</li>
            <li class="w20">项目名称</li>
            <li class="w40">项目内容</li>
            <li class="w20">提供单位</li>
            <li class="w15">认领单位</li>`;
  let middleStr = "";
  let strEnd = `</ul>`;

  let last = `</div>`;
  let lastUrl = tolUrl.substr(0, 4) === "http" ? tolUrl : url + tolUrl;
  let creatPage;
  $.ajax({
    url: lastUrl,
    type: "get",
    async: false,
    success: function (res) {
      if (!res.data.prev_page_url)
        res.data.prev_page_url = res.data.first_page_url;
      if (!res.data.next_page_url)
        res.data.next_page_url = res.data.last_page_url;
      creatPage = `<ul class ="flex-space-between refion-xq">
            <div class = "refion-xq-div" onclick="projectList('${
              res.data.first_page_url
            }')"><p>首页</p></div>
            <div class = "refion-xq-div" onclick="projectList('${
              res.data.prev_page_url
            }')"><p>上一页</p></div>
            <div class = "refion-xq-div" onclick="projectList('${
              res.data.next_page_url
            }')"><p>下一页</p></div>
            <div class = "refion-xq-div"><p>当前页${res.data.current_page}/${
        res.data.last_page
      }</p></div>
            <div class = "refion-xq-div" onclick="projectList('${
              res.data.last_page_url
            }')"><p>尾页</p></div>
        </ul>`;

      res.data.data.forEach((el, index) => {
        if (index % 2) {
          middleStr += `<li class = "w5 clolr-code-gray" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w20 clolr-code-gray"> ${
            el.project_name
          } </li> <li class = "w40 clolr-code-gray"> ${
            el.project_content
          } </li><li class="w20 clolr-code-gray">${
            el.claim_unit
          }</li><li class="w15 clolr-code-gray">${el.offer_unit}</li>`;
        } else {
          middleStr += `<li class = "w5 clolr-code-light" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w20 clolr-code-light"> ${
            el.project_name
          } </li> <li class = "w40 clolr-code-light"> ${
            el.project_content
          } </li><li class="w20 clolr-code-light">${
            el.claim_unit
          }</li><li class="w15 clolr-code-light">${el.offer_unit}</li>`;
        }
      });
    }
  });
  str = str + middleStr + strEnd + creatPage + last;
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">项目清单</h3>' +
      "</p>",
    area: ["1480px", "800px"],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}
//需求清单
function projectListItem(tolUrl = "/region_unit_project_alone") {
  layer.closeAll();
  let str = `<div style="width: 100%; padding:40px 20px 20px 20px;">

        <ul class="party-mpdule">
            <li class="w5">序号</li>
            <li class="w20">项目名称</li>
            <li class="w40">项目内容</li>
            <li class="w20">提供单位</li>
            <li class="w15">认领单位</li>`;
  let middleStr = "";
  let strEnd = `</ul>`;

  let last = `</div>`;
  let lastUrl = tolUrl.substr(0, 4) === "http" ? tolUrl : url + tolUrl;
  let creatPage;
  $.ajax({
    url: lastUrl,
    type: "get",
    async: false,
    success: function (res) {
      if (!res.data.prev_page_url)
        res.data.prev_page_url = res.data.first_page_url;
      if (!res.data.next_page_url)
        res.data.next_page_url = res.data.last_page_url;
      creatPage = `<ul class ="flex-space-between refion-xq">
            <div class = "refion-xq-div" onclick="projectListItem('${
              res.data.first_page_url
            }')"><p>首页</p></div>
            <div class = "refion-xq-div" onclick="projectListItem('${
              res.data.prev_page_url
            }')"><p>上一页</p></div>
            <div class = "refion-xq-div" onclick="projectListItem('${
              res.data.next_page_url
            }')"><p>下一页</p></div>
            <div class = "refion-xq-div"><p>当前页${res.data.current_page}/${
        res.data.last_page
      }</p></div>
            <div class = "refion-xq-div" onclick="projectListItem('${
              res.data.last_page_url
            }')"><p>尾页</p></div>
        </ul>`;

      res.data.data.forEach((el, index) => {
        if (index % 2) {
          middleStr += `<li class = "w5 clolr-code-gray" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w20 clolr-code-gray"> ${
            el.project_name
          } </li> <li class = "w40 clolr-code-gray"> ${
            el.content
          } </li><li class="w20 clolr-code-gray">${
            el.propose_unit
          }</li><li class="w15 clolr-code-gray">${el.claim_unit}</li>`;
        } else {
          middleStr += `<li class = "w5 clolr-code-light" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w20 clolr-code-light"> ${
            el.project_name
          } </li> <li class = "w40 clolr-code-light"> ${
            el.content
          } </li><li class="w20 clolr-code-light">${
            el.propose_unit
          }</li><li class="w15 clolr-code-light">${el.claim_unit}</li>`;
        }
      });
    }
  });
  str = str + middleStr + strEnd + creatPage + last;
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">项目清单</h3>' +
      "</p>",
    area: ["1480px", "800px"],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}
//资源清单
function projectListRegion(tolUrl) {
  layer.closeAll();

  let str = `<div style="width: 100%; padding:40px 20px 20px 20px;">

        <ul class="party-mpdule">
            <li class="w10">序号</li>
            <li class="w25">需求名称</li>
            <li class="w40">需求内容</li>
            <li class="w25">提供单位</li>`;
  let middleStr = "";
  let strEnd = `</ul>`;

  let last = `</div>`;
  let lastUrl = tolUrl.substr(0, 4) === "http" ? tolUrl : url + tolUrl;
  let creatPage;
  $.ajax({
    url: lastUrl,
    type: "get",
    async: false,
    success: function (res) {
      if (!res.data.prev_page_url)
        res.data.prev_page_url = res.data.first_page_url;
      if (!res.data.next_page_url)
        res.data.next_page_url = res.data.last_page_url;
      creatPage = `<ul class ="flex-space-between refion-xq">
            <div class = "refion-xq-div" onclick="projectListRegion('${
              res.data.first_page_url
            }')"><p>首页</p></div>
            <div class = "refion-xq-div" onclick="projectListRegion('${
              res.data.prev_page_url
            }')"><p>上一页</p></div>
            <div class = "refion-xq-div" onclick="projectListRegion('${
              res.data.next_page_url
            }')"><p>下一页</p></div>
            <div class = "refion-xq-div"><p>当前页${res.data.current_page}/${
        res.data.last_page
      }</p></div>
            <div class = "refion-xq-div" onclick="projectListRegion('${
              res.data.last_page_url
            }')"><p>尾页</p></div>
        </ul>`;

      res.data.data.forEach((el, index) => {
        if (index % 2) {
          middleStr += `<li class = "w10 clolr-code-gray" style="border-left: 0.5px solid #ccc;" >${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w25 clolr-code-gray"> ${
            el.require_name
          } </li> <li class = "w40 clolr-code-gray"> ${
            el.require_content
          } </li><li class="w25 clolr-code-gray">${el.require_unit}</li>`;
        } else {
          middleStr += `<li class = "w10 clolr-code-light" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w25 clolr-code-light"> ${
            el.require_name
          } </li> <li class = "w40 clolr-code-light"> ${
            el.require_content
          } </li><li class="w25 clolr-code-light">${el.require_unit}</li>`;
        }
      });
    }
  });
  str = str + middleStr + strEnd + creatPage + last;
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">需求清单</h3>' +
      "</p>",
    area: ["1480px", "800px"],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

//社区工作者弹窗
function communityWokerOpen(data) {
  $.ajax({
    type: "get",
    url: locallUrl + "/admin/community_worker/" + data,
    success: function (res) {
      console.log(res);
      let documentName = res.data[0];
      let str = `<div class="bgz-map-parent" style = "height :100%;">
        <div class="chid1">
            <ul style="height:70%;">
                <li style="display: flex;
                            min-width: 160px;
                            height: 160px;
                            flex-flow: row wrap;
                            justify-content: center;
                            align-items: center;">
                            <img style="height:100%;" src = "//file.shyunhua.com/${
                              documentName.image
                            }" />
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: space-around;
                            align-items: center;">
                 
                    <span class="fz20 fw700">${documentName.name}</span>
                    <span>${documentName.job}</span>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: space-around;
                            align-items: center;">
                 
                      <img  src="./images/bgz_phone.png" />
                    <span>${documentName.is_show  === 1? documentName.phone : ''}</span>
                </li>
            </ul>
        </div>
        <div class="child2" style="height:100%;" >
            <div>
                <h2>工作职责</h2>
                <p>${documentName.duty}</p>
            </div>
            <div>
                <h2>服务理念</h2>
                <p  class="color-33 fw700">${documentName.service_purposes}</p>
            </div>


        </div>

    </div>`;
      openWindowsNewCreat(str, "社区工作者", 900, 420);
    }
  });
}
//班长工程作者弹窗
function bzWokerOpen(data) {
  $.ajax({
    type: "get",
    url: url + data,
    success: function (res) {
      console.log(res.data.data);

      let str = `<div class="bgz-map-parent" style = "height :100%;">
        <div class="chid1">
            <ul style="height:70%;">
                <li style="display: flex;
                            min-width: 160px;
                            height: 160px;
                            flex-flow: row wrap;
                            justify-content: center;
                            align-items: center;">
                            <img style="height:100%;" src = "//file.shyunhua.com/${
                              res.data.data[0].image
                            }" />
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: space-around;
                            align-items: center;">
                 
                    <span class="fz20 fw700">${res.data.data[0].name}</span>
                    <span>${res.data.data[0].job}</span>
                </li>
            </ul>
        </div>
        <div class="child2" style="height:100%;" >
            <div>
                <h2>工作职责</h2>
                <p>${res.data.data[0].duty}</p>
            </div>
            <div>
                <h2>服务理念</h2>
                <p  class="color-33 fw700">${
                  res.data.data[0].service_purposes
                }</p>
            </div>


        </div>

    </div>`;
      openWindowsNewCreat(str, "社区工作者", 900, 360);
    }
  });
}

// 对象数组降序排序

function createComparisonFunction(propertyName) {
  return function (object1, object2) {
    var value1 = object1[propertyName];
    var value2 = object2[propertyName];
    if (value1 < value2) {
      return -1;
    } else if (value1 > value2) {
      return 1;
    } else {
      return 0;
    }
  };
}

//社区工作者
function communityWoker(tolUrl) {
  layer.closeAll();
  let str = `<div style="width: 100%; padding:40px 20px 20px 20px;">

        <ul class="party-mpdule">
            <li class="w5">姓名</li>
            <li class="w20">职务</li>
            <li class="w40">联系方式</li>
            <li class="w20">工作职责</li>
            <li class="w15">详情</li>`;
  let middleStr = "";
  let strEnd = `</ul>`;

  let last = `</div>`;
  let lastUrl = tolUrl.substr(0, 4) === "http" ? tolUrl : locallUrl + tolUrl;
  let creatPage;
  $.ajax({
    url: lastUrl,
    type: "get",
    async: false,
    success: function (res) {
      let data = res.data.data;

      if (!res.data.prev_page_url)
        res.data.prev_page_url = res.data.first_page_url;
      if (!res.data.next_page_url)
        res.data.next_page_url = res.data.last_page_url;
      creatPage = `<ul class ="flex-space-between refion-xq">
            <div class = "refion-xq-div" onclick="communityWoker('${
              res.data.first_page_url
            }')"><p>首页</p></div>
            <div class = "refion-xq-div" onclick="communityWoker('${
              res.data.prev_page_url
            }')"><p>上一页</p></div>
            <div class = "refion-xq-div" onclick="communityWoker('${
              res.data.next_page_url
            }')"><p>下一页</p></div>
            <div class = "refion-xq-div"><p>当前页${res.data.current_page}/${
        res.data.last_page
      }</p></div>
            <div class = "refion-xq-div" onclick="communityWoker('${
              res.data.last_page_url
            }')"><p>尾页</p></div>
        </ul>`;
      // 排序
      data.sort(createComparisonFunction("job_sort"))
      data.forEach((el, index) => {
        if (index % 2) {
          middleStr += `<li class = "w5 clolr-code-gray" style="border-left: 0.5px solid #ccc;" > ${
            el.name
          } </li> <li class = "w20 clolr-code-gray"> ${
            el.job
          } </li> <li class = "w40 clolr-code-gray"> ${
            el.phone
          } </li><li class="w20 clolr-code-gray">${
            el.duty
          }</li><li class="w15 clolr-code-gray color-f4e" onclick ="communityWokerOpen('${
            el.id
          }')">详情</li>`;
        } else {
          middleStr += `<li class = "w5 clolr-code-light" style="border-left: 0.5px solid #ccc;" > ${
            el.name
          } </li> <li class = "w20 clolr-code-light"> ${
            el.job
          } </li> <li class = "w40 clolr-code-light"> ${
            el.phone
          } </li><li class="w20 clolr-code-light">${
            el.duty
          } </li><li style="cursor: pointer;" class="w15 clolr-code-light color-f4e" onclick ="communityWokerOpen('${
            el.id
          }')">详情</li>`;
        }
      });
    }
  });
  str = str + middleStr + strEnd + creatPage + last;
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">社区工作者</h3>' +
      "</p>",
    area: ["1480px", "800px"],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

//资源清单
function projectListResouse(tolUrl) {
  layer.closeAll();

  let str = `<div style="width: 100%; padding:40px 20px 20px 20px;">

        <ul class="party-mpdule">
            <li class="w10">序号</li>
            <li class="w25">资源名称</li>
            <li class="w40">资源内容</li>
            <li class="w25">提供单位</li>`;
  let middleStr = "";
  let strEnd = `</ul>`;

  let last = `</div>`;
  let lastUrl = tolUrl.substr(0, 4) === "http" ? tolUrl : url + tolUrl;
  let creatPage;
  $.ajax({
    url: lastUrl,
    type: "get",
    async: false,
    success: function (res) {
      if (!res.data.prev_page_url)
        res.data.prev_page_url = res.data.first_page_url;
      if (!res.data.next_page_url)
        res.data.next_page_url = res.data.last_page_url;
      creatPage = `<ul class ="flex-space-between refion-xq">
            <div class = "refion-xq-div" onclick="projectListResouse('${
              res.data.first_page_url
            }')"><p>首页</p></div>
            <div class = "refion-xq-div" onclick="projectListResouse('${
              res.data.prev_page_url
            }')"><p>上一页</p></div>
            <div class = "refion-xq-div" onclick="projectListResouse('${
              res.data.next_page_url
            }')"><p>下一页</p></div>
            <div class = "refion-xq-div"><p>当前页${res.data.current_page}/${
        res.data.last_page
      }</p></div>
            <div class = "refion-xq-div" onclick="projectListResouse('${
              res.data.last_page_url
            }')"><p>尾页</p></div>
        </ul>`;

      res.data.data.forEach((el, index) => {
        if (index % 2) {
          middleStr += `<li class = "w10 clolr-code-gray" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20}</li> <li class = "w25 clolr-code-gray"> ${
            el.resource_name
          } </li> <li class = "w40 clolr-code-gray"> ${
            el.resource_content
          } </li><li class="w25 clolr-code-gray">${el.offer_unit}</li>`;
        } else {
          middleStr += `<li class = "w10 clolr-code-light" style="border-left: 0.5px solid #ccc;" > ${index +
            1 +
            (res.data.current_page - 1) *
              20} </li> <li class = "w25 clolr-code-light"> ${
            el.resource_name
          } </li> <li class = "w40 clolr-code-light"> ${
            el.resource_content
          } </li><li class="w25 clolr-code-light">${el.offer_unit}</li>`;
        }
      });
    }
  });
  str = str + middleStr + strEnd + creatPage + last;
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">资源清单</h3>' +
      "</p>",
    area: ["1480px", "800px"],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

//三会一课
function projectListSh(flag) {
  let data = window.sessionStorage.getItem("dzz");

  let title = null;
  data = JSON.parse(data);
  if (flag === 0) {
    if (!data.orglife.length) return;
  } else {
    if (!data.thematic_party_day.length) return;
  }
  let str = `<div style="width: 100%; padding:40px 20px 30px 20px;">

        <ul class="party-mpdule">
            <li class="w10">序号</li>
            <li class="w30">主要内容</li>
            <li class="w30"> 活动日期 </li>
            <li class="w30">出席人</li>`;

  // <li class="w30">顾倩倩</li>
  // <li class="w30">顾倩倩</li>
  // <li class="w40">15888888888</li>

  let middleStr = "";
  let strEnd = `</ul></div>`;
  if (flag === 1) {
    data = data.thematic_party_day;
    title = "主题党日";
  } else {
    data = data.orglife;
    title = "三会一课";
  }

  data.forEach((el, index) => {
    if (index % 2) {
      middleStr += `<li class = "w10 clolr-code-gray" style="border-left: 0.5px solid #ccc;"> ${index +
        1} </li> <li onclick="projectListShInfo(${[
        index,
        flag
      ]})" class = "w30 clolr-code-gray cursour-pointer"> <a href='javascript:;' title="点击查看详情"> ${
        el.title
      } ></a> </li> <li class = "w30 clolr-code-gray"> ${formDate(
        el.date_time
      )} </li>  <li class = "w30 clolr-code-gray  attend-name"> ${
        el.attendee_name
      } </li>`;

      // middleStr += `<li class = "w30 clolr-code-gray"> ${el.count}</li>
    } else {
      middleStr += `<li class = "w10" style="border-left: 0.5px solid #ccc;"> ${index +
        1}</li> <li onclick="projectListShInfo(${[
        index,
        flag
      ]})" class = "w30 cursour-pointer"><a href='javascript:;' title="点击查看详情"> ${
        el.title
      } ></a>  </li> <li class = "w30"> ${formDate(
        el.date_time
      )}</li>  <li class = "w30 attend-name"> ${el.attendee_name} </li>`;

      // middleStr += `<li class = "w30 "> ${el.count}</li>`
    }
  });

  str = str + middleStr + strEnd;
  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      title +
      "</h3>" +
      "</p>",
    area: ["1480px", "800px"],
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

//三会一课详情
function projectListShInfo(index, flag) {
  let str, title;
  if (flag === 1) {
    str = JSON.parse(window.sessionStorage.getItem("dzz")).thematic_party_day[
      index
    ].content;
    title = "主题党日";
  } else {
    str = JSON.parse(window.sessionStorage.getItem("dzz")).orglife[index]
      .content;
    title = "三会一课";
  }

  str = `<div style = "padding:40px 30px;">${str}</div>`;

  layer.open({
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      title +
      "</h3>" +
      "</p>",
    area: "640px",
    content: str,
    zIndex: layer.zIndex,
    shadeClose: true,
    //      offset: ['300px', '1000px'],
    btn: ["确定"],
    yes: function (index, layero) {
      layer.close(index);
    },
    cancel: function () {
      //右上角关闭回调
      //return false 开启该代码可禁止点击该按钮关闭
    },
    success: function (layero) {
      layer.setTop(layero); //窗口置顶
    }
  });
}

(function (params) {
  let data = JSON.parse(window.localStorage.getItem("user")).data;

  $(".orgnaiztion_jw p").text(data.org_name);
})();