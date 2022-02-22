process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const environments = {
  test: {
    pak: 'DEV2',
    externalId: 'videoEngager',
    firstName: 'name',
    lastName: 'last',
    email: 't@t',
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
  staging: {
    pak: '72884930-79d1-3221-166d-58b3a9894e16',
    externalId: 'test',
    firstName: 'Slav',
    lastName: 'Hadjidimitrov',
    email: 'slav@videoengager.com',
    userName: 't',
    id: '123',
    subject: 'subj',
    hideChat: true,
    hideInfo: true,
    baseURL: 'https://staging.leadsecure.com',
    organizationId: '639292ca-14a2-400b-8670-1f545d8aa860',
    deploymentId: '1b4b1124-b51c-4c38-899f-3a90066c76cf',
    tennantId: 'oIiTR2XQIkb7p0ub',
    environment: 'https://api.mypurecloud.de',
    queue: 'Support'
  },
  production: {
    pak: 'b17cd9a8-e00d-7e98-2894-d33e473e2bbb',
    externalId: 'videoEngager',
    firstName: 'name',
    lastName: 'last',
    email: 'slav@videoengager.com',
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
        level: 'trace',
        timestamp: true
      }
    ]
  },
  // 50 seconds
  timeout: 1000 * 5 * 10,
  test_env: environments[env]
};