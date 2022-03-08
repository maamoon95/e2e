/* global describe beforeAll beforeEach afterEach expect it xit */

const { browser } = require('protractor');
const config = require('./lib/config');
const log = require('./lib/logger');
const veUtil = require('./lib/veUtil');
log.init(config.logger);

// create proxy server
const proxy = require('./lib/proxy');
const Proxy = new proxy();

// prepare genesys page and visitor page instances
const Genesys = require('./po/genesys');
const Visitor = require('./po/visitor');
const { DriverProvider } = require('protractor/built/driverProviders');
const genesys = new Genesys();
const visitor = new Visitor();

let VISITOR_SESSION_ID;

describe('genesys page tests', function () {
  beforeAll(async function () {
    // start 80 port proxy server
    await Proxy.startHttpProxyServer();
    // start 443 port proxy server
    await Proxy.startSSlProxyServer();
    // start https server for mock responses
    await Proxy.startHttpServer(veUtil.getUUID());
    // start socket server for mock socket connection
    await Proxy.startSocketServer();
  });

  beforeEach(async function () {
    VISITOR_SESSION_ID = veUtil.getUUID();
    visitor.constructUrlC2V(config.test_env, VISITOR_SESSION_ID);
    await veUtil.authenticate();
    await veUtil.setPrecall(false);
  });

  afterEach(async function () {
    await genesys.switchToIframe();
    await genesys.hangup.click();
    await genesys.confirm.click();
    await visitor.close();
  });

  it('genesys page outbound connection test', async function () {
    // construct genesys url by pak, env, clientId
    const genesysUrl = genesys.constructUrl(config.test_env);
    // open genesys page
    await genesys.openAsNew(genesysUrl);
    // check is websocket conencted
    await Proxy.isConnected();
    // click start video button
    // CHECK AUTH REDIRECTION
    browser.sleep(5000);
    await genesys.startVideoButton.click();
    // check if iframe created
    await genesys.iframeCreated();
    // get generated visitor url from genesys page
    browser.sleep(5000);
    const visitorUrl = await genesys.getVisitorUrl();

    // open visitor page and join to the call
    await visitor.openAsNew(visitorUrl);
    browser.sleep(1000);
    await visitor.precallStarted();
    await visitor.joinConferenceButton.click();

    // switch to genesys page and verify we have local and remote video
    await genesys.switchToIframe();
    expect(await genesys.localVideoStarted()).toBeTruthy();
    await genesys.remoteVideoStarted();
    await expect(genesys.localvideo.getAttribute('readyState')).toEqual('4');

    // switch to visitor and verify we have local and remote video
    await visitor.switchTo();
    await visitor.localVideoStarted();
    await expect(visitor.localvideo.getAttribute('readyState')).toEqual('4');
    await visitor.remoteVideoStarted();
  });
});
