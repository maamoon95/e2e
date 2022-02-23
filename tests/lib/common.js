/* global by */
const { browser } = require('protractor');
const log = require('./logger');
const dbAPI = require('./dbAPI');
const config = require('./config');
log.init(config.logger);

let sessionId;
let iframeElement;
let firstWindow;
let secondWindow;
let response;
let token;
let brokerage;

const getGuid = function () {
  function s4 () {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
};

const isInvisible = function (element) {
  return 'return (window.getComputedStyle(' + element + ').display === "none")';
};

const isVisible = function (element) {
  return 'return !(window.getComputedStyle(' + element + ').display === "none")';
};

const execute = function (str) {
  return browser.driver.executeScript(str)
    .then(function (result) {
      if (result === true) {
        return true;
      }
      return false;
    }, function (err) {
      return err;
    });
};

const switchToAgent = function () {
  return browser.switchTo().window(secondWindow);
};

const isBrowserClosed = function (browser) {
  let isClosed = false;
  try {
    browser.driver.getTitle();
  } catch (e) {
    isClosed = true;
  }

  return isClosed;
};

// 50 sec
const TIMEOUT = 50000;

const common = {
  sleep: function (time) {
    return browser.driver.sleep(time);
  },
  joinCall: function () {
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
          return browser.driver.executeScript('return (window.getVeContext().audioOutputSelect != undefined)')
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
        return common.switchToVisitor();
      })
      .then(function () {
        log.debug('document.getElementById ');
        return browser.driver.executeScript('return (document.getElementById(\'joinConferenceButton\') === null)');
      })
      .then(function (res) {
        response = res;
        return browser.switchTo().window(secondWindow);
      })
      .then(async function () {
        if (response) {
          log.debug('precall not enabled');
          return browser.driver.wait(common.callEstablishedByChatToken(), 5000);
        } else {
          return common.switchToVisitor()
            .then(function () {
              log.debug('precall enabled');
              return browser.driver.executeScript('document.getElementById(\'joinConferenceButton\').click(); ');
            })
            .then(function () {
              return browser.switchTo().window(secondWindow);
            })
            .then(function () {
              return browser.driver.wait(common.callEstablishedByChatToken(), 5000);
            })
            .catch(function (e) {
              return new Error(e);
            });
        }
      })
      .catch(function (e) {
        return new Error(e);
      });
  },

  validateConnection: function () {
    log.debug('verifying customer page video streams.');
    return browser.wait(function () {
      return browser.driver.executeScript(
        "return (window.document.querySelector('.sourcevideo') && (window.document.querySelector('.sourcevideo') != null) && (window.document.querySelector('.localvideo') && (window.document.querySelector('.localvideo') != null)))")
        .then(function (result) {
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
  },

  verifyRedirection: function () {
    return browser.driver.executeScript('return (document.URL)')
      .then(function (result) {
        if (result.toString().indexOf('cnn') !== -1) {
          return true;
        }
        return false;
      });
  },

  establishConnection: function () {
    sessionId = getGuid();
    const str = {
      video_on: true,
      sessionId: sessionId,
      hideChat: true,
      type: 'initial',
      defaultGroup: 'floor',
      view_widget: '4',
      offline: true,
      aa: true,
      skip_private: true,
      inichat: 'false'
    };

    const encodedString = Buffer.from(JSON.stringify(str)).toString('base64');
    const homeURL = config.test_env.baseURL + '/static/';
    const url = homeURL + 'popup.html?tennantId=' + Buffer.from(config.test_env.tennantId).toString('base64') + '&params=' + encodedString + '&precall=false';

    return browser.getAllWindowHandles()
      .then(function (handles) {
        firstWindow = handles[0];
        return browser.switchTo().window(firstWindow);
      }).then(function () {
        return browser.driver.get(url);
      })
      .then(function () {
        browser.driver.manage().window().maximize();
      })
      .then(function () {
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
        const url2 = config.test_env.baseURL + '/static/agent.popup.cloud.html';
        /*
        url2 += '?params=eyJsb2NhbGUiOiJlbl9VUyJ9&interaction=1';
        url2 += '&token=' + token;
        url2 += '&invitationId=' + sessionId;
        url2 += '&sk=true';
        */
        return browser.get(url2);
      })
      .then(function () {
        return browser.driver.executeScript('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + sessionId + '");} ');
      })
      .then(function () {
        return browser.driver.executeScript('_videoengager.init({\'pak\':"' + config.test_env.pak + '", \'externalId\':"' + config.test_env.externalId + '"}, {\'firstName\':\'' + config.test_env.firstName + '\', \'lastName\':\'' + config.test_env.lastName + '\', \'email\': \'' + config.test_env.email + '\', \'userName\': \'t\'}, {\'firstName\':\'asd\', \'lastName\':\'last\', \'email\': \'t@t\', \'id\': \'123\', \'subject\': \'subj\'},{\'hideChat\': true, \'hideInfo\': true});');
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
      })
      .catch(function (e) {
        return new Error(e);
      });
  },

  finishCall: function () {
  // connection verified...
  // terminate agent page
    log.debug('terminate session by closing agent page');
    return browser.switchTo().window(secondWindow)
      .then(function () {
        return browser.driver.wait(common.clickAgentRedButton(), 16000);
      })
      .then(function () {
        log.debug('confirming red close button');
        return browser.driver.wait(common.confirmAgentDialog(), 30000);
      })
      .then(function () {
        if (!isBrowserClosed) {
          browser.driver.close();
        }
        return common.switchToVisitor();
      })
      .then(function () {
        // TODO verify redirection
        return execute('window.open()');
      })
      .then(function () {
        return browser.driver.close();
      })
      .catch(function (e) {
        log.error(e);
        return new Error(e);
      });
  },

  CreateFreshDB: function () {
    console.log('create fresh db');
    /*
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
        return Brokerage.deleteMany().exec();
      })
      .then(function () {
        return Brokerage.createBrokerage({
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
        });
      })
      .then(function (brokerage) {
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
      */
  },

  switchBrowser1frame: function () {
    return browser.switchTo().window(firstWindow)
      .then(function () {
        return browser.switchTo().frame(iframeElement);
      });
  },

  switchToVisitor: function () {
    return browser.switchTo().window(firstWindow);
  },

  isPrecall: function () {
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
  },

  isSafetyDisabled: function () {
    console.log('validate safety disabled');
    return browser.driver.wait((execute(isInvisible('document.querySelector(".wd-v-safety")'))));
  },

  isSafetyEnabled: function () {
    console.log('validate safety enabled');
    return browser.driver.wait(execute(isVisible('document.querySelector(".wd-v-safety")')));
  },

  callEstablishedByChatToken: function () {
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
  },

  iframeCreated: function () {
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
  },

  clickAgentRedButton: function () {
    return browser.driver.executeScript('document.querySelector(\'#hangupButton\').click();')
      .then(function () {
        return true;
      }, function (unhandledError) {
        return unhandledError;
      });
  },

  confirmAgentDialog: function () {
    return browser.driver
      .findElement(by.id('confirmDismissBtn'))
      .then(function (confirmButton) {
        confirmButton.click();
        return true;
      }, function (unhandledError) {
        return unhandledError;
      });
  },

  getToken: function () {
    return dbAPI.impersonate()
      .then(function (result) {
        token = result;
        return token;
      });
  },

  getBrokerage: function () {
    return dbAPI.getBrokerage()
      .then(function (result) {
        brokerage = result;
        return brokerage;
      });
  },

  setSafety: function (enable, disableRemoteCamera) {
    return dbAPI.updateBrokerageProfile({ safety: { enable: enable, disableRemoteCamera: disableRemoteCamera } });
  },

  /**
   * TODO
    return Brokerage
      .find({})
      .deleteMany({})
      .exec()
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
          email: 't@t0.t',
          password: '1',
          company: 'The Brokerage',
          tennantId: 'test_tenant'
        });
      });
   */

  switchRemoteVideoDisability: function () {
    return execute('document.querySelector("#RemoteVideoToggle").click()');
  },

  isSafetyVisualsSet: function () {
    return execute(isVisible('document.querySelector(".wd-v-safety")'))
      .then(function () {
        return execute(isVisible('document.querySelector("#DisabledRemoteVideoNotification")'));
      })
      .then(function () {
        return execute(isVisible('document.querySelector("#remoteVideo")'));
      })
      .then(function () {
        return execute(isVisible('document.querySelector("#video_back")'));
      })
      .then(function () {
        return execute(('return (document.querySelector(".peer_avatar").src.indexOf("safetyAvatar.svg") !== -1)'));
      });
  },

  isRemoteVideoDisabled: function () {
    console.log('remote video disabled');
    return switchToAgent()
      .then(function () {
        return browser.driver.wait(function () {
          return execute('return (document.querySelector("#remoteVideo").srcObject && document.querySelector("#remoteVideo").srcObject.getVideoTracks()[0].enabled === false)');
        });
      });
  },

  isRemoteVideoEnabled: function () {
    console.log('remote video enabled');
    return switchToAgent()
      .then(function () {
        return browser.driver.wait(execute('return (document.querySelector("#remoteVideo").srcObject && document.querySelector("#remoteVideo").srcObject.getVideoTracks()[0].enabled === true)'));
      });
  },

  setAgentScreenshare: function (screenshare) {
    /*
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { agentScreenShareControl: screenshare } });
      });
      */
  },

  setVisitorScreenshare: function (screenshare) {
    /*
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { visitorScreenShareControl: screenshare } });
      });
      */
  },

  isAgentScreenshareOn: function () {
    return browser.driver.executeScript(
      'return (document.querySelector(".wd-v-share").style.display !== "none")'
    );
  },

  isVisitorScreenshareOn: function () {
    return common.switchToVisitor()
      .then(function () {
        return common.isAgentScreenshareOn();
      });
  },

  verifyBranding: function () {
    log.debug('verifying consent is exist');
    return common.switchToVisitor()
      .then(function () {
        return browser.driver.executeScript(
          "return (document.querySelector('#consent_text_1').innerText === 'test message')")
          .then(function (result) {
            if (result) {
              log.debug('consent message detected');
              return true;
            }
            return false;
          }, function (unhandledError) {
            return unhandledError;
          });
      });
  },

  verifyConsentNotExist: function () {
    log.debug('verifying consent is not exist');
    return browser.driver.executeScript(
      "return (document.querySelector('#popup_messages').childElementCount === 0)")
      .then(function (result) {
        if (result) {
          log.debug('consent not exist');
          return true;
        }
        return false;
      }, function (unhandledError) {
        return unhandledError;
      });
  },

  enableConsent: function () {
    /*
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { privacy: { enable: true, endUserConsent: { text: { en_US: 'test message' } } } } });
      });
      */
  },

  disableConsent: function () {
    /*
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { privacy: { enable: false } } });
      });
      */
  },

  removeConsent: function () {
    /*
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { privacy: {} } });
      });
      */
  },

  isBlurOn: function () {
    return browser.driver.executeScript(
      'return (document.querySelector(".wd-v-blur").style.display !== "none")'
    )
      .then(function (result) {
        return result;
      }, function (unhandledError) {
        return unhandledError;
      });
  },

  setBlur: function (blur) {
    /*
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { buttons: { 'wd-v-blur': blur } } });
      });
      */
  },

  muteAgent: function (mute) {
    return browser.driver
      .findElement(by.id('showHideAudio'))
      .then(function (muteBtn) {
        return muteBtn.getAttribute('class')
          .then(function (val) {
            if (val.indexOf('wd-v-nosound') !== -1) {
              if (!mute) {
                muteBtn.click();
              } else {
                log.debug('already muted');
              }
            }
            if (val.indexOf('wd-v-sound') !== -1) {
              if (!mute) {
                log.debug('already muted');
              } else {
                muteBtn.click();
              }
            }
          });
      }, function (unhandledError) {
        return unhandledError;
      });
  },

  muteVisitor: function (mute) {
    return common.switchToVisitor()
      .then(function () {
        return browser.driver
          .findElement(by.id('showHideAudio'))
          .then(function (muteBtn) {
            return muteBtn.getAttribute('class')
              .then(function (val) {
                if (val.indexOf('wd-v-nosound') !== -1) {
                  if (!mute) {
                    muteBtn.click();
                  } else {
                    log.debug('already muted');
                  }
                }
                if (val.indexOf('wd-v-sound') !== -1) {
                  if (!mute) {
                    log.debug('already muted');
                  } else {
                    muteBtn.click();
                  }
                }
              });
          }, function (unhandledError) {
            return unhandledError;
          });
      });
  },

  isMuted: function () {
    return browser.driver
      .findElement(by.id('showHideAudio'))
      .then(function (muteBtn) {
        return muteBtn.getAttribute('class')
          .then(function (val) {
            if (val.indexOf('wd-v-nosound') === -1) {
              return false;
            }
            return true;
          });
      }, function (unhandledError) {
        return unhandledError;
      });
  },

  isAgentButtonMuted: function () {
    return browser.switchTo().window(secondWindow)
      .then(function () {
        return common.isMuted();
      });
  },

  isVisitorButtonMuted: function () {
    return common.switchToVisitor()
      .then(function () {
        return common.isMuted();
      });
  }
};
module.exports = common;
