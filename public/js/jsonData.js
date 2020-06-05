const url = "https://apijcdj.shyunhua.com/admin/data_map";
const locallUrl = "https://apijcdj.shyunhua.com";

// const url = '//party.com/admin/data_map';
// const locallUrl = '//party.com';
const imgUrl = "//file.shyunhua.com/";

var dysj, dzzsj, qyhdjsj, szsj, tddjsj, zzdysj;
var selectedJC = {
  community_id: null,
  community_sync_id: null,
  paginate: 50
};

let refFlag = "0";
$.ajaxSetup({
  xhrFields: {
    withCredentials: true
  },
  crossDomain: true,
  complete: function (xhr, status) {
    if (xhr.responseJSON.code === 213) {
      console.log(xhr.responseJSON.code);
      refFlag = "1";
      window.location.href = "./login.html";
    }
  }
});
var countNum; //ul序号
$.ajax({
  type: "get",
  async: false,
  url: "https://apijcdj.shyunhua.com/admin/data_map/community_swap_list",
  success: function (res) {
    let str = "";
    let ulrTop = `<ul>`;
    let urlEnd = `</ul>`;

    res.data.data.forEach((el, index) => {
      str += ` <li data-value='${[el.id, el.sync_id]}'>${el.name}</li>`;
    });

    str = ulrTop + str + urlEnd;

    $("#select").on("click", function () {
      tootleClass();
      $(".layui-form.search_btn_top").remove();
      $("#selectChildren").append(str);
    });

    $("#selectChildren").on("click", "li", function (e) {
      tootleClass();

      $("#partyBanner").text(
        e.target.innerText.substr(
          0,
          e.target.innerText.length <= 5 ?
          e.target.innerText.length :
          e.target.innerText.length - 5
        ) + "居民区智慧党建地图"
      );
      $("#select p").text(e.target.innerText);

      // selectedJC = e.target.dataset.value;
      console.log(e.target.dataset.value.split(","));
      if (e.target.dataset.value.split(",")[0] === "1") {
        selectedJC = {
          community_id: null,
          community_sync_id: null,
          paginate: 50
        };
      } else {
        console.log("9999999999999999999999999");
        selectedJC = {
          community_id: e.target.dataset.value.split(",")[0],
          community_sync_id: e.target.dataset.value.split(",")[1],
          paginate: 50
        };
      }

      switch (countNum) {
        case 0: {
          // deletePoint()
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
          // deletePoint()
          dysjFn();
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
          // deletePoint()
          zzdysjFn();
          dataInfo = zzdysj.data;
          // $(".dots").remove();

          // addSearchBox(zzdysj, arrField2a);

          readJsonFromVariable(zzdysj, arrField2a, searchFull, 2); //读取json数据
          formData(zzdysj, 2, initInfoWindow); //备用弹窗提示
          clearAllCover();
          // createPoints(createPointFromVariable(documentName[2], arrFieldPoint, num)); //创建坐标点
          break;
        }
        case 3: {
          // deletePoint()
          szsjFn();

          dataInfo = szsj.data;

          addSearchBox(szsj, arrField3a);

          readJsonFromVariable(szsj, arrField3a, searchFull, 3); //读取json数据
          formData(szsj, 3, initInfoWindow); //备用弹窗提示
          clearAllCover();

          break;
        }
        case 4: {
          // deletePoint()
          tddjsjFn();

          dataInfo = tddjsj.data;

          // addSearchBox(documentName[4], arrField4a);
          readJsonFromVariable(tddjsj, arrField4a, searchFull, 4); //读取json数据
          formData(tddjsj, 4, initInfoWindow); //备用弹窗提示
          clearAllCover();
          // createPoints(jsonPoint(documentName[5], arrFieldPoint, num));//创建坐标点
          break;
        }
        case 5: {
          // deletePoint()
          if (loginType === 2) {
            qyhdjsjFn();

            dataInfo = qyhdjsj.data;

            // addSearchBox(qyhdjsj, arrField5a);

            readJsonFromVariable(qyhdjsj, arrField5a, arrField4a, 5); //读取json数据
            formData(qyhdjsj, 5, initInfoWindow); //备用弹窗提示
            clearAllCover();
          } else {
            qyhdjsjFn();

            dataInfo = qyhdjsj.data;

            // addSearchBox(qyhdjsj, arrField5a);

            readJsonFromVariable(qyhdjsj, arrField5a, arrField4a, 5); //读取json数据
            formData(qyhdjsj, 5, initInfoWindow); //备用弹窗提示
            clearAllCover();
          }
          break;
        }
        case 6: { // let start = window.performance.now();
          // deletePoint()
          bzgcFn();
          console.log("fffffffffffffffffffffffff");
          dataInfo = bzgc.data;
          // addSearchBox(bzgc, arrField6a);

          readJsonFromVariable(bzgc, arrField6a, "", 6); //读取json数据
          formData(bzgc, 6, initInfoWindow); //备用弹窗提示

          clearAllCover();
          //     let end = window.performance.now()
          // console.timeEnd(end-start)

          break;
        }
      }
    });
  }
});

// 重新请求所有数据
//判断class

function tootleClass() {
  $("#selectChildren").empty();
  if ($("#selectChildren").is(".selectChildrenSilde")) {
    $("#selectChildren").removeClass("selectChildrenSilde");
  } else {
    $("#selectChildren").addClass("selectChildrenSilde");
  }
}

function dysjFn() {
  $.ajax({
    url: url + "/party_member",
    data: selectedJC,
    type: "get",
    async: false,
    success: function (res) {
      dysj = res.data;
    }
  });
}

// dysjFn();

function dzzFn() {
  $.ajax({
    async: false,
    url: url + "/organization",
    type: "get",
    data: selectedJC,
    success: function (res) {
      dzzsj = res.data;
    }
  });
}

// dzzFn();

