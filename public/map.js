// // 百度地图API功能	
// map = new BMap.Map("allmap");

// map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放

// var mapType2 = new BMap.MapTypeControl({
//     anchor: BMAP_ANCHOR_TOP_LEFT
// });


// var overView = new BMap.OverviewMapControl();
// var top_left_control = new BMap.ScaleControl({
//     anchor: BMAP_ANCHOR_BOTTOM_LEFT
// }); // 左上角，添加比例尺
// var top_left_navigation = new BMap.NavigationControl({

//     anchor: BMAP_ANCHOR_BOTTOM_LEFT

// }); //左上角，添加默认缩放平移控件
// var top_right_navigation = new BMap.NavigationControl({
//     anchor: BMAP_ANCHOR_TOP_RIGHT,
//     type: BMAP_NAVIGATION_CONTROL_SMALL
// });
// map.centerAndZoom(new BMap.Point(121.37869, 31.11347), 15);
// // map.addControl(mapType1); //2D图，卫星图
// map.addControl(mapType2); //左上角，默认地图控件
// map.setCurrentCity("上海"); //由于有3D图，需要设置城市哦
// // map.addControl(overView); //添加默认缩略地图控件
// // map.addControl(overViewOpen);
// map.addControl(top_left_control);
// map.addControl(top_left_navigation);
// // map.setMapStyleV2({
// //     styleId: '8323eae086761949754ae4320250b096'
// // });
// var data_info = [
//     [121.37869, 31.11347, "28幢"],
//     [121.393602, 31.10843, "48幢"],
//     [121.384188, 31.102617, "68幢"]
// ];
// var opts = {
//     width: 250, // 信息窗口宽度
//     height: 80, // 信息窗口高度
//     title: "信息窗口", // 信息窗口标题
//     enableMessage: true //设置允许信息窗发送短息
// };
// for (var i = 0; i < data_info.length; i++) {
//     var marker = new BMap.Marker(new BMap.Point(data_info[i][0], data_info[i][1])); // 创建标注
//     var content = data_info[i][2];
//     map.addOverlay(marker); // 将标注添加到地图中
//     addClickHandler(content, marker);
// }

// function addClickHandler(content, marker) {
//     marker.addEventListener("click", function (e) {
//         openInfo(content, e)
//     });
// }

// function openInfo(content, e) {
//     var p = e.target;
//     var point = new BMap.Point(p.getPosition().lng, p.getPosition().lat);
//     var infoWindow = new BMap.InfoWindow(content, opts); // 创建信息窗口对象 
//     map.openInfoWindow(infoWindow, point); //开启信息窗口

// }

// document.body.onmousewheel = function (event) {
//     event = event || window.event;
//     console.dir(event.deltaX);
//     console.dir(event.deltaY);
//     console.dir(event.deltaZ);
// };

// function getMousePos(event) {
//     var e = event || window.event;
//     var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
//     var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
//     var x = e.pageX || e.clientX + scrollX;
//     var y = e.pageY || e.clientY + scrollY;
//     //alert('x: ' + x + '\ny: ' + y);
//     return {
//         'x': x,
//         'y': y
//     };
// }

// console.log(getMousePos());
// // src = "//api.map.baidu.com/api?v=3.0&ak=ez8xna1RGlwCM2gl9qXc6TieCiGBzGFV" > < /script>