const { browser, element, by } = require('protractor');
const log = require('../lib/logger');
const veUtil = require('../lib/veUtil');
const Agent = require('./agent');
const until = browser.ExpectedConditions;
class Genesys extends Agent {
  constructor () {
    super();
    this.genesysIframe = null;
  }

  get startVideoButton () { return element(by.id('startVideoButton')); }
  get acceptClickToVideoButton () { return element(by.id('acceptClickToVideoButton')); }

  get inviteUrl () { return element(by.className('invite_url')); }

  async c2vAvailable () {
    return browser.wait(until.visibilityOf(element(by.id('startVideoButton'))), 20000, 'startVideoButton does not became available in 20s');
  }

  async pickupAvailable () {
    return browser.wait(until.visibilityOf(element(by.id('acceptClickToVideoButton'))), 20000, 'acceptClickToVideoButton does not became available in 20s');
  }

  async iframeCreated () {
    return browser.wait(until.visibilityOf(element(by.id('genesysIframe'))), 20000, 'genesysIframe does not became available in 20s');
  }

  async authorized () {
    return browser.wait(async function () {
      const url = await browser.getCurrentUrl();
      if (url && url.substring(url.length - 1, url.length) === '#') {
        return true;
      }
      return false;
    }, 20000, 'not authorized in 20s');
  }

  constructUrl (confObject) {
    let url = confObject.baseURL + '/static/genesys.purecloud.html?';
    const genesysParams = {
      langTag: 'en-us',
      environment: confObject.environment.substring(12),
      interaction: 1,
      pak: confObject.pak,
      clientId: confObject.clientId
    };
    url += veUtil.generateUrlParamters(genesysParams);
    console.log('constructUrl', url);
    return url;
  }

  async getVisitorUrl () {
    return browser.wait(async function () {
      const value = await element(by.className('invite_url')).getAttribute('value');
      if (value !== '') {
        return value;
      }
      return false;
    });
  }

  async switchToIframe () {
    await this.switchTo();
    await browser.switchTo().frame(0);
  }
}
module.exports = Genesys;