function qyhdjsjFn() {
  let urls = "";
  if (loginType === 2) {
    urls = locallUrl + "/admin/region_unit_community_alone";
  } else {
    urls = url + "/region_unit_alone";
  }
  $.ajax({
    type: "get",
    async: false,
    url: urls,
    data: selectedJC,
    success: function (res) {
      qyhdjsj = res.data;
    }
  });
}
// qyhdjsjFn()
var shyksj = [{
    num: "1",
    title: "凤凰景苑居民区党支部召开党员民主生活会",
    time: "2018/3/15",
    content: "<p class= MsoNormal  align= left >  为学习贯彻党的十九大精神、新党章，落实习近平总书记关于纠正“四风”不止、作风建设永远在路上的重要指示精神，为进一步提高社区党支部的凝聚力、战斗力，<span>2018</span>年<span>3</span>月<span>15</span>日下午<span>2</span>点半，凤凰景苑党支部召开党员民主生活会，会议由凤凰景苑居民区居委主任吴昕甲主持，江川路街道党工委副书记宗华参加了此次会议。<span></span>  </p> <p class= MsoNormal  align= left >  <span style= line-height:1.5; >会上，吴主任首先围绕凤凰景苑社区</span><span style= line-height:1.5; >2017</span><span style= line-height:1.5; >年度工作开展情况和存在不足及</span><span style= line-height:1.5; >2018</span><span style= line-height:1.5; >年工作打算向在座的党员进行了汇报，近日围绕社区大调研工作的机会，多深入居民中，了解居民急难愁的问题。与会人员在听取报告后，大家畅所欲言，对社区工作提出了许多诚恳的意见和建议。而后每一位党员结合自身工作实际进行了批评与自我批评。</span>  </p> <p class= MsoNormal  align= left >  <span></span>  </p> <p class= MsoNormal  align= left >  最后，宗华副书记针对会上吴主任及各位党员的发言情况提出整改工作要求，居委积极开展大调研工作，发挥小区自身优势，根据分层分类来组织好形式多样的活动，通过活动凝聚人心。关心好社区各类人群，利用好社区软硬件。要在特色上下功夫，开展符合需求的项目，吸引更多层次居民参与，使社区生活更精彩。社区党员是骨干，团结好群众把凤凰景苑社区推向更好的局面。<span></span>  </p> <p class= MsoNormal  align= left >  通过召开民主生活会，不仅促进了班子成员间的沟通与了解，增强了集体意识，进一步加强了社区党支部的凝聚力和战斗力。也使全体党员的思想进一步提高，增强了团结，达到了互相促进，共同提高的目的。社区全体党员表示，在<span>2018</span>年的工作中要提高思想认识，转变思想观念，进一步加强学习，不断提高自己的能力素质，努力做好本职工作，提高为民服务质量。<span></span>  </p> <p>  <br /> </p>"
  },
  {
    num: "2",
    title: "不忘初心，砥砺前行——学习十九大报告分享会",
    time: "2018/3/15",
    content: "<p class='MsoNormal' align='left'>  为了深入学习、贯彻党的十九大精神，<span>3</span>月<span>15</span>日下午<span>1:30</span>凤凰景苑党支部与文绮中学党支部在凤凰景苑会议室共同学习十九大报告。在学习开始前，凤凰景苑吴主任结合大调研工作，向党员们问计问策问需。随后，凤凰景苑党支部特邀文绮中学德育学生处袁杏萍老师为社区党员及文绮中学党员们带来了一堂生动的党课。<span></span>  </p> <p class='MsoNormal' align='left'>  <br /> </p> <p class='MsoNormal' align='left'>  分享会通过视频形式解读中国历史上十个方面的成就，以及过去五年的工作回顾、取得的巨大成就、新时代的历史使命、新时代的基本方略及新时代的中国特色四大主题展开。袁老师通过视频展示又重点阐述了三大方面：一、当前我国主要矛盾：人民日益增长的美好生活需要和不平衡不充分的发展之间的矛盾。二、播放上海苏州河治理项目视频，讲述上海近些年大力改善环境整治的举措。最后，分享会上强调十九大目标在<span>2020</span>年中国全部实现脱贫，在社会主义发展的新时代加强农村发展，年轻人深入农村，发挥自身特长优势。<span></span>  </p> <p> 在座的每一位党员都十分投入，认真地听着袁老师讲课。此次党课生动地解读、宣传党的十九大精神，从而全面学习、贯彻落实十九大精神，为社区营造浓厚的学习氛围，提高党员的政治理论知识，提升党员的政治素养。</p>  <p>  <br /> </p> <p class='MsoNormal' align='left'>  <span></span>  </p>"
  },
  {
    num: "3",
    title: "组织观看影片《厉害了，我的国》",
    time: "2018/3/22",
    content: "<p class='MsoNormal' align='left'>  西部开发，东北振兴，中部崛起，东部率先；全世界最大的基本医疗保障网；<span>173</span>项扶贫政策……纪录电影《厉害了，我的国》近日在全国上映，引起全国上下强烈反响，每个人都为国家强大欢呼自豪。<span>3</span>月<span>22</span>日下午凤凰景苑社区积极组织社区党员以及平安巡逻志愿者收看，见证中国力量。<span></span>  </p> <p class='MsoNormal' align='left' style=''>  影片将祖国的发展和成就呈现于银幕之上，不仅记录了中国桥、中国路、中国车、中国港、中国网等一个个超级工程，还展示了人类历史上最大的射电望远镜<span>FAST</span>、全球最大的海上钻井平台“蓝鲸<span>2</span>号”、磁悬浮列车、<span>5G</span>技术等引领人们走向新时代的里程碑式科研成果。从圆梦工程到创新科技，从绿色中国到共享小康，电影将其背后的故事娓娓道来。<span></span>  </p> <p class='MsoNormal' align='left' style=''>  <span style='line-height:1.5;'> 凤凰景苑居委干部吴昕甲：</span><span style='line-height:1.5;'>“</span><span style='line-height:1.5;'>我们的国家在飞速发展，人们的生活都在逐步提高。作为一名居委干部，做好社区大调研工作，化民忧、解民愁、聆听百姓心声。团结社区党员，为我们的社区和谐，贡献我们自己的智慧和力量。</span><span style='line-height:1.5;'>”</span>  </p>"
  },
  {
    num: "4",
    title: "十九大报告学习",
    time: "2018/1/25",
    content: "<p class='MsoNormal' align='left'>转眼间到了2017年的最后一个月，凤凰景苑党支部于2018年1月上午开展本年度最后一次党员组织生活会。此次生活会围绕学习宣传贯彻党的十九大精神专题学习会。 </p> <p style='text-indent:25.8pt;'>  凤凰景苑党支部书记顾倩倩主持此次会议，向凤凰景苑支部党员们数读十九大报告，透过数字学习报告精神。透过报告解读，让全体党员充分认识学习宣传贯彻党的十九大精神的重大意义，并让大家明白我党作出的重大决策、部署以及今后的发展方向。 </p> <p style='text-indent:25.8pt;'>  <span style='line-height:1.5;'>通过学习让全体党员全面理解和准确把握党的十九大精神实质。又结合当前社区实际提出要把学习宣传贯彻党的十九大精神作为当前和今后一个时期最重要的政治任务，以高度的责任感和使命感，综合运用多种方式广泛宣传贯彻。 同时，党员们一起共同学习新党章。</span>  </p> <p class='MsoNormal'>学习结束后，凤凰景苑社区党员又参与了社区实践活动——香薰蜡烛DIY手作会，与社区志愿者共同制作蜡烛，营造浓厚的冬季温馨、暖融融的氛围。 </p> <div>  <br /> </div>"
  },
  {
    num: "5",
    title: "凤凰景苑居委组织党员观影《邹碧华》",
    time: "2018/4/13",
    content: "<p class='MsoNormal'>影片《邹碧华》真实生动地描述了被誉为<span>“</span>时代楷模<span>”</span>的人民法官邹碧华的感人事迹，从多方面对邹碧华的理想追求、奉献精神和改革实践作了生动的艺术诠释，精心塑造了一位为司法事业鞠躬尽瘁、死而后已、法制建设<span>“</span>燃灯者<span>”</span>的银幕形象，影片情节朴实，但因其具体真实而感人。 </p> <p class='MsoNormal'><span style='line-height:1.5;'> 影片结束，大家都感慨颇多，不少党员同志流下了感动的泪水。党员们被这位在司法岗位上奉献着自己，直到生命最后一刻的“燃灯者”——邹碧华同志的事迹深深打动，表示要学习他不忘初心、牢记使命，坚守信念、敢于担当，鞠躬尽瘁、知行合一的精神。</span>  </p> <p class='MsoNormal' align='left'>  <span></span>  </p> <p class='MsoNormal' align='left'>  <br /> </p>"
  },
  {
    num: "6",
    title: "凤凰景苑党支部组织参观金山卫抗战遗址纪念园",
    time: "2018/5/18",
    content: "<p style='text-align:justify;'>为了回顾红色历史，加强爱国主义思想教育。<span>5</span>月<span>18</span>日上午，凤凰景苑居民区党支部组织支部党员、青年团干以及社区骨干们参观金山卫抗战遗址纪念园。 </p> <p style='text-align:justify;text-indent:32.0pt;'>  在讲解员的带领下，大家参观了抗日主题石雕壁画、中心雕塑、“十月初三惨案”记事碑墙、抗日故事紫砂浮雕壁画、被害乡民纪念墙、古城墙遗址和日军碉堡、警世钟亭、金山卫城南门侵华日军登陆处碑，以及“侵华日军在金山的暴行”主题陈列室。 </p> <p style='text-align:justify;text-indent:32.0pt;'>  随后党员们和骨干居民们还认真参观了金山卫抗战史料馆。通过大量史料和实物，反映了中国军民顽强抵抗日本侵略者的史实。通过参观学习，全体成员接受了一次深刻的爱国主义思想洗礼。大家纷纷表示，要牢记革命先烈不畏牺牲勇敢反抗的革命精神和全心全意为人民服务的宗旨，不忘历史，继往开来，发挥党员模范先锋带头作用，在自己的工作岗位上，为社区建设发展做出更大贡献。<span> </span>  </p>"
  }
];

function szsjFn() {
  $.ajax({
    type: "get",
    url: url + "/three_work",

    data: selectedJC,
    async: false,
    success: function (data) {
      szsj = data.data;
    }
  });
}
// szsjFn()
var tddj = [{
    name: " 诸品芳",
    address: "景谷中路58弄25号",
    political: "群众",
    group: "太极队",
    x: "2236",
    y: "913",
    sort: "5"
  },
  {
    name: "孔洁",
    address: "景谷中路58弄21号",
    political: "群众",
    group: "太极队",
    x: "1733",
    y: "766",
    sort: "5"
  },
  {
    name: "张雪珍",
    address: "景谷中路58弄3号",
    political: "群众",
    group: "太极队",
    x: "1650",
    y: "1113",
    sort: "5"
  },
  {
    name: "张红艳",
    address: "景谷中路58弄31号",
    political: "群众",
    group: "太极队",
    x: "2385",
    y: "743",
    sort: "5"
  },
  {
    name: "张秋芳",
    address: "景谷中路58弄33号",
    political: "群众",
    group: "太极队",
    x: "2164",
    y: "682",
    sort: "5"
  },
  {
    name: "梁红玉",
    address: "景谷中路58弄31号",
    political: "群众",
    group: "太极队",
    x: "2378",
    y: "748",
    sort: "5"
  },
  {
    name: "姚惠仙",
    address: "景谷中路58弄21号",
    political: "群众",
    group: "太极队",
    x: "1726",
    y: "766",
    sort: "5"
  },
  {
    name: "路芳仙",
    address: "景谷中路58弄26号",
    political: "群众",
    group: "太极队",
    x: "2368",
    y: "943",
    sort: "5"
  },
  {
    name: "栗士杰",
    address: "景谷中路58弄42号",
    political: "群众",
    group: "太极队",
    x: "2273",
    y: "513",
    sort: "5"
  },
  {
    name: "丁秀芳",
    address: "景谷中路58弄5号",
    political: "群众",
    group: "太极队",
    x: "2348",
    y: "1150",
    sort: "5"
  },
  {
    name: "刘丽萍",
    address: "景谷中路58弄8号",
    political: "群众",
    group: "太极队",
    x: "1786",
    y: "973",
    sort: "5"
  },
  {
    name: "张建华",
    address: "景谷中路58弄22号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "1844",
    y: "801",
    sort: "5"
  },
  {
    name: "王美琴",
    address: "景谷中路58弄3号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "1655",
    y: "1108",
    sort: "5"
  },
  {
    name: "邵爱莲",
    address: "景谷中路58弄23号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "1965",
    y: "836",
    sort: "5"
  },
  {
    name: "张红艳",
    address: "景谷中路58弄31号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2390",
    y: "743",
    sort: "5"
  },
  {
    name: "黄仙花",
    address: "景谷中路58弄43号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "1881",
    y: "471",
    sort: "5"
  },
  {
    name: "杨菊连",
    address: "景谷中路58弄47号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2541",
    y: "671",
    sort: "5"
  },
  {
    name: "何慧萍",
    address: "景谷中路58弄32号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2279",
    y: "708",
    sort: "5"
  },
  {
    name: "吴绍慧",
    address: "景谷中路58弄29号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2718",
    y: "847",
    sort: "5"
  },
  {
    name: "葛树珍",
    address: "景谷中路58弄32号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2290",
    y: "703",
    sort: "5"
  },
  {
    name: "吴来娣",
    address: "景谷中路58弄7号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "1906",
    y: "1017",
    sort: "5"
  },
  {
    name: "周明仙",
    address: "景谷中路58弄35号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "1725",
    y: "617",
    sort: "5"
  },
  {
    name: "裴月英",
    address: "景谷中路58弄33号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2174",
    y: "685",
    sort: "5"
  },
  {
    name: "曹美观",
    address: "景谷中路58弄45号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2093",
    y: "482",
    sort: "5"
  },
  {
    name: "陈爱菊",
    address: "景谷中路58弄6号",
    political: "群众",
    group: "健美操舞蹈队",
    x: "2213",
    y: "1138",
    sort: "5"
  },
  {
    name: "孙丽华",
    address: "景谷中路58弄55号",
    political: "党员",
    group: "健美操舞蹈队",
    x: "2430",
    y: "396",
    sort: "2"
  },
  {
    name: "孙丽华",
    address: "景谷中路58弄55号",
    political: "党员",
    group: "时装美体队",
    x: "2430",
    y: "396",
    sort: "2"
  },
  {
    name: "王美华",
    address: "景谷中路58弄58号",
    political: "群众",
    group: "时装美体队",
    x: "2027",
    y: "375",
    sort: "5"
  },
  {
    name: "薛世香",
    address: "景谷中路58弄32号",
    political: "群众",
    group: "时装美体队",
    x: "2290",
    y: "715",
    sort: "5"
  },
  {
    name: "何慧萍",
    address: "景谷中路58弄32号",
    political: "群众",
    group: "时装美体队",
    x: "2290",
    y: "692",
    sort: "5"
  },
  {
    name: "吴绍慧",
    address: "景谷中路58弄29号",
    political: "群众",
    group: "时装美体队",
    x: "2711",
    y: "852",
    sort: "5"
  },
  {
    name: "葛树珍",
    address: "景谷中路58弄32号",
    political: "群众",
    group: "时装美体队",
    x: "2302",
    y: "724",
    sort: "5"
  },
  {
    name: "吴来娣",
    address: "景谷中路58弄7号",
    political: "群众",
    group: "时装美体队",
    x: "1897",
    y: "1029",
    sort: "5"
  },
  {
    name: "周明仙",
    address: "景谷中路58弄35号",
    political: "群众",
    group: "时装美体队",
    x: "1744",
    y: "625",
    sort: "5"
  },
  {
    name: "裴月英",
    address: "景谷中路58弄33号",
    political: "群众",
    group: "时装美体队",
    x: "2146",
    y: "637",
    sort: "5"
  },
  {
    name: "何云霞",
    address: "景谷中路58弄58号",
    political: "群众",
    group: "时装美体队",
    x: "2025",
    y: "371",
    sort: "5"
  },
  {
    name: "颜蒜珍",
    address: "景谷中路58弄31号",
    political: "群众",
    group: "时装美体队",
    x: "2390",
    y: "729",
    sort: "5"
  },
  {
    name: "吴志芳",
    address: "景谷中路58弄22号",
    political: "群众",
    group: "时装美体队",
    x: "1846",
    y: "782",
    sort: "5"
  },
  {
    name: "于胜蓉",
    address: "景谷中路58弄59号",
    political: "群众",
    group: "时装美体队",
    x: "1772",
    y: "403",
    sort: "5"
  },
  {
    name: "李洪桂",
    address: "景谷中路58弄35号",
    political: "群众",
    group: "时装美体队",
    x: "1725",
    y: "613",
    sort: "5"
  }
];
// (function () {
//     $.ajax({
//         type: 'get',
//         url: url + '/region_unit',
//         data: {
//             paginate: 50
//         },
//         success: function (res) {
//             tddj = res.data;
//         }
//     })
// })()

