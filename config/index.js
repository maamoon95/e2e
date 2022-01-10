const environments = {
  dev: {
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
    baseURL: 'http://dev.videoengager.com'
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
    baseURL: 'http://staging.leadsecure.com'
  },
  prod: {
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
    baseURL: 'http://prod.leadsecure.com'
  }
};

module.exports = {
  env: process.env.NODE_ENV,
  // Server port
  port: process.env.PORT || 3000,
  logger: {
    exportToFile: true,
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
  test_env: environments.staging
};
