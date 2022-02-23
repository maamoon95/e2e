const axios = require('axios');
const log = require('./logger');
const config = require('./config');

let token;

const TEST_ENV = config.test_env;

/**
 * DEPRECATED
 * @returns data.token
 */
const impersonateCreate = function () {
  const url = TEST_ENV.baseURL + '/api/partners/impersonateCreate';
  return axios.post(url, {
    pak: TEST_ENV.pak,
    email: TEST_ENV.email,
    organizationId: TEST_ENV.organizationId,
    firstName: 'Slav',
    lastName: 'Hadjidimitrov',
    division: 'Home',
    contactEmail: 'slav@videoengager.com',
    source: 'mypurecloud.de'
  });
};

const impersonate = function () {
  const url = `${TEST_ENV.baseURL}/api/partners/impersonate/${TEST_ENV.pak}/${TEST_ENV.externalId}/${TEST_ENV.email}`;
  return axios.get(url)
    .then(function (result) {
      token = result.data.token;
      return token;
    })
    .catch(function (e) {
      log.error(e.message);
      return Error(e);
    });
};

const getBrokerageRequest = function () {
  const url = TEST_ENV.baseURL + '/api/brokerages/users/me';
  return axios.get(url, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

const getBrokerage = function () {
  if (token) {
    return getBrokerageRequest();
  } else {
    return impersonate()
      .then(function () {
        return getBrokerageRequest();
      })
      .catch(function (e) {
        log.error(e.message);
        return new Error(e);
      });
  }
};

const updateBrokerage = function (update) {
  const url = TEST_ENV.baseURL + '/api/brokerages/users/me';
  return axios({
    url: url,
    method: 'put',
    type: 'put',
    data: JSON.stringify(update),
    headers: {
      authorization: `bearer ${token}`,
      'content-type': 'application/json'
    }
  });
};

const updateBrokerageProfile = function (update) {
  if (token) {
    return updateBrokerage(update);
  } else {
    return impersonate()
      .then(function () {
        return updateBrokerage(update);
      })
      .catch(function (e) {
        log.error(e.message);
        return new Error(e);
      });
  }
};

module.exports.updateBrokerageProfile = updateBrokerageProfile;
module.exports.impersonate = impersonate;
module.exports.getBrokerage = getBrokerage;

