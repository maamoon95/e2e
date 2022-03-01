/* globals describe beforeAll afterEach it expect */
const log = require('./lib/logger');
const config = require('./lib/config');
const util = require('./lib/common');
// Import Agent class definition
const Agent = require('./po/agent');
// Create an agent page object
const agent = new Agent();

const Visitor = require('./po/visitor');
const visitor = new Visitor();
log.init(config.logger);

describe('Basic video call tests', function () {
  let VISITOR_SESSION_ID = '123';
  let url;
  let visitorUrl;

  // Lets prepare some sane settings.
  beforeAll(async function () {
    //  Don't obscure view
    await util.setSafety(true, false);
    visitorUrl = visitor.constructUrlC2V(config.test_env, VISITOR_SESSION_ID);
  });

  afterEach(async function () {
    //
  });

  it('should make inbound call, agent page loads first', async function () {
    url = await agent.createAgentUrlWithJS(config.test_env, VISITOR_SESSION_ID);
    log.debug('about to open agent url:' + url);
    await agent.openAsNew(url);

    log.debug('about to open visitor url in a second browser:' + visitorUrl);
    await visitor.openAsNew(visitorUrl);

    // switch to agent page and verify we have local and remote video
    await agent.switchTo();
    expect(await agent.localVideoStarted()).toBeTruthy();
    await agent.remoteVideoStarted();
    await expect(agent.localvideo.getAttribute('readyState')).toEqual('4');

    // switch to visitor and verify we have local and remote video
    await visitor.switchTo();
    expect(await visitor.localVideoStarted()).toBeTruthy();
    await visitor.remoteVideoStarted();
    await expect(visitor.localvideo.getAttribute('readyState')).toEqual('4');

    await agent.switchTo();
    await agent.hangup.click();
    await agent.confirm.click();
  });

  it('should make inbound call, visitor page loads first', async function () {
    // Test will use different visitor session
    VISITOR_SESSION_ID = '456';
    const vurl = visitor.constructUrlC2V(config.test_env, VISITOR_SESSION_ID);
    log.debug('about to open visitor Url: ' + vurl);
    // reuse visitor window
    await visitor.switchTo();
    await visitor.open(vurl);

    // Agent window is closed, open new, with a session
    url = await agent.createAgentUrlWithJS(config.test_env, VISITOR_SESSION_ID);
    log.debug('about to open agent url:' + url);
    await agent.openAsNew(url);

    // switch to agent page and verify we have local and remote video
    await agent.switchTo();
    expect(await agent.localVideoStarted()).toBeTruthy();
    await agent.remoteVideoStarted();
    await expect(agent.localvideo.getAttribute('readyState')).toEqual('4');

    // switch to visitor and verify we have local and remote video
    await visitor.switchTo();
    expect(await visitor.localVideoStarted()).toBeTruthy();
    await visitor.remoteVideoStarted();
    await expect(visitor.localvideo.getAttribute('readyState')).toEqual('4');

    await agent.switchTo();
    await agent.hangup.click();
    await agent.confirm.click();
  });

  it('should make outbound call, and end it from agent', async function () {
    url = await agent.createAgentUrlWithJS(config.test_env);
    await agent.openAsNew(url);
    // click blue button in agent
    await agent.switchTo();
    await agent.previewVideoStarted();
    // get visitor short url
    await agent.startVideo.click();
    // get visitor short url
    visitorUrl = await agent.getCloudUrl();
    // open visitor page
    await visitor.switchTo();
    await visitor.open(visitorUrl);

    // switch to agent page and verify we have local and remote video
    await agent.switchTo();
    expect(await agent.localVideoStarted()).toBeTruthy();
    await agent.remoteVideoStarted();
    await expect(agent.localvideo.getAttribute('readyState')).toEqual('4');

    // switch to visitor and verify we have local and remote video
    await visitor.switchTo();
    expect(await visitor.localVideoStarted()).toBeTruthy();
    await visitor.remoteVideoStarted();
    await expect(visitor.localvideo.getAttribute('readyState')).toEqual('4');

    await agent.switchTo();
    await agent.hangup.click();
    await agent.confirm.click();
  });
});
