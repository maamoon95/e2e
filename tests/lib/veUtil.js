const uuid = require('uuid');
const veUtils = {
  // to avoid mant imports and the reason of common usage use uuid from here
  getUUID: uuid.v1,
  /**
   * generate id with the lenght of given number
   * @param {int} num lenght of id
   * @returns {string} id
   */
  makeid: function (num) {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < num; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  /**
   * generate random digits string with the lenght of given number
   * @param {int} num lenght of id
   * @returns {string} id
   */
  randomDigit: function (num) {
    let text = '';
    const possible = '0123456789';
    for (let i = 0; i < num; i++) {
      text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
  },
  /**
   * convert str to base64
   * @param {string} str given str
   * @returns {string} base64 string
   */
  strToBase64: function (str) {
    try {
      return Buffer.from(str).toString('base64');
    } catch (e) {
      throw Error(e);
    }
  },
  /**
   * convert given json to string and to base64
   * @param {JSON} json given json object
   * @returns {string} base64 string
   */
  jsonToBase64: function (json) {
    try {
      return Buffer.from(JSON.stringify(json)).toString('base64');
    } catch (e) {
      throw Error(e);
    }
  },
  /**
   * convert object into url paramters
   * @param {Object} parameters key value pair
   * @returns {string} url parameters to use in a http request
   */
  generateUrlParamters: function (parameters) {
    const paramArray = [];
    for (const param in parameters) {
      paramArray.push(param + '=' + parameters[param]);
    }
    return paramArray.join('&');
  },
  /**
   * return date of for the next fiven hours
   * @param {int} hour desired hour
   * @returns {Date} date object for the given next x hours
   */
  getDateOfNextHour: function (hour = 1) {
    const date = new Date();
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours() + hour, date.getMinutes());
  },
  /**
   * generates client info object
   * @param {string} transferId visitors session id
   * @param {*} ac
   * @param {*} hideChat
   * @param {*} skipPrivate
   * @param {*} pcfl
   * @param {*} pcd
   * @param {*} peerName
   * @param {*} telephone
   * @param {*} email
   * @returns {object}
   */
  generateClientInfo: function (transferId, ac = true, hideChat = true, skipPrivate = true, pcfl = false, pcd = false, peerName = null, telephone = null, email = null) {
    const clientInfo = {
      ac: ac,
      transferId: transferId,
      hideChat: hideChat,
      skip_private: skipPrivate,
      pcfl: pcfl,
      pcd: pcd
    };
    if (peerName) {
      clientInfo.name = peerName;
    }
    if (telephone) {
      clientInfo.telephone = telephone;
    }
    if (email) {
      clientInfo.email = email;
    }
    return clientInfo;
  },
  /**
   * 
   * @param {Object} confObject our servers configuration object
   * @param {string} conferenceId agent visitor shared conferance id for 3 way call
   * @param {string} encodedClientInfo url parameter for visitor full url
   * @param {string} code code for visitor shorturl
   * @param {string} transferId visitor session id
   * @param {string} pin visitor agent shared pin
   * @returns {object} server post req data to store visitor shorturl full url pair
   */
  generateShortUrlPostData: function (confObject, conferenceId, encodedClientInfo, code, transferId, pin) {
    const postDataURLParams = {
      tennantId: this.strToBase64(confObject.tennantId),
      conferenceId: this.strToBase64(conferenceId),
      params: encodedClientInfo,
      shortUrl: confObject.shortUrl
    };
    if (confObject.agentUrl) {
      postDataURLParams.agentUrl = confObject.agentUrl;
    }
    const postDataURL = '/static/popup.html?' + this.generateUrlParamters(postDataURLParams);
    return {
      url: postDataURL,
      code: code,
      transferId: transferId,
      expire: this.getDateOfNextHour(),
      pin: pin,
      invalidUrl: 'https://www.videoengager.com'
    };
  }
};

module.exports = veUtils;