function tddjsjFn() {
  $.ajax({
    type: "get",
    async: false,
    url: url + "/community_team",
    data: selectedJC,
    success: function (res) {
      console.log(res.data);
      tddjsj = res.data;
    }
  });
}

// tddjsjFn()
var ztdrsj = [{
    num: "1",
    title: "学习宣传贯彻党的十九大精神专题学习会",
    time: "2018/1/18",
    content: "<p class='MsoNormal' align='left'>转眼间到了<span>2017</span>年的最后一个月，凤凰景苑党支部于<span>2018</span>年<span>1月</span>上午开展本年度最后一次党员组织生活会。此次生活会围绕学习宣传贯彻党的十九大精神专题学习会。 <span></span>  </p> <p style='text-indent:25.8pt;'>  凤凰景苑党支部书记顾倩倩主持此次会议，向凤凰景苑支部党员们数读十九大报告，透过数字学习报告精神。透过报告解读，让全体党员充分认识学习宣传贯彻党的十九大精神的重大意义，并让大家明白我党作出的重大决策、部署以及今后的发展方向。 </p> <p style='text-indent:25.8pt;'>  <span style='line-height:1.5;'>通过学习让全体党员全面理解和准确把握党的十九大精神实质。又结合当前社区实际提出要把学习宣传贯彻党的十九大精神作为当前和今后一个时期最重要的政治任务，以高度的责任感和使命感，综合运用多种方式广泛宣传贯彻。 同时，党员们一起共同学习新党章。</span>  </p> <p style='margin-left:10.5pt;text-indent:25.8pt;'>  <span></span>  </p> <p class='MsoNormal'>学习结束后，凤凰景苑社区党员又参与了社区实践活动——香薰蜡烛<span>DIY</span>手作会，与社区志愿者共同制作蜡烛，营造浓厚的冬季温馨、暖融融的氛围。<span></span>  </p> <p class='MsoNormal' align='left' style='margin-left:10.5pt;'>  <br /> </p>"
  },
  {
    num: "2",
    title: "静静心心赏佳作，红红火火过新年 ——参观中华艺术宫",
    time: "2018/2/7",
    content: "<p class='MsoNormal' align='left'>此次活动正值中华艺术宫展出<span>“</span>从石库门到天安门<span>”</span>上海美术作品展，作为本届上海国际艺术节期间推出的重要展览，这场以<span>“</span>门<span>”</span>为线索大型红色史诗展用<span>96</span>幅作品见证了中国共产党<span>96</span>年的光辉历程，呈现了中国现代美术的发展与演变，凤凰景苑社区带领社区党员、志愿者开展一次不忘初心、牢记使命的爱国主义学习实践活动。<span></span> </p> <p></p> <p class='MsoNormal' align='left'><span style='line-height:1.5;'>打开历史的大门，倾听岁月的声音，寻觅革命前辈的足迹。一幅幅画卷，记录和清晰再现了伟大的中国共产党在上海诞生，从上海出发，带领中国航船穿过激流险滩，踏平惊涛骇浪，带领中华儿女一起实现</span><span style='line-height:1.5;'>“</span><span style='line-height:1.5;'>中国梦</span><span style='line-height:1.5;'>”</span><span style='line-height:1.5;'>的伟大进程，震撼人心。大家在感慨祖国日新月异的同时，也感受着祖国的不断强大给我们带来的机遇和挑战。</span>  <p>   <span></span>  </p> <span></span> </p> <p class='MsoNormal' align='left'>  <span style='line-height:1.5;'></span><span style='line-height:1.5;'>从石库门到天安门、大家荡漾在艺术的海洋里，开阔了艺术眼界、增强了民族自豪、坚定了文化自信。</span><span style='line-height:1.5;'>  <p class='MsoNormal' align='left'>   <span></span>  </p> &nbsp;&nbsp;</span> </p>"
  },
  {
    num: "3",
    title: "组织党员收看《厉害了，我的国》",
    time: "2018/3/22",
    content: "<p class='MsoNormal' align='left'>西部开发，东北振兴，中部崛起，东部率先；全世界最大的基本医疗保障网；173项扶贫政策……纪录电影《厉害了，我的国》近日在全国上映，引起全国上下强烈反响，每个人都为国家强大欢呼自豪。3月22日下午凤凰景苑社区积极组织社区党员以及平安巡逻志愿者收看，见证中国力量。 </p> <p class='MsoNormal' align='left' style=''>  影片将祖国的发展和成就呈现于银幕之上，不仅记录了中国桥、中国路、中国车、中国港、中国网等一个个超级工程，还展示了人类历史上最大的射电望远镜FAST、全球最大的海上钻井平台“蓝鲸2号”、磁悬浮列车、5G技术等引领人们走向新时代的里程碑式科研成果。从圆梦工程到创新科技，从绿色中国到共享小康，电影将其背后的故事娓娓道来。 </p> <p class='MsoNormal' align='left' style=''>  <span style='line-height:1.5;'> 凤凰景苑居委干部吴昕甲：“我们的国家在飞速发展，人们的生活都在逐步提高。作为一名居委干部，做好社区大调研工作，化民忧、解民愁、聆听百姓心声。团结社区党员，为我们的社区和谐，贡献我们自己的智慧和力量。”</span>  </p>"
  },
  {
    num: "4",
    title: "影片《邹碧华》观影",
    time: "2018/4/13",
    content: "<p class='MsoNormal'>影片《邹碧华》真实生动地描述了被誉为“时代楷模”的人民法官邹碧华的感人事迹，从多方面对邹碧华的理想追求、奉献精神和改革实践作了生动的艺术诠释，精心塑造了一位为司法事业鞠躬尽瘁、死而后已、法制建设“燃灯者”的银幕形象，影片情节朴实，但因其具体真实而感人。 </p> <p class='MsoNormal'>  <span style='line-height:1.5;'>&nbsp; &nbsp; &nbsp;影片结束，大家都感慨颇多，不少党员同志流下了感动的泪水。党员们被这位在司法岗位上奉献着自己，直到生命最后一刻的“燃灯者”——邹碧华同志的事迹深深打动，表示要学习他不忘初心、牢记使命，坚守信念、敢于担当，鞠躬尽瘁、知行合一的精神。</span> </p> <div>  <br /> </div>"
  },
  {
    num: "5",
    title: "凤凰景苑党支部组织参观金山卫抗战遗址纪念园",
    time: "2018/5/18",
    content: "<p style='text-align:justify;>为了回顾红色历史，加强爱国主义思想教育。<span>5</span>月<span>18</span>日上午，凤凰景苑居民区党支部组织支部党员、青年团干以及社区骨干们参观金山卫抗战遗址纪念园。 </p> <p style='text-align:justify;text-indent:32.0pt;'>  在讲解员的带领下，大家参观了抗日主题石雕壁画、中心雕塑、“十月初三惨案”记事碑墙、抗日故事紫砂浮雕壁画、被害乡民纪念墙、古城墙遗址和日军碉堡、警世钟亭、金山卫城南门侵华日军登陆处碑，以及“侵华日军在金山的暴行”主题陈列室。 </p> <p style='text-align:justify;text-indent:32.0pt;'>  随后党员们和骨干居民们还认真参观了金山卫抗战史料馆。通过大量史料和实物，反映了中国军民顽强抵抗日本侵略者的史实。通过参观学习，全体成员接受了一次深刻的爱国主义思想洗礼。大家纷纷表示，要牢记革命先烈不畏牺牲勇敢反抗的革命精神和全心全意为人民服务的宗旨，不忘历史，继往开来，发挥党员模范先锋带头作用，在自己的工作岗位上，为社区建设发展做出更大贡献。<span>&nbsp;</span> </p> <p style='text-align:justify;text-indent:32.0pt;'>  &nbsp; </p>"
  },
  {
    num: "6",
    title: "凤凰景苑党支部参观航天设备制造总厂",
    time: "2018/6/20",
    content: "<p class='MsoNormal'>为进一步增强队伍凝聚力，严格党的组织生活，提高党员素质，<span>6</span>月<span>20</span>日，凤凰景苑党支部党员、团员们前往上海航天技术研究院参观学习。<span></span> </p> <p class='MsoNormal'>上海航天设备制造总厂隶属于中国航天科技集团公司第八研究院，是八院运载火箭、载人航天和探月工程等宇航产品总装总测厂、战术武器地面系统总成厂，是我国唯一集运载火箭、空间飞行器和战术武器地面系统产品制造、总装测试和发射场服务于一体的国有综合型航天骨干企业。为我国载人航天工程和探月工程任务的圆满完成作出了突出贡献。党员们来到上海航天设备制造总厂，参观了运载火箭总装总测中心，航天厂办主任为我们党员讲解了中国航天发展历程和伟大成就；同时党员们与火箭、太空舱亲密接触，亲眼看见长征<span>4</span>号、<span>5</span>号、<span>6</span>号火箭装备现场，党员们不仅感叹中国航天从无到有、从小到大，取得的举世瞩目的巨大成就；也为以大国重器加快实现航天强国梦点赞！ </p> <p class='MsoNormal'></p> <p class='MsoNormal'>党员们更深切感悟了一代又一代中国航天人“自力更生、艰苦奋斗、大力协同、无私奉献、严谨务实、勇于攀登”的崇高航天精神。党员们将把对中国航天人的敬意和对祖国科技事业的崇敬之情，转化为深入推进“两学一做”学习教育和社区自治的激情，砥砺前行，不断提升党性修养。<span></span> </p>"
  }
];

