const axios = require('axios');
const log = require('./logger');
const config = require('./config');
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

const impersonate = function (confObject) {
  if (!confObject) {
    confObject = TEST_ENV;
  }
  const url = `${confObject.baseURL}/api/partners/impersonate/${confObject.pak}/${confObject.externalId}/${confObject.email}`;
  return axios.get(url)
    .then(function (result) {
      return result.data.token;
    })
    .catch(function (e) {
      log.error(e.message);
      return Error(e);
    });
};

const getBrokerage = function (token) {
  const url = TEST_ENV.baseURL + '/api/brokerages/users/me';
  return axios.get(url, {
    headers: {
      Authorization: `bearer ${token}`
    }
  })
    .catch(function (e) {
      log.error(e.message);
      return new Error(e);
    });
};

const updateBrokerageProfile = function (token, update) {
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
  })
    .catch(function (e) {
      log.error(e.message);
      return new Error(e);
    });
};

module.exports.addShortUrl = async function (token, url, postData) {
  return axios({
    url: url,
    method: 'post',
    data: JSON.stringify(postData),
    headers: {
      authorization: `bearer ${token}`,
      'content-type': 'application/json'
    }
  })
    .then(function (result) {
      return result;
    })
    .catch(function (e) {
      throw Error(e);
    });
};

module.exports.updateBrokerageProfile = updateBrokerageProfile;
module.exports.impersonate = impersonate;
module.exports.getBrokerage = getBrokerage;
