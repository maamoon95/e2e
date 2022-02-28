const { browser } = require('protractor');
const log = require('./lib/logger');
const config = require('./lib/config');
// Import Agent class definition
const Agent = require('./po/agent');
// Create an agent page object
const agent = new Agent();
const Visitor = require('./po/visitor');
const visitor = new Visitor();
const util = require('./lib/common');
log.init(config.logger);

describe('End 2 End Video Call between agent and visitor outbound', function () {
  let url;
  let visitorUrl;

  beforeAll(function () {
    visitor.constructUrlC2V(config.test_env);
    util.setDefaultDB();
    url = agent.constructUrl(config.test_env);
  });

  afterEach(async function () {
    browser.manage().logs().get('browser')
      .then(browserLog => {
        browserLog.forEach(function (message) { log.info(message); });
      });
    await agent.switchTo();
    await agent.hangup.click();
    await agent.confirm.click();
    await util.restartBrowser();
  });

  it('should make outbound call, and end it from agent', async function () {
    // open agent page
    await agent.open(url);
    // config agent without sessionID
    await agent.configureAgentWithJS(config.test_env);
    // click blue button in agent
    await util.clickAgentVideoChat();
    // get visitor short url
    visitorUrl = await util.getVisitorShortUrl();
    // open visitor page
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
  });
});
