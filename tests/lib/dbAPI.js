const axios = require('axios');
const log = require('./logger');
const config = require('./config');

let brokerageData;
let token;

const TEST_ENV = config.test_env;

const impersonateCreate = function () {
  const url = TEST_ENV.baseURL + '/api/partners/impersonateCreate';
  return axios.post(url, {
    pak: TEST_ENV.pak,
    email: TEST_ENV.email,
    organizationId: TEST_ENV.organizationId
  });
};

const getBrokerage = function () {
  const url = TEST_ENV.baseURL + '/api/brokerages/users/me';
  return axios.get(url, {
    headers: {
      Authorization: `bearer ${token}`
    }
  });
};

const prepareBrokerage = function () {
  if (!token) {
    return impersonateCreate()
      .then(function (result) {
        token = result.data.token;
        return getBrokerage();
      })
      .catch(function (e) {
        log.error(e.message);
        return Error(e);
      });
  }
  return getBrokerage();
};

const updateBrokerageProfile = function (update) {
  return prepareBrokerage()
    .then(function (result) {
      brokerageData = result.data;
      update = Object.assign(brokerageData, update);
      const url = TEST_ENV.baseURL + '/api/brokerages/users/me';
      return axios({
        url: url,
        method: 'put',
        type: 'put',
        data: JSON.stringify(update),
        headers: {
          Authorization: `bearer ${token}`,
          'content-type': 'application/json'
        }
      });
    })
    .catch(function (e) {
      log.error(e.message);
      return new Error(e);
    });
};

module.exports.updateBrokerageProfile = updateBrokerageProfile;
