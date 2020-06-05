var arrSort;
let searchFull = null;
let paginate = 50; //每一页允许的条说
let page = 1; //分页页码

var countIndex; //li序号
let addressLL = [];
let dataInfo = [];
var imgPath = ""; //坐标图片的Path
let animationPointList = []; //缓存跳动点
var arrField;
let clickFlag = true;
// $(document).click(() => {
//   console.log('能行么')
//   $.ajax({
//     type : 'get',
//     global: false,
//     url: '//127.0.0.1:8088/api/token_test',
//     data: {
//       token: JSON.parse(window.localStorage.getItem('user'))[0].token,
//     },
//     heards : {
//       'authorization': 'Bearer ' + JSON.parse(window.localStorage.getItem('user'))[0].token,
//     },
//     success: function (res) {
//       if(res.status === 405) {
//         // window.location.href='../login.html'
//       }
//     }
//   })
// })
// var indexs = null;
// if(loginType === 2) {
//   indexs = {
//     'dzzsj': "党组织",
//     'dysj': "党员",
//     'zzdysj': "在职党员",
//     'szsj': "三长",
//     'tddj': "团队党建",
//     'tddjsj': "团队党建",
//     'qyhdj': "区域化党建", //居委层级区域化党建

//   };
// } else {
//     indexs = {
//       'dzzsj': "党组织",
//       'dysj': "党员",
//       'zzdysj': "在职党员",
//       'szsj': "三长",
//       'tddj': "团队党建",
//       'tddjsj': "团队党建",
//       'qyhdj': "区域化党建",
//       // 'bzgc': "班长工程"
//     };
// }

/** 右上角的返回按钮 **/
function goBack(to) {
  if (!to) {
    to = 1;
  }
  window.location.href = "home.html?to=" + to;
}

//设置容器的宽高
var con = document.getElementById("con"),
  winWidth = document.documentElement.clientWidth,
  winHeight = document.documentElement.clientHeight;
con.style.width = winWidth + "px";
con.style.height = winHeight + "px";

//窗口变化重置页面
$(window).resize(function () {
  //设置容器的宽高
  var con = document.getElementById("con"),
    svg = $("svg"),
    winWidth = document.documentElement.clientWidth,
    winHeight = document.documentElement.clientHeight;
  con.style.width = winWidth + "px";
  con.style.height = winHeight + "px";
  svg.width(winWidth);
  svg.height(winHeight);
  //设置侧边栏的高度
  document.getElementById("aside").style.height = winHeight + "px";
  document.getElementById("new_svg").style.height = winHeight + "px";
});

//设置侧边栏的高度
document.getElementById("aside").style.height = winHeight + "px";
$("svg").on("click", "rect", function (e) {
  var index = e.target.id;
  if (countNum != 4 && data_num.length > 0) {
    index = data_num[index];
  } else if (countNum == 4 && teamName.length > 0) {
    //------------------------------------------------------------------------------------
    let aa = "",
      bb = "";
    for (i in tddj) {
      if (teamName[0] == tddj[i]["group"]) {
        if (tddj[parseInt(i) + parseInt(index)]["political"] == 1) {
          aa =
            "<td class='addPartyEmblem'><img src='images/dh.png'><span>" +
            tddj[parseInt(i) + parseInt(index)]["name"] +
            "</span></td>" +
            "<td>" +
            tddj[parseInt(i) + parseInt(index)]["address"].replace(
              /上海市|([\u2E80-\u9FFF]+(区|镇|苑))|(\w+(\-?\w+)?室)|(\w?楼.?(座|层))/g,
              ""
            ) +
            "</td>" +
            "<td>" +
            tddj[parseInt(i) + parseInt(index)]["group"] +
            "</td>";
        } else {
          aa =
            "<td>" +
            tddj[parseInt(i) + parseInt(index)]["name"] +
            "</td>" +
            "<td>" +
            tddj[parseInt(i) + parseInt(index)]["address"].replace(
              /上海市|([\u2E80-\u9FFF]+(区|镇|苑))|(\w+(\-?\w+)?室)|(\w?楼.?(座|层))/g,
              ""
            ) +
            "</td>" +
            "<td>" +
            tddj[parseInt(i) + parseInt(index)]["group"] +
            "</td>";
        }
        if (aa != "") {
          bb = "<tr>" + aa + "</tr>";
          aa = tddj[parseInt(i) + parseInt(index)]["group"];
          break;
        }
        aa = "";
      }
    }

    var table =
      '<table class="layui-table" lay-even lay-skin="line" lay-size="sm" style="table-layout: fixed;">';
    var thead =
      "<thead><th>姓名</th><th>联系地址</th><th>所属团队</th></thead>";
    var tbody = "<tbody>" + bb + "</tbody></table>";

    let str = table + thead + tbody;
    openWindows(str, aa, 550);
    //------------------------------------------------------------------------------------
  }
  switch (countNum) {
    case 0: {
      readOneJsonFromVariable(documentName[countNum], arrField0b, index);
      break;
    }
    case 1: {
      readOneJsonFromVariable(documentName[countNum], arrField1b, index);
      break;
    }
    case 2: {
      readOneJsonFromVariable(documentName[countNum], arrField2b, index);
      break;
    }
    case 3: {
      readOneJsonFromVariable(documentName[countNum], arrField3b, index);
      break;
    }
    case 4: {
      if (teamName.length == 0) {
        readOneJsonFromVariable(documentName[5], arrField4c, index);
      }

      break;
    }
    case 5: {
      break;
    }
  }
});

//右侧点击隐藏功能
$("#detail").on("click", function (e) {
  var right = parseInt(
    $(this)
    .css("right")
    .replace(/\D+/g, "")
  );
  if (right == 300) {
    $(this).animate({
      right: "0px"
    });
    $("#right").animate({
      right: "-300px"
    });
  } else {
    $(this).animate({
      right: "300px"
    });
    $("#right").animate({
      right: "0px"
    });
  }
});

//左侧点击隐藏 与 关闭 功能
$("body").on("click", "#teamMember span", function (e) {
  var left = parseInt(
      $(this)
      .parent()
      .css("left")
      .replace(/px/g, "")
    ),
    width = parseInt(
      $(this)
      .parent()
      .width()
    ),
    name = $(this).attr("class");
  if (name !== "btn_close") {
    if (left == 0) {
      $("#teamMember").animate({
        left: "-" + width + "px"
      });
      $(this).html('<i class="layui-icon">&#xe602;</i>');
    } else {
      $("#teamMember").animate({
        left: "0px"
      });
      $(this).html('<i class="layui-icon">&#xe603;</i>');
    }
  } else {
    $(this)
      .parent()
      .remove();
  }
});
//右侧点击隐藏功能
$("#hideRight").on("click", function (e) {
  var right = parseInt(
    $(this)
    .css("right")
    .replace(/\D+/g, "")
  );
  if (right == 450) {
    $(this).animate({
      right: "0px"
    });
    $("#rightTab").animate({
      right: "0px"
    });
    $("#aside").animate({
      right: "-450px"
    });
    $(this).html('<i class="layui-icon">&#xe603;</i>');
  } else {
    $(this).animate({
      right: "450px"
    });
    $("#rightTab").animate({
      right: "450px"
    });
    $("#aside").animate({
      right: "0px"
    });
    $(this).html('<i class="layui-icon">&#xe602;</i>');
  }
});

//初始化比例
var bg_width = 3840,
  bg_height = 2160,
  ratio_init = winWidth / bg_width;
var scaleTmp = 0.05;
var translateTmp = [];

window.document.getElementById("new_svg").style.width = winWidth + "px";
window.document.getElementById("new_svg").style.height = winHeight + "px";

//console.log($(new_svg).scrollLeft())
var map = new BMap.Map("new_svg"); // 创建地图实例
var point = new BMap.Point(121.420444, 31.023246); // 创建点坐标
// var myIcon = new BMap.Icon("//lbsyun.baidu.com/jsdemo/img/fox.gif", new BMap.Size(300, 157));
//创建信息窗口
function initInfoWindow(
  data,
  organization_name,
  name,
  flag,
  img,
  msg,
  patty,
  index,
  allData
) {


  var data_info = data;

  // debugger
  // if (!img) img ='https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=2158688337,97327393 1&fm=26&gp=0.jpg';

  var myIcon = new BMap.Icon("./images/map_icon.png", new BMap.Size(25, 25));
  if (flag) {
    map.centerAndZoom(new BMap.Point(data_info.lng, data_info.lat), 15);
  }

  if (patty === "中共党员") {

    var marker = new BMap.Marker(new BMap.Point(data_info.lng, data_info.lat), {
      icon: myIcon
    }); // 创建标注
    map.addOverlay(marker); // 将标注添加到地图中
    // addClickHandler(content, marker);
    marker.addEventListener("click", e => {

      map.closeInfoWindow();
      // let data = dataInfoParty('community_team_info?id=' + allData.id + '&paginate=1');
      setAnimation(
        allData.address,
        allData,
        arrField,
        index,
        index,
        "tr",
        "map"
      );
    }); //跳动的动画
  } else {
    switch (index) {
      case 3:
        var marker = new BMap.Marker(
          new BMap.Point(data_info.lng, data_info.lat)
        ); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        // addClickHandler(content, marker);
        marker.addEventListener("click", e => {

          map.closeInfoWindow();
          // let data = dataInfoParty('community_team_info?id=' + allData.id + '&paginate=1');

          setAnimation(
            allData.address,
            allData,
            arrField,
            index,
            index,
            "tr",
            "map"
          );
          // setAnimation(data.address, data, arrField, inex, index, 'tr', 'map');
          // readOneJsonFromVariable(data, arrField, index, index);
        }); //跳动的动画
        break;
      case 0:
        var marker = new BMap.Marker(
          new BMap.Point(data_info.lng, data_info.lat), {
            icon: myIcon
          }
        ); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        // addClickHandler(content, marker);
        marker.addEventListener("click", e => {
          map.closeInfoWindow();

          console.log(allData);
          $.ajax({
            type: "get",
            url: urlPag + "organization_info",

            data: {
              sync_id: allData.sync_id
            },
            success: function (res) {
              // setAnimation(data.address, data, arrField, 0, 0, 'tr', 'map');
              cardList(res.data);
            }
          });
        }); //跳动的动画
        break;
      case 6:
        var marker = new BMap.Marker(
          new BMap.Point(data_info.lng, data_info.lat), {
            icon: myIcon
          }
        ); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中

        marker.addEventListener("click", e => {
          map.closeInfoWindow();
          let data = dataInfoParty(
            "secretary_info?id=" + allData.id + "&paginate=1"
          );

          setAnimation(data.address, data, arrField, index, index, "tr", "map");
          // let data = dataInfoParty('secretary_info?id=' + allData.id + '&paginate=1');
          // readOneJsonFromVariable(data, arrField, index, index);
        });
        break;
      case 5:
        var marker = new BMap.Marker(
          new BMap.Point(data_info.lng, data_info.lat), {
            icon: myIcon
          }
        ); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中

        marker.addEventListener("click", e => {
          map.closeInfoWindow();

          let data = "";
          if (loginType === 2) {
            data = dataInfoParty(
              "region_unit_community_alone/" +
              allData.id +
              "&paginate=1"
            );

            console.log(data)
            setAnimation(
              data.address,
              data,
              arrField,
              index,
              index,
              "tr",
              "map"
            );
          } else {
            data = dataInfoParty(
              "region_unit_proj_alone_map?unit_id=" + allData.id + "&paginate=1"
            );
            setAnimation(
              data.unit.address,
              data,
              arrField,
              index,
              index,
              "tr",
              "map"
            );
          }


          // let data = dataInfoParty('secretary_info?id=' + allData.id + '&paginate=1');
          // readOneJsonFromVariable(data, arrField, index, index);
        });
        break;
      default:

        var marker = new BMap.Marker(
          new BMap.Point(data_info.lng, data_info.lat), {
            icon: myIcon
          }
        ); // 创建标注
        map.addOverlay(marker); // 将标注添加到地图中
        // addClickHandler(content, marker);

        marker.addEventListener("click", e => {
          console.log("插值测试01")

          map.closeInfoWindow();
          //   console.log('凉凉')
          //  let data = dataInfoParty('region_unit_proj_alone_map?id=' + allData.id + '&paginate=1');
          setAnimation(
            allData.address,
            allData,
            arrField,
            index,
            index,
            "tr",
            "map"
          );
        });
        break;
    }
  }
  // var content = data_info[i][2];
}
//添加信息提示框
function addClickHandler(content, marker) {
  marker.addEventListener("click", function (e) {
    openInfo(content, e);
  });
}

