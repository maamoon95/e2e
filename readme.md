# VideoEngager e2e Test

## Installation

1 - install required nodejs dependencies

```bash
npm install
npm run webdriver
```

2 - Set your hosts file to 

```txt
127.0.0.1   login.mypurecloud.com.au
127.0.0.1   login.mypurecloud.de
127.0.0.1   api.mypurecloud.com.au
127.0.0.1   api.mypurecloud.de         
```


## Run test in dev

```bash
npm run dev-test     
```

Tests are run using configuration specified in config.js based on NODE_ENV.

```bash
NODE_ENV=environment npm run test     
```

**environment** can be one of:
 - dev - will run against dev.videoengager.com
 - test - will run against localhost:9000 (to be used in travis runs)
 - staging - will run against staging.leadsecure.com

## About The Tests
VideoEngager e2e tests core tests are consist of 10 different scenarios

agent page configured with console params
1- inbound call : use predefined session id: Agent page loads first
2- inbound call : use predefined session id: Visitor page loads first
3- Outbound call: click blue button and load visitor from cloud url

agent page configured url params
4- inbound call : use predefined session id: Agent page loads first
5- inbound call : use predefined session id: Visitor page loads first
6- Outbound call: create visitor short url manually with predefined session id

Video created in Mocked video engager genesys app page
7- outbound call: invite visitor, agent is in iframe
8- inbound call: create mocked invitation, use pickup button, agent is in popup
9- outbound call: invite visitor, agent is in iframe
10- inbound call: create mocked invitation, use pickup button, agent is in popup

