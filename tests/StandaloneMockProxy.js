const veUtil = require('./lib/veUtil');
const config = require('./lib/config');

// create proxy server
const MockProxy = require('./lib/mockProxy');
const mockProxy = new MockProxy();

// start 80 port proxy server
mockProxy.startHttpProxyServer();
// start 443 port proxy server
mockProxy.startSSlProxyServer();
// start https server for mock responses
mockProxy.startHttpServer(config.test_env, veUtil.getUUID());
// start socket server for mock socket connection
mockProxy.startSocketServer();
