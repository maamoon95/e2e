const { browser, element, by } = require('protractor');
const  Page = require('./page.js');
const log = require('../lib/logger');
const until = browser.ExpectedConditions;
const dbAPI = require('../lib/dbAPI');
const veUtil = require('../lib/veUtil');
class Agent extends Page  {
  constructor() {
    super();
  }

  // buttons
  get hangup () { return element(by.id('hangupButton'));}
  get confirm () { return element(by.id('confirmDismissBtn'));}
  get startVideo () {return element(by.id('startVideoButton'));}
  // elements
  get localvideo () { return element(by.id('localVideo'));}
  get videoPreview () { return element(by.id('videoPreview'));}

  setVisitorId = async function (visitorId) {
    await browser.executeScript('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + visitorId + '");} ');
  };
  localVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('localVideo'))), 30000, 'Agent localvideo not available in 30s');
  };
  remoteVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('remoteVideo'))), 5000, 'Remote Video not available in 5s');
  };
  previewVideoStarted = async function () {
    return browser.wait(until.visibilityOf(element(by.id('videoPreview'))), 15000, 'Preview video not available in 5s');
  };
  hasSrcObject = function() {
    return element(by.id('localVideo')).getAttribute('srcObject');
  };
  getCloudUrl = function () {
    return browser.driver.wait(function () {
      return browser.driver.executeScript('return (window.getVeContext().cloudUrl)');
    }, 5000, 'get shorturl within 5 seconds');
  };
  configureAgentWithJS = async function (confObject, sessionId) {
    // {\'pak\':"' + config.test_env.pak + '", \'externalId\':"' + config.test_env.externalId + '"}
    const confPartnerOrg = {
      pak: confObject.pak,
      externalId: confObject.externalId
    };
    const confUsr = {
      firstName: confObject.firstName,
      lastName: confObject.lastName,
      email: confObject.email,
      userName: 't'
    };
    const confVisitor = {};
    const confOptions = {
      hideChat: true,
      hideInfo: true
    };
    const initString = JSON.stringify(confPartnerOrg) +
    ',' + JSON.stringify(confUsr) +
    ',' + JSON.stringify(confVisitor) +
    ',' + JSON.stringify(confOptions);
    log.debug('Conf string:' + initString);
    if (sessionId) {
      await this.setVisitorId(sessionId);
    }
    await browser.executeScript('_videoengager.init(' + initString + ');');
  };

  /**
   * generate an agent url from given configuration
   * @param {string} sessionId visitor session id
   * @param {string} mode inbound and outbound connections
   * @param {string} conferenceId same visitor and agent conferance id for 3 way call
   * @param {string} pin same visitor and agent pin code
   * @returns {string} agent url with configurations in url paramters
   */
  async createAgentUrlWithJS (confObject, sessionId, mode = 'inbound', conferenceId, pin) {
    const params = {
      params: veUtil.strToBase64('{"locale":"en_US"}'),
      interaction: 1,
      token: this.api.token,
      sk: true,
      isPopup: false
    };
    if (mode === 'inbound'){
      params.invitationId = sessionId;
    } else {
      params.transferId = sessionId;
      params.conferenceId = conferenceId;
      params.pin = pin;
    }
    return `${confObject.baseURL}/static/agent.popup.cloud.html?${veUtil.generateUrlParamters(params)}`;
  }

  /**
   * @returns {string} agent url for configured server
   */
  constructUrl (confObject) {
    log.debug('using config object:' + JSON.stringify(confObject));
    return confObject.baseURL + '/static/agent.popup.cloud.html';
  }

  /**
   * generate shorturl for visitor and add it to db
   * @param {string} string VISITOR_SESSION_ID
   * @param {string} string CONFERENCE_ID
   * @param {string} string PIN
   * @returns {string} visitor short url
   */
  async createVisitorShortUrl (confObject, VISITOR_SESSION_ID, CONFERENCE_ID, PIN) {
    const code = veUtil.makeid(6);
    await this.api.addShorUrl(confObject, VISITOR_SESSION_ID, CONFERENCE_ID, PIN, code);
    return confObject.baseURL + '/ve/' + code;
  }

  /**
   * generate authorizatin token to be able to make api calls
   */
  async authenticate(confObject){
    return await this.api.authenticate(confObject);
  }

  /**
   * return authorization token
   */
  get token (){
    return this.api.token;
  }

  /**
   * api calls for authorized agent
   */
  api = {
    authenticate: async function (confObject) {
      this.token = await dbAPI.impersonate(confObject);
      this.confObject = confObject;
    },
    /**
     * @returns current agent's settings
     */
    getBrokerage: function () {
      return dbAPI.getBrokerage(this.token)
        .then(function (result) {
          return result.data;
        });
    },
    /**
     * call to set precall
     * @param {boolean} enable enable or disable precall by flag
     * @returns promise
     */
    setPrecall: function (enable) {
      return dbAPI.updateBrokerageProfile(this.token, { branding: { visitorShowPrecall: enable } });
    },
    /**
     * call to set safety (anti harassment)
     * @param {boolean} enable enable or disable functionality
     * @param {boolean} disableRemoteCamera start with disabled remote camera
     * @returns promise
     */
    setSafety: function (enable, disableRemoteCamera) {
      return dbAPI.updateBrokerageProfile(this.token, { safety: { enable: enable, disableRemoteCamera: disableRemoteCamera } });
    },
    /**
     * 
     * @param {boolean} blur enable or disable blur func
     * @returns promise
     */
    setBlur: function (blur) {
      return dbAPI.updateBrokerageProfile(this.token, { branding: { buttons: { 'wd-v-blur': blur } } });
    },
    /**
     * add generated visitor shorturl binded to full url to db
     * @param {Object} confObject our environment configuration file
     * @param {string} transferId visitor session id
     * @param {string} conferenceId agent and visitor shared conferance id for 3 way call
     * @param {string} pin agent and visitor shared pin code
     * @param {string} code shorturl code
     * @returns promise
     */
    addShorUrl: async function (confObject, transferId, conferenceId, pin, code) {
      const encodedClientInfo = veUtil.jsonToBase64(veUtil.generateClientInfo(transferId));
      const postData = veUtil.generateShortUrlPostData(confObject, conferenceId, encodedClientInfo, code, transferId, pin);
      log.debug('postData:', JSON.stringify(postData));
      const url = confObject.baseURL + '/api/shorturls';
      return dbAPI.addShortUrl(this.token, url, postData);
    }
  };
}
module.exports = Agent;
