process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const environments = {
  dev: {
    pak: 'DEV2',
    externalId: 'videoEngager',
    firstName: 'name',
    lastName: 'last',
    email: 't@t',
    password: '1',
    userName: 't',
    id: '123',
    subject: 'subj',
    hideChat: true,
    hideInfo: true,
    baseURL: 'https://dev.videoengager.com',
    organizationId: '327d10eb-0826-42cd-89b1-353ec67d33f8',
    deploymentId: 'c2eaaa5c-d755-4e51-9136-b5ee86b92af3',
    tennantId: 'test_tenant',
    environment: 'https://api.mypurecloud.com.au',
    queue: 'video'
  },
  test: {
    pak: 'DEV2',
    externalId: 'videoEngager',
    firstName: 'name',
    lastName: 'last',
    email: 't@t',
    password: '1',
    userName: 't',
    id: '123',
    subject: 'subj',
    hideChat: true,
    hideInfo: true,
    baseURL: 'http://localhost:9000',
    organizationId: '327d10eb-0826-42cd-89b1-353ec67d33f8',
    deploymentId: 'c2eaaa5c-d755-4e51-9136-b5ee86b92af3',
    tennantId: 'test_tenant',
    environment: 'https://api.mypurecloud.com.au',
    queue: 'video'
  },
  staging: {
    pak: 'c50859ee-fda4-258b-6c34-d77566373a7b',
    externalId: 'Home',
    firstName: 'Slav',
    lastName: 'Hadjidimitrov',
    email: 'f6668859-042a-4b04-b998-3e3261fb3dd4slav@videoengager.com',
    password: '123456',
    userName: 't',
    id: '123',
    subject: 'subj',
    hideChat: true,
    hideInfo: true,
    baseURL: 'https://staging.leadsecure.com',
    organizationId: 'f6668859-042a-4b04-b998-3e3261fb3dd4',
    deploymentId: '1b4b1124-b51c-4c38-899f-3a90066c76cf',
    tennantId: 'IF9UduUVaQ3ldy8N',
    environment: 'https://api.mypurecloud.de',
    queue: 'Support'
  },
  production: {
    pak: 'b17cd9a8-e00d-7e98-2894-d33e473e2bbb',
    externalId: 'videoEngager',
    firstName: 'name',
    lastName: 'last',
    email: 'slav@videoengager.com',
    password: '123456',
    userName: 't',
    id: '123',
    subject: 'subj',
    hideChat: true,
    hideInfo: true,
    baseURL: 'https://prod.leadsecure.com',
    organizationId: 'c4b553c3-ee42-4846-aeb1-f0da3d85058e',
    deploymentId: '973f8326-c601-40c6-82ce-b87e6dafef1c',
    tennantId: '3X0eK2gclYkIML92',
    environment: 'https://api.mypurecloud.com',
    queue: 'TestQueue'
  }
};
const env = process.env.NODE_ENV || 'test';
module.exports = {
  env: env,
  // Server port
  port: process.env.PORT || 3000,
  logger: {
    exportToFile: false,
    exportToFilePath: './output.csv',
    level: 'debug',
    levels: {
      trace: 0,
      debug: 1,
      info: 2,
      warn: 3,
      error: 4
    },
    colors: {
      trace: 'magenta',
      debug: 'blue',
      info: 'green',
      warn: 'yellow',
      error: 'red'
    },
    transports: [
      {
        type: 'console',
        colorize: true,
        level: 'debug',
        timestamp: true
      }
    ]
  },
  // 50 seconds
  timeout: 1000 * 5 * 10,
  test_env: environments[env]
};
