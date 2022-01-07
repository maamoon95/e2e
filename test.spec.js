/* global by beforeEach beforeAll describe it afterEach */
const { browser } = require('protractor');
const log = require('./log/log.js');
const assert = require('assert');
let sessionId;
let iframeElement;
let firstWindow;
let secondWindow;
let response;
const TIMEOUT = 1000 * 5 * 10; // 50 sec

const env = {
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

const SEL = 'staging';

const joinCall = function () {
  return browser.wait(function () {
    return browser.driver.executeScript('return (window.getVeContext().videoCurrent != undefined)')
      .then(async function (result) {
        if (result) {
          log.debug('videoCurrent ' + result);
          return true;
        }
        return false;
      }, function (unhandledError) {
        return unhandledError;
      });
  }, TIMEOUT)
    .then(function () {
      return browser.wait(function () {
        return browser.driver.executeScript('return (window.getVeContext().audioOutputSelect !== undefined)')
          .then(async function (result) {
            if (result) {
              return true;
            }
            log.debug('audioOutputSelect ' + result);
            return false;
          }, function (unhandledError) {
            return unhandledError;
          });
      }, TIMEOUT);
    })
    .then(function () {
      return switchBrowser1frame();
    })
    .then(function () {
      log.debug('document.getElementById ');
      return browser.driver.executeScript('return (document.getElementById("joinConferenceButton") === null)');
    })
    .then(function (res) {
      response = res;
      return browser.switchTo().window(secondWindow);
    })
    .then(async function () {
      if (response) {
        log.debug('precall not enabled');
        return browser.driver.wait(callEstablishedByChatToken(), 5000);
      } else {
        return switchBrowser1frame()
          .then(function () {
            log.debug('precall enabled');
            const script = 'document.getElementById("joinConferenceButton").click(); ';
            return browser.driver.executeScript(script);
          })
          .then(function () {
            return browser.switchTo().window(secondWindow);
          })
          .then(function () {
            return browser.driver.wait(callEstablishedByChatToken(), 5000);
          });
      }
    });
};

const validateConnection = function () {
  log.debug('verifying customer page video streams.');
  return browser.wait(function () {
    return browser.driver.executeScript(
      "return (window.document.querySelector('#remoteVideo') && (window.document.querySelector('#remoteVideo') != null) && (window.document.querySelector('#localVideo') && (window.document.querySelector('#localVideo') != null)))")
      .then(async function (result) {
        if (result) {
          log.debug('customer page video verificiation succeed');
          return true;
        }
        return false;
      }, function (unhandledError) {
        return unhandledError;
      });
  }, TIMEOUT)
    .then(function () {
    // verify visitor page video - should connect in 15 sec
      log.debug('verifying agent page video streams.');
      return browser.switchTo().window(secondWindow)
        .then(function () {
          return browser.wait(function () {
            return browser.driver.executeScript(
              "return (window.document.querySelector('.sourcevideo') && (window.document.querySelector('.sourcevideo') != null) && (window.document.querySelector('.localvideo') && (window.document.querySelector('.localvideo') != null)))")
              .then(function (result) {
                if (result) {
                  log.debug('agent page video verificiation succeed');
                  return true;
                }
                return false;
              }, function (unhandledError) {
                return unhandledError;
              });
          }, TIMEOUT);
        });
    });
};

const establishConnection = function () {
  const url = 'http://localhost:3000/single-button-genesys-demo.html';
  return browser.driver.get(url)
    .then(function () {
      browser.driver.manage().window().maximize();
      return browser.driver.executeScript("CXBus.command('VideoEngager.startVideoEngager')");
    })
    .then(function () {
      return browser.driver.wait(iframeCreated(), 3000);
    })
    .then(function () {
      return browser.switchTo().frame(iframeElement);
    })
    .then(async function () {
      return browser.executeScript('window.open()');
    })
    .then(function () {
      return browser.getAllWindowHandles();
    })
    .then(function (handles) {
      firstWindow = handles[0];
      secondWindow = handles[1];
      return browser.switchTo().window(secondWindow);
    })
    .then(function () {
      const url2 = env[SEL].baseURL + '/static/agent.popup.cloud.html';
      return browser.get(url2);
    })
    .then(function () {
      return browser.driver.executeScript(`window.jsVeInitClb = function () {_videoengager.startVideoVisitor("${sessionId}");} `);
    })
    .then(function () {
      let script = '_videoengager.init(';
      script += ` {pak:'${env[SEL].pak}', externalId:'${env[SEL].externalId}'}, `;
      script += ` {firstName:'${env[SEL].firstName}', lastName:'${env[SEL].lastName}', email: '${env[SEL].email}', userName: '${env[SEL].userName}'}, `;
      script += ` {firstName:'${env[SEL].firstName}', lastName:'${env[SEL].lastName}', email: '${env[SEL].email}', id: '${env[SEL].id}', subject: '${env[SEL].subject}'}, `;
      script += ` {hideChat: ${env[SEL].hideChat}, hideInfo: ${env[SEL].hideInfo}} `;
      script += ');';
      return browser.driver.executeScript(script);
    })
    .then(function () {
      log.debug('Waiting page push bundle connection');
      return browser.wait(function () {
        return browser.driver.executeScript("return (typeof window.getVeContext().ang === 'object')")
          .then(function (result) {
            if (result === true) {
              log.debug('page installed push bundle');
              return true;
            }
            return false;
          }, function (err) {
            log.debug(err);
            return false;
          });
      }, TIMEOUT);
    });
};

const finishCall = function () {
  // connection verified...
  // terminate agent page
  log.debug('terminate session by closing agent page');
  return browser.switchTo().window(secondWindow)
    .then(function () {
      return browser.driver.wait(clickAgentRedButton(), 16000);
    })
    .then(function () {
      log.debug('confirming');
      return browser.driver.wait(confirmAgentDialog(), 30000);
    })
    .then(function () {
    // verify initial state in agent
      log.debug('confirmed. verify initial state in agent');
      return browser.driver.wait(isPrecall(), 3000);
    })
    .then(function () {
      return browser.switchTo().window(firstWindow);
    })
    .then(function () {
      return browser.driver.wait(browser.switchTo().defaultContent(), 3000);
    })
    .then(async function () {
    // check any ifame in visitor page
      log.debug('check any ifame in visitor page');
      return browser.wait(async function () {
        return browser.driver.executeScript("return (window.document.querySelector('iframe') == null)")
          .then(async function (result) {
            if (result === true) {
              log.debug('iframe removed in single button page after session termination');
              return true;
            }
            log.debug('iframe still there ');
            await browser.driver.executeScript('$("#closeVideoButton").click()');
            return false;
          }, function (unhandledError) {
            return unhandledError;
          });
      }, TIMEOUT);
    })
    .then(function () {
      return browser.driver.sleep(1000);
    });
};

const switchBrowser1frame = function () {
  return browser.switchTo().window(firstWindow)
    .then(function () {
      return browser.switchTo().frame(iframeElement);
    });
};

const isPrecall = function () {
  return browser.driver
    .findElement(by.id('videoPreview'))
    .then(function (element) {
      if (element) {
        return true;
      }
      return false;
    }, function (unhandledError) {
      return unhandledError;
    });
};

const callEstablishedByChatToken = function () {
  return browser.wait(async function () {
    return browser.driver.executeScript('return (window.getVeContext().chat_token != null)')
      .then(function (result) {
        if (result === true) {
          return true;
        }
        log.debug('callEstablishedByChatToken ' + result);
        return false;
      }, function (err) {
        log.debug(err);
        return err;
      });
  }, TIMEOUT);
};

const iframeCreated = function () {
  return browser.driver.findElement(by.id('videoengageriframe'))
    .then(function (element) {
      if (!element) {
        return false;
      }
      iframeElement = element;
      return iframeElement.getAttribute('src');
    }, function (unhandledError) {
      return unhandledError;
    })
    .then(function (iframeUrl) {
      sessionId = JSON.parse(Buffer.from(iframeUrl.split('&')[1].toString().substring(7), 'base64').toString()).sessionId;
      return true;
    });
};

const clickAgentRedButton = function () {
  return browser.driver.executeScript('document.querySelector(#hangupButton).click();')
    .then(function () {
      return true;
    }, function (unhandledError) {
      return unhandledError;
    });
};

const confirmAgentDialog = function () {
  return browser.driver
    .findElement(by.id('confirmDismissBtn'))
    .then(function (confirmButton) {
      confirmButton.click();
      return true;
    }, function (unhandledError) {
      return unhandledError;
    });
};

describe('make a successfull call', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    // empty
  });

  it('should establish the call and finish the call', function () {
    log.debug('Establish Connection');
    return establishConnection()
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  });
}, TIMEOUT);
