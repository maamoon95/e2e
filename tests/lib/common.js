/* global by */
const { browser, by, element } = require('protractor');
const log = require('./logger');
const dbAPI = require('./dbAPI');
const config = require('./config');
const assert = require('assert');
log.init(config.logger);

let sessionId;
let iframeElement;
let firstWindow;
let secondWindow;
let response;
let token;
let brokerage;

/**
 *
 * @param {start with video} video_on
 * @param {start with precall} precall
 * @returns
 */
const startVisitor = function (video_on) {
  sessionId = getGuid();
  const str = {
    video_on: video_on,
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
  const url = homeURL + 'popup.html?tennantId=' + Buffer.from(config.test_env.tennantId).toString('base64') + '&params=' + encodedString;
  log.debug('loading url: ', url);
  return browser.driver.get(url);
};

const prepateSecondTab = function () {
  return browser.executeScript('window.open()')
    .then(function () {
      return browser.getAllWindowHandles();
    })
    .then(function (handles) {
      firstWindow = handles[0];
      secondWindow = handles[1];
      return browser.switchTo().window(secondWindow);
    });
};

const startAgentFromConsole = function () {
  const url = config.test_env.baseURL + '/static/agent.popup.cloud.html';
  return browser.get(url)
    .then(function () {
      return execute('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + sessionId + '");} ');
    })
    .then(function () {
      return execute('_videoengager.init({\'pak\':"' + config.test_env.pak + '", \'externalId\':"' + config.test_env.externalId + '"}, {\'firstName\':\'' + config.test_env.firstName + '\', \'lastName\':\'' + config.test_env.lastName + '\', \'email\': \'' + config.test_env.email + '\', \'userName\': \'t\'}, {\'firstName\':\'asd\', \'lastName\':\'last\', \'email\': \'t@t\', \'id\': \'123\', \'subject\': \'subj\'},{\'hideChat\': true, \'hideInfo\': true});');
    });
};

const startAgentFromURL = function () {
  let url = config.test_env.baseURL + '/static/agent.popup.cloud.html';
  url += '?params=eyJsb2NhbGUiOiJlbl9VUyJ9&interaction=1';
  url += '&token=' + token;
  url += '&invitationId=' + sessionId;
  url += '&sk=true';
  return browser.get(url);
};

const restartBrowser = async function () {
  await browser.executeScript('window.open()');
  const handles = await browser.getAllWindowHandles();
  for (let i = 0; i < handles.length - 1; i++) {
    try {
      await browser.switchTo().window(handles[i]);
      await browser.driver.close();
    } catch (error) {
      log.error('frame already closed');
    }
  }
  await browser.switchTo().window(handles[handles.length - 1]);
  return browser.driver.sleep(100);
};

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
      assert.ifError(err);
      return err;
    })
    .catch(function (err) {
      assert.ifError(err);
      return err;
    });
};

