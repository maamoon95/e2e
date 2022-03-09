const genesysResponses = require('./genesys');
const fs = require('fs');
const WebSocketServer = require('websocket').server;
const http = require('http');
const httpProxy = require('http-proxy');

const config = require('./config');
const log = require('./logger');
log.init(config.logger);

let socketConnected = false;
let selectedChat = 0;

let connection;
let interactionId;
class Proxy {
  setSelectedChat (value) {
    selectedChat = value;
  }

  setInteractionId (value) {
    interactionId = value;
  }

  startSSlProxyServer (port = 9001) {
    return new Promise(function (resolve, reject) {
      try {
        const sslProxy = httpProxy.createProxyServer({
          target: 'http://localhost:' + port,
          ssl: {
            key: fs.readFileSync('./tests/lib/cert/mypurecloud.com.au.key', 'utf8'),
            cert: fs.readFileSync('./tests/lib/cert/mypurecloud.com.au.crt', 'utf8')
          }
        }).listen(443);
        resolve({ status: 'ok', message: 'ssl proxy server started' });
      } catch (e) {
        log.error(e);
        reject(new Error({ status: 'fail', message: 'ssl proxy failed', error: e }));
      }
    });
  }

  startHttpProxyServer (port = 9001) {
    return new Promise(function (resolve, reject) {
      try {
        const httpsProxy = httpProxy.createProxyServer({ target: 'http://localhost:' + port }).listen(80);
        resolve({ status: 'ok', message: 'http server started' });
      } catch (e) {
        log.error(e);
        reject(new Error({ status: 'fail', message: 'http proxy failed', error: e }));
      }
    });
  }

  startSocketServer (port = 9898) {
    return new Promise(function (resolve, reject) {
      try {
        const socketServer = http.createServer();
        socketServer.listen(port);
        const wsServer = new WebSocketServer({
          httpServer: socketServer
        });

        wsServer.on('request', function (request) {
          connection = request.accept(null, request.origin);
          connection.on('message', function (data) {
            console.log('Received data:', data.utf8Data);
            const jsonData = JSON.parse(data.utf8Data);
            if (jsonData.message === 'ping') {
              connection.sendUTF(JSON.stringify({ eventBody: { message: 'pong' }, topicName: 'channel.metadata' }));
              socketConnected = true;
            }
          });
        });

        resolve({ status: 'ok', message: 'socket server started' });
      } catch (e) {
        log.error(e.message);
        reject(new Error(e));
      }
    });
  }

  startHttpServer (accessToken, port = 9001) {
    return new Promise(function (resolve, reject) {
      try {
        const header = {
          'Access-Control-Allow-Origin': config.test_env.baseURL,
          'Content-Type': 'application/json',
          'access-control-allow-headers': 'Origin, X-Requested-With, Content-Type, Accept, Authorization, DNT, User-Agent, Keep-Alive, Cache-Control, ININ-Client-Path',
          'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH',
          Allow: 'GET, PUT, POST, DELETE, HEAD, OPTIONS, PATCH',
          'access-control-max-age': 2592000
        };

        http.createServer(function (req, res) {
          const urlArray = req.url.split('/');
          const path = urlArray[urlArray.length - 1];
          if (req.url.indexOf('oauth') !== -1) {
            console.log('Genesys Authorization');
            res.writeHead(200, header);
            res.writeHead(302, { location: config.test_env.baseURL + '/static/genesys.purecloud.html#access_token=' + accessToken + '&expires_in=86399&token_type=bearer' });
            res.end();
          }

          if (req.method === 'PATCH' && path === 'PURECLOUD') {
            console.log('Genesys Users Presence');
            res.writeHead(200, header);
            res.write(JSON.stringify(genesysResponses.purecloud, true, 2));
            res.end();
          }

          if (req.method === 'OPTIONS') {
            console.log('OPTIONS preflight of', req.url);
            res.writeHead(200, header);
            res.end();
          }

          if (req.method === 'GET' && path === 'me?expand=organization') {
            console.log('retrive organization');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.organization, true, 2));
            res.end();
            return;
          }
          if (req.method === 'GET' && path === 'me?expand=conversationSummary') {
            console.log('retrive conversationSummary');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.conversationSummary, true, 2));
            res.end();
          }
          if (req.method === 'GET' && path === 'conversations') {
            console.log('retrive conversations');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.conversations, true, 2));
            res.end();
          }
          if (req.method === 'GET' && path === '1c1a063b-45bf-4719-9127-7bca923118c1') {
            console.log('retrive conversation ' + '1c1a063b-45bf-4719-9127-7bca923118c1');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.conversationChat, true, 2));
            res.end();
          }
          if (req.method === 'GET' && path === 'd36875ce-1bb6-4ad7-8ff9-5af8e727bd88') {
            console.log('retrive participants ' + 'd36875ce-1bb6-4ad7-8ff9-5af8e727bd88');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.participants, true, 2));
            res.end();
          }
          if (req.method === 'GET' && path === 'channels') {
            console.log('retrive channels');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            // res.write(JSON.stringify({ entities: [] }, true, 2));
            res.write(JSON.stringify(genesysResponses.getChannels, true, 2));
            res.end();
          }
          if (req.method === 'POST' && path === 'channels') {
            console.log('put channels');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            genesysResponses.channels.connectUri = `ws://localhost:${9898}/`;
            res.write(JSON.stringify(genesysResponses.channels, true, 2));
            res.end();
          }

          if (req.method === 'GET' && path === 'subscriptions') {
            console.log('retrive subscriptions');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.subscriptions, true, 2));
            res.end();
            /*
            connection.sendUTF(JSON.stringify(genesysResponses.wsMessages[0]));
            connection.sendUTF(JSON.stringify(genesysResponses.wsMessages[1]));
            connection.sendUTF(JSON.stringify(genesysResponses.wsMessages[2]));
            */
          }

          if (req.method === 'PUT' && path === 'subscriptions') {
            console.log('put subscriptions');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.subscriptions, true, 2));
            res.end();
          }
          // different resposnses based on the case
          if (req.method === 'GET' && req.url.indexOf('api/v2/users/me?expand=chats') !== -1) {
            console.log('retrive chats');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.chats[selectedChat], true, 2));
            res.end();
          }
          if (req.method === 'GET' && path === 'chats') {
            console.log('retrive chats');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.write(JSON.stringify(genesysResponses.chats[selectedChat], true, 2));
            res.end();
          }
          if (req.method === 'GET' && path === 'messages') {
            console.log('retrive messages');
            res.writeHead(200, header);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            genesysResponses.messages.entities[0].body = JSON.stringify({ interactionId: interactionId });
            res.write(JSON.stringify(genesysResponses.messages, true, 2));
            res.end();
          }
        }).listen(port);
        resolve({ status: 'ok', message: 'socket server started' });
      } catch (e) {
        log.error(e);
        reject(new Error({ status: 'fail', message: 'socket server failed', error: e }));
      }
    });
  }

  isConnected (timeout = 10000) {
    let count = timeout / 500;
    return new Promise(function (resolve, reject) {
      const interval = setInterval(function () {
        if (socketConnected === true) {
          clearInterval(interval);
          resolve();
          count -= 1;
        }
        if (count === 0) {
          reject(Error('timeout reached'));
        }
      }, 500);
    });
  }
}

module.exports = Proxy;