function openInfo(content, e) {
  var p = e.target;
  var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
  var infoWindow = new BMap.InfoWindow(content); // 创建信息窗口对象
  map.openInfoWindow(infoWindow, point); //开启信息窗口

  // }
}
// Map.addControl(new BMap)
map.centerAndZoom(point, 15);



map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

map.enableContinuousZoom(true); //启用地图惯性拖拽，默认禁用

map.addControl(
  new BMap.NavigationControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: {
      width: 640,
      height: 100
    }
  })
);

map.addControl(
  new BMap.ScaleControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
  })
);
map.addControl(
  new BMap.OverviewMapControl({
    anchor: BMAP_ANCHOR_BOTTOM_RIGHT
  })
);

map.addControl(
  new BMap.MapTypeControl({
    mapTypes: [BMAP_NORMAL_MAP, BMAP_HYBRID_MAP],

    anchor: BMAP_ANCHOR_BOTTOM_RIGHT,
    offset: {
      width: 560,
      height: 100
    }
  })
);
// map.addControl(map.setMapStyleV2({
//   styleId: '8323eae086761949754ae4320250b096'
// }))

//  MapStyleV2: {
//     styleId: '8323eae086761949754ae4320250b096'
//   },


// map.addControl()

// 设置地图类型
// map.setMapType(BMAP_HYBRID_MAP);
map.setMapStyle({
  styleJson: [
    [{
      "featureType": "land",
      "elementType": "geometry",
      "stylers": {
        "color": "#f5f6f7ff"
      }
    }, {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": {
        "color": "#c4d7f5ff"
      }
    }, {
      "featureType": "green",
      "elementType": "geometry",
      "stylers": {
        "color": "#dcf2d5ff"
      }
    }, {
      "featureType": "highway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffe59eff"
      }
    }, {
      "featureType": "highway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#f5d48cff"
      }
    }, {
      "featureType": "nationalway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#fff6ccff"
      }
    }, {
      "featureType": "provincialway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#fff6ccff"
      }
    }, {
      "featureType": "cityhighway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#fff6ccff"
      }
    }, {
      "featureType": "arterial",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#fff6ccff"
      }
    }, {
      "featureType": "nationalway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#f2dc9dff"
      }
    }, {
      "featureType": "provincialway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#f2dc9dff"
      }
    }, {
      "featureType": "cityhighway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#f2dc9dff"
      }
    }, {
      "featureType": "arterial",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#f2dc9dff"
      }
    }, {
      "featureType": "building",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#e6ebf0ff"
      }
    }, {
      "featureType": "building",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#d8e2ebff"
      }
    }, {
      "featureType": "tertiaryway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "tertiaryway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#dfe4ebff"
      }
    }, {
      "featureType": "fourlevelway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "fourlevelway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#dfe4ebff"
      }
    }, {
      "featureType": "local",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "local",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#dfe4ebff"
      }
    }, {
      "featureType": "scenicspotsway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "scenicspotsway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#dfe4ebff"
      }
    }, {
      "featureType": "universityway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#dfe4ebff"
      }
    }, {
      "featureType": "universityway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "vacationway",
      "elementType": "geometry.stroke",
      "stylers": {
        "color": "#dfe4ebff"
      }
    }, {
      "featureType": "vacationway",
      "elementType": "geometry.fill",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "town",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "18"
      }
    }, {
      "featureType": "town",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "town",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "highway",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#c0792dff"
      }
    }, {
      "featureType": "highway",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "nationalway",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#c0792dff"
      }
    }, {
      "featureType": "nationalway",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff60"
      }
    }, {
      "featureType": "provincialway",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#c0792dff"
      }
    }, {
      "featureType": "provincialway",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "cityhighway",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#c0792dff"
      }
    }, {
      "featureType": "cityhighway",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "arterial",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "arterial",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#c0792dff"
      }
    }, {
      "featureType": "arterial",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "24"
      }
    }, {
      "featureType": "cityhighway",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "24"
      }
    }, {
      "featureType": "provincialway",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "24"
      }
    }, {
      "featureType": "nationalway",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "24"
      }
    }, {
      "featureType": "highway",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "24"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "companylabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "companylabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "companylabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "lifeservicelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "lifeservicelabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "lifeservicelabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "carservicelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "carservicelabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "carservicelabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "financelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "financelabel",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "financelabel",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "tertiaryway",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "tertiaryway",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "tertiaryway",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "fourlevelway",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "fourlevelway",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "fourlevelway",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "local",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "local",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "local",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "companylabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "lifeservicelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "carservicelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "financelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "manmade",
      "elementType": "geometry",
      "stylers": {
        "color": "#f5f6f7ff"
      }
    }, {
      "featureType": "subway",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "subway",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "subway",
      "elementType": "geometry",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "subway",
      "elementType": "geometry",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "subwaylabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-13"
      }
    }, {
      "featureType": "subwaylabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-13"
      }
    }, {
      "featureType": "subwaylabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-13"
      }
    }, {
      "featureType": "railway",
      "elementType": "geometry",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "scenicspotslabel",
      "stylers": {
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "stylers": {
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "10",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "10-15"
      }
    }, {
      "featureType": "district",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "district",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "city",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "city",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "city",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "country",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "country",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "continent",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#a77726ff"
      }
    }, {
      "featureType": "continent",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "medicallabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "entertainmentlabel",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "stylers": {
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-17"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "estatelabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "businesstowerlabel",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-16"
      }
    }, {
      "featureType": "governmentlabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "stylers": {
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-17"
      }
    }, {
      "featureType": "restaurantlabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "stylers": {
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "stylers": {
        "level": "18",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "18",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "17",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "18",
        "curZoomRegionId": "0",
        "curZoomRegion": "13-18"
      }
    }, {
      "featureType": "hotellabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.text",
      "stylers": {
        "level": "14",
        "fontsize": "22",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.text",
      "stylers": {
        "level": "15",
        "fontsize": "22",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.text",
      "stylers": {
        "level": "16",
        "fontsize": "22",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "14-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "stylers": {
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "stylers": {
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "stylers": {
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "15",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "16",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-16"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "governmentlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "companylabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "24"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "scenicspotslabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "airportlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "water",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffffff"
      }
    }, {
      "featureType": "manmade",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#9ca0a3ff"
      }
    }, {
      "featureType": "manmade",
      "elementType": "labels.text.stroke",
      "stylers": {
        "color": "#ffffff00"
      }
    }, {
      "featureType": "education",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "transportationlabel",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "transportationlabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "12-13"
      }
    }, {
      "featureType": "educationlabel",
      "stylers": {
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "stylers": {
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "stylers": {
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "stylers": {
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "11",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "12",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "13",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off",
        "level": "14",
        "curZoomRegionId": "0",
        "curZoomRegion": "11-14"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "manmade",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "scenicspots",
      "elementType": "labels.text.fill",
      "stylers": {
        "color": "#ab76b6ff"
      }
    }, {
      "featureType": "scenicspots",
      "elementType": "labels.text",
      "stylers": {
        "fontsize": "23"
      }
    }, {
      "featureType": "poilabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "poilabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "airportlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "airportlabel",
      "elementType": "labels.icon",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "entertainmentlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "medicallabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "businesstowerlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "restaurantlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "hotellabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "shoppinglabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "road",
      "elementType": "geometry",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "road",
      "elementType": "labels",
      "stylers": {
        "visibility": "off"
      }
    }, {
      "featureType": "transportationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "educationlabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "estatelabel",
      "elementType": "labels",
      "stylers": {
        "visibility": "on"
      }
    }, {
      "featureType": "background",
      "elementType": "geometry",
      "stylers": {
        "visibility": "on",
        "color": "#a72323ff"
      }
    }]
  ]
});

// 创建地址解析器实例
var myGeo = new BMap.Geocoder();

var tmpArr = [];

//创建位置点
function createPoints(coordinates) {
  //参数一是分类，参数二是坐标集合
  // $(".dots").remove();
  // // 放置位置点的集合
  // var container_dots = container.append("g").attr("class", "dots");
  // // 所有点定义
  // $.each(coordinates, function (index, val) {
  //   var container_ci = container_dots.append("g")
  //     .attr("class", "ci sort" + val.sort);
  //   // 负值绝对值越大 越向下
  //   var offset_x = 0,
  //     offset_y = 0;
  //   var RECT_W = 80,
  //     RECT_H = 80;
  // });
}

function zoomed() {}

//---------------aside
aClick();
//搜索框
function addSearchBox(documentName, arr) {
  // $(".layui-form").remove(); //清空
  $("#w").append(
    '<form class="layui-form search_btn_top" action="">' +
    '<input type="text" name="content" required id="search_btn_top" value="" lay-verify="required" placeholder="请输入搜索内容" ' +
    'autocomplete="off" class="layui-input">' +
    '<button class="layui-btn" lay-submit lay-filter="formDemo">搜索</button></form>'
  );

  //Demo
  layui.use("form", function () {

    var form = layui.form;
    //监听提交
    form.on("submit(formDemo)", function (data) {
      // readJsonFromVariable(documentName, arr, data.field.content);
      // $("input").val(''); //清空输入框
      // $(".dots").remove(); //清空坐标
      switch (countNum) {
        case 0: {
          // searchFrom(arrField0a, 0);
          break;
        }
        case 1: {
          // searchFrom(arrField1a, 1);

          // createPoints(addPointBySearchBox(dysj));
          break;
        }
        case 2: {
          // searchFrom(arrField2a, 2);
          break;
        }
        case 3: {
          searchFrom(arrField3a, 3);

          // createPoints(addPointBySearchBox(szsj));
          break;
        }
        case 4: {
          // searchFrom(arrField4a, 4);
          break;
        }
        case 5: {
          // searchFrom(arrField5a, 5);
          break;
        }
        case 6: {
          searchFrom(arrField6a, 6);
          break;
        }
      }
      return false;
    });
  });
}

var data_num = []; //存放tr的data-num序号
//基于搜索框创建点
function addPointBySearchBox(variableJson) {}

function fn(e) {}

var teamName = []; //团队名称

/** 地图右侧竖向 li 点击事件回调 **/
function liCallBack(nm) {
  var num = $(this).index(),
    aa = [];
  if (typeof nm == "number") {
    num = nm;
  }
  $("#w").empty(); //清空左边div
  (teamName = []), (data_num = []);

  $("#teamMember").remove();
  countNum = num;
  switch (num) {

    case 0: {

      dzzFn();
      dataInfo = dzzsj.data;
      // addSearchBox(dzzsj, arrField0a);
      // $(".dots").remove();
      readJsonFromVariable(dzzsj, arrField0a, "", 0); //读取json数据
      // jsTree(dzzsj)
      formData(dzzsj.original_data, 0, initInfoWindow);
      clearAllCover();
      // createPoints(createPointFromVariable(documentName[0], arrFieldPoint, num)); //创建坐标点
      break;
    }
    case 1: {

      dysjFn();
      arrField = arrField1b;

      dataInfo = dysj.data;
      // addSearchBox(dysj, arrField1a);
      readJsonFromVariable(dysj, arrField1a, "", 1); //读取json数据
      //标注地图函数
      formData(dysj, 1, initInfoWindow);

      // initInfoWindow(lngLat);
      clearAllCover();
      // createPoints(createPointFromVariable(documentName[1], arrFieldPoint, num)); //创建坐标点
      break;
    }
    case 2: {

      zzdysjFn();
      dataInfo = zzdysj.data;
      // $(".dots").remove();
      arrField = arrField2b;

      // addSearchBox(zzdysj, arrField2a);

      readJsonFromVariable(zzdysj, arrField2a, searchFull, 2); //读取json数据
      formData(zzdysj, 2, initInfoWindow); //备用弹窗提示
      clearAllCover();
      // createPoints(createPointFromVariable(documentName[2], arrFieldPoint, num)); //创建坐标点
      break;
    }
    case 3: {

      szsjFn();
      arrField = arrField3b;

      dataInfo = szsj.data;

      addSearchBox(szsj, arrField3a);

      readJsonFromVariable(szsj, arrField3a, searchFull, 3); //读取json数据
      formData(szsj, 3, initInfoWindow); //备用弹窗提示
      clearAllCover();

      break;
    }
    case 4: {
      tddjsjFn();
      arrField = arrField4b;

      dataInfo = tddjsj.data;
      readJsonFromVariable(tddjsj, arrField4a, searchFull, 4); //读取json数据
      formData(tddjsj, 4, initInfoWindow); //备用弹窗提示
      clearAllCover();
      break;
    }
    case 5: {


      if (loginType === 2) {

        qyhdjsjFn();
        console.log(qyhdjsj);
        // qyhdjsj.data = qyhdjsj.data.map(  x => {

        // });

        // arrField = arrField5b;
        readJsonFromVariable(qyhdjsj, arrField5a, arrField4a, 5); //读取json数据
        formData(qyhdjsj, 5, initInfoWindow); //备用弹窗提示
        clearAllCover();
      } else {
        qyhdjsjFn();
        arrField = arrField5b;
        dataInfo = qyhdjsj.data;
        readJsonFromVariable(qyhdjsj, arrField5a, arrField4a, 5); //读取json数据
        formData(qyhdjsj, 5, initInfoWindow); //备用弹窗提示
        clearAllCover();
      }
      break;
    }
    case 6: {
      bzgcFn();
      arrField = arrField6b;
      dataInfo = bzgc.data;
      readJsonFromVariable(bzgc, arrField6a, "", 6); //读取json数据
      formData(bzgc, 6, initInfoWindow); //备用弹窗提示

      clearAllCover();
      break;
    }
  }
  if (typeof nm == "number") {
    $($("#rightTab").children()[nm])
      .addClass("detail_active")
      .siblings()
      .removeClass("detail_active");
  } else {
    $(this)
      .addClass("detail_active")
      .siblings()
      .removeClass("detail_active");
  }
}

//数据处理

function formData(add, index, sd, num) {

  if (index === 0) {
    let index1 = []; //index
    let data2 = []; //目标传入数据
    let data3 = []; //缓存所有居委会数据
    for (let i = 0; i < add.length; i++) {
      if (add.address === null) continue;
      myGeo.getPoint(
        add[i].address,
        el => {
          if (!el) return;
          index1.push(el.lng); //index
          data3.push(add[i].name); //居委会名字
          for (let j = 0; j < index1.length; j++) {
            if (index1.indexOf(el.lng, j) !== -1) {
              j = index1.indexOf(el.lng, j);
              data2.push(data3[j]);
            } else {
              j++;
            }
          }

          sd(
            el,
            add[i].organization_name,
            data2,
            i === add.length - 1,
            "",
            "",
            "",
            0,
            add[i]
          );

          // console.timeEnd('地址解析')

          data2 = [];
        },
        "上海市"
      );
    }

    return true;
  }

  if (index === 5) {



    let index1 = []; //index
    let data2 = []; //目标传入数据
    let data3 = []; //缓存所有居委会数据

    for (let i = 0; i < add.data.length; i++) {
      if (add.data[i].address === null) continue;

      myGeo.getPoint(
        add.data[i].address,
        el => {
          if (!el) return;
          index1.push(el.lng); //index
          data3.push(add.data[i].name); //居委会名字
          for (let j = 0; j < index1.length; j++) {
            if (index1.indexOf(el.lng, j) !== -1) {
              j = index1.indexOf(el.lng, j);
              data2.push(data3[j]);
            } else {
              j++;
            }
          }

          sd(
            el,
            add.data[i].organization_name,
            data2,
            i === add.data.length - 1,
            add.data[i].showcase_image,
            add.data[i].intro,
            "",
            index,
            add.data[i]
          );

          data2 = [];
        },
        "上海市"
      );
    }

    return true;
  }

  // if (index === 1 || index === 2 || index === 6 || index === 0) {
  let index1 = []; //index
  let data2 = []; //目标传入数据
  let data3 = []; //缓存所有居委会数据

  console.log("猜猜调用了没")
  for (let i = 0; i < add.data.length; i++) {
    myGeo.getPoint(
      add.data[i].address,
      el => {
        if (!el) return;
        let lng_lat = el
        let flagType = switchAddress(add.data[i])
        //判断是否有经纬度
        if (flagType == 1 || flagType == 2 || flagType == 4) {
          if (flagType == 1) {


            lng_lat = new BMap.Point(Number(add.data[i].east_longitude), Number(add.data[i].north_latitude))

          } else {
            lng_lat = new BMap.Point(Number(add.data[i].backup_east_lon), Number(add.data[i].backup_north_lat))

          }

          if (flagType == 4) {
            points = new BMap.Point(Number(add.data[i].building_east_longtitude), Number(add.data[i].building_north_latitude))
          }

        }
        sd(
          lng_lat,
          add.data[i].organization_name,
          data2,
          i === add.data.length - 1,
          "",
          "",
          add.data[i].political,
          index,
          add.data[i]
        );
      },
      "上海市"
    );
  }
}

// 鼠标点击事件
$(document).ready(function () {

  addSearchBox(dzzsj, arrField0a);
  // liCallBack(Number(window.location.href.replace(/^.*num=/g, '').replace(/#/g, '')));
  // $(function () {

  $("li").click(liCallBack);
  //---table内每一行点击事件
  $("#w").on("click", "table tr", function (e) {
    // //console.log('44444444444444444444444444444444444')
    $("#teamMember").remove(); //清空左边div

    countIndex = $(this).attr("data-num"); //tr真实序号
    var index = $(this).attr("data-id"); //tr当前序号
    $(this)
      .addClass("tr_active")
      .siblings()
      .removeClass("tr_active");

    switch (countNum) {
      case 0: {
        $(".ci image").attr({
          href: "images/t2.png",
          height: " 80",
          width: " 80",
          "z-index": "100"
        });
        break;
      }
      case 1: {
        $(".ci image").attr({
          href: "images/t2.png",
          height: " 80",
          width: " 80",
          "z-index": "100"
        });
        break;
      }
      case 2: {
        $(".ci image").attr({
          href: "images/t3.png",
          height: " 80",
          width: " 80",
          "z-index": "100"
        });
        break;
      }
      case 3: {
        $(".ci image").each(function (i, el) {
          if ($(el).attr("href") == "images/bj.gif") {
            $("#" + i).attr({
              href: imgPath,
              height: " 80",
              width: " 80",
              "z-index": "100"
            });
            imgPath = "";
          }
        });
        imgPath = $("#" + index).attr("href");
        if (data_num == "") {
          imgPath = $("#" + countIndex).attr("href");
        }
        break;
      }
      //团队党建
      case 4: {
        // teamName = [];
        // var coordinate = []; //存坐标的数组
        // teamName.push($(this).children().eq(0).text()); //放入团队名称
        // for (i in tddj) {
        //   if ($(this).children().eq(0).text() == tddj[i]["group"]) //对比<tr>内title和group内value
        //   {
        //     coordinate.push({
        //       x: tddj[i]["x"],
        //       y: tddj[i]["y"],
        //       sort: tddj[i]["sort"]
        //     }); //坐标
        //   }
        // }
        // createPoints(coordinate);
        break;
      }
      case 5: {
        $(".ci image").attr({
          href: "images/t2.png",
          height: " 80",
          width: " 80",
          "z-index": "100"
        });
        break;
      }
    }
    if (countNum != 4) {
      $("#" + index).attr({
        href: "images/bj.gif",
        height: " 80",
        width: " 80",
        "z-index": "99999",
        margin: "-60px 0 0 -60px"
      });
      if (typeof index == "undefined" || index == "") {
        $("#" + countIndex).attr({
          href: "images/bj.gif",
          height: " 80",
          width: " 80",
          "z-index": "99999",
          margin: "-60px 0 0 -60px"
        });
      }
    }
  });
});

//tr事件注册

async function trClick(msg) {



  let numid = msg;

  switch (countNum) {
    case 0: {
      // var arrField = arrField0b;
      // let data = dataInfoParty('organization_info?id=' + numid.split(',')[1] + '&paginate=1');

      // // readOneJsonFromVariable(data, arrField, parseInt(numid));
      // setAnimation(numid.split(',')[2]);

      break;
    }
    case 1: {
      var arrField = arrField1b;

      //接入二级接口
      let data = dataInfoParty(
        "party_member_info?id=" + numid.split(",")[1] + "&paginate=1"
      );
      // readOneJsonFromVariable(data, arrField, parseInt(numid));
      setAnimation(data.address, data, arrField, parseInt(numid), 1, "tr");

      break;
    }
    case 2: {
      var arrField = arrField2b;

      //接入二级接口
      let data = dataInfoParty(
        "party_member_info?id=" + numid.split(",")[1] + "&paginate=1"
      );

      // readOneJsonFromVariable(data, arrField, parseInt(numid));
      setAnimation(data.address, data, arrField, parseInt(numid), 2, "tr");

      break;
    }
    case 3: {
      var arrField = arrField3b;
      let data = dataInfoParty(
        "three_work_info?id=" + numid.split(",")[1] + "&paginate=1"
      );
      // readOneJsonFromVariable(data, arrField, parseInt(numid));
      setAnimation(data.address, data, arrField, parseInt(numid), 3, "tr");

      break;
    }
    case 4: {
      var arrField = arrField4b;
      let data = dataInfoParty(
        "community_team_info?id=" + numid.split(",")[1] + "&paginate=1"
      );
      // readOneJsonFromVariable(data, arrField, parseInt(numid));
      setAnimation(data.address, data, arrField, parseInt(numid), 4, "tr");

      break;
    }
    case 5: {
      var arrField = arrField5b;

      // let data = dataInfoParty('region_unit_proj_alone_map?unit_id=' + numid.split(',')[1] + '&paginate=1');
      let data = "";
      if (loginType === 2) {
        data = dataInfoPartyType(
          "region_unit_community_alone/" +
          numid.split(",")[1] +
          "&paginate=1"
        );
        setAnimation(
          data.address,
          data,
          arrField,
          parseInt(numid),
          5,
          "tr"
        );
      } else {
        data = dataInfoParty(
          "region_unit_proj_alone_map?unit_id=" +
          numid.split(",")[1] +
          "&pagin ate=1"
        );
        setAnimation(
          data.unit.address,
          data,
          arrField,
          parseInt(numid),
          5,
          "tr"
        );
      }

      break;
    }
    case 6: {
      var arrField = arrField6b;
      //详情
      let data = dataInfoParty(
        "secretary_info?id=" + numid.split(",")[1] + "&paginate=1"
      );
      //标注跳动点
      // readOneJsonFromVariable(data, arrField, parseInt(numid), 6);
      setAnimation(data.address, data, arrField, parseInt(numid), 6, "tr");
      // setAnimation(numid.split(',')[2], data, arrField, parseInt(numid), 6, 'tr');
      break;
    }
  }

  // });

}

//---a标签点击事件

function aClick() {
  if (!clickFlag) return
  clickFlag = false;
  $("#w").on("click", "tr td a", function (e) {
    var numid = $(e.target).attr("numid");
    switch (countNum) {
      case 0: {
        // var arrField = arrField0b;
        // let data = dataInfoParty('organization_info?id=' + numid.split(',')[1] + '&paginate=');

        // readOneJsonFromVariable(data, arrField, parseInt(numid));
        // setAnimation(numid.split(',')[2]);

        break;
      }
      case 1: {
        var arrField = arrField1b;

        //接入二级接口
        let data = dataInfoParty(
          "party_member_info?id=" + numid.split(",")[1] + "&paginate=1"
        );
        readOneJsonFromVariable(data, arrField, parseInt(numid), 1);
        setAnimation(data.address, data, arrField, parseInt(numid), 1);

        break;
      }
      case 2: {
        var arrField = arrField2b;

        //接入二级接口
        let data = dataInfoParty(
          "party_member_info?id=" + numid.split(",")[1] + "&paginate=1"
        );


        readOneJsonFromVariable(data, arrField, parseInt(numid), 2);
        setAnimation(data.address, data, arrField, parseInt(numid), 2);

        break;
      }
      case 3: {
        var arrField = arrField3b;
        let data = dataInfoParty(
          "three_work_info?id=" + numid.split(",")[1] + "&paginate=1"
        );
        readOneJsonFromVariable(data, arrField, parseInt(numid), 3);
        setAnimation(data.address, data, arrField, parseInt(numid), 3);

        break;
      }
      case 4: {
        var arrField = arrField4b;
        let data = dataInfoParty(
          "community_team_info?id=" + numid.split(",")[1] + "&paginate=1"
        );
        readOneJsonFromVariable(data, arrField, parseInt(numid), 4);
        setAnimation(data.address, data, arrField, parseInt(numid), 4);

        break;
      }
      case 5: {
        var arrField = arrField5b;
        // let data = dataInfoParty('region_unit_proj_alone_map?unit_id=' + numid.split(',')[1] + '&paginate=1');
        let data = "";
        if (loginType === 2) {
          data = dataInfoPartyType(
            "region_unit_community_alone/" +
            numid.split(",")[1] +
            "&paginate=1"
          );
        } else {
          data = dataInfoParty(
            "region_unit_proj_alone_map?unit_id=" +
            numid.split(",")[1] +
            "&paginate=1"
          );
        }

        readOneJsonFromVariable(data, arrField, parseInt(numid), 5);
        setAnimation(data.address, data, arrField, parseInt(numid), 5);

        break;
      }
      case 6: {
        var arrField = arrField6b;
        //详情
        let data = dataInfoParty(
          "secretary_info?id=" + numid.split(",")[1] + "&paginate=1"
        );

        //标注跳动点
        readOneJsonFromVariable(data, arrField, parseInt(numid), 6);

        setAnimation(data.address, data, arrField, parseInt(numid), 6);
        break;
      }
    }

    // if (countNum == 4) {

    //   readOneJsonFromVariable(documentName[countNum], arrField4b, parseInt(numid));
    // } else if (countNum == 5) {
    //   var aa = "",
    //     bb = "",
    //     cc = "",
    //     dd = "",
    //     ee = "",
    //     ff = "",
    //     gg = "",
    //     hh = "",
    //     ii = "";
    //   aa = "";

    //   for (j in qyhdjsj[numid]) {
    //     if (typeof qyhdjsj[numid][j] == 'object') {

    //       for (k in qyhdjsj[numid][j]) {
    //         bb += "<tr><td>" + qyhdjsj[numid][j][k]["unit"] + "</td></tr>";
    //         ee += "<tr><td>" + qyhdjsj[numid][j][k]["project"] + "</td></tr>";
    //         ff += "<tr><td>" + qyhdjsj[numid][j][k]["content"] + "</td></tr>";
    //       }
    //       dd += "<table class='aa'><tbody>" + bb + "</tbody></table>";
    //       gg += "<table class='bb'><tbody>" + ee + "</tbody></table>";
    //       hh += "<table class='cc'><tbody>" + ff + "</tbody></table>";
    //       bb = "", ee = "", ff = "";
    //       aa += "<td class='dd'>" + dd + "</td>" + "<td class='ee'>" + gg + "</td>" + "<td class='ff'>" + hh + "</td>";
    //     } else {
    //       if (j != 'icon')
    //         aa += "<td class='gg'>" + qyhdjsj[numid][j] + "</td>";
    //     }
    //   }
    //   aa = "<tr>" + aa + "</tr>";
    //   cc += aa;
    //   let table = '<table class="layui-table QuYuHuaDangJian" lay-even lay-skin="line" lay-size="sm" style="table-layout: fixed;">' + '<colgroup>' +
    //     '<col width="170">' + '<col width="200">' + '<col width="120">' + '<col width="170">' + '<col width="120">' +
    //     '</colgroup>';
    //   let thead = "<thead><th>单位名称</th><th>单位简介</th><th>单位地址</th><th>提出单位</th><th>认领项目</th><th>项目内容</th></thead>";
    //   let tbody = '<tbody>' + cc + '</tbody></table>';
    //   let str = table + thead + tbody;

    //   openWindows(str, qyhdjsj[numid].name);
    // } else {
    //   // readOneJsonFromVariable(documentName[countNum], arrField, parseInt(numid));
    // }
  });
  clickFlag = true;

}

//打开弹窗
function openWindows(con, title, width) {
  if (title == "三会一课内容" || title == "主题党日内容")
    con = "<div class='open-windows-con'>" + con + "</div>";
  let wdh = 1100;
  if (width) {
    wdh = width;
  } else {
    wdh = 1100;
  }
  layer.open({
    skin: "openWindows",
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      title +
      "</h3>" +
      "</p>",
    area: wdh + "px",
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

// //窗口变化重置页面
// $(window).resize(function () {
//   //设置容器的宽高
//   // y
// });

//创建li标签下的json
function readJsonFromVariable(documentName, arr, search, num) {
  $("table").remove();
  $(".uls-left").remove();

  let sear = "";
  search = arguments[2] ? arguments[2] : "";
  if (search !== "") sear = new RegExp(search);
  let strTH = "",
    item = "",
    str = "",
    status = 1,
    address = "",
    img = "",
    szClass = "";
  if (num === 6) {
    for (i in documentName.data) {
      img = "";
      // }
      if (sear !== "") {
        status = 1;
      } else {
        status = 2;
      }
      let msg = `${i +
        "," +
        documentName.data[i].id +
        "," +
        documentName.data[i].address}`;
      str =
        '<tr onclick="trClick(' + "'" + msg + "'" + ')"  data-num="' + i + '">';
      if (i == 0) {
        strTH += `<th> ${[arr[0][0]]} </th>`;
        strTH += `<th> ${[arr[1][0]]} </th>`;
        strTH += `<th> ${[arr[2][0]]} </th>`;
      }

      address = documentName.data[i].organization_name;

      str +=
        "<td style ='line-height : 100%;' title='" +
        address +
        "'>  <img  style = 'float:left;height : 16px;' src='./images/dh.png'/>" +
        documentName.data[i].name +
        "</td>";

      if (documentName.data[i].sex == 1) {
        str += "<td title=" + address + ">男</td>";
      } else {
        str += "<td title=" + address + ">女</td>";
      }

      str +=
        "<td class='addPartyEmblem'  title='" +
        address +
        "'>" +
        documentName.data[i].organization_name +
        "</td>";
      str += `<td><a   numid=${[
        i,
        documentName.data[i].id,
        documentName.data[i].address
      ]}>详情</a></td></tr>`;

      // }

      // if (documentName == szsj) {
      szClass = " sz_table";
      // }
      if (status == 2) {
        item += str;
      }
    }
    let a = 0,
      b = 0,
      c = 0,
      d = null;
    switch (5) {
      case 5: {
        a = 100;
        b = 60;
        c = 200;
        d = 80;
        break;
      }
    }
    let tabPag = creatPag(documentName);
    // //console.log(creatPag())
    $("#w").append(
      '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
      szClass +
      '" style="table-layout: fixed;">' +
      "<colgroup>" +
      "<col width=" +
      a +
      ">" +
      "<col  width=" +
      b +
      ">" +
      "<col  width=" +
      c +
      ">" +
      "<col  width=" +
      d +
      ">" +
      '<col width="50">' +
      "</colgroup>" +
      "<thead>" +
      strTH +
      "<th>详情</th>" +
      "</thead>" +
      item +
      "</table>" +
      tabPag
    );
    //注册分页事件
    //搜索模块二
    if (search) {
      pagEvent(dzhUrlList[num], documentName, arr, search, num);
    } else {
      pagEvent(dzhUrlList[num], documentName, arr, search, num);
    }
    if (sear != "") {
      $("#w table tbody tr").each(function (i, el) {
        $(el).attr("data-id", i);
      });
    }

    return true;
  }

  if (num === 1) {
    for (i in documentName.data) {
      img = "";
      // }
      if (sear !== "") {
        status = 1;
      } else {
        status = 2;
      }
      let msg = `${i +
        "," +
        documentName.data[i].id +
        "," +
        documentName.data[i].address}`;
      str =
        '<tr  onclick="trClick(' + "'" + msg + "'" + ')" data-num="' + i + '">';
      if (i == 0) {
        strTH += `<th> ${[arr[0][0]]} </th>`;
        strTH += `<th> ${[arr[1][0]]} </th>`;
        strTH += `<th> ${[arr[2][0]]} </th>`;
      }

      address = documentName.data[i].org_name;

      str +=
        "<td title='" +
        address +
        "' style ='line-height:100%;'> <img style=' height : 16px;float:left;' src= './images/dh.png'/>" +
        documentName.data[i].name +
        "</td>";

      if (documentName.data[i].sex == 1) {
        str += "<td title=" + address + ">男</td>";
      } else {
        str += "<td title=" + address + ">女</td>";
      }

      if (documentName.data[i].org_name === null) {
        str += "<td class='addPartyEmblem'></td>";
      } else {
        str +=
          "<td class='addPartyEmblem' title='" +
          address +
          "'>" +
          documentName.data[i].org_name +
          "</td>";
      }
      str += `<td><a numid=${[
        i,
        documentName.data[i].id,
        documentName.data[i].address
      ]}>详情</a></td></tr>`;
      szClass = " sz_table";
      if (status == 2) {
        item += str;
      }
    }
    let a = 100,
      b = 80,
      c = 180,
      d = 80;

    let tabPag = creatPag(documentName);
    $("#w").append(
      '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
      szClass +
      '" style="table-layout: fixed;">' +
      "<colgroup>" +
      "<col width=" +
      a +
      ">" +
      "<col  width=" +
      b +
      ">" +
      "<col  width=" +
      c +
      ">" +
      "<col  width=" +
      d +
      ">" +
      '<col width="50">' +
      "</colgroup>" +
      "<thead>" +
      strTH +
      "<th>详情</th>" +
      "</thead>" +
      item +
      "</table>" +
      tabPag
    );
    //注册分页事件
    pagEvent(dzhUrlList[num], documentName, arr, search, num);

    if (sear != "") {
      $("#w table tbody tr").each(function (i, el) {
        $(el).attr("data-id", i);
      });
    }

    return true;
  }

  //三长部分
  if (num === 3) {
    for (i in documentName.data) {
      //接口支持后放开
      //  if (documentName[i]["icon"] != '' && documentName[i]["icon"]) {
      //     img = '<img src="' + documentName[i]["icon"] + '" width="18">';
      //   } else {
      //     img = '';
      //   }

      status = 2;
      let msg = `${i +
        "," +
        documentName.data[i].id +
        "," +
        documentName.data[i].address}`;
      str =
        '<tr  onclick="trClick(' + "'" + msg + "'" + ')" data-num="' + i + '">';
      //----------------------------for----------------------------
      for (var j = 0; j < arr.length; j++) {
        // if (sear !== "" && sear.test(documentName[i][arr[j][1]])) {
        //   status = 2;
        // }
        if (i == 0) {
          strTH += `<th> ${[arr[j][0]]} </th>`;
        }
        let address = documentName.data[i].address;
        //判断性别
        if (arr[j][1] === "sex") {
          if (documentName.data[i].sex === 1) {
            str += "<td title=" + address + ">男</td>";
          } else {
            str += "<td title=" + address + ">女</td>";
          }
        }
        //决定姓名

        if (arr[j][1] === "name") {
          switch (documentName.data[i].political) {
            case "中共党员":
              str +=
                "<td title=" +
                address +
                " style='line-height:100%;'> <img style='height : 16px;float :left;' src='./images/dh.png'/>" +
                documentName.data[i].name +
                "</td>";

              break;
            case "民盟盟员":
              str +=
                "<td title=" +
                address +
                " style='line-height:100%;'> <img style='height : 16px;float :left;' src='./images/minm.png'/>" +
                documentName.data[i].name +
                "</td>";

              break;
            case "九三学社社员":
              str +=
                "<td title=" +
                address +
                " style='line-height:100%;'> <img style='height : 16px;float :left;' src='./images/jiusan.png'/>" +
                documentName.data[i].name +
                "</td>";

              break;

            default:
              str +=
                "<td title=" +
                address +
                ">" +
                documentName.data[i].name +
                "</td>";

              break;
          }
          // if (documentName.data[i].political === '中共党员') {
          // str += "<td title=" + address + ">" + documentName.data[i].name + "</td>";

          // } else {
          // str += "<td title=" + address + ">" + documentName.data[i].name + "</td>";

          // }
        }

        //决定职务
        if (arr[j][1] === "job") {
          str +=
            "<td title=" +
            documentName.data[i].job +
            ">" +
            documentName.data[i].job +
            "</td>";
        }

        // 决定地址

        if (arr[j][1] === "address") {
          str += "<td title=" + address + ">" + address + "</td>";
        }
      }

      //----------------------------for----------------------------
      if (documentName == szsj) {
        szClass = " sz_table";
      }
      str += `<td><a numid=${[
        i,
        documentName.data[i].id,
        documentName.data[i].address
      ]}>详情</a></td></tr>`;
      if (status == 2) {
        item += str;
      }
    }
    let a = 0,
      b = 0,
      c = 0,
      d = null;
    switch (countNum) {
      case 0: {
        a = 400;
        b = 50;
        break;
      }
      case 1: {
        a = 85;
        b = 50;
        c = 90;
        d = 110;
        break;
      }
      case 2: {
        a = 120;
        b = 50;
        c = 220;
        d = 50;
        break;
      }
      case 3: {
        a = 70;
        b = 45;
        c = 70;
        d = 120;
        break;
      }
      case 4: {
        a = 120;
        b = 80;
        c = 80;
        break;
      }
      case 5: {
        a = 250;
        b = 150;
        c = 50;
        break;
      }
    }
    let tabPag = creatPag(documentName);
    // //console.log(creatPag())
    $("#w").append(
      '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
      szClass +
      '" style="table-layout: fixed;">' +
      "<colgroup>" +
      "<col width=" +
      a +
      ">" +
      "<col  width=" +
      b +
      ">" +
      "<col  width=" +
      c +
      ">" +
      "<col  width=" +
      d +
      ">" +
      '<col width="50">' +
      "</colgroup>" +
      "<thead>" +
      strTH +
      "<th>详情</th>" +
      "</thead>" +
      item +
      "</table>" +
      tabPag
    );
    //注册分页事件

    if (search) {
      //console.log(dzhUrlList[num])
      //  //console.log(documentName)
      //  //console.log(arr)
      //console.log(search)
      //  //console.log(num)
      //  //console.log(num)
      //console.log('00000000000000000000000')
      pagEvent(
        dzhUrlList[num] + "?search_key=" + search,
        documentName,
        arr,
        search,
        num
      );
    } else {
      pagEvent(dzhUrlList[num], documentName, arr, search, num);
    }

    // if (sear != "") {
    //   $("#w table tbody tr").each(function (i, el) {
    //     $(el).attr("data-id", i);
    //   });
    // }

    return true;
  }

  //在职党员部分
  if (num === 2) {
    for (i in documentName.data) {
      //接口支持后放开
      //  if (documentName[i]["icon"] != '' && documentName[i]["icon"]) {
      //     img = '<img src="' + documentName[i]["icon"] + '" width="18">';
      //   } else {
      //     img = '';
      //   }
      // if (sear !== "") {
      //   x
      //   status = 1;
      // } else {
      status = 2;
      // }
      let msg = `${i +
        "," +
        documentName.data[i].id +
        "," +
        documentName.data[i].address}`;
      str =
        '<tr onclick="trClick(' + "'" + msg + "'" + ')" data-num="' + i + '">';
      //----------------------------for----------------------------
      for (var j = 0; j < arr.length; j++) {
        // if (sear !== "" && sear.test(documentName[i][arr[j][1]])) {
        //   status = 2;
        // }
        if (i == 0) {
          strTH += `<th> ${[arr[j][0]]} </th>`;
        }
        let address = documentName.data[i].address;
        //判断性别
        if (arr[j][1] === "sex") {
          if (documentName.data[i].sex === 1) {
            str += "<td title=" + address + ">男</td>";
          } else {
            str += "<td title=" + address + ">女</td>";
          }
        }
        //决定姓名

        if (arr[j][1] === "name") {
          str +=
            "<td title=" +
            address +
            " style='line-height:100%;'> <img style='height : 16px;float :left;' src='./images/dh.png'/>" +
            documentName.data[i].name +
            "</td>";
        }
        // 决定地址

        if (arr[j][1] === "address") {
          if (address) {
            str += "<td title=" + address + ">" + address + "</td>";
          } else {
            str += "<td></td>";
          }
        }
      }

      //----------------------------for----------------------------
      if (documentName == szsj) {
        szClass = " sz_table";
      }
      str += `<td><a numid=${[
        i,
        documentName.data[i].id,
        documentName.data[i].address
      ]}>详情</a></td></tr>`;
      if (status == 2) {
        item += str;
      }
    }
    let a = 0,
      b = 0,
      c = 0,
      d = null;
    switch (countNum) {
      case 0: {
        a = 400;
        b = 50;
        break;
      }
      case 1: {
        a = 85;
        b = 50;
        c = 90;
        d = 110;
        break;
      }
      case 2: {
        a = 120;
        b = 50;
        c = 220;
        d = 50;
        break;
      }
      case 3: {
        a = 70;
        b = 45;
        c = 70;
        d = 120;
        break;
      }
      case 4: {
        a = 120;
        b = 80;
        c = 80;
        break;
      }
      case 5: {
        a = 250;
        b = 150;
        c = 50;
        break;
      }
    }
    let tabPag = creatPag(documentName);
    // //console.log(creatPag())
    $("#w").append(
      '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
      szClass +
      '" style="table-layout: fixed;">' +
      "<colgroup>" +
      "<col width=" +
      a +
      ">" +
      "<col  width=" +
      b +
      ">" +
      "<col  width=" +
      c +
      ">" +
      "<col  width=" +
      d +
      ">" +
      '<col width="50">' +
      "</colgroup>" +
      "<thead>" +
      strTH +
      "<th>详情</th>" +
      "</thead>" +
      item +
      "</table>" +
      tabPag
    );
    //注册分页事件
    pagEvent(dzhUrlList[num], documentName, arr, search, num);
    // if (sear != "") {
    //   $("#w table tbody tr").each(function (i, el) {
    //     $(el).attr("data-id", i);
    //   });
    // }

    return true;
  }

  if (num === 0) {
    //console.log(documentName)
    //console.log('溜不溜')
    szClass = " sz_table";

    jsTree(documentName.organizations_tree);
    return true;
  }

  if (num === 4) {
    for (i in documentName.data) {
      //接口支持后放开
      //  if (documentName[i]["icon"] != '' && documentName[i]["icon"]) {
      //     img = '<img src="' + documentName[i]["icon"] + '" width="18">';
      //   } else {
      //     img = '';
      //   }
      if (sear !== "") {
        x;
        status = 1;
      } else {
        status = 2;
      }
      let msg = `${i +
        "," +
        documentName.data[i].id +
        "," +
        documentName.data[i].address}`;
      str =
        '<tr  onclick="trClick(' + "'" + msg + "'" + ')" data-num="' + i + '">';
      //----------------------------for----------------------------
      for (var j = 0; j < arr.length; j++) {
        if (sear !== "" && sear.test(documentName[i][arr[j][1]])) {
          status = 2;
        }
        if (i == 0) {
          strTH += `<th> ${[arr[j][0]]} </th>`;
        }
        let address = documentName.data[i].team_name;
        //判断性别

        //决定姓名
        if (arr[j][1] === "team_name") {
          str +=
            "<td title=" +
            address +
            ">" +
            documentName.data[i].team_name +
            "</td>";
        }

        if (arr[j][1] === "type") {
          str +=
            "<td title=" + address + ">" + documentName.data[i].type + "</td>";
        }
        if (arr[j][1] === "team_number") {
          str +=
            "<td title=" +
            address +
            ">" +
            documentName.data[i].team_number +
            "</td>";
        }
        if (arr[j][1] === "team_leader") {
          str +=
            "<td title=" +
            address +
            ">" +
            documentName.data[i].team_leader +
            "</td>";
        }
      }

      //----------------------------for----------------------------
      if (documentName == szsj) {
        szClass = " sz_table";
      }
      //console.log(documentName.data[i].organization_sync_id)
      str += `<td><a numid=${[
        i,
        documentName.data[i].id,
        documentName.data[i].address
      ]}>详情</a></td></tr>`;
      if (status == 2) {
        item += str;
      }
    }
    let a = 0,
      b = 0,
      c = 0,
      d = null;
    switch (countNum) {
      case 0: {
        a = 400;
        b = 50;
        break;
      }
      case 1: {
        a = 85;
        b = 50;
        c = 90;
        d = 110;
        break;
      }
      case 2: {
        a = 120;
        b = 50;
        c = 220;
        d = 50;
        break;
      }
      case 3: {
        a = 70;
        b = 45;
        c = 70;
        d = 120;
        break;
      }
      case 4: {
        a = 120;
        b = 80;
        c = 80;
        break;
      }
      case 5: {
        a = 250;
        b = 150;
        c = 50;
        break;
      }
    }
    let tabPag = creatPag(documentName);
    // //console.log(creatPag())
    $("#w").append(
      '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
      szClass +
      '" style="table-layout: fixed;">' +
      "<colgroup>" +
      "<col width=" +
      a +
      ">" +
      "<col  width=" +
      b +
      ">" +
      "<col  width=" +
      c +
      ">" +
      "<col  width=" +
      d +
      ">" +
      '<col width="50">' +
      "</colgroup>" +
      "<thead>" +
      strTH +
      "<th>详情</th>" +
      "</thead>" +
      item +
      "</table>" +
      tabPag
    );
    //注册分页事件
    pagEvent(dzhUrlList[num], documentName, arr, search, num);
    if (sear != "") {
      $("#w table tbody tr").each(function (i, el) {
        $(el).attr("data-id", i);
      });
    }
    return true;
  }

  if (num === 5) {
    if (loginType === 2) {
      for (i in documentName.data) {
        //接口支持后放开
        //  if (documentName[i]["icon"] != '' && documentName[i]["icon"]) {
        //     img = '<img src="' + documentName[i]["icon"] + '" width="18">';
        //   } else {
        //     img = '';
        //   }
        // if (sear !== "") {
        //   x
        //   status = 1;
        // } else {
        status = 2;
        // }
        let msg = `${i +
          "," +
          documentName.data[i].id +
          "," +
          documentName.data[i].address}`;
        str =
          '<tr  onclick="trClick(' +
          "'" +
          msg +
          "'" +
          ')" data-num="' +
          i +
          '">';
        //----------------------------for----------------------------
        for (var j = 0; j < arr.length; j++) {
          // if (sear !== "" && sear.test(documentName[i][arr[j][1]])) {
          //   status = 2;
          // }
          if (i == 0) {
            strTH += `<th> ${[arr[j][0]]} </th>`;
          }
          let address = documentName.data[i].address;
          //判断性别

          //决定姓名
          if (arr[j][1] === "community_name") {
            str +=
              "<td title=" +
              address +
              "><img style='height : 25px; float:left;' src=//file.shyunhua.com/" +
              documentName.data[i].icon +
              " alt ='logo'/>" +
              documentName.data[i].coorperate_unit_name +
              "</td>";
          }

          if (arr[j][1] === "unit_address") {
            str +=
              "<td title=" +
              address +
              ">" +
              documentName.data[i].address +
              "</td>";
          }
        }

        //----------------------------for----------------------------
        if (documentName == szsj) {
          szClass = " sz_table";
        }
        str += `<td><a numid=${[
          i,
          documentName.data[i].id,
          documentName.data[i].address
        ]}>详情</a></td></tr>`;
        if (status == 2) {
          item += str;
        }
      }
      let a = 0,
        b = 0,
        c = 0,
        d = null;
      switch (countNum) {
        case 0: {
          a = 400;
          b = 50;
          break;
        }
        case 1: {
          a = 85;
          b = 50;
          c = 90;
          d = 110;
          break;
        }
        case 2: {
          a = 120;
          b = 50;
          c = 220;
          d = 50;
          break;
        }
        case 3: {
          a = 70;
          b = 45;
          c = 70;
          d = 120;
          break;
        }
        case 4: {
          a = 120;
          b = 80;
          c = 80;
          break;
        }
        case 5: {
          a = 250;
          b = 140;
          c = 50;
          break;
        }
      }
      let tabPag = creatPag(documentName);
      // //console.log(creatPag())
      $("#w").append(
        '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
        szClass +
        '" style="table-layout: fixed;">' +
        "<colgroup>" +
        "<col width=" +
        a +
        ">" +
        "<col  width=" +
        b +
        ">" +
        "<col  width=" +
        c +
        ">" +
        "<col  width=" +
        d +
        ">" +
        '<col width="50">' +
        "</colgroup>" +
        "<thead>" +
        strTH +
        "<th>详情</th>" +
        "</thead>" +
        item +
        "</table>" +
        tabPag
      );
      //注册分页事件
      pagEvent(dzhUrlList[num], documentName, arr, search, num);
      if (sear != "") {
        $("#w table tbody tr").each(function (i, el) {
          $(el).attr("data-id", i);
        });
      }
      return true;
    } else {
      for (i in documentName.data) {
        //接口支持后放开
        //  if (documentName[i]["icon"] != '' && documentName[i]["icon"]) {
        //     img = '<img src="' + documentName[i]["icon"] + '" width="18">';
        //   } else {
        //     img = '';
        //   }
        // if (sear !== "") {
        //   x
        //   status = 1;
        // } else {
        status = 2;
        // }
        let msg = `${i +
          "," +
          documentName.data[i].id +
          "," +
          documentName.data[i].address}`;
        str =
          '<tr  onclick="trClick(' +
          "'" +
          msg +
          "'" +
          ')" data-num="' +
          i +
          '">';
        //----------------------------for----------------------------
        for (var j = 0; j < arr.length; j++) {
          // if (sear !== "" && sear.test(documentName[i][arr[j][1]])) {
          status = 2;
          // }
          if (i == 0) {
            strTH += `<th> ${[arr[j][0]]} </th>`;
            // strTH += `<th> ${[arr[j][0]]} </th>`;
          }
          let address = documentName.data[i].address;
          //判断性别

          //决定姓名
          if (j === 1) {
            str +=
              "<td title=" +
              address +
              "><img style='height : 25px; float:left;' src=//file.shyunhua.com/" +
              documentName.data[i].icon +
              " alt ='logo'/>" +
              documentName.data[i].unit_name +
              "</td>" +
              "<td title=" +
              address +
              ">" +
              documentName.data[i].address +
              "</td>";
          }

          // if (j=== 2) {
          //   str += "<td title=" + address + ">" + documentName.data[i].address + "</td>";
          // }
        }

        //----------------------------for----------------------------
        if (documentName == szsj) {
          szClass = " sz_table";
        }
        str += `<td><a numid=${[
          i,
          documentName.data[i].id,
          documentName.data[i].address
        ]}>详情</a></td></tr>`;
        if (status == 2) {
          item += str;
        }
      }
      let a = 0,
        b = 0,
        c = 0,
        d = null;
      switch (countNum) {
        case 0: {
          a = 400;
          b = 50;
          break;
        }
        case 1: {
          a = 85;
          b = 50;
          c = 90;
          d = 110;
          break;
        }
        case 2: {
          a = 120;
          b = 50;
          c = 220;
          d = 50;
          break;
        }
        case 3: {
          a = 70;
          b = 45;
          c = 70;
          d = 120;
          break;
        }
        case 4: {
          a = 120;
          b = 80;
          c = 80;
          break;
        }
        case 5: {
          a = 250;
          b = 140;
          c = 50;
          break;
        }
      }
      let tabPag = creatPag(documentName);
      // //console.log(creatPag())
      $("#w").append(
        '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
        szClass +
        '" style="table-layout: fixed;">' +
        "<colgroup>" +
        "<col width=" +
        a +
        ">" +
        "<col  width=" +
        b +
        ">" +
        "<col  width=" +
        c +
        ">" +
        "<col  width=" +
        d +
        ">" +
        '<col width="50">' +
        "</colgroup>" +
        "<thead>" +
        strTH +
        "<th>详情</th>" +
        "</thead>" +
        item +
        "</table>" +
        tabPag
      );
      //注册分页事件

      pagEvent(comminty, documentName, arr, search, num);
      if (sear != "") {
        $("#w table tbody tr").each(function (i, el) {
          $(el).attr("data-id", i);
        });
      }
    }

    //console.log(documentName)

    return true;
  }

  for (i in documentName) {
    if (documentName[i]["political_status"] == "党员") {
      img = '<img src="images/dh.png" width="18">';
      if (documentName[i]["unit"] == "文绮中学") {
        img =
          '<img src="images/dh.png" width="18"><img src="images/文绮中学.jpg" width="18">';
      }
    } else if (documentName[i]["icon"] != "" && documentName[i]["icon"]) {
      img = '<img src="' + documentName[i]["icon"] + '" width="18">';
    } else {
      img = "";
    }
    if (sear !== "") {
      status = 1;
    } else {
      status = 2;
    }
    str = '<tr data-num="' + i + '">';
    //----------------------------for----------------------------
    for (var j = 0; j < arr.length; j++) {
      if (sear !== "" && sear.test(documentName[i][arr[j][1]])) {
        status = 2;
      }
      if (i == 0) {
        strTH += `<th> ${[arr[j][0]]} </th>`;
      }
      address = documentName[i][arr[j][1]];

      if ([arr[j][1]] == "address") {
        address = documentName[i][arr[j][1]].replace(
          /上海市|([\u2E80-\u9FFF]+(区|镇|苑))|(甲|乙|丙)|(\w+(\-?\w+)?室)|(\w?楼.?(座|层))/g,
          ""
        );
      }
      //三长加党员图标
      if (
        [arr[j][1]] == "name" &&
        documentName[i]["political_status"] == "党员"
      ) {
        str +=
          "<td class='addPartyEmblem' title='" +
          address +
          "'>" +
          img +
          address +
          "</td>";
      }
      //区域化党建加logo
      else if ([arr[j][1]] == "name" && documentName[i]["icon"] != "") {
        str +=
          "<td class='addPartyEmblem' title='" +
          address +
          "'>" +
          img +
          address +
          "</td>";
      } else {
        str += "<td title='" + address + "'>" + address + "</td>";
      }
    }
    //----------------------------for----------------------------
    if (documentName == szsj) {
      szClass = " sz_table";
    }
    str += `<td><a numid=${i}>详情</a></td></tr>`;
    if (status == 2) {
      item += str;
    }
  }
  let a = 0,
    b = 0,
    c = 0,
    d = null;
  switch (countNum) {
    case 0: {
      a = 400;
      b = 50;
      break;
    }
    case 1: {
      a = 85;
      b = 50;
      c = 90;
      d = 110;
      break;
    }
    case 2: {
      a = 120;
      b = 50;
      c = 220;
      d = 50;
      break;
    }
    case 3: {
      a = 70;
      b = 45;
      c = 70;
      d = 120;
      break;
    }
    case 4: {
      a = 120;
      b = 80;
      c = 80;
      break;
    }
    case 5: {
      a = 250;
      b = 150;
      c = 50;
      break;
    }
  }
  $("#w").append(
    '<table lay-even lay-skin="line" lay-size="sm" class="layui-table' +
    szClass +
    '" style="table-layout: fixed;">' +
    "<colgroup>" +
    "<col width=" +
    a +
    "px>" +
    "<col  width=" +
    b +
    "px>" +
    "<col  width=" +
    c +
    "px>" +
    "<col  width=" +
    d +
    "px>" +
    '<col width="50">' +
    "</colgroup>" +
    "<thead>" +
    strTH +
    "<th>详情</th>" +
    "</thead>" +
    item +
    "</table>"
  );
  if (sear != "") {
    $("#w table tbody tr").each(function (i, el) {
      $(el).attr("data-id", i);
    });
  }
}

var tableArr = [],
  arrField = [];

//百分比换算
function percentCon(current, all) {
  var result = 0,
    cal = (current / all) * 100;
  if (cal <= 0) {
    result = 0;
  } else if (cal <= 20) {
    result = 1;
  } else if (20 < cal && cal <= 40) {
    result = 2;
  } else if (40 < cal && cal <= 60) {
    result = 3;
  }
  // if(60<cal && cal<=80  ){ result=4; }
  // if(80<cal  && cal<=100){ result=5; }
  else if (60 < cal && cal <= 95) {
    result = 4;
  } else if (95 < cal && cal <= 100) {
    result = 5;
  }
  return result;
}

//读取弹窗里的json数据
function readOneJsonFromVariable(documentName, arr, num, detail) {
  if (detail === 6) {
    if (documentName.sex === 2) {
      documentName.sex = "./images/bgz_famle.png";
    } else {
      documentName.sex = "./images/bgz_male.png";
    }
    let str = `<div class="bgz-map-parent h100">

        <div class="chid1">
            <ul style ="height : 60%";>
                <li> <img style="height : 190px;" src = "//file.shyunhua.com${
                  documentName.image
                }"alt = ""> </li>
                <li style="display: flex;
                            flex-flow: row wrap;
                            justify-content: center;
                            align-items: center;">
                    <p style="font-size:20px;font-weight: 700;">${
                      documentName.name
                    }</p>
                    <img style="height:20px;" src="${documentName.sex}" alt="">
                </li>
                <li>
                    <p>${documentName.age}周岁</p>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/bgz_phone.png" alt="">
                    <span>${documentName.phone}</span>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/mpa_bgz.png" alt="">
                    <span>${documentName.address}</span>
                </li>
            </ul>
        </div>
        <div class="child2">

                <div>
                <h2>党组织名称</h2>
                <p style="line-height:1.5em;">${
                  documentName.organization_name
                }</p>
            </div>


            <div class="center">
                <ul>
                    <li>
                        <p>委员数</p>
                        <p>副书记数</p>
                        <p>兼副书记数</p>
                    </li>
                    <li>
                        <p>${documentName.committee_member_count}</p>
                        <p>${documentName.deputy_secretary_count}</p>
                        <p>${documentName.parttime_deputy_secretary_count}</p>
                    </li>
                </ul>
            </div>

                <div>
                <p class='color-99'> <span class='color-33'> 职务: </span>${
                  documentName.job
                }</p>
                <p class='color-99'> <span class='color-33'> 职责: </span>${
                  documentName.duty
                }</p>
            </div>
            <div>
                <h2>服务理念</h2>
                <p style="line-height:1.5em;">${
                  documentName.service_purposes
                }</p>
            </div>
        </div>

    </div>`;

    openWindowsNewCreat(str, "班长工程", 800, 650);
  }

  if (detail === 5) {
    console.dir(documentName);
    console.log(detail);
    let str = "";
    if (loginType === 2) {
      str = `<div class="quhu_point flex-space-between-cloumn h100" style="width:100%;">
        <div class = "quhu_flex-center bor_bt">
            <img src="//file.shyunhua.com/${documentName.icon}" alt="">
            <p style="margin-left:1em;">${
              documentName.coorperate_unit_name
            }</p>
        </div>

        <div class="flex-space-between" style="height:60%;;width:100%;">
            
                <img style="max-width:360px;  max-height:360px;"  src = "//file.shyunhua.com/${
                  documentName.showcase_image
                }"  alt="图片">
           
            <p style="text-indent:2em;padding:0 2em;">${
              documentName.unit_intro
            }</p>
        </div>

        <div style="border-top:2px dashed #999; width: 100%; padding: 20px 0 0;" class="flex-space-between">
            <div>
                <ul class="flex-space-between" style="width:115%; height: 50px;">
                    <li class="flex-center"><img style="height: 40px;" src = "./images/mpa_bgz.png"  alt=""></li>
                    <li style="width:2px;height: 100%;background:#999;"></li>
                    <li class="flex-space-between-cloumn">
                        <span style="color:#999;">单位地址</span>
                        <span>${documentName.address}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
    } else {
      str = `<div class="quhu_point flex-space-between-cloumn h100">
        <div class = "quhu_flex-center bor_bt">
            <img style="height : 42px;" src="//file.shyunhua.com/${documentName.unit.icon}" alt="">
            <p style="margin-left:1em;">${
              documentName.unit.organization_name
            }</p>
        </div>

        <div class="flex-space-between" style="height:60%;;width:100%;">
            
                <img style="max-width:360px;  max-height:360px;"  src = "//file.shyunhua.com/${
                  documentName.unit.showcase_image
                }"  alt="">
           
            <p style="text-indent:2em;padding:0 2em;">${
              documentName.unit.intro
            }</p>
        </div>

        <div style="border-top:2px dashed #999; width: 100%; padding: 20px 0 0;" class="flex-space-between">
            <div>
                <ul class="flex-space-between" style="width:115%; height: 50px;">
                    <li class="flex-center"><img style="height: 40px;" src = "./images/mpa_bgz.png"  alt=""></li>
                    <li style="width:2px;height: 100%;background:#999;"></li>
                    <li class="flex-space-between-cloumn">
                        <span style="color:#999;">单位地址</span>
                        <span>${documentName.unit.address}</span>
                    </li>
                </ul>
            </div>
        </div>
    </div>`;
    }

    openWindowsNewCreat(str, "班长工程", 800, 600);
  }

  if (detail === 1) {
    switch (documentName.record) {
      case 1:
        documentName.record = "小学";
        break;
      case 2:
        documentName.record = "初中";
        break;
      case 3:
        documentName.record = "高中";
        break;
      case 4:
        documentName.record = "中专或大专";
        break;
      case 5:
        documentName.record = "本科";
        break;
      case 6:
        documentName.record = "研究生";
        break;
      case 7:
        documentName.record = "博士及以上";
        break;

      default:
        break;
    }

    if (documentName.sex === 2) {
      documentName.sex = "./images/famel_white.png";
    } else {
      documentName.sex = "./images/mael_white.png";
    }

    if (!documentName.health) {
      documentName.health = "良好";
    }

    if (documentName.orglife_join_precent) {
      documentName.orglife_join_precent = Math.ceil(
        (documentName.orglife_join_precent * 10) % 2
      );
    } else {
      documentName.orglife_join_precent = 0;
    }
    if (documentName.thematic_join_precent) {
      documentName.thematic_join_precent = Math.ceil(
        (documentName.thematic_join_precent * 10) % 2
      );
    } else {
      documentName.thematic_join_precent = 0;
    }
    let str = `<div class="bgz-map-parent h100">
        <div class="chid1">
            <ul style="height:52%;">
                <li style="display: flex;
                            min-width: 160px;
                            height: 160px;
                            flex-flow: row wrap;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            background-color: #fff;">
                    <div style="width:90%;height: 90%;background-color: #d30000;border-radius: 50%;color: #fff; display: flex;flex-flow: column  wrap;  justify-content: center;align-items: center;">
                        <p style="font-size:20px;font-weight: 700;line-height: 3em;">${
                          documentName.name
                        }</p>
                        <img style="height:20px;" src="${
                          documentName.sex
                        }" alt="">
                    </div>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/mpa_bgz.png" alt="">
                    <span>${documentName.address}</span>
                </li>
            </ul>
        </div>
        <div class="child2" style="height:100%;">
            <div>
                <h2>所属支部</h2>
                <p>${documentName.org_name}</p>
            </div>
            <div>
                <p class="color-33 fw700"><span class="color-99 fw700" style="width :6em;;">出生日期:</span><span
                        style="margin-left: 1em;">${documentName.birth.substr(
                          0,
                          10
                        )}</span></p>
                <p class="color-33 fw700"><span class="color-99 fw700" style="width :6em;">入党时间:</span><span style="margin-left: 1em;"></span>${
                  documentName.party_time ? documentName.party_time.substr(0,10) : '缺失'
                }</span></p>
            </div>

            <div class="center" style="height:24%;">
                <ul>
                    <li>
                        <p>学历</p>
                        <p>民族</p>
                        <p>健康状况</p>
                    </li>
                    <li>
                        <p>${documentName.record}</p>
                        <p>${documentName.nationality}</p>
                        <p>${documentName.health}</p>
                    </li>
                </ul>
            </div>

            <div class="hid" style="display: flex; justify-content: space-between;align-content: center;align-items: center;">
                <div class="bottom-party">
                    <h2>三会一课参与情况</h2>
                    <img style ="height:20px;" src="./images/star_${
                      documentName.orglife_join_precent
                    }.png" />
                </div>
                <div>
                    <h2>主题党日参与情况</h2>
                    <img style ="height:20px;" src = "./images/star_${
                      documentName.thematic_join_precent
                    }.png" />
                </div>
            </div>
        </div>

    </div>`;

    openWindowsNewCreat(str, "党员", 900, 500);
  }

  if (detail === 3) {
    if (documentName.sex === 2) {
      documentName.sex = "./images/famel_white.png";
    } else {
      documentName.sex = "./images/mael_white.png";
    }

    if (documentName.is_retire === 1) {
      documentName.is_retire = "未退休";
    } else {
      documentName.is_retire = "退休";
    }

    let str = `<div class="bgz-map-parent h100" style = "height :100%;">
        <div class="chid1">
            <ul style="height:70%;">
                <li style="display: flex;
                            min-width: 160px;
                            height: 160px;
                            flex-flow: row wrap;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            background-color: #fff;">
                    <div style="width:90%;height: 90%;background-color: #d30000;border-radius: 50%;color: #fff; display: flex;flex-flow: column  wrap;  justify-content: center;align-items: center;">
                        <p style="font-size:20px;font-weight: 700;  line-height: 3em;">${
                          documentName.name
                        }</p>
                        <img style="height:20px;" src="${
                          documentName.sex
                        }" alt="">
                    </div>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/mpa_bgz.png" alt="">
                    <span>${documentName.address}</span>
                </li>
            </ul>
        </div>
        <div class="child2" style="height:100%;" >
            <div>
                <h2>职务</h2>
                <p>${documentName.job}</p>
            </div>

            <div class="center" style="height:38%;">
                <ul>
                    <li>
                        <p>政治面貌</p>
                        <p>是否退休</p>
                        <p>出生日期</p>
                    </li>
                    <li>
                        <p>${documentName.political}</p>
                        <p>${documentName.is_retire}</p>
                        <p>${documentName.birth.substr(0, 10)}</p>
                    </li>
                </ul>
            </div>

        </div>

    </div>`;
    openWindowsNewCreat(str, "党员", 900, 360);
  }

  if (detail === 2) {
    if (documentName.sex === 2) {
      documentName.sex = "./images/famel_white.png";
    } else {
      documentName.sex = "./images/mael_white.png";
    }
    if (documentName.job_unit) {
      documentName.job_unit = documentName.job_unit;
    } else {
      documentName.job_unit = "";
    }
    switch (documentName.record) {
      case 1:
        documentName.record = "小学";
        break;
      case 2:
        documentName.record = "初中";
        break;
      case 3:
        documentName.record = "高中";
        break;
      case 4:
        documentName.record = "中专或大专";
        break;
      case 5:
        documentName.record = "本科";
        break;
      case 6:
        documentName.record = "研究生";
        break;
      case 7:
        documentName.record = "博士及以上";
        break;

      default:
        break;
    }

    documentName.party_time == null ?
      (documentName.party_time = "") :
      documentName.party_time;
    let str = `<div class="bgz-map-parent h100">
        <div class="chid1">
            <ul style="height:70%;">
                <li style="display: flex;
                            min-width: 160px;
                            height: 160px;
                            flex-flow: row wrap;
                            justify-content: center;
                            align-items: center;
                            border-radius: 50%;
                            background-color: #fff;">
                    <div style="width:90%;height: 90%;background-color: #d30000;border-radius: 50%;color: #fff; display: flex;flex-flow: column  wrap;  justify-content: center;align-items: center;">
                        <p style="font-size:20px;font-weight: 700; line-height: 3em;">${
                          documentName.name
                        }</p>
                        <img style="height:20px;" src="${
                          documentName.sex
                        }" alt="">
                    </div>
                </li>
                <li style="display: flex;
                            flex-flow: column;
                            justify-content: center;
                            align-items: center;">
                    <img style="height:30px;" src="./images/mpa_bgz.png" alt="">
                    <span>${documentName.address}</span>
                </li>
            </ul>
        </div>
        <div class="child2" style="height:100%;">
            <div>
                <h2>工作单位</h2>
                <p>${documentName.job_unit}</p>
            </div>

            <div class="center" style="height:38%;">
                <ul>
                    <li>
                        <p>学历</p>
                        <p>民族</p>
                        <p>入党日期</p>
                    </li>
                    <li>
                        <p>${documentName.record}</p>
                        <p>${documentName.nationality}</p>
                        <p>${documentName.party_time.substr(0, 10)}</p>
                    </li>
                </ul>
            </div>

        </div>

    </div>`;

    openWindowsNewCreat(str, "党员", 900, 340);
  }

  if (detail === 4) {
    let str = `<div class="flex-space-between-cloumn" style="padding: 0 50px 50px; width : 100%;">
        <div class="quhu_flex-center bor_bt">
            <img src="./images/dh.png" alt="">
            <p style="margin-left:1em;">${documentName.team_name}</p>
        </div>

        <div class="flex-space-between " style="padding: 50px 20px;">
            <p style="text-indent: 2em;">${documentName.team_intro}</p>
        </div>

        <div style="border-top:2px dashed #999; border-bottom:2px dashed #999; width: 100%; padding: 10px 0; height: 15%;"
            class="flex-space-between">
            <ul class="flex-space-between-cloumn" style="width : 100%;">
                <li class="flex-space-between color-99" style="width : 100%;">
                    <span class="w20">团队类型</span>
                    <span class="w20">负责人</span>
                    <span class="w20">负责人政治面貌</span>
                    <span class="w20">团队人数</span>
                    <span class="w20">成立日期</span>
                </li>
                <li class="flex-space-between color-33" style='width: 100%;'>
                    <span class="w20">${documentName.type}</span>
                    <span class="w20">${documentName.team_leader}</span>
                    <span class="w20">${
                      documentName.team_leader_political
                    }</span>
                    <span class="w20">${documentName.team_number}</span>
                    <span class="w20">${documentName.founding_time}</span>
                </li>
            </ul>
        </div>
    </div>`;

    openWindowsNewCreat(str, "党员", 900);
  }
}

//创建分页

function creatPag(data) {
  // let str = '<div class="uls-left" style="display: flex;justify-content: space-around;align-content: center;width: 450px;"><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;" onclick="pagTop()">首页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;" onclick="pagUp()">上一页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;" onclick=pagDown(\'' + url+","+ data+","+arr+","+search+","+num +'\')>下一页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;" onclick="pagTail()">尾页</p><p>' + data.current_page + '/' + data.last_page + '页</p></div>'
  let str =
    '<div class="uls-left" style="display: flex;justify-content: space-around;align-content: center;width: 450px;"><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;">首页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;" >上一页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;">下一页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;">尾页</p><p style="box-sizing: border-box;padding: 2px 10px;cursor: pointer;">' +
    data.current_page +
    "/" +
    data.last_page +
    "页</p></div>";

  return str;
}

let urlPag = "https://apijcdj.shyunhua.com/admin/data_map/";

//首页
function pagTop(url, arr, num) {
  page = 1;
  $.ajax({
    type: "get",
    url: urlPag + url,
    data: {
      paginate: paginate,
      page: page,
      community_id: selectedJC.community_id,
      community_sync_id: selectedJC.community_sync_id
    },
    success: function (res) {
      dataInfo = res.data.data;
      readJsonFromVariable(res.data, arr, searchFull, num); //读取json数据

      //标注地图函数
      formData(res.data, num, initInfoWindow);
    }
  });
}

//上一页
function pagUp(url, arr, num) {
  if (page <= 1) {
    page = 1;
  } else {
    page--;
  }
  $.ajax({
    type: "get",
    url: urlPag + url,
    data: {
      paginate: paginate,
      page: page,
      community_id: selectedJC.community_id,
      community_sync_id: selectedJC.community_sync_id
    },
    async: false,
    success: function (res) {
      dataInfo = res.data.data;

      readJsonFromVariable(res.data, arr, searchFull, num); //读取json数据

      //标注地图函数
      formData(res.data, num, initInfoWindow);
    }
  });
}

//下一页
/****
 * url 请求路径
 * data 初始化的请求数据
 * fn1 渲染左侧列表
 * fn2 地图标注
 *
 */
function pagDown(url, data, arr, search, num) {
  // function pagDown(ds) {
  // let info = JSON.parse(ds)

  if (page >= data.last_page) {
    page = data.last_page;
  } else {
    page++;
  }

  $.ajax({
    type: "get",
    url: urlPag + url,
    data: {
      paginate: paginate,
      page: page,
      community_id: selectedJC.community_id,
      community_sync_id: selectedJC.community_sync_id
    },
    success: function (res) {
      // dysj = res.data
      readJsonFromVariable(res.data, arr, searchFull, num); //读取json数据

      //  翻到最后一页
      dataInfo = res.data.data;

      //标注地图函数
      formData(res.data, num, initInfoWindow);
    }
  });
}

//尾页
function pagTail(url, data, arr, num) {
  page = data.last_page;
  // page = Math.ceil(dysj.total / paginate)
  $.ajax({
    type: "get",
    url: urlPag + url,
    data: {
      paginate: paginate,
      page: page,
      community_id: selectedJC.community_id,
      community_sync_id: selectedJC.community_sync_id
    },
    success: function (res) {
      readJsonFromVariable(res.data, arr, searchFull, num); //读取json数据
      dataInfo = res.data.data;

      //标注地图函数
      formData(res.data, num, initInfoWindow);
      //console.log(res.data);
    }
  });
}

//获取个人详细信息

function dataInfoParty(url) {
  let loginUrl = "";

  console.log(url.substr(0, 27))
  if (loginType === 2 && url.substr(0, 27) === 'region_unit_community_alone') {
    loginUrl = "https://apijcdj.shyunhua.com/admin/";
  } else {
    loginUrl = "https://apijcdj.shyunhua.com/admin/data_map/";

  }

  let data;

  $.ajax({
    type: "get",
    url: loginUrl + url,
    async: false,
    success: function (res) {
      data = res.data;
    }
  });
  //console.log(data)
  return data;
}

function dataInfoPartyType(url) {
  let data;

  $.ajax({
    type: "get",
    url: "https://apijcdj.shyunhua.com/admin/" + url,
    async: false,
    success: function (res) {
      data = res.data;
    }
  });
  //console.log(data)
  return data;
}

function pagEvent(url, data, arr, search, num) {
  //清除标注点
  deletePointAll();
  //注册事件首页
  $(".uls-left >P")
    .eq(0)
    .on("click", function () {
      pagTop(url, arr, num);
    });

  //注册事件上一页
  $(".uls-left >P")
    .eq(1)
    .on("click", function () {
      pagUp(url, arr, num);
    });

  //注册事件下一页
  $(".uls-left >P")
    .eq(2)
    .on("click", function () {
      pagDown(url, data, arr, search, num);
    });

  //注册事件尾页
  $(".uls-left >P")
    .eq(3)
    .on("click", function () {
      pagTail(url, data, arr, num);
    });
}

//清楚地图覆盖物
function deletePointAll() {
  var allOverlay = map.getOverlays();
  for (var i = 0; i < allOverlay.length - 1; i++) {
    map.removeOverlay(allOverlay[i]);
  }
}

//搜索接口
function searchFrom(arr, num) {
  searchFull = $("#search_btn_top").val();

  //  searchFull = 1;
  $.ajax({
    type: "get",
    url: urlPag + dzhUrlList[num] + "?search_key=" + searchFull,
    async: false,
    success: function (res) {
      dataInfo = res.data.data;
      readJsonFromVariable(res.data, arr, searchFull, num);
      formData(res.data, num, initInfoWindow);
    }
  });
}

// 地址解析逻辑判断 
function switchAddress(data) {

  if (data.backup_east_lon && data.backup_north_lat && data.first_position == 2) {
    return 2
  }
  if (data.east_longitude && data.north_latitude && data.first_position == 1) {
    return 1
  }
  if (data.building_east_longitude && data.building_north_latitude && data.first_position == 4) {
    return 4
  }

  return 3
}

//跳动点封装
function setAnimation(point, data, arrField, index, num, tr = false, touchMap) {

  if (animationPointList.length) {
    deletePoint(
      animationPointList,
      data,
      arrField,
      index,
      num,
      (tr = false),
      touchMap
    );
  }

  console.log("我也不知道", point, data);
  let flagType = switchAddress(data)

  if (flagType == 1 || flagType == 2 || flagType == 4) {

    let points
    // let points = {
    //   lat: Number(data.north_latitude),
    //   lng: Number(data.east_longitude)
    // }
    if (flagType == 1) {
      points = new BMap.Point(Number(data.east_longitude), Number(data.north_latitude))



    } else {
      points = new BMap.Point(Number(data.backup_east_lon), Number(data.backup_north_lat))

    }


    if (flagType == 4) {
      points = new BMap.Point(Number(data.building_east_longitude), Number(data.building_north_latitude))
    }
    let isArea = map.getBounds().containsPoint(points);
    var myIcon = new BMap.Icon("./images/7.png", new BMap.Size(64, 64), {
      anchor: {
        width: 30,
        height: 50
      }
    });

    var markerStep = new BMap.Marker(
      points, {
        icon: myIcon
      },
      15
    ); // 创建标注
    if (!isArea) map.centerAndZoom(points, 15);
    animationPointList.push(points);
    animationPointList.push(point);
    animationPointList.push(data);
    // debugger
    map.addOverlay(markerStep); // 将标注添加到地图中
    markerStep.setAnimation(BMAP_ANIMATION_BOUNCE);

    if (touchMap === "map") {
      if (num === 0) {} else {
        console.log('88888888888787777777777777777')
        readOneJsonFromVariable(data, arrField, index, num);
      }
    }

    markerStep.addEventListener("click", e => {
      console.log("插值测试02")

      map.closeInfoWindow();
      if (num === 0) {
        cardList(data);
      } else {
        readOneJsonFromVariable(data, arrField, index, num);
      }
      //console.log(e)
      //console.log(info)
      //console.log(num)
      // console.log('999999999999999')
    }); //跳动的动画
    //  map.removeOverlay(points);

  } else {
    myGeo.getPoint(
      point,
      function (points) {
        console.log(points)
        if (points) {
          let isArea = map.getBounds().containsPoint(points);
          var myIcon = new BMap.Icon("./images/7.png", new BMap.Size(64, 64), {
            anchor: {
              width: 30,
              height: 50
            }
          });
          var markerStep = new BMap.Marker(
            points, {
              icon: myIcon
            },
            15
          ); // 创建标注
          if (!isArea) map.centerAndZoom(points, 15);
          animationPointList.push(points);
          animationPointList.push(point);
          animationPointList.push(data);
          map.addOverlay(markerStep); // 将标注添加到地图中
          markerStep.setAnimation(BMAP_ANIMATION_BOUNCE);

          if (touchMap === "map") {
            if (num === 0) {} else {
              // console.log('88888888888787777777777777777')
              readOneJsonFromVariable(data, arrField, index, num);
            }
          }

          markerStep.addEventListener("click", e => {
            console.log("插值测试03")

            map.closeInfoWindow();
            if (num === 0) {

              cardList(data);
            } else {
              readOneJsonFromVariable(data, arrField, index, num);
            }
            //console.log(e)
            //console.log(info)
            //console.log(num)
            // console.log('999999999999999')
          }); //跳动的动画
          //  map.removeOverlay(points);
        } else {
          console.log("您选择地址没有解析到结果!");
        }
      },
      "上海市"
    );
  }


}

//删除指定点
function deletePoint(point, datas, arrField, index, num, tr = false, touchMap) {
  // map.clearOverlays();
  console.count("marker次数");


  var allOverlay = map.getOverlays();

  for (var i = 0; i < allOverlay.length; i++) {
    //删除指定经度的点

    if (!allOverlay[i].getPosition()) continue;

    if (
      allOverlay[i].getPosition().lng === point[0].lng &&
      allOverlay[i].getPosition().lat === point[0].lat
    ) {
      map.removeOverlay(allOverlay[i]);

      // return false;
    }
  }
  var myIcon = new BMap.Icon("./images/map_icon.png", new BMap.Size(25, 25));

  if (point[2].political === "中共党员" || index !== 3) {
    var markerStep = new BMap.Marker(point[0], {
      icon: myIcon
    });
  } else {
    var markerStep = new BMap.Marker(point[0]);
  }

  map.addOverlay(markerStep); // 将标注添加到地图中

  //注册点击事件
  markerStep.addEventListener("click", e => {
    console.log("插值测试04")


    if (index === 0) {
      cardList(point[2]);
    } else {
      setAnimation(
        point[1],
        point[2],
        arrField,
        index,
        num,
        (tr = false),
        touchMap
      );
    }
  });

  animationPointList = [];
}

//过滤整合数组
function dataFitting(data, arr1, arr2) {
  let dataAll = [];
  arr1.forEach((el, index) => {
    if (data == el) {
      dataAll.push(arr2[index]);
    }
  });

  return dataAll;
}

function jsTree(documentName) {
  console.dir(documentName);
  let dataFarmat = [];

  //第一层数据
  getJason(documentName);
  //第一层数据处理
  function getJason(documentName) {
    for (let el = 0; el < documentName.length; el++) {
      let data = {
        id: documentName[el].sync_id,
        parent: "#",
        text: documentName[el].name
      };
      dataFarmat.push(data);
    }
  }

  let send = []; //第二层数据
  let sendAll = []; //第二层上层所有数据
  dataSend(documentName, dataFarmat);
  //第二层数据处理
  function dataSend(documentName, dataFarmat) {
    for (let i = 0; i < documentName.length; i++) {
      // if (dataFarmat[i].child) {
      for (let j = 0; j < documentName[i].child.length; j++) {
        let data = {
          id: documentName[i].child[j].sync_id,
          parent: dataFarmat[i].id,
          text: documentName[i].child[j].name
        };
        send.push(data);
        sendAll.push(documentName[i].child[j].child);
      }
      // }
    }
  }

  let third = []; //第三层数据
  let thirdAll = []; //第三层所有数据
  dataThrid(sendAll, send);

  function dataThrid(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (!arr1[i].length) continue;
      for (let j = 0; j < arr1[i].length; j++) {
        let data = {
          id: arr1[i][j].sync_id,
          parent: arr2[i].id,
          text: arr1[i][j].name
        };

        third.push(data);
        thirdAll.push(arr1[i][j].child);
      }
    }
  }

  //处理第四层数据
  let fourth = [];
  let fourthAll = [];
  dataFourth(thirdAll, third);

  function dataFourth(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (!arr1[i].length) continue;
      for (let j = 0; j < arr1[i].length; j++) {
        let data = {
          id: arr1[i][j].sync_id,
          parent: arr2[i].id,
          text: arr1[i][j].name
        };

        fourth.push(data);
        fourthAll.push(arr1[i][j].child);

      }
    }
  }
  // 处理第五层数据

  let fiv = [];
  let fivAll = [];
  dataFiv(fourthAll, fourth)

  function dataFiv(arr1, arr2) {
    for (let i = 0; i < arr1.length; i++) {
      if (!arr1[i].length) continue;
      for (let j = 0; j < arr1[i].length; j++) {
        let data = {
          id: arr1[i][j].sync_id,
          parent: arr2[i].id,
          text: arr1[i][j].name
        };

        fiv.push(data);
        fivAll.push(arr1[i][j].child);

      }
    }
  }

  //数组整合

  let detail = {
    core: {
      animation: 0,
      themes: {
        dots: true,
        icons: true,
        stripes: false
      },
      check_callback: true,
      multiple: false,
      data: dataFarmat
        .concat(send)
        .concat(third)
        .concat(fourth)
        .concat(fiv)
    }
  };
  // console.dir(detail);

  $("#w").unbind();
  $("#w")
    .data("jstree", false)
    .empty();
  $("#w").jstree(detail);

  aClick();

  $("#w").on("changed.jstree", function (e, data) {
    console.count("ajax");
    $.ajax({
      type: "get",
      url: urlPag + "organization_info",
      data: {
        sync_id: data.selected
      },
      success: function (res) {
        let data = res.data;

        cardList(data);
      }
    });
    //console.log(data.selected)
  });
}

//查看大图
function lagImg(img, title) {
  layer.open({
    skin: "openWindows",
    type: 1,
    title: "<p>" +
      '<s style="background-image: url(images/dh.png);display: inline-block;width: 28px;height: 28px;background-size: contain;vertical-align: middle;float: left;margin-top: 6px;"></s>' +
      '<h3 style="font-family: 楷体;font-size: 22px; text-align: center;color: #f00;font-weight: bold;">' +
      title +
      "</h3>" +
      "</p>",
    area: ["1440px", "1080px"],
    content: '<img style="width :100%;" src="//file.shyunhua.com/' + img + '"/>',
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

//百度地图清除页面所有覆盖物

function clearAllCover() {
  map.centerAndZoom(121.424101, 31.015066, 15);
  map.clearOverlays();
}

function formDate(time) {
  console.log(time);
  let date = new Date(Number(time) * 1000);
  let y = date.getFullYear();
  let m =
    date.getMonth() + 1 < 10 ?
    "0" + (date.getMonth() + 1) :
    date.getMonth() + 1;
  let d = date.getDate();

  return y + "-" + m + "-" + d;
}