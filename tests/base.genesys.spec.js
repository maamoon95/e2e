/* global describe beforeAll beforeEach afterEach expect it xit */

const { browser } = require('protractor');
const config = require('./lib/config');
const log = require('./lib/logger');
const veUtil = require('./lib/veUtil');
log.init(config.logger);

// create proxy server
const MockProxy = require('./lib/mockProxy');
const mockProxy = new MockProxy();

// prepare genesys page and visitor page instances
const Genesys = require('./po/genesys');
const Visitor = require('./po/visitor');
const genesys = new Genesys();
const visitor = new Visitor();

let VISITOR_SESSION_ID;

describe('genesys page tests', function () {
  let visitorUrl;

  beforeAll(async function () {
    const PROXY_SERVER_PORT = 9001;
    const SOCKET_SERVER_PORT = 9898;
    // start 80 port proxy server
    await mockProxy.startHttpProxyServer(PROXY_SERVER_PORT);
    // start 443 port proxy server
    await mockProxy.startSSlProxyServer(PROXY_SERVER_PORT);
    // start https server for mock responses
    await mockProxy.startHttpServer(veUtil.getUUID(), PROXY_SERVER_PORT);
    // start socket server for mock socket connection
    await mockProxy.startSocketServer(SOCKET_SERVER_PORT);

    await veUtil.authenticate();
    await veUtil.setPrecall(false);
    await veUtil.setPrecallWorkflow(false);
    await veUtil.setNewTheme(false);
  });

  beforeEach(async function () {
    VISITOR_SESSION_ID = veUtil.getUUID();
    visitorUrl = visitor.constructUrlC2V(config.test_env, VISITOR_SESSION_ID);
  });

  afterEach(async function () {
    await genesys.switchToIframe();
    await genesys.hangup.click();
    await genesys.confirm.click();
    await visitor.close();
    await genesys.close();
  });

  it('genesys page outbound connection test', async function () {
    // construct genesys url by pak, env, clientId
    const genesysUrl = genesys.constructUrl(config.test_env);
    // open genesys page
    await genesys.openAsNew(genesysUrl);
    // click start video button
    await genesys.authorized();
    // check is websocket conencted
    await mockProxy.isConnected();
    // check c2v button
    await genesys.c2vAvailable();
    await genesys.startVideoButton.click();
    // check if iframe created
    await genesys.iframeCreated();
    // get generated visitor url from genesys page
    visitorUrl = await genesys.getVisitorUrl();

    // open visitor page and join to the call
    await visitor.openAsNew(visitorUrl);
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

  it('genesys page inbound connection test', async function () {
    mockProxy.setSelectedChat(1);
    mockProxy.setInteractionId(VISITOR_SESSION_ID);
    await visitor.openAsNew(visitorUrl);

    // construct genesys url by pak, env, clientId
    // already authorized
    const genesysUrl = genesys.constructUrl(config.test_env);
    // open genesys page
    await genesys.openAsNew(genesysUrl);
    // check is websocket conencted
    await mockProxy.isConnected();
    // check pickup button
    await genesys.pickupAvailable();
    await genesys.acceptClickToVideoButton.click();
    // check if iframe created
    await genesys.iframeCreated();
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
