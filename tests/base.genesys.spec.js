/* global describe beforeAll beforeEach afterEach expect it xit */
const { browser } = require('protractor');
const config = require('./lib/config');
const log = require('./lib/logger');
const veUtil = require('./lib/veUtil');
log.init(config.logger);
const MockProxy = require('./lib/mockProxy');
const Genesys = require('./po/genesys');
const Visitor = require('./po/visitor');

describe('genesys page tests in iframe mode', function () {
  // prepare genesys page and visitor page instances
  const genesys = new Genesys();
  const visitor = new Visitor();
  // create proxy server
  const mockProxy = new MockProxy();
  let VISITOR_SESSION_ID;
  let visitorUrl;

  beforeAll(async function () {
    const PROXY_SERVER_PORT = 9001;
    const SOCKET_SERVER_PORT = 9898;
    // start 80 port proxy server
    await mockProxy.startHttpProxyServer(PROXY_SERVER_PORT);
    // start 443 port proxy server
    await mockProxy.startSSlProxyServer(PROXY_SERVER_PORT);
    // start https server for mock responses
    await mockProxy.startHttpServer(config.test_env, veUtil.getUUID(), PROXY_SERVER_PORT);
    // start socket server for mock socket connection
    await mockProxy.startSocketServer(SOCKET_SERVER_PORT);

    // authenticate and set to default db
    await veUtil.authenticate();
    await veUtil.setPrecall(false);
    await veUtil.setPrecallWorkflow(false);
    await veUtil.setNewTheme(false);
    await veUtil.setPopup(false);
    // await veUtil.setInviteUrl('https://staging.videoengager.com/');
  });

  beforeEach(async function () {
    VISITOR_SESSION_ID = veUtil.getUUID();
    visitorUrl = visitor.constructUrlC2V(config.test_env, VISITOR_SESSION_ID);
  });

  afterEach(async function () {
    // close agent and visitor pages after the test
    await genesys.switchToIframe();
    await genesys.hangup.click();
    await genesys.confirm.click();
    await visitor.close();
    await genesys.close();
  });

  it('outbound call: invite visitor, agent is in iframe', async function () {
    // construct genesys url by pak, env, clientId
    const genesysUrl = genesys.constructUrl(config.test_env);
    // open genesys page
    await genesys.openAsNew(genesysUrl);
    // click start video button
    await genesys.authorized();
    // check is websocket conencted
    await mockProxy.isConnected();
    // check c2v button and click it
    await genesys.c2vAvailable();
    await genesys.startVideoButton.click();
    // check if iframe created
    await genesys.iframeCreated();
    // get generated visitor url from genesys page
    visitorUrl = await genesys.getVisitorUrl();

    // open visitor page and join to the call
    await visitor.openAsNew(visitorUrl);
    // switch to genesys page and verify we have local and remote video
    await browser.sleep(300000);
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

  xit('inbound call: create mocked invitation, use pickup button, agent is in popup', async function () {
    // set mockProxy server to response like there are an active interaction
    mockProxy.setSelectedChat(1);
    mockProxy.setInteractionId(VISITOR_SESSION_ID);
    // open visitor page
    await visitor.openAsNew(visitorUrl);

    // construct genesys url by pak, env, clientId
    const genesysUrl = genesys.constructUrl(config.test_env);
    // open genesys page
    await genesys.openAsNew(genesysUrl);
    // genesys page already authorized in the previous test
    // check if websocket conencted
    await mockProxy.isConnected();
    // check pickup button and click it
    await genesys.pickupAvailable();
    await genesys.acceptClickToVideoButton.click();
    // check if iframe created
    await genesys.iframeCreated();
    await genesys.switchToIframe();
    // check genesys page local stream
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
/*
describe('genesys page tests in popup mode', function () {
  // prepare genesys page and visitor page instances
  const genesys = new Genesys();
  const visitor = new Visitor();
  // create proxy server
  const mockProxy = new MockProxy();
  let VISITOR_SESSION_ID;
  let visitorUrl;

  beforeAll(async function () {
    const PROXY_SERVER_PORT = 9001;
    const SOCKET_SERVER_PORT = 9898;
    // start 80 port proxy server
    await mockProxy.startHttpProxyServer(PROXY_SERVER_PORT);
    // start 443 port proxy server
    await mockProxy.startSSlProxyServer(PROXY_SERVER_PORT);
    // start https server for mock responses
    await mockProxy.startHttpServer(config.test_env, veUtil.getUUID(), PROXY_SERVER_PORT);
    // start socket server for mock socket connection
    await mockProxy.startSocketServer(SOCKET_SERVER_PORT);

    // authenticate and set to default db
    await veUtil.authenticate();
    await veUtil.setPrecall(false);
    await veUtil.setPrecallWorkflow(false);
    await veUtil.setNewTheme(false);
    await veUtil.setPopup(true);
  });

  beforeEach(async function () {
    VISITOR_SESSION_ID = veUtil.getUUID();
    visitorUrl = visitor.constructUrlC2V(config.test_env, VISITOR_SESSION_ID);
  });

  afterEach(async function () {
    // close agent and visitor pages after the test
    await genesys.switchToIframe();
    await genesys.hangup.click();
    await genesys.confirm.click();
    await visitor.close();
    await genesys.close();
  });

  xit('outbound call: invite visitor, agent is in popup', async function () {
    // construct genesys url by pak, env, clientId
    const genesysUrl = genesys.constructUrl(config.test_env);
    // open genesys page
    await genesys.openAsNew(genesysUrl);
    // click start video button
    await genesys.authorized();
    // check is websocket conencted
    await mockProxy.isConnected();
    // check c2v button and click it
    await genesys.c2vAvailable();
    await genesys.startVideoButton.click();
    await browser.sleep(100000);
    // check if popup created
    // await genesys.iframeCreated();
  });

});
  */
