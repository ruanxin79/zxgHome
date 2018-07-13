/*
 * 公共方法类
 * creater: Ejin
 * latestModify: Ejin
 * createTime: 2017年2月18日 12:07:23
 */
class CommonCenter {
  /**
   * 格式化时间
   */
  static formatDate(date, formatStr) {

    if (formatStr == null) return null;

    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];
    var month = date.getMonth() + 1;
    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));


    str = str.replace(/MM/, month > 9 ? month : '0' + month);
    str = str.replace(/M/g, month);

    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    str = str.replace(/t/g, date.getHours() < 12 ? 'am' : 'pm');
    str = str.replace(/T/g, date.getHours() < 12 ? 'AM' : 'PM');

    return str;
  };
  /**
   * 时间补0
   */
  static getZero(m) {
    let _m = m;
    if (m < 10) {
      _m = '0' + m;
    }

    return _m;
  }
  /**
   * 复制数组、对象
   */
  static simpleCopy(o) {
    var arr = o;
    var newArr = [] // 为了使用数组的push方法，一定要定义数据类型为数组
    for (var x = 0; x < arr.length; x++) {
      newArr.push(arr[x]) // 用循环逐个把值保存在新数组内
    }
    return newArr;
  }
  /**
   * 获取入参
   */
  static getQueryString(key) {
    var reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)");
    var result = window.location.search.substr(1).match(reg);
    return result ? decodeURIComponent(result[2]) : null;
  }

  /**
   * 判断字符是否为空
   */
  static isEmpty(str) {
    return str == null || str == '';
  }

  /**
   * 验证身份证信息
   * 正确返回true
   */
  static idcardRegex(cardid) {
    // 身份证号验证 
    // regexArray.isIdCard = function(cardid) {
    //身份证正则表达式(18位) 
    var isIdCard2 = /^[1-9]\d{5}(19\d{2}|[2-9]\d{3})((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])(\d{4}|\d{3}X)$/i;
    var stard = "10X98765432"; //最后一位身份证的号码
    var first = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //1-17系数
    var sum = 0;
    if (!isIdCard2.test(cardid)) {
      return false;
    }
    for (var i = 0; i < cardid.length - 1; i++) {
      sum += cardid[i] * first[i];
    }
    var result = sum % 11;
    var last = stard[result]; //计算出来的最后一位身份证号码
    if (cardid[cardid.length - 1].toUpperCase() == last) {
      return true;
    } else {
      return false;
    }
    // };
  }

  /**
   * 验证姓名
   */
  static nameRegex(name) {
    var regex = /^[\u4e00-\u9fa5 ]{2,20}$/;
    return regex.test(name);
  }

  /**
   * 验证手机号
   */
  static phoneRegex(phoneNo) {
    var regex = /^1[34578]\d{9}$/;
    return regex.test(phoneNo);
  }

  /**
   * [numberRegex 验证正整数]
   * @param  {[type]} num [description]
   * @return {[type]}     [description]
   */
  static numberRegex(num) {
    var regex = /^\d*$/;
    return regex.test(num);
  }

  /**
   * 设置html title
   */
  static setTitle(_title) {
    //增加页面元素变动，从而保证标题一定会刷新
    //解决问题：由于部分手机浏览器bug，导致标题更新后不会自动刷新
    var body = document.getElementsByTagName('body')[0];
    document.title = _title;
    var iframe = document.createElement("iframe");
    iframe.style.display = "none";
    iframe.setAttribute("src", "static/favicon.ico");
    var d = function () {
      setTimeout(function () {
        iframe.removeEventListener('load', d);
        document.body.removeChild(iframe);
      }, 0);
    };
    iframe.addEventListener('load', d);
    document.body.appendChild(iframe);

  }

  /**
   * [setScrollHeight 设置页面高度]
   * @param {[type]} disDivId     [description]
   * @param {[type]} bottomHeight [description]
   */
  static setScrollHeight(disDivId, bottomHeight, type) {
    if (typeof (bottomHeight) == "undefined") {
      bottomHeight = 5;
    }

    if (type) {
      bottomHeight = $('html').css('font-size').split('px')[0] * bottomHeight;
    }

    var contentHeight = document.body.offsetHeight;
    var headHeight = $("#" + disDivId).offset().top;

    $("#" + disDivId).height(contentHeight - headHeight - bottomHeight);
    $("#" + disDivId).css("overflow-y", "auto");
    $("#" + disDivId).css("overflow-x", "hidden");
  }
  static Back() {
    window.addEventListener("popstate", function (e) {}, false);

  }

  static checkUrl(urlString) {
    let str = urlString;
    if (str.indexOf("http://") != -1) {
      str = str.substring(str.indexOf("http://"));
    }
    if (str.indexOf("ftp://") != -1) {
      str = str.substring(str.indexOf("ftp://"));
    }
    if (str.indexOf("https://") != -1) {
      str = str.substring(str.indexOf("https://"));
    }
    var reg = /^(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/;
    return reg.test(str)
  }
}

export default CommonCenter;
