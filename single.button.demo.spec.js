'use strict';
/* globals beforeEach, beforeAll, by, describe, it */
const { browser } = require('protractor');
require('../server/app');
const Brokerage = require('../server/api/brokerage/brokerage.model');
const Partner = require('../server/api/partner/partner.model');
const User = require('../server/api/user/user.model');
const Acl = require('../server/api/acl/acl.model');
const Q = require('q');
let sessionId;
let iframeElement;
let browser2;
const TIMEOUT = 1000 * 5 * 10; // 50 sec
describe('single page demo', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  const isPrecall = function (browser) {
    return browser.driver
      .findElement(by.id('videoPreview'))
      .then(function (element) {
        return true;
      }, function (err) {
        console.log(err);
        return false;
      });
  };

  const callEstablishedByChatToken = function (browser) {
    return browser.wait(async function () {
      return await browser.driver.executeScript('return (getVeContext().chat_token != null)')
        .then(function (result) {
          if (result) {
            return true;
          }
          console.log('callEstablishedByChatToken ' + result);
          return false;
        }, function (err) {
          console.log(err);
          return false;
        });
    }, TIMEOUT);
  };

  const iframeCreated = function (browser) {
    return browser.driver.findElement(by.id('videoengageriframe'))
      .then(function (element) {
        if (!element) {
          return false;
        }
        iframeElement = element;
        return iframeElement.getAttribute('src');
      }, function (err) {
        console.error(err);
        return false;
      })
      .then(function (iframeUrl) {
        sessionId = JSON.parse(Buffer.from(iframeUrl.split('&')[1].toString().substring(7), 'base64').toString()).sessionId;
        return true;
      });
  };
  const clickAgentRedButton = function (browser) {
    return browser.driver.executeScript('document.querySelector(\'#hangupButton\').click();')
      .then(function (res) {
        return true;
      }, function (err) {
        console.error(err);
        return false;
      });
  };
  const confirmAgentDialog = function (browser) {
    return browser.driver
      .findElement(by.id('confirmDismissBtn'))
      .then(function (confirmButton) {
        confirmButton.click();
        return true;
      }, function (err) {
        console.error(err);
        return false;
      });
  };

  beforeAll(function () {
    return Brokerage.deleteMany({}).exec()
      .then(function () {
        return Partner.deleteMany({}).exec();
      })
      .then(function () {
        return User.deleteMany({}).exec();
      })
      .then(function () {
        return Acl.deleteMany({}).exec();
      })
      .then(function () {
        const acl = new Acl({ name: 'manager' });
        return Q.ninvoke(acl, 'save');
      })
      .then(function () {
        const acl = new Acl({ name: 'agent' });
        return Q.ninvoke(acl, 'save');
      })
      .then(function () {
        Brokerage.createBrokerage({
          firstName: 'NO_C',
          lastName: 'NO_C',
          email: 't@t',
          password: '1',
          company: 'The Brokerage',
          tennantId: 'test_tenant',
          startWidget: true,
          startThreeWayCall: true,
          profiles: {
            mobile_web_profile: {
              startWidget: false
            }
          }
        }).then(function (brokerage) {
          Partner.create({
            PAK: 'DEV2',
            company: 'videoEngager',
            firstName: 'tester',
            lastName: '',
            active: true,
            agents: [],
            brokerage: [{
              externalId: 'videoEngager',
              tennantId: 'test_tenant',
              emails: [{
                email: brokerage._account.email,
                id: brokerage._account._id

              }]

            }]
          });
        });
      });
  });

  // single page demo
  it('should open precall in single button demo page', async function () {
    const url = 'http://localhost:9000/static/e2e/single-button-genesys-demo.html';
    browser.driver.get(url)
      .then(function () {
        browser.driver.manage().window().maximize();
        return browser.driver.executeScript("CXBus.command('VideoEngager.startVideoEngager')");
      })
      .then(function () {
        return browser.driver.wait(iframeCreated(browser), 3000);
      })
      .then(function () {
        return browser.switchTo().frame(iframeElement);
      })/*
    .then(function(){
      return impersonateCreate()
    }) */
      .then(async function (res) {
        browser2 = await browser.forkNewDriverInstance();
        browser2.driver.manage().window().maximize();

        return browser2.waitForAngularEnabled(false);
      })
      .then(async function () {
        browser2.ignoreSynchronization = true;
        const url2 = 'http://localhost:9000/static/agent.popup.cloud.html';
        return await browser2.get(url2);
      })
      .then(function () {
        return browser2.driver.executeScript('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + sessionId + '");} ');
      })
      .then(function () {
        return browser2.driver.executeScript('_videoengager.init({\'pak\':"DEV2", \'externalId\':"videoEngager"}, {\'firstName\':\'name\', \'lastName\':\'last\', \'email\': \'t@t\', \'userName\': \'t\'}, {\'firstName\':\'asd\', \'lastName\':\'last\', \'email\': \'t@t\', \'id\': \'123\', \'subject\': \'subj\'},{\'hideChat\': true, \'hideInfo\': true});');
      })
      .then(function () {
        return browser2.wait(function () {
          return browser2.driver.executeScript(
            "return (typeof getVeContext().ang.getConnected === 'function')")
            .then(function (result) {
              if (result) {
                console.log('page installed push bundle');
                return true;
              }
              return false;
            }, function (err) {
              console.log(err);
              return false;
            });
        }, TIMEOUT);
      })
      .then(function () {
        return browser2.wait(function () {
          return browser2.driver.executeScript('return (getVeContext().videoCurrent != undefined)')
            .then(async function (result) {
              if (result) {
                console.log('getVeContext().videoCurrent ' + result);
                return true;
              }
              return false;
            }, function (err) {
              console.error(err);
              return false;
            });
        }, TIMEOUT);
      })
      .then(function () {
        return browser2.wait(function () {
          return browser2.driver.executeScript('return (getVeContext().audioOutputSelect != undefined)')
            .then(async function (result) {
              if (result) {
                console.log('getVeContext().audioOutputSelect ' + result);
                return true;
              }
              console.log('getVeContext().audioOutputSelect ' + result);
              return false;
            }, function (err) {
              console.error(err);
              return false;
            });
        }, TIMEOUT);
      })
      .then(function () {
        console.log('document.getElementById ');
        return browser.driver.executeScript('return (document.getElementById(\'joinConferenceButton\') == null)');
      })
      .then(async function (res) {
        if (res) {
          console.log('precall not enabled');
          return browser2.driver.wait(callEstablishedByChatToken(browser2), 5000);
        } else {
          console.log('precall enabled');
          await browser.driver.executeScript('document.getElementById(\'joinConferenceButton\').click(); ');
          return browser2.driver.wait(callEstablishedByChatToken(browser2), 5000);
        }
      })
      .then(function (res) {
        console.log('verifying customer page video streams.');
        return browser2.wait(function () {
          return browser2.driver.executeScript(
            "return (window.document.querySelector('#remoteVideo') && (window.document.querySelector('#remoteVideo') != null) && (window.document.querySelector('#localVideo') && (window.document.querySelector('#localVideo') != null)))")
            .then(async function (result) {
              if (result) {
                console.log('customer page video verificiation succeed');
                return true;
              }
              return false;
            }, function (err) {
              console.error(err);
              return false;
            });
        }, TIMEOUT);
      })
      .then(function (res) {
      // verify visitor page video - should connect in 15 sec
        console.log('verifying agent page video streams.');
        return browser.wait(function () {
          return browser.driver.executeScript(
            "return (window.document.querySelector('.sourcevideo') && (window.document.querySelector('.sourcevideo') != null) && (window.document.querySelector('.localvideo') && (window.document.querySelector('.localvideo') != null)))")
            .then(function (result) {
              if (result) {
                console.log('agent page video verificiation succeed');
                return true;
              }
              return false;
            }, function (err) {
              console.error(err);
              return false;
            });
        }, TIMEOUT);
      })
      .then(function () {
      // terminate agent page
        console.log('terminate session by closing agent page');
        return browser2.driver.wait(clickAgentRedButton(browser2), 16000);
      })
      .then(function () {
        console.log('confirming');
        return browser2.driver.wait(confirmAgentDialog(browser2), 30000);
      })
      .then(function () {
      // verify initial state in agent
        console.log('confirmed. verify initial state in agent');
        return browser2.driver.wait(isPrecall(browser2), 3000);
      })
      .then(function (res) {
        return browser.driver.wait(browser.switchTo().defaultContent(), 3000);
      })
      .then(function (res) {
        // check any ifame in visitor page
        console.log('check any ifame in visitor page');
        return browser.wait(async function () {
          return await browser.driver.executeScript("return (window.document.querySelector('iframe') == null)")
            .then(async function (result) {
              if (result === true) {
                console.log('iframe removed in single button page after session termination');
                return true;
              }
              console.log('iframe still there ');
              await browser.driver.executeScript('$("#closeVideoButton").click()');
              return false;
            }, function (err) {
              if (err) {
                console.error(err);
              }
              return false;
            });
        }, TIMEOUT);
      })
      .then(function () {
        browser.driver.sleep(1500);
        console.log('done');
      });
  }, TIMEOUT);
});
