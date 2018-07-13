window.Promise = require('es6-promise').Promise;

/**
 *
 *
 * @param {*} option
 * @param {*} isSystem
 * @returns
 */
function getHttp(option, isSystem) {
  var promise = new Promise(function (resolve, reject) {
    var client = createXMLHttp();

    let _temp = option.url.split('?');

    let url = _temp[0];
    let param = _temp.length >= 2 ? _temp[1] : '';
    let _tmpPara = [];

    if (param) {
      param.split('&').forEach(i => {
        let _val = i.split('=')[1];
        _tmpPara.push(`${i.split('=')[0]}=${encodeURIComponent(_val)}`);
      });

      url += `?${_tmpPara.join('&')}`;
    }

    if (!isSystem) {
      url = '/api' + url;
    }

    // 是否创建成功
    if (!client) reject(new Error('create XMLHttpRequest failed!please check you browser!'));

    client.open(option.Method, url);
    client.onreadystatechange = handler;
    if (option.type != 1) {
      client.setRequestHeader('Content-Type', 'application/json');
    }

    client.responseType = 'json';
    client.setRequestHeader('Accept', 'application/json');
    client.setRequestHeader('If-Modified-Since', '0');
    client.timeout = 60000;
    client.ontimeout = function () {
      resolve({
        code: -1,
        msg: '连接超时'
      });
    }
    client.send(option.para);

    /**
     * [handler handler处理程序]
     * @return {[type]} [description]
     */
    function handler() {
      if (this.readyState !== 4) {
        return;
      }
      if (this.status === 200) {
        let _data = this.response;
        if (typeof _data === 'string') {
          _data = JSON.parse(this.response);
        }
        resolve(_data);
      } else {
        if (this.status != 0) {
          resolve({
            code: this.status,
            msg: '系统异常'
          });
        }

      }
    }

    /**
     * [CreateXMLHttp 创建Ajax对象]
     */
    function createXMLHttp() {

      let xmlhttp;

      try {
        xmlhttp = new XMLHttpRequest(); //尝试创建 XMLHttpRequest 对象，除 IE 外的浏览器都支持这个方法。
      } catch (e) {
        try {
          xmlhttp = ActiveXobject('Msxml12.XMLHTTP'); //使用较新版本的 IE 创建 IE 兼容的对象（Msxml2.XMLHTTP）。
        } catch (ex) {
          try {
            xmlhttp = ActiveXobject('Microsoft.XMLHTTP'); //使用较老版本的 IE 创建 IE 兼容的对象（Microsoft.XMLHTTP）。
          } catch (failed) {
            xmlhttp = false; //如果失败了还保持false
          }
        }
      }
      return xmlhttp;
    }

  });

  return promise;
}

/**
 *
 *
 * @class HttpRequest
 */
class HttpRequest {


  get(option, isSystem = false) {
    option = option || {};
    option.Method = 'GET';
    return getHttp(option, isSystem);
  }

  post(option) {
    option = option || {};
    option.Method = 'POST';
    return getHttp(option);
  }

  put(option) {
    option = option || {};
    option.Method = 'PUT';
    return getHttp(option);
  }

  delete(option) {
    option = option || {};
    option.Method = 'DELETE';
    return getHttp(option);
  }

  patch(option) {
    option = option || {};
    option.Method = 'PATCH';
    return getHttp(option);
  }

  upload(option) {
    option = option || {};
    option.Method = 'POST';
    option.type = 1;
    return getHttp(option);
  }


}

export default HttpRequest;