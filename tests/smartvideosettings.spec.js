/* global describe beforeAll beforeEach afterEach expect it xit afterAll */
const { browser, element } = require('protractor');
const config = require('./lib/config');
const log = require('./lib/logger');
const genesysResponses = require('./lib/genesys');

const veUtil = require('./lib/veUtil');
const MockProxy = require('./lib/mockProxy');
const SmartVideoSettings = require('./po/SmartVideoSettings');
const settingsPageLocation = '/nextjs/single/settings/';
const PROXY_SERVER_PORT = 9001;
const SOCKET_SERVER_PORT = 9898;
let pageLocation = '';

const accessToken = veUtil.getUUID();

const genesysParams = {
  langTag: 'en-us',
  environment: null,
  interaction: 1,
  pak: null,
  clientId: null
};

const authHeader = function (genesysParams) {
  return {
    location: pageLocation +
      '#access_token=' + accessToken +
      '&expires_in=86399&token_type=bearer' +
      '&state=' + encodeURIComponent(Buffer.from(JSON.stringify(genesysParams)).toString('base64'))
  };
};

describe('settings page test', function () {
  // prepare settings page instance
  const smartVideoSettings = new SmartVideoSettings();
  pageLocation = smartVideoSettings.constructUrl(config.test_env, genesysParams, settingsPageLocation);
  console.log('pageLocation: ' + pageLocation);
  // create proxy server
  const mockProxy = new MockProxy();

  beforeAll(async function () {
    // prepare mocks
    genesysResponses.userResponse.organization.id = config.test_env.organizationId;
    genesysResponses.channels.connectUri = `ws://localhost:${SOCKET_SERVER_PORT}/`;
    genesysResponses.getChannels.entities[0].connectUri = `ws://localhost:${SOCKET_SERVER_PORT}/`;

    // start 80 port proxy server
    await mockProxy.startHttpProxyServer(PROXY_SERVER_PORT);
    // start 443 port proxy server
    await mockProxy.startSSlProxyServer(PROXY_SERVER_PORT);
    // start https server for mock responses
    await mockProxy.startHttpServer(PROXY_SERVER_PORT);
    // start socket server for mock socket connection
    await mockProxy.startSocketServer(SOCKET_SERVER_PORT);
    // authenticate and set to default db
    await veUtil.authenticate(config.test_env);
    await veUtil.setBrokerageProfile({
      branding:
      {
        visitorShowPrecall: false,
        enablePrecallWorkflow: false,
        inviteUrl: config.test_env.baseURL
      },
      newTheme: false,
      isPopup: false
    });
  });

  beforeEach(async function () {
    const authRSP = authHeader(genesysParams);
    mockProxy.mockIt({ path: '/oauth/(.*)', method: 'GET' }, null, 302, authRSP);
    mockProxy.mockIt({ path: '/api/v2/users/me\\?expand=organization&expand=languagePreference&expand=languages', method: 'GET' }, genesysResponses.userResponseWithLang);
    mockProxy.mockIt({ path: '/api/v2/tokens/me', method: 'GET' }, genesysResponses.userToken);
  });

  afterEach(async function () {

  });

  afterAll(async function () {
    // close proxy servers
    mockProxy.stopAndClean();
  });

  it('check smartvideo tab', async function () {
    // open genesys page
    await smartVideoSettings.openAsNew(pageLocation);
    // check access token
    await smartVideoSettings.authorized(accessToken);
    // await new Promise(resolve => setTimeout(resolve, 10000));
    // check initial tab
    await expect(smartVideoSettings.activeTabId).toEqual(smartVideoSettings.BRANDING_TAB);
    await expect(smartVideoSettings.tenantId).toEqual(config.test_env.tennantId);
    const brandingElement = element(by.testId('brandingSettings'));
    await brandingElement.click();
    await element(by.testId('brandingSettings.brandingEnablePin-main-label')).isPresent()
    // check Smart Video tenantId text field

  });
});
