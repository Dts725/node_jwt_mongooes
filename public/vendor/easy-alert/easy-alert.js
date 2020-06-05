/**
 * 简易弹窗 -- 王
 * 20180703
 * **/
var easyAlert = {
  config: {
    showTitle: true,
    closeIconColor: '#fff',
    showBottomBtn: false
  },
  data: {
    "imgUrl": "",
    "name": "顾倩倩",
    "job": "书记",
    "phone": "13916022642",
    "duty": "主持社区全局工作",
    "motto": "家事、急事、难事、烦心事、事事我关心"
  },
  $$: function (id) {
    if (!id) {
      id = 'easy-alert';
    }
    return document.getElementById(id);
  },
  init: function (data, cfg) {
    if (!cfg) {
      cfg = this.config;
    }
    // if (!data.title) {
    //   this.config.closeIconColor = '#ff9900';
    // }
    var html = '', tit = '', img = '', info = '', duty = '', motto = '', con = '', style = '';
    // var img = (!data.imgUrl && !data.name) ? '' : '<div class="easy-alert-body-top-con-img"><img src="' + data.imgUrl + '" alt=""></div>',
    //   info = data.name && data.phone && data.job ? '<div class="easy-alert-body-top-con-info"><strong>' + data.name + '</strong><span>' + data.phone + '</span><p>' + data.job + '</p></div>' : '',
    //   duty = data.duty ? '<div><h3 style="margin-bottom:10px; font-size:17px;"><strong>工作职责：</strong></h3><p style="text-indent: 2rem;">' + data.duty + '</p></div>' : '',
    //   motto = data.motto ? '<div><h3 style="margin-bottom:10px; font-size:17px;"><strong>服务理念：</strong></h3><p style="text-indent: 2rem;">' + data.motto + '</p></div>' : '';
    // var con = data.name && data.phone && data.job ? '' : data,
    //   title = con ? '详情' : '';
    // var html = '<div class="easy-alert-bg" onclick="easyAlert.close()"></div>' +
    //   '<div class="easy-alert-box">' +
    //   '<div class="easy-alert-header">' + title +
    //   '<i class="easy-alert-close" onclick="easyAlert.close()" style="color:' + cfg.closeIconColor + ';border-color:' + cfg.closeIconColor + ';">X</i>' +
    //   '</div>' +
    //   '    <div class="easy-alert-body">' +
    //
    //
    //   '      <div class="easy-alert-body-top" style="' + (con ? 'height:10%;' : '') + '" >' +
    //   '        <div class="easy-alert-body-top-con" style="' + (con ? 'display: block;text-align: center;' : '') + '" >' +
    //   img + info + title +
    //   '        </div>' +
    //   '      </div>' +
    //   '      <div class="easy-alert-body-bottom">' +
    //   '        <div class="easy-alert-body-bottom-con">' + duty + motto + con +
    //   // '          <div class="easy-alert-bottom-btns">' +
    //   // '            <button class="easy-alert-btn easy-alert-sure" onclick="easyAlert.close()">确 定</button>' +
    //   // '          </div>' +
    //   '        </div>' +
    //   '      </div>' +
    //
    //   '      </div>' +
    //   '</div></div>';
    tit = '<div class="easy-alert-header">' + (data.title ? data.title : '') +
      '<i class="easy-alert-close" onclick="easyAlert.close()" style="font-weight: normal; color:' + cfg.closeIconColor + ';border-color:' + cfg.closeIconColor + ';">X</i>' +
      '</div>';

    if (data.name && data.phone && data.job) {
      img = (!data.imgUrl && !data.name) ? '' : '<div class="easy-alert-body-img-box"><img src="' + data.imgUrl + '" alt=""></div>';
      info = data.name && data.phone && data.job ? '<div class="easy-alert-body-info"><strong>' + data.name + '</strong><span>' + data.phone + '</span><p>' + data.job + '</p></div>' : '';
      duty = data.duty ? '<h3 style="margin-bottom:10px; font-size:17px;"><strong>工作职责：</strong></h3><p style="text-indent: 2rem;margin-bottom:10px;">' + data.duty + '</p>' : '';
      motto = data.motto ? '<h3 style="margin-bottom:10px; font-size:17px;"><strong>服务理念：</strong></h3><p style="text-indent: 2rem;margin-bottom:10px;">' + data.motto + '</p>' : '';
      if (motto) {
        style = 'padding: 1rem 25%;';
      }
      con = '<div class="easy-alert-body-top" >' + img + info + '</div>' +
        '<div class="easy-alert-body-bottom" style="' + style + '">' +
        duty + motto +
        '</div>';
    } else {
      con = data.con;
    }


    html = '<div class="easy-alert-bg" onclick="easyAlert.close()"></div>' +
      '<div id="easyAlertBox" class="easy-alert-box animated zoomIn">' +
      // 顶部header
      tit +
      '<div class="easy-alert-body">' + con +
      '</div>' +
      '</div>';
    if (this.$$()) {
      this.$$().innerHTML = html;
    } else {
      var div = document.createElement('div');
      div.id = 'easy-alert';
      div.innerHTML = html;
      document.body.appendChild(div);
    }
    this.$$().style.display = 'block';
  },
  close: function () {
    if (this.$$()) {
      var _this=this;
      this.$$('easyAlertBox').className = 'easy-alert-box animated zoomOut';
      setTimeout(function () {
        _this.$$().style.display = 'none';
      }, 200);
    }
  }
};

// easyAlert.init(easyAlert.data);