const wait = function (callback, timeout, str) {
  return browser.driver.wait(function () {
    return callback;
  }, timeout, str);
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

const verifyAgentPushConnection = function () {
  return wait(execute("return (typeof window.getVeContext().ang === 'object')"), 5000, 'push bundle should be connected within 5 seconds');
};

const verifyAgentPrecall = function () {
  return browser.wait(function () {
    return browser.driver.executeScript('return (window.getVeContext().videoCurrent != undefined)')
      .then(function (result) {
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
          .then(function (result) {
            if (result) {
              return true;
            }
            log.debug('audioOutputSelect ' + result);
            return false;
          }, function (unhandledError) {
            return unhandledError;
          });
      }, TIMEOUT);
    });
};

const verifyAgentConnected = function () {
  return wait(common.callEstablishedByChatToken(), 5000);
};

const isCustomerPrecall = function () {
  return common.switchToVisitor()
    .then(function () {
      return execute('return (document.getElementById(\'joinConferenceButton\') !== null)');
    })
    .catch(function (e) {
      assert.ifError(e);
      return new Error(e);
    });
};

// 50 sec
const TIMEOUT = 50000;

const common = {
  sleep: function (time) {
    return browser.driver.sleep(time);
  },

  joinVisitorPrecall: function () {
    return common.switchToVisitor()
      .then(function () {
        return browser.driver.findElement(by.id('joinConferenceButton'));
      })
      .then(function (element) {
        assert.ok(element, 'precall join button is not exist');
        return execute('document.getElementById(\'joinConferenceButton\').click();');
      })
      .catch(function (e) {
        assert.ifError(e);
        return (e);
      });
  },

  verifyJoinWithoutPrecall: function () {
    return isCustomerPrecall()
      .then(function () {
        if (!response) {
          log.debug('precall not enabled');
          return verifyAgentConnected();
        } else {
          const errStr = 'visitor should not be in precall';
          assert.equal(false, response, errStr);
          return new Error(errStr);
        }
      })
      .catch(function (e) {
        assert.ifError(e);
        return new Error(e);
      });
  },

  validateConnection: function () {
    log.debug('verifying customer page video streams.');
    return browser.wait(function () {
      return browser.driver.executeScript(
        "return window.document.querySelector('.sourcevideo') " +
        "&& window.document.querySelector('.sourcevideo').srcObject " +
        "&& window.document.querySelector('.sourcevideo').srcObject.getVideoTracks " +
        "&& (window.document.querySelector('.sourcevideo').srcObject.getVideoTracks().length === 1) " +
        "&& window.document.querySelector('.localvideo') " +
        "&& window.document.querySelector('.localvideo').srcObject " +
        "&& window.document.querySelector('.localvideo').srcObject.getVideoTracks " +
        "&& (window.document.querySelector('.localvideo').srcObject.getVideoTracks().length === 1) "
      )
        .then(function (result) {
          if (result) {
            log.debug('customer page video verificiation succeed');
            return true;
          }
          return false;
        }, function (unhandledError) {
          return unhandledError;
        });
    }, 5 * 1000, 'video should start in 5 seconds')
      .then(function () {
        // verify visitor page video - should connect in 15 sec
        log.debug('verifying agent page video streams.');
        return browser.switchTo().window(secondWindow)
          .then(function () {
            return browser.wait(function () {
              return browser.driver.executeScript(
                "return (window.document.querySelector('.sourcevideo') " +
                "&& (window.document.querySelector('.sourcevideo') != null) " ^
                "&& (window.document.querySelector('.localvideo') " +
                "&& (window.document.querySelector('.localvideo') != null)))")
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

  establishInboundConnection: function (videoOn) {
    return browser.driver.manage().window().maximize()
      .then(function () {
        startVisitor(videoOn);
      })
      .then(function () {
        return prepateSecondTab();
      })
      .then(function () {
        return startAgentFromConsole();
      })
      .then(function () {
        return verifyAgentPushConnection();
      })
      .catch(function (e) {
        assert.ifError(e);
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
        return common.switchToVisitor();
      })
      .then(function () {
        // TODO verify redirection
        return restartBrowser();
      })
      .catch(function (e) {
        assert.ifError(e);
        return new Error(e);
      });
  },

  terminateCall: function () {
    log.debug('terminate all windows');
    return restartBrowser()
      .catch(function (e) {
        assert.ifError(e);
        return new Error(e);
      });
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
    return switchToAgent()
      .then(function () {
        log.debug('switching to agent tab');
        return browser.wait(async function () {
          return browser.driver.executeScript('return (window.getVeContext().chat_token != null)')
            .then(function (result) {
              if (result === true) {
                return true;
              }
              return false;
            }, function (err) {
              log.debug(err);
              assert.ifError(err, 'agent chat token not found');
              return err;
            });
        }, TIMEOUT);
      });
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

  setPrecall: function (enable) {
    return dbAPI.updateBrokerageProfile({ branding: { visitorShowPrecall: enable } });
  },

  setSafety: function (enable, disableRemoteCamera) {
    return dbAPI.updateBrokerageProfile({ safety: { enable: enable, disableRemoteCamera: disableRemoteCamera } });
  },

  setBlur: function (blur) {
    return dbAPI.updateBrokerageProfile({ branding: { buttons: { 'wd-v-blur': blur } } });
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
    return dbAPI.updateBrokerageProfile({ branding: { agentScreenShareControl: screenshare } });
  },

  setVisitorScreenshare: function (screenshare) {
    return dbAPI.updateBrokerageProfile({ branding: { visitorScreenShareControl: screenshare } });
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
    return dbAPI.updateBrokerageProfile({ branding: { privacy: { enable: true, endUserConsent: { text: { en_US: 'test message' } } } } });
  },

  disableConsent: function () {
    return dbAPI.updateBrokerageProfile({ branding: { privacy: { enable: false } } });
  },

  removeConsent: function () {
    return dbAPI.updateBrokerageProfile({ branding: { privacy: {} } });
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
        return browser.driver.wait(function () {
          return browser.driver
            .findElement(by.id('showHideAudio'))
            .then(function (muteBtn) {
              if (!muteBtn) {
                return false;
              }
              return muteBtn.getAttribute('class')
                .then(function (val) {
                  if (!val) {
                    return false;
                  }
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
                  return true;
                });
            }, function (unhandledError) {
              return false;
            })
            .catch(function () {
              return false;
            });
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