//在职党员

function zzdysjFn() {
  $.ajax({
    type: "get",
    url: url + "/incumbent_party_member",
    async: false,
    data: selectedJC,

    success: function (data) {
      zzdysj = data.data;
    }
  });
}

// zzdysjFn()
//班长
var bzgc;
var secretary = null;

function bzgcFn() {
  $.ajax({
    url: url + "/secretary",
    data: selectedJC,
    type: "get",
    async: false,
    success: function (data) {
      // let lis=[]
      // data.data.data.forEach(el => {
      //     if(!el.address) {

      //         let data = {
      //             "姓名": el.name,
      //             '所属党组织': el.organization_name
      //         }
      //         lis.push(data)
      //     }
      // });
      // console.log(lis)
      // console.log('0000000000000000000000')
      secretary = data.data;

      bzgc = data.data;
    }
  });
}
// bzgcFn()
//社区工作者
var communityWorker = [{
    imgUrl: "images/顾倩倩.jpg",
    name: "顾倩倩",
    job: "书记",
    phone: "13916022642",
    duty: "主持社区全局工作",
    motto: "家事、急事、难事、烦心事、事事我关心"
  },
  {
    imgUrl: "images/吴昕甲.jpg",
    name: "吴昕甲",
    job: "副书记",
    phone: "54133231",
    duty: "社区自治、社区安全等",
    motto: "用精细化服务，赢得群众信任"
  },
  {
    imgUrl: "images/苏萍.jpg",
    name: "苏萍",
    job: "助理",
    phone: "54133231",
    duty: "财务、计生、固定资产等",
    motto: "服务至上、用心为民"
  },
  {
    imgUrl: "images/朱凤岚.jpg",
    name: "朱凤岚",
    job: "居委干部",
    phone: "54133231",
    duty: "宣传、工会、文明创建等",
    motto: "尽我所能、为民服务"
  },
  {
    imgUrl: "images/康敏婕.jpg",
    name: "康敏婕",
    job: "居委干部",
    phone: "54133231",
    duty: "综治、大联动等",
    motto: "为民服务、为民解困"
  },
  {
    imgUrl: "images/程懿裴.png",
    name: "程懿裴",
    job: "居委干部",
    phone: "54133231",
    duty: "调解、妇联、民政等",
    motto: "以人为本、服务群众"
  }
];
//支部亮牌
var leader = [{
    imgUrl: "./images/zb01.jpg",
    name: "顾倩倩",
    job: "书记",
    phone: "13916022642",
    duty: "</p>1、负责召集支部委员会和党员大会，结合本社区的具体情况，认真传达贯彻执行党的路线、方针、政策和上级的决议、指示；研究安排支部工作，将支部工作中的重大问题及时提交支部委员会和党员大会讨论决定。</p>2、做好经常性的思想政治工作，了解掌握党员的思想、工作和学习情况，发现问题及时解决。</p>3、检查党支部的工作计划、决议的执行情况和出现的问题，按时向支部委员会、党员大会和上级党组织报告工作。</p>4、经常与党支部委员和同级行政负责人交流情况，保持密切联系，支持他们的工作，协调单位内党、政、工、团关系，充分调动各方面的积极性。</p>5、抓好支部委员自身的学习，按时召开支部委员会民主生活会，充分发挥支部委员会的集体领导作用。"
  },
  {
    imgUrl: "./images/zb02.jpg",
    name: "吴昕甲",
    job: "副书记",
    phone: "15201827170",
    duty: "协助书记进行工作，书记不在时，由副书记主持支部的日常工作。"
  },
  {
    imgUrl: "./images/zb02.jpg",
    name: "吴昕甲",
    job: "副书记",
    phone: "15201827170",
    duty: "协助书记进行工作，书记不在时，由副书记主持支部的日常工作。"
  },
  {
    imgUrl: "./images/zb02.jpg",
    name: "吴昕甲",
    job: "副书记",
    phone: "15201827170",
    duty: "协助书记进行工作，书记不在时，由副书记主持支部的日常工作。"
  },
  {
    imgUrl: "./images/zb03.jpg",
    name: "杨连波",
    job: "纪检委员",
    phone: "13701973823",
    duty: "</p>1、了解并向支部委员会和上机纪律检查委员会反映本社区党员执行纪律的情况。协同组织委员、宣传委员经常对党员进行党性、党纪、党风教育。</p>2、了解党员执行党的路线、方针、政策，遵守党纪国法的情况，并进行监督检查。</p>3、检查、处理党员违反党籍的案件，负责办理处分党员的具体手续；对受党籍处分的党员进行考察教育。</p>4、受理并向支部委员会和上级党组织传递党员的控告和申诉。"
  },
  {
    imgUrl: "./images/zb04.jpg",
    name: "吴之昊",
    job: "组织委员",
    phone: "18621330050",
    duty: "</p>1、了解和掌握支部的组织状况，根据需要提出划分或调整党小组的意见，检查和督促党小组过好组织生活。</p>2、了解和掌握党员的思想状况，协同宣传委员、纪律检查委员，对党员进行思想教育和纪律教育。</p>3、做好发展党员工作。负责对入党积极分子和预备党员进行培养、教育和考察，提出发展党员的意见，办理接收新党员和预备党员转正的手续。</p>4、做好党员管理工作。根据本支部的实际情况，组织开展好民主评议党员活动和评选先进党小组、优秀党员活动，收集和整理党员的模范事迹，向支委会提出表扬、奖励党员的建议；接转党员的组织关系；按时收缴党费，定期向党员公布党费收缴情况；做好党内统计工作。\n"
  },
  {
    imgUrl: "./images/zb05.jpg",
    name: "瞿晓颖",
    job: "宣传委员",
    phone: "13524107833",
    duty: "</p>1、了解掌握党内外群众的思想情况，根据不同时期党的工作中心和任务以及上级党组织的指示，提出和拟定学习、宣传教育工作的意见、建议和计划；充分利用广播、电视、网络、微媒体等宣传工具，组织开展好宣传工作。</p>2、组织党员学习马克思列宁主义、毛泽东思想、邓小平理论、“三个代表”重要思想和科学发展观，认真学习习近平总书记系列重要讲话精神和治国理政新理念新思想新战略，学习党的路线、方针、政策及决议，学习党的基本知识，学习科学、文化、法律和业务知识；组织好党课学习；做好思想政治工作。</p>3、做好党报、党刊的订阅、发放工作。</p>4、指导本社区的群众学习科学、技术、文化知识，协助行政和工会、共青团、妇女组织开展文体活动。"
  }
];

