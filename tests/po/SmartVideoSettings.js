const { browser, element, by } = require('protractor');
const veUtil = require('../lib/veUtil');
const NextjsPage = require('./nextjsPage');
const until = browser.ExpectedConditions;
const log = require('../lib/logger');
class SmartVideoSettings extends NextjsPage {
  constructor() {
    super();
    this.genesysIframe = null;
    this.BRANDING_TAB = 'brandingSettings-form';
    this.SMARTVIDEO_TAB = 'smartVideoSettings-form';
    this.PURECLOUD_TAB = 'pureCloudSettings-form';
  }

  /**
   * get active Tab Id
   * Possible return values are:
   * smartVideoSettings-form
   * brandingSettings-form
   * pureCloudSettings-form
   */
  get activeTabId () {
    if (this.checkIfIdExist(this.BRANDING_TAB)) {
      return this.BRANDING_TAB;
    }
    if (this.checkIfIdExist(this.SMARTVIDEO_TAB)) {
      return this.SMARTVIDEO_TAB;
    }
    if (this.checkIfIdExist(this.PURECLOUD_TAB)) {
      return this.PURECLOUD_TAB;
    }
  }

  get tenantId () {
    return browser.wait(async function () {
      const value = await element(by.testId('smartVideoSettings.tenantId')).getAttribute('value');
      if (!value) {
        return '';
      }
      return value;
    });
  }

  /**
   * check if genesys page is authorized by checking hash (#) in the ne of the url
   * genesys page redirects back with hash to genesys page if authorized
   * it saves accessToken to localstorage(puretoken)
   * @param {Object} puretoken check authorize by accessToken
   * @returns promise
   */
  async authorized (puretoken = '') {
    return browser.wait(async function () {
      let localStoragePuretoken = await browser.executeScript('return window.localStorage.getItem("mypurecloud_com_au_auth_data")');
      if (!localStoragePuretoken) {
        return false;
      }
      try {
        localStoragePuretoken = JSON.parse(localStoragePuretoken);
      } catch (e) {
        return false;
      }
      if (localStoragePuretoken.accessToken === puretoken) {
        log.debug('verify authorize by token in localstorage');
        return true;
      }
      return false;
    }, global.TIMEOUT, 'not authorized in ' + global.TIMEOUT + 's');
  }

  /**
   * construct genesys url with environment, pak and client id for authentication
   * @param {Object} confObject environment configuration object
   * @returns {string} genesys page url
   */
  constructUrl (confObject, genesysParams, path) {
    let url = confObject.baseURL + path + '?';
    genesysParams.environment = confObject.environment.substring(12);
    genesysParams.pak = confObject.pak;
    genesysParams.clientId = confObject.clientId;
    log.debug('genesysParams:' + JSON.stringify(genesysParams));
    url += veUtil.generateUrlParamters(genesysParams);
    return url;
  }
}
module.exports = SmartVideoSettings;
