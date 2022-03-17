const veUtil = require('./lib/veUtil');
const config = require('./lib/config');

// create proxy server
const MockProxy = require('./lib/mockProxy');
const mockProxy = new MockProxy();
let VISITOR_SESSION_ID;
const genesysResponses = require('./lib/genesys');

const PROXY_SERVER_PORT = 9001;
const SOCKET_SERVER_PORT = 9898;
const genesysPageLocation = config.test_env.baseURL + '/static/genesys.purecloud.html';
const accessToken = veUtil.getUUID();
const channelId = veUtil.getUUID();

genesysResponses.userResponse.organization.id = config.test_env.organizationId;
genesysResponses.channels.connectUri = `ws://localhost:${SOCKET_SERVER_PORT}/`;
genesysResponses.channels.id = channelId;
genesysResponses.getChannels.entities[0].connectUri = `ws://localhost:${SOCKET_SERVER_PORT}/`;
genesysResponses.getChannels.entities[0].id = channelId;
genesysResponses.messages.entities[0].body = JSON.stringify({ interactionId: VISITOR_SESSION_ID });

const authURLParams = veUtil.generateUrlParamters({
  response_type: 'token',
  client_id: config.test_env.clientId,
  redirect_uri: encodeURIComponent(genesysPageLocation)
});
const authHeader = {
  location: genesysPageLocation + '#access_token=' + accessToken + '&expires_in=86399&token_type=bearer'
};

// mandatory
mockProxy.mockIt({ path: '/oauth/(.*)', method: 'GET' }, null, 302, authHeader);
mockProxy.mockIt({ path: '/api/v2/users/me\\?expand=conversationSummary', method: 'GET' }, genesysResponses.conversationSummary);
mockProxy.mockIt({ path: '/api/v2/users/me\\?expand=organization', method: 'GET' }, genesysResponses.userResponse);
mockProxy.mockIt({ path: '/api/v2/users/:userId/presences/PURECLOUD', method: 'PATCH' }, genesysResponses.purecloud);
mockProxy.mockIt({ path: '/api/v2/notifications/channels', method: 'POST' }, genesysResponses.channels);
mockProxy.mockIt({ path: '/api/v2/notifications/channels', method: 'GET' }, genesysResponses.getChannels);
mockProxy.mockIt({ path: '/api/v2/conversations/chats', method: 'GET' }, genesysResponses.chats[0]);

// not mandaroty
/*
mockProxy.mockIt({ path: '/api/v2/conversations', method: 'GET' }, genesysResponses.conversations);
mockProxy.mockIt({ path: '/api/v2/users/me\\?expand=chats', method: 'GET' }, genesysResponses.chats[0]);
*/
// not used in this tests
/*
mockProxy.mockIt({ path: '/AGENT_PARTICIPANT_ID', method: 'GET' }, genesysResponses.participants);
mockProxy.mockIt({ path: '/CONVERSATION_ID', method: 'GET' }, genesysResponses.conversationChat);
*/
// need for inbound call
/*
mockProxy.mockIt({ path: '/api/v2/notifications/channels/' + channelId + '/subscriptions', method: 'GET' }, genesysResponses.subscriptions);
mockProxy.mockIt({ path: '/api/v2/notifications/channels/' + channelId + '/subscriptions', method: 'PUT' }, genesysResponses.subscriptions);
*/

// start 80 port proxy server
mockProxy.startHttpProxyServer(PROXY_SERVER_PORT);
// start 443 port proxy server
mockProxy.startSSlProxyServer(PROXY_SERVER_PORT);
// start https server for mock responses
mockProxy.startHttpServer(PROXY_SERVER_PORT);
// start socket server for mock socket connection
mockProxy.startSocketServer(SOCKET_SERVER_PORT);