function showPis() {
  $.ajax({
    type: "get",
    url: url + "/secretary_show_face",
    success: function (res) {
      leader = res.data;
      // http: //iph.href.lu/83x130?text=%E6%9A%82%E6%97%A0%E5%9B%BE%E7%89%87
      let img = "";
      let img1 = "";
      let img2 = "";
      res.data.forEach((el, index) => {

        if (el.job === '书记') {
          img += `<img  style = 'max-width:20%;'  data-indexs=${index} src=${imgUrl + el.image} alert ="支部亮牌"/>`;
        } else if (el.job === '副书记') {
          img1 += `<img   style = 'max-width:20%;' data-indexs=${index} src=${imgUrl + el.image} alert ="支部亮牌"/>`;

        } else {
          img2 += `<div class='w100  pad-1'  style = 'max-width:20%;'>
          <img  data-indexs=${index} class='w100' src=${imgUrl + el.image} />
        </div>  `
        }
      });

      let div = `<div class='flex-center-clounm w100 h100'>
        <div class = 'w100'  style="max-height:30%;">
        
         ${img}
       
        </div>
        <div class = 'w100'  style="max-height:30%;">
        
         ${img1}
       
        </div>

        <div class = "flex-around w100"  style="max-height:30%;">
       
     ${img2}      
            
        </div>
      </div>`


      $(".dwgk-zblp").append(div);
    }
  });
}
showPis();
//支部责任
var branchDuty = [
  "宣传和执行党的路线方针政策，宣传和执行党中央、上级党组织和本组织的决议，团结、组织干部和群众，努力完成社区各项任务。",
  "讨论决定本社区建设、管理中的重要问题。",
  "领导社区居民自治组织，支持和保证其依法充分行使职权，完善公开办事制度，推进社区居民自治；领导社区群众组织，支持和保证其依照各自的章程开展工作。",
  "联系群众、服务群众、宣传群众、教育群众，反映群众的意见和要求，化解社会矛盾，维护社会稳定。",
  "组织党员和群众参加社区建设。",
  "加强社区党组织自身建设，做好党员的教育、管理、监督、服务和发展党员工作。"
];
//支部制度
var branchSystem = [{
    title: "组织生活会制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 3249px;"><h2 style=";margin-bottom:0;text-align:center;line-height:37px"><span style="font-size:27px;font-family:宋体;font-size:18px;_GB2312;color:red"></span></h2><p style="text-align:center;line-height:37px;background:white"><span style=";font-family:\'Helvetica\',sans-serif;color:#333333">&nbsp;</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312">第一章&nbsp; 总&nbsp; 则</span><span style="font-size:19px;font-family:\'Helvetica\',sans-serif;color:#333333">&nbsp;</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第一条&nbsp; 为了严格党的组织生活，提高组织生活质量，根据《中国共产党章程》、《关于党内政治生活的若干准则》和《关于县以上党和国家机关党员领导干部民主生活会的若干规定》，结合本居委实际，制定本制度。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二条&nbsp; 本制度所称“党的组织生活”是指党员参加所在党支部、二级支部组织的党小组会、党员大会、党内民主生活会。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第三条&nbsp; 每个党员都必须按规定参加党的组织生活，不允许有任何不参加党的组织生活、不接受党内外群众监督的特殊党员。总支支部委员既要参加所在党小组党支部的组织生活，又要参加总支召开的民主生活会。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312">第二章&nbsp;&nbsp; 党支部会</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">&nbsp;</span><span style="font-family:宋体;font-size:18px;">第四条&nbsp; 党支部组织生活会每月召开一次，支部可根据总支的安排和实际情况确定开会的具体时间。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第五条&nbsp; 党支部会的主要内容包括：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（一）学习党的路线、方针、政策和上级党组织的指示；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（二）研究贯彻总支决议、决定和上级党组织指示并检查落实；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（三）党员个人汇报思想和工作、学习、生活中重大问题以及其他需要向党组织报告的问题；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（四）检查党员模范作用的发挥情况；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（五）开展批评与自我批评。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（六）讨论发展工作并对发展对象提出建议和要求；讨论发展工作必须有三分之二以上的党员参加。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（七）讨论预备党员转正并提出建议；并必须有三分之二以上的党员参加。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（八）讨论上级党组织布置的其他问题。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第六条&nbsp; 党支部会议前党支部书记应将小组会的内容提前通知党员，并要求党员做好准备，以保证党支部会的质量。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">&nbsp;</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312">第三章&nbsp; &nbsp;党员大会</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第七条&nbsp; 党支部每季度召开1～2次党员大会，根据需要可以适当增加活动次数。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第八条&nbsp; 党支部召开党员大会，必须有超过半数以上的党员参加。党员大会一般由党支书记主持会议，确因特殊情况，书记不能主持会议，应事先委托其他支委主持。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第九条&nbsp; 党支部党员大会的主要内容包括：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（一）讨论并通过总支工作计划；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（二）讨论并通过总支委员会的工作报告；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（三）讨论接受预备党员和讨论预备党员转正；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（四）讨论表彰或处分党员的意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（五）选举党支部委员会或出席上级党代会的代表；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（六）讨论贯彻执行上级党组织和党委布置的任务；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（七）讨论支委员会提交的其他问题。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十条&nbsp; 凡提交党支部党员大会讨论决定的重要事项，应先由党支部委员会提出意见，经充分讨论后再进行表决，党支部党员大会表决时，须由半数以上应到会议的有表决权的正式党员赞成，才能做出决议或决定。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">&nbsp;</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312">第四章&nbsp;&nbsp; 民主生活会</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十一条&nbsp;党支部民主生活会，由支部书记主持，根据需要可以适当增加会议次数。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十二条&nbsp; 参加民主生活会的每个党员都应遵循“团结 — 批评 —团结”的方针，通过开展积极的思想斗争，达到统一思想、增强团结、共同提高的目的。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十三条&nbsp; 民主生活会前要根据当前形势，任务和存在的主要问题确定重点议题。同时广泛征求党内外群众意见，积极开展交心谈心活动，为解决存在的问题创造良好的气氛和条件。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">&nbsp;</span><span style="font-family:宋体;font-size:18px;">党支部民主生活会的主要内容包括：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（一）检查学习、贯彻党的路线、方针、政策和决议的情况；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（二）检查组织纪律观念、廉政建设的情况；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（三）检查、总结领导班子自身建设，实行民主集中制的情况；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（四）检查联系群众改进工作作风与方法的情况；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（五）其他重要问题。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十五条&nbsp; 召开民主生活会，总支委员一般不得缺席。因故缺席的人员原因必须列入会议记录。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十六条&nbsp;党支部召开民主生活会可邀请居委委员、业委会、物业、居民代表、楼组长或有关人员列席会议，列席人员可以发言，对领导班子及其成员提出批评或建议。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十七条&nbsp; 党支部对民主生活会上检查和反映出来的问题，要积极制定改进措施，切实加以解决。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十八条&nbsp; 民主生活会的情况，应于会后及时报送上级主管党组织。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第十九条&nbsp;党支部要每年对本年度的组织生活作出安排。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十条 &nbsp;党员必须按时参加组织生活，不迟到、不早退。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十一条&nbsp; 党的组织生活情况要做好记录。活动的时间、地点、应到人数、实到人数、缺席人数及原因、主持人、记录人、活动内容等要详细记入《党组织生活会记录簿》。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">&nbsp;</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312">第五章&nbsp;&nbsp; 组织生活管理</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十二条&nbsp; 党员长期外出，时间超过6个月的，应将组织关系转到所在居委的党组织；党员临时出差，经党组织同意，可暂不参加组织生活，待回原单位后向党组织汇报思想工作情况。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十三条&nbsp; 党员因病住院或病休期间，女党员产假哺乳假期间，离退休年老多病行动不便的党员，可暂不参加组织生活，党支部应指定党员负责联系，向他们传达党内文件和党内活动情况，听取他们的意见和要求。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十四条&nbsp; 患有特殊疾病的党员，由于本人不能履行党员义务，党组织可以暂停其组织生活，但保留其党籍，待病愈后再逐步恢复其组织生活。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十五条&nbsp; 党员在留党察看或停职反省或在整党和民主评议中暂缓登记期间，应照常参加组织生活。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十六条&nbsp; 支部大会决定开除党籍或取消预备党员资格的人，在上级党委批准之前，仍可以参加组织生活。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十七条&nbsp; 经支部大会通过，接收为预备党员的人，在上级党委批准前，不能以党员身份参加组织生活。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十八条&nbsp; 上级组织部门派驻人员、职能部门人员，可以参加党内组织的一般性活动。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第二十九条&nbsp; 党员无故2～3个月不参加组织生活的，党支部应提出批评，并责令其做出深刻检查；4～5个月无故不参加组织生活的，应视情节给予一定的党纪处分；党员没有正当理由连续6个月不参加组织生活的视为自行脱党，支部大会应当决定将其除名，并报上级党组织批准。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">第三十条&nbsp;党支部每年对上年度组织生活情况进行检查并在党务公开栏中予以通报。</span></p><p>&#8203;<br></p></body>\n'
  },
  {
    title: "党组织收集分析、流转处理、答复反馈制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 580px;"><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">1</span><span style="font-family:宋体;font-size:18px;">、定期走访。党支部委员和党小组长定期走访联系对象，深入困难群众，了解其生活疾苦，掌握其思想动态，有的放矢地对居民进行教育和引导，做好释疑解惑工作，凝聚人心，疏导情绪，化解矛盾。党支部成员每月要走访联系对象至少1次。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">2</span><span style="font-family:宋体;font-size:18px;">、集中走访。在元旦、春节、“七一”等重大节日，要集中对联系对象进行走访慰问，解决他们生活等方面的实际困难。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">3</span><span style="font-family:宋体;font-size:18px;">、个别走访。除集中走访外，党员干部还要根据平时情况，由本人自行安排个别走访联系对象，开展帮扶活动。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">4</span><span style="font-family:宋体;font-size:18px;">、广泛征求意见。党员干部要经常深入联系对象之中，加强与所联系对象的沟通与交流，做联系对象的贴心人，广泛征求联系居民的意见和建议，找差距，查不足。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">5</span><span style="font-family:宋体;font-size:18px;">、解决实际问题。党员干部要根据联系对象提出的意见和要求，帮助联系对象解决实际问题，解决自身在工作作风上存在的突出问题，争取群众的认可，树立良好的形象。</span></p><p style="line-height:37px">&nbsp;</p><p><br></p></body>'
  },
  {
    title: "党组织“三会一课”制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 794px;"><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">为加强支部党的建设，根据《中国共产党章程》和党内的有关规定，制定本制度。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">一、“三会一课”是指支部党员大会、支委会、党小组会和党课。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">二、支部党员大会每季度至少召开一次，因工作需要可随时召开。</span></p><p style=";margin-bottom:0;text-indent:64px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">大会的主要内容：（1）传达学习上级党组织的有关文件、决议、批示；（2）讨论通过党支部工作计划和工作报告；（3）选举党支部委员会；（4）讨论决定发展新党员、预备党员转正、党员的奖励和处分；（5）讨论决定由支委会提请的其它重要事项。支部党员大会应做到议题明确、中心突出、会前应将会议内容、要求、议程、时间通知全体党员，做好充分准备，党员大会需做出决议时，应在充分讨论的基础上，按少数服从多数的原则进行表决。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">三、</span><span style="font-family: 宋体;font-size:18px;color:black">支部委员会每个月召开一次，根据工作需要可随时召开。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">会议的主要内容是：讨论研究贯彻上级党组织的指示和决议；分析党员的思想状况，研究支部工作计划、工作报告和党员教育、思想政治工作，以及支部建设、组织发展、党员奖励和其他需要支委会讨论的重要事项。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">四、党小组会每月至少召开一次（包括一年一次的党小组民主生活会）。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">会议的主要内容是：（1）组织党员学习；（2）研究贯彻执行支部决议和各项工作任务；（3）党员汇报思想和工作情况；（4）讨论选举和发展党员工作；（5）讨论评选优秀党员和对党员的处分等事项。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">五、</span><span style="font-family: 宋体;font-size:18px;color:black">党课每季度安排一次，</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">党课的主要内容是：马列主义基本理论毛泽东思想、邓小平理论、“三个代表”重要思想、科学发展观学习教育；党的理想、宗旨、纪律、优良传统和党的基本知识教育；国际国内政治、经济形势教育等。党课教育的内容要注意系统性、针对性和实效性，力求形式多样，可采取专题讨论、知识竞赛等多种形式。</span></p><p>&#8203;<br></p></body>'
  },
  {
    title: "组团式联系服务群众工作机制",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 819px;"><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">为进一步改进工作作风，强化党员干部的群众观念，密切党群干群关系，解决实际问题，推动各项工作的深入开展，对党员干部联系群众作出如下规定：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">一、指导思想和目标</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">以正确的政绩观和群众观为指导，坚持以人为本，坚持<a href="//yjbys.com/xuexi/" target="_blank"><span style="color:black;text-underline: none">学习</span></a>与实践相结合，以党组织工作为抓手，不断增强党组织的凝聚力、战斗力，以党员干部定点联系困难居民，为小区群众办实事、做好事、解难题，切实解决群众生活困难，密切居委与居民的关系，真正做到立足社区、服务为民，达到党员受教育，群众得实惠，促进党的先进性建设。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">二、建立思想政治工作网络，实行思想政治工作责任制。支部委员都要建立工作联系点，党员要以所在的部门（分部）为主，建立思想政治工作责任区，负责职工思想政治工作。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">三、及时宣传党的路线、方针、政策，提高群众的思想觉悟，保证党的方针政策和单位基层党的委员会（党支部）决议的贯彻落实。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">四、协助做好职工思想政治工作，搞好团结。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">五、耐心听取群众意见和要求，并及时向党组织反映，帮助群众解决工作、学习、生活中的实际困难，做群众的知心朋友。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">六、做好本职工作，自觉当好部门（分部）负责人的参谋和助手。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">七、在各项工作中，充分发挥先锋模范作用，影响带动职工群众，带头完成各项任务。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">八、每个党员要不断提高对联系群众制度的认识，自觉行动，真正把联系群众工作落到实处。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">九、支部委员、党员每月至少要同群众谈心2-4次，并向支部汇报联系群众工作情况。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:35px"><span style="font-family:宋体;font-size:18px;;color:black">十、支部委员、党员联系群众工作将作为年终评选各类先进的重要依据。</span></p><p style="text-indent:28px;line-height:35px">&nbsp;</p><p><br></p></body>'
  },
  {
    title: "党员教育管理及发展党员制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 5319px;"><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">党员教育管理制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">一、组织党员学习党的路线、方针、政策及上级党政文件精神，统一思想、坚定信心，同心同德完成所在党支部的年度目标任务。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">二、加强对学习的管理。认真拟定学习计划，确定学习内容，提出基本要求。坚持以个人自学为主，集中学习为辅。学习由党支部安排，参加学习人员不得无故缺席，要做好考勤记录。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">三、注意理论联系实际，解决思想、工作和生活中的实际问题。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">四、学习形式要多样，做到读和写结合，典型引路和广泛交流结合，学习书本理论知识与实际工作、参观考察等结合，既生动活泼，又讲求实效。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">五、严格党员学习制度，持之以恒，充分利用“三会一课”的形式搞好党员教育，做到时间、学习内容、人员、效果四落实。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">六、抓好典型选树工作，使广大党员学有榜样、干有方向、创先争优。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">七、党员教育要做到同形势教育、党风党纪教育、安全生产、党员竞赛活动、普法教育等相结合。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">发展党员制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">第一条&nbsp; 发展党员的方针与原则</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　发展党员工作必须遵循“坚持标准、保证质量、改善结构、慎重发展”的方针，坚持成熟一个、发展一个的原则，使党的队伍永远保持先进性，充分发挥每个党员在群众中的先锋模范作用。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">第二条&nbsp; 发展党员的条件</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　发展党员，必须具备以下几个条件：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　1.必须是经过一年以上培养、教育和考察的，要求入党的积极分子。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　2.政治审查合格。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　3.本人对党有正确的认识，入党动机端正、作风正派，能自觉以共产党员的标准要求自己。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　4.培养联系人和党内外多数群众认为其已基本具备党员条件。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">第三条&nbsp; 发展党员的政审</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　发展党员必须进行政治审查。政治审查的内容，主要有以下几个方面：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　1.发展对象对党的路线、方针、政策的态度。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　2.发展对象政治历史和在重大政治斗争中的表现。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　3.发展对象直系亲属和与其关系密切的主要社会关系的政治面貌、现在职业、政治表现、与本人关系等项内容。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">第四条&nbsp; 确定重点发展对象的程序</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　确定重点发展对象，必须遵守以下程序：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　1.听取培养联系人汇报培养考察意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　2.党支部组织委员汇报综合考察意见和政审材料；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　3.党支部审阅要求入党的积极分子的全部材料；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　4.党支部大会酝酿讨论，初步确定发展对象名单；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　5.广泛征求党内外群众意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　6.支委会认真讨论、综合分析，集体确定重点发展对象。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">第五条&nbsp; 接收预备党员的党支部大会程序</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　接受预备党员，必须遵守以下程序：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　1.接收预备党员的党支部大会，党员应到人数必须超过本支部有表决权的正式党员数的三分之二以上才能开会；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　2.发展对象汇报自己对党的认识、入党动机、本人履历和家庭主要成员、主要社会关系的基本情况及需向党组织说明的问题；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　3.入党介绍人介绍发展对象培养考察情况和意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　4.党支部对发展对象是否具备入党条件提出意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　5.到会党员讨论，发表意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　6.党支部大会进行表决，赞成人数超过实际到会有表决权的正式党员的半数，才能通过接受预备党员决议；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　7.发展对象说明自己对党员所提意见的看法及今后的决心；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　8.将党支部大会决议填入《入党志愿书》，经党支部书记签名盖章后报党支部（集体讨论）通过后，及时报上级党委审批。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">第六条&nbsp; 预备党员转正的手续</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　预备党员转正，必须履行以下手续：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　1.本人提出书面转正申请；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　2.党支部征求党内外群众意见；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　3.党支部审查；</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">　　4.党支部大会讨论、表决通过；</span></p><p style=";margin-bottom:0;text-indent:64px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">5.</span><span style="font-family:宋体;font-size:18px;color:black">报党支部集体讨论通过</span></p><p style=";margin-bottom:0;text-indent:64px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">6.</span><span style="font-family:宋体;font-size:18px;color:black">报上级党委审批。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">入党积极分子推荐、培养和考察制度</span></h2><p style=";margin-bottom:0;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">建设一支数量充足、素质较高、结构合理的入党积极分子队伍，既是做好发展党员工作的基础，也是发展党员工作的一项重要任务。要通过建立和完善一系列制度和做法，切实加强入党积极分子队伍建设。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">1</span><span style="font-family:宋体;font-size:18px;color:black">、积极推荐，壮大队伍。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">入党积极分子与发展党员的比例数，应努力保持在3：1左右。要进一步转变作风，变坐等上门为主动引导，通过民主推优、居群推优、公开选优等方式，不断拓宽视野、畅通渠道，努力壮大入党积极分子队伍。一要建立广泛的“公推优选”制度。每年总支要开展一次全面的推荐入党积极分子和优秀青年活动，由党支部召开有党员和群众代表参加的民主推荐会进行无记名投票推荐，对票数相对集中的优秀分子根据实际分类培养，凡已写入党申请书的，可确定为入党积极分子或近期发展对象，凡尚未写入党申请书的，要确定党员“一对一”结对联系培养，引导其向党组织靠拢。对推荐票数达不到半数以上的，一般不能确定为入党积极分子。二要坚持共青团组织的推优制度。发展28周岁以下的团员入党，一般要经过团组织推荐。三要多渠道选拔推荐入党积极分子。党组织研究确定妇女入党积极分子的时候，要注意听取妇女组织的意见。要积极尝试开展公开选优的方式，通过多种途径把更多的优秀青年吸引到党组织队伍中来。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">2</span><span style="font-family:宋体;font-size:18px;color:black">、多方培养，提高素质。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">⑴</span><span style="font-family: 宋体;font-size:18px;color:black">要坚持培养联系人制度，明确培养联系人的职责，注意了解和掌握入党积极分子的思想动态。 </span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">⑵</span><span style="font-family: 宋体;font-size:18px;color:black">要建立培训考试制度。要充分利用党校等阵地，以党委为单位举办入党积极分子培训班，进行党的基本理论、基本纲领、基本路线和基本知识的系统教育，帮助他们端正入党动机，坚定共产主义理想和建设中国特色社会主义的信念。集中培训的时间应不少于30个学时，培训内容以党章和中组部组织编写的《入党知识问答》为主，集中培训结束后，要进行考试，并发给合格证书。考试不合格的，一般不能作为发展对象。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">⑶</span><span style="font-family: 宋体;font-size:18px;color:black">要加强入党积极分子的实践锻炼。要充分运用实践的途径，给入党积极分子交任务、压担子，让他们在实践中磨砺、提高和成长。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">3</span><span style="font-family:宋体;font-size:18px;color:black">、定期考察，动态管理。要建立入党积极分子定期考察制度。党支部每季度对入党积极分子进行一次考察。考察的重点内容是：入党积极分子的政治觉悟、思想品质、入党动机、工作学习情况和社会表现等，并针对实际情况和问题，加强培养教育。各党委要坚持定期分析制度，每半年至少对入党积极分子状况作一次全面分析，进一步完善培养措施。要对入党积极分子实行动态管理，不符合条件的及时进行调整。此外还要针对当前入党积极分子队伍存在的数量不稳定、流动性增大等实际问题，注意研究入党积极分子流动过程中的管理和衔接，防止在流动中流失。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">发展党员预审制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">支委会研究接收新党员或预备党员转正，形成意见后，要向上级党委报告。上级党委对经支委会研究同意接收的新党员或转正的预备党员要进行预审，并形成是否接收或转正的意见。没有经过预审或预审不合格的，不能履行发展（转正）手续。发展非党员的预审，则根据本意见第四部分规定办理。预审的重点：一是党员条件。通过与发展（转正）对象谈话，广泛听取党组织和党内外群众意见等方式，了解掌握发展（转正）对象是否符合党员标准，具备发展条件。二是入党手续。通过查阅入党材料，审查入党手续是否规范、完备。须查阅发展对象的材料主要包括：入党申请书、入党积极分子考察表、参加集中培训的总结及党组织的鉴定意见、政审报告及调查材料、党支部综合审查报告、党内外群众意见、入党志愿书等。对拟转正的预备党员查阅转正申请书、预备期间的培养考察记录等。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">发展党员公示制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">发展党员过程中的公示工作，由负责审批新党员和确定入党积极分子的上级党组织负责。公示的对象，包括经党组织考察培养，拟转正为正式党员的、拟发展为预备党员的和拟确定为入党积极分子的三种对象。公示时间一般在党支部或支部大会讨论决定前十五天左右，公示期一般不少于7天。公示的内容是：公示对象的姓名、性别、出生年月、文化程度、参加工作时间、工作单位及职务、申请入党时间、被列为入党积极分子时间、公示期限、要求及联系电话等。公示采用张榜公布等形式进行，公示的范围一般为公示对象工作学习的基层单位，为方便对公示对象进行监督的举报，党组织要设置公示意见箱，并放在比较醒目的地方。负责公示党组织应认真对待群众反映的情况，负责地进行调查核实，及时将公示结果向党的支部委员会通报。公示没有问题的，及时指导基层党组织召开支部大会讨论研究，履行相关手续。对基层党组织不坚持党员标准，不按规定程序发展的党员，上级党组织要予以纠正，对有关责任者进行批评教育，违反党纪的应给予必要的纪律处分。经公示后，负责公示党组织要填写《发展对象公示情况登记表》，存入个人党员档案。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">&nbsp;</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">发展党员票决制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">党支部大会讨论吸收预备党员和预备党员转正，采用无记名投票方式进行表决。票决对象的发展程序必须严格遵守《中国共产党发展党员工作细则（试行）》的有关规定，不得减少任何一个环节。支部大会投票表决前，由支委提名或党员大会推选产生出监票人和计票人，负责主持具体的投票和计票工作，并宣布计票结果。表决票应由各党（工）委统一制作，表决票设“同意”、“反对”、“弃权”三个选项。记票结果当场宣布，“同意”人数超过支部有表决权正式党员半数的方能通过接收为预备党员或转为正式党员，反之，则为未通过。对票决通过的对象，党支部应将其有关材料连同票决报告一起报上级党委审批，并记入《入党志愿书》的相关栏目内。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">发展党员责任追究制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">在发展党员工作中负有责任的党支部、党支部和有关个人，如违反有关规定，应追究相关责任。党支部不能指派专人对有关材料进行审查的，对公示所反映问题不调查核实的，不同发展对象进行谈话作进一步考察了解的，不审查支部发展的程序是否规范即进行讨论审批的，不召开总支委员会讨论而由少数人碰头或个别征求意见后审批的，或有其他违反发展党员工作程序的，所审批党员一律无效，并追党支部书记、副书记（分管党群工作）、组织委员和其他有关人员的责任。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">党支部对申请入党不指定联系培养人，不对申请入党人进行严格审查的，不召开支部大会讨论而由个别人决定的，或召开党员大会而不表决的，以及有其它违反发展党员工作程序的，所发展的预备党员一律无效，并追究党支部书记、组织委员或其他有关人员责任。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">入党介绍人要认真了解发展对象的入党动机、思想品德、现实表现，全面衡量其是否具备入党条件。在支部大会讨论前，要指导被介绍人认真填写《入党志愿书》，负责地填写自己的意见。在支部大会上，要负责地介绍被介绍人的情况。被介绍人被批准为预备党员后，要继续对他进行教育和帮助。如果失察失误，让不符合条件的人被吸收入党，或让不符合条件的预备党员按期转正的，要追究介绍人的责任。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">受党组织指派，同发展对象进行谈话、对公示所反映问题进行调查核实的有关人员，不认真履行职责，失察失误或调查失实的，要追究其责任。有关人员不遵守保密纪律，客观上为公示对象提供打击报复举报人条件，或不如实向党组织报告公示情况的，要追究其责任。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">追究有关组织或个人在发展党员工作中的责任，除党章和其他党内规章所列党纪处分种类外，还可视情节轻重采取口头批评、责令检查、通报批评等其他处理方式。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;color:black">&nbsp;</span></p><p><br></p></body>'
  },
  {
    title: "党风廉政责任制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 1960px;"><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">为了加强党风廉政建设，贯彻落实《中国共产党章程》以及《中国共产党廉洁自律准则》、《中国共产党纪律处分条例》，结合居委工作实际，特制定以下廉政建设责任制度。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">一、总则</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">实行党风廉政建设责任制，要以邓小平理论和“三个代表”重要思想为指导，坚持科学发展观的方针，贯彻实施党中央关于党风廉政建设和反腐败斗争的一系列工作部署。实行党风廉政建设责任制，要坚持从严治党的方针，坚持党支部领导，把党风廉政建设作为党的建设的重要内容，纳入居委干部和社工目标管理，统一部署、统一落实、统一检查、统一考核。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">二、责任范围</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">居委党支部对的党风廉政建设负全面领导责任。党支部书记为党风廉政建设、岗位责任第一责任人。 </span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">三、内容</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">党支部书记在党风廉政建设中的责任内容：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">1</span><span style="font-family:宋体;font-size:18px;;color:black">、认真贯彻落实中共中央、国务院、中央纪委和街道党工委、街道、街道纪委关于党风廉政建设的部署和要求，分析研究党风廉建设状况，适时作出工作部署，并定期检查落实情况。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">2</span><span style="font-family:宋体;font-size:18px;;color:black">、组织干部、社工认真学习党的十八大精神，学习党风廉政建设法规和习近平同志关于党风廉政建设理论等。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">3</span><span style="font-family:宋体;font-size:18px;;color:black">、坚持标本兼治，综合治理，完善管理机制和监督机制，从源头上预防和治理腐败。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">4</span><span style="font-family:宋体;font-size:18px;;color:black">、严格按照《党政领导干部选拨任用工作暂行条例》规定选拨任用干部，防止和纠正用人的不正之风。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">5</span><span style="font-family:宋体;font-size:18px;;color:black">、管好班子，带好队伍，认真改变居委工作作风，遵纪守法，做勤政廉政的带头人。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">6</span><span style="font-family:宋体;font-size:18px;;color:black">、严格《廉洁自律准则》的要求，保证不发生违法乱纪和对居民吃、拿、卡、要等不廉洁行为。对于违背《廉洁自律准则》发生违法乱纪行为的，上报街道纪委给予通报批评，情节严重的给予党纪、政纪处分。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">7</span><span style="font-family:宋体;font-size:18px;;color:black">、严格控制各项开支，自觉执行公务费使用制度，按照规定标准，严格审批手续。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">8</span><span style="font-family:宋体;font-size:18px;;color:black">、加强居委内部管理，节约开支，党支部、居委费用的使用必须按照街道工作要求，透明、公开，严禁私自挪用、私分。有违反的，上报街道纪委给予通报批评，情节严重的给予党纪、政纪处分。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">9</span><span style="font-family:宋体;font-size:18px;;color:black">、加强公务卡管理，对持卡人要加强教育，严禁将公务卡挪为私用。采取措施保证公务卡安全存放。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><span style="font-size:19px;font-family: 宋体_GB2312;color:black">党支部党风廉政建设制度</span></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">一、党员干部要带头反腐倡廉，遵纪守法，坚持党的基本路线，紧紧围绕本单位（部门）的年度工作任务，带头抓好两个文明建设。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">二、党员干部不假公济私，不行贿受贿，不打击报复，做到秉公办事。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">三、党员干部要坚持原则，主持公道，坚持真理，纠正错误，敢于同歪风邪气做斗争。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">四、对职工岗位变动、奖金分配、考勤、评先选优等涉及职工切身利益问题要坚持公平公正，公开接受监督。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">五、党员、干部经常进行谈心活动，主动听取群众意见和建议，帮助职工解决实际困难。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">六、开好民主生活会，搞好班子团结，进一步提高支部的凝聚力和队伍的战斗力。</span></p><h2 style=";margin-bottom:0;text-align:center;text-indent:28px;line-height:37px"><a><span style="font-size:19px;font-family:宋体;font-size:18px;_GB2312;color:black">党支部党员责任制度</span></a></h2><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">为充分发挥党支部的战斗堡垒作用和党员先锋模范作用，团结带领全体员工顺利完成各项工作目标任务，特制定本制度。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">一、建立党员责任区，党员负责责任区内职工思想政治工作，随时掌握职工思想动态并定期向支部汇报。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">二、负责向责任区职工宣传党的路线、方针、政策和党的知识，贯彻落实上级党组织有关文件精神。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">三、负责协助工会小组长组织职工政治理论学习和民主生活会，提高职工政治水平和参与民主决策水平。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">四、加强职工观念更新，解放思想，开拓创新。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">五、倡导文明规范，自觉遵守单位制度和所在单位（部门）的各项管理规定。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">六、努力学习、积极工作，争做技术业务带头人。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">七、确保责任区内职工无违法犯罪行为发生。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">八、支持、配合所在工会小组、团支部开展积极有效的活动，增强班组凝聚力。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">&nbsp;</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">&nbsp;</span></p><p><br></p></body>'
  },
  {
    title: "“主题党日”制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 400px;"><p style="text-indent:32px;line-height:150%"><span style="font-family:宋体;font-size:18px;">（1）固化党日时间。每月相对固定1天作为主题党日，可与“三会一课”结合进行。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-family:宋体;font-size:18px;">（2）明确参与对象。参与对象为本支部（党小组）所有党员。党员领导干部以普通党员身份参加所在支部主题党日活动。可邀请入党积极分子、团员青年、群众代表参加。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-family:宋体;font-size:18px;">（3）确定党日形式。每次活动明确一个主题，采取集中讨论、主题实践、基地教学或者视频教学等多种方式开展活动。</span></p><p style="text-indent:32px;line-height:150%"><span style="font-family:宋体;font-size:18px;">&nbsp;</span></p><p><br></p></body>'
  },
  {
    title: "党组织书记述职报告制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 1181px;"><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">党组织书记述职评议主要围绕研究制定和实施基层党建总体规划及年度计划、建立健全党的基层组织、加强基层党组织领导班子建设和党员队伍建设、关心爱护基层党务干部、带头抓好基层党建工作落实等方面来进行。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">社区党组织书记述职的主要内容：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">创先争优活动开展情况；贯彻执行上级党组织关于党的建设的部署和决定情况；加强社区“两委”班子建设情况；开展党组织活动和发挥党员作用情况；加强党员队伍建设的情况；推进社区党建工作规范化建设、推进党建工作创新的情况；党风廉政建设的情况；其他需要述职的内容。 </span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><a></a><span style="font-family:宋体;font-size:18px;;color:black">述职评议的方法步骤述职评议工作每年进行一次，采取定性评价与量化考评相结合的方式。主要通过以下方法进行：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">1</span><span style="font-family:宋体;font-size:18px;;color:black">、述前准备。党组织书记要明确抓基层党建工作的基本思路，主持制定基层党建年度工作目标和主要措施。年初，要分别向上级党组织和本地党员、群众报告年度目标和具体措施，并通过党务活动栏向党员群众公布，接受监督。年终，党组织书记对照述职的主要内容、基层党建工作目标任务和年初承诺的内容，深入基层调研，全面进行自查，总结工作经验，查找问题不足，明确努力方向。在此基础上，撰写好述职报告。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">2</span><span style="font-family:宋体;font-size:18px;;color:black">、述职评议。党组织召开述职评议大会，对党组织书记抓基层党建工作进行述职评议。述职评议按照会议述职、中点评、民主评议程序进行。党组织书记向上级党组织述职，由上级党组织负责人主持，接受上级党组织负责人的点评和参会人员的评议；向本地本单位党员群众述职，由党组织书记主持，接受党员群众的评议，上级党组织派人指导。点评和评议的主要内容包括：履行管党职责情况的总体评价，存在的问题和不足，改进工作的意见和建议等。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">3</span><span style="font-family:宋体;font-size:18px;;color:black">、实地考评。对照考核的主要内容，主要采取听取汇报、调阅有关资料、实地查看、召开座谈会和进行民意调查等方法，对党组织书记抓基层党建工作的情况进行百分制考核评分。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">4</span><span style="font-family:宋体;font-size:18px;;color:black">、综合评价。根据述职评议和实地考核情况，作出综合评价，评价分为“优秀”、“称职”、“基本称职”、“不称职”四个等次。综合评价要注重工作实绩和社会公认度，广泛听取党员和群众意见。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">5</span><span style="font-family:宋体;font-size:18px;;color:black">、述后整改。采取适当方式通报述职情况，公布评议和考评结果。针对发现的问题和不足，采取印发整改通知书、集中检查、派出督查组等形式，跟踪督查整改落实情况。下次述职评议时，专题汇报问题整改落实情况，接受党员群众的监督。</span></p><p style="text-align:left;text-indent:37px;line-height:37px"><span style="font-size:19px;font-family:宋体;color:black">&nbsp;</span></p><p style="text-align:left;text-indent:37px;line-height:37px"><span style="font-size:19px;font-family:宋体;color:black">&nbsp;</span></p><p style="text-align:left;text-indent:37px;line-height:37px"><span style="font-size:19px;font-family:宋体;color:black">&nbsp; </span></p><p style="text-align:left;text-indent:43px;line-height:37px"><strong><span style="font-size:21px;font-family:宋体;color:black">&nbsp;</span></strong></p><p><br></p></body>'
  },
  {
    title: "民主评议党员制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 784px;"><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">民主评议党员制度，是党组织依据党员标准，组织党员和群众对每个党员的思想、工作、作风和模范作用进行综合评议，促使党员自觉接受群众监督的一种必要形式。党支部要认真开展民主评议党员工作。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">一、每年至少评议一次，一般在年终进行。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">二、民主评议党员的对象为支部全体党员，评议时召集全体党员或部分群众代表参加。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">三、评议要按照《党章》规定的党员条件和要求，对党员履行义务、行使权利、发挥先锋模范作用的情况进行综合评议和鉴定。评议的等次分为优秀、合格、基本合格和不合格四个等次。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">四、民主评议党员工作的程序是：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">（1）动员教育；（2）党员自评和群众评议；（3）汇总并分析研究评议情况；（4）向上级党组织报告评议结果及党支部意见；（5）使用评议结果进行评先选优和处置不合格党员，对基本合格党员要制定改进措施。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">五、评议结果在向上级党组织报告的同时要通报本人。要坚持定量与定性分析相结合，正确区分政策界限，不能简单地“以票取人”。对民主评议中不合格票超过50%的，一般应初步认定为不合格党员。对初步认定的不合格党员，在认真调查核实，广泛听取基层群众意见的基础上，区分一时一事表现与长期一贯表现，严格按照程序进行调查、谈话、审批、宣布和教育转化。对存在问题一时难以核实的，暂缓做出结论。提出的处置意见，提交支部大会，按照民主集中制的原则进行表决。对存在问题较多的党员，指定专人做好耐心细致的思想政治工作，促其转化。对不合格党员，根据具体情况和本人态度，采取限期改正、劝退和除名等方式予以处置。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;">六、通过民主评议党员，表彰优秀党员、处置不合格党员，进一步提高党员素质，纯洁党的组织，增强党组织凝聚力和战斗力。</span></p><p><br></p></body>'
  },
  {
    title: "协商议事工作和监督制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 555px;"><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">为规范和约束党组织和党员、尤其是党员领导干部的行为，使党员和党组织自觉接受群众监督，更好地发挥党员、党支部的作用，制定民主监督制度。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">一、广泛听取群众意见，坚持每年开展一次党内外群众评议党员领导干部活动。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">二、制定群众举报制度，设立举报电话、意见箱、电子信箱，由专人负责。认真处理好群众对党组织、党员的检举、控告。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">三、定期开展与群众对话活动。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">四、对于群众在评议、举报、座谈对话中提出的意见，党支部要定期研究、认真归纳整理，对号入座，并制定出切实可行的改进措施，并要把党组织处理群众意见的情况及时向群众反馈。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:37px"><span style="font-family:宋体;font-size:18px;;color:black">五、对积极负责地行使监督权利的党内外群众，要表扬和鼓励，对压制民主、打击报复的行为，要追究责任、严肃处理。</span></p><p style="line-height:37px"><span style="color:black">&nbsp;</span></p><p><br></p></body>'
  },
  {
    title: "党内关怀、帮扶制度",
    content: '<body class="view" contenteditable="true" spellcheck="false" style="overflow-y: hidden; cursor: text; height: 453px;"><p style="margin-top:0;margin-right:0;margin-bottom:0;margin-left:0;text-align:justify;text-justify:inter-ideograph;text-indent:32px;line-height: 28px;background:white"><span style="font-family:宋体;font-size:18px;">健全党内激励、关怀、帮扶机制，注重人文关怀和心理疏导，从政治、思想、工作和生活上关心、爱护、帮助党员；做好谈心谈话以及对生活困难党员和老党员的走访、慰问和帮扶。主要内容：</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">1</span><span style="font-family:宋体;font-size:18px;">、党支部负责确定党员联系群众名单。&nbsp;</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">2</span><span style="font-family:宋体;font-size:18px;">、联系人向被联系人宣传党的路线、方针、政策、基本知识、基本理论和相关法律、法规、制度等内容。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">3</span><span style="font-family:宋体;font-size:18px;">、联系人及时了解被联系人思想、工作、学习、和生活情况，做好其思想工作，帮助其解决工作、学习、生活中存在的问题。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">4</span><span style="font-family:宋体;font-size:18px;">、积极做好思想工作，化解矛盾纠纷。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">5</span><span style="font-family:宋体;font-size:18px;">、联系人要认真做好工作记录，对发现的重要问题及时向有关领导汇报。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">6</span><span style="font-family:宋体;font-size:18px;">、党群联系工作作为考察党员先锋模范作用的一项重要内容，在民主评议中党员要自我总结。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">7</span><span style="font-family:宋体;font-size:18px;">、党支部定期听取党员联系群众工作汇报，党总经常研究一次党群联系工作，及时总结，对做得好的党员给予表扬。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%"><span style="font-family: 宋体">8</span><span style="font-family:宋体;font-size:18px;">、对申请入党积极分子做好重点培养工作。</span></p><p style=";margin-bottom:0;text-indent:32px;line-height:150%">　</p><p><br></p></body>'
  }
];