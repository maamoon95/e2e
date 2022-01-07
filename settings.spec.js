/* global by beforeEach beforeAll  */
const { browser } = require('protractor');
require('../server/app');
const log = require('../server/log/log.js');

const Brokerage = require('../server/api/brokerage/brokerage.model');
const Partner = require('../server/api/partner/partner.model');
const User = require('../server/api/user/user.model');
const Acl = require('../server/api/acl/acl.model');
const Q = require('q');
const assert = require('assert');
let sessionId;
let iframeElement;
let firstWindow;
let secondWindow;
let response;
const TIMEOUT = 1000 * 5 * 10; // 50 sec

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
      return switchBrowser1frame();
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
        return browser.driver.wait(callEstablishedByChatToken(), 5000);
      } else {
        return switchBrowser1frame()
          .then(function () {
            log.debug('precall enabled');
            return browser.driver.executeScript('document.getElementById(\'joinConferenceButton\').click(); ');
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
  const url = 'http://localhost:9000/static/e2e/single-button-genesys-demo.html';
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
      const url2 = 'http://localhost:9000/static/agent.popup.cloud.html';
      return browser.get(url2);
    })
    .then(function () {
      return browser.driver.executeScript('window.jsVeInitClb = function () {_videoengager.startVideoVisitor("' + sessionId + '");} ');
    })
    .then(function () {
      return browser.driver.executeScript('_videoengager.init({\'pak\':"DEV2", \'externalId\':"videoEngager"}, {\'firstName\':\'name\', \'lastName\':\'last\', \'email\': \'t@t\', \'userName\': \'t\'}, {\'firstName\':\'asd\', \'lastName\':\'last\', \'email\': \'t@t\', \'id\': \'123\', \'subject\': \'subj\'},{\'hideChat\': true, \'hideInfo\': true});');
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

const CreateFreshDB = function () {
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
  return browser.driver.executeScript('document.querySelector(\'#hangupButton\').click();')
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

describe('screen share settings test', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    return CreateFreshDB();
  });

  const setAgentScreenshare = function (screenshare) {
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { agentScreenShareControl: screenshare } });
      });
  };

  const setVisitorScreenshare = function (screenshare) {
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { visitorScreenShareControl: screenshare } });
      });
  };

  const isAgentScreenshareOn = function () {
    return browser.driver.executeScript(
      'return (document.querySelector(".wd-v-share").style.display !== "none")'
    )
      .then(function (result) {
        return result;
      }, function (unhandledError) {
        return unhandledError;
      });
  };

  const isVisitorScreenshareOn = function () {
    return switchBrowser1frame()
      .then(function () {
        return isAgentScreenshareOn();
      });
  };

  it('should enable scrensharing by removing settings', function () {
    return setAgentScreenshare()
      .then(function () {
        setVisitorScreenshare();
      })
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('check agent screenshare');
        return isAgentScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check agent screenshare: ', screenshare);
        assert.equal(true, screenshare);

        log.debug('check visitor screenshare');
        return isVisitorScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check visitor screenshare: ', screenshare);
        assert.equal(true, screenshare);

        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('should disble scrensharing by disabling settings', function () {
    return setAgentScreenshare(false)
      .then(function () {
        setVisitorScreenshare(false);
      })
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('check agent screenshare');
        return isAgentScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check agent screenshare: ', screenshare);
        assert.equal(false, screenshare);

        log.debug('check visitor screenshare');
        return isVisitorScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check visitor screenshare: ', screenshare);
        assert.equal(false, screenshare);

        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('should enable agent scrensharing by enabling settings', function () {
    return setAgentScreenshare(true)
      .then(function () {
        setVisitorScreenshare(false);
      })
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('check agent screenshare');
        return isAgentScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check agent screenshare: ', screenshare);
        assert.equal(true, screenshare);

        log.debug('check visitor screenshare');
        return isVisitorScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check visitor screenshare: ', screenshare);
        assert.equal(false, screenshare, 'visitor screen share must be off');

        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('should enable visitor scrensharing by enabling settings', function () {
    return setAgentScreenshare(false)
      .then(function () {
        setVisitorScreenshare(true);
      })
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('check agent screenshare');
        return isAgentScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check agent screenshare: ', screenshare);
        assert.equal(false, screenshare);

        log.debug('check visitor screenshare');
        return isVisitorScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check visitor screenshare: ', screenshare);
        assert.equal(true, screenshare);

        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('should enable scrensharing by enabling settings', function () {
    return setAgentScreenshare(true)
      .then(function () {
        setVisitorScreenshare(true);
      })
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('check agent screenshare');
        return isAgentScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check agent screenshare: ', screenshare);
        assert.equal(screenshare, true);

        log.debug('check visitor screenshare');
        return isVisitorScreenshareOn();
      })
      .then(function (screenshare) {
        log.debug('check visitor screenshare: ', screenshare);
        assert.equal(screenshare, true);

        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);
});

describe('consent settings test', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    return CreateFreshDB();
  });

  const verifyBranding = function () {
    log.debug('verifying consent is exist');
    return switchBrowser1frame()
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
  };

  const verifyConsentNotExist = function () {
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
  };

  const enableConsent = function () {
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { privacy: { enable: true, endUserConsent: { text: { en_US: 'test message' } } } } });
      });
  };

  const disableConsent = function () {
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { privacy: { enable: false } } });
      });
  };

  const removeConsent = function () {
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { privacy: {} } });
      });
  };

  it('enable consent text', function () {
    return enableConsent()
      .then(function () {
        return establishConnection();
      })
      .then(function () {
        return joinCall();
      })
      .then(function () {
        return validateConnection();
      })
      .then(function () {
        return verifyBranding();
      })
      .then(function (consent) {
        assert.equal(true, consent, 'consent should be exist');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('disable consent text', function () {
    return disableConsent()
      .then(function () {
        return establishConnection();
      })
      .then(function () {
        return joinCall();
      })
      .then(function () {
        return validateConnection();
      })
      .then(function () {
        return verifyConsentNotExist();
      })
      .then(function (consent) {
        assert.equal(true, consent, 'consent should not be exist');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('remove consent', function () {
    return removeConsent()
      .then(function () {
        return establishConnection();
      })
      .then(function () {
        return joinCall();
      })
      .then(function () {
        return validateConnection();
      })
      .then(function () {
        return verifyConsentNotExist();
      })
      .then(function (consent) {
        assert.equal(true, consent, 'consent should not be exist');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);
});

describe('blur settings test', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    return CreateFreshDB();
  });

  const isBlurOn = function () {
    return browser.driver.executeScript(
      'return (document.querySelector(".wd-v-blur").style.display !== "none")'
    )
      .then(function (result) {
        return result;
      }, function (unhandledError) {
        return unhandledError;
      });
  };

  const setBlur = function (blur) {
    return Brokerage.brokerageFindByEmail('t@t')
      .then(function (brokerage) {
        return brokerage.saveBrokerage({ branding: { buttons: { 'wd-v-blur': blur } } });
      });
  };

  it('should enable blur', function () {
    return setBlur(true)
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('verify blur on');
        return isBlurOn();
      })
      .then(function (blur) {
        log.debug('blur: ', blur);
        assert.equal(true, blur);
        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('should disable blur', function () {
    return setBlur(false)
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('verify blur on');
        return isBlurOn();
      })
      .then(function (blur) {
        log.debug('blur: ', blur);
        assert.equal(false, blur);
        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);

  it('should remove blur', function () {
    return setBlur()
      .then(function () {
        log.debug('Establish Connection');
        return establishConnection();
      })
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('verify blur on');
        return isBlurOn();
      })
      .then(function (blur) {
        log.debug('blur: ', blur);
        assert.equal(false, blur);
        log.debug('Finish Call');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  }, TIMEOUT);
});

describe('mute button on of', function () {
  beforeEach(function () {
    browser.ignoreSynchronization = true;
    browser.waitForAngularEnabled(false);
  });

  afterEach(async function () {
    await browser.driver.sleep(500);
  });

  beforeAll(function () {
    return CreateFreshDB();
  });

  const muteAgent = function (mute) {
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
  };

  const muteVisitor = function (mute) {
    return switchBrowser1frame()
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
  };

  const isMuted = function () {
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
  };

  const isAgentButtonMuted = function () {
    return browser.switchTo().window(secondWindow)
      .then(function () {
        return isMuted();
      });
  };

  const isVisitorButtonMuted = function () {
    return switchBrowser1frame()
      .then(function () {
        return isMuted();
      });
  };

  const isAgentStreamMuted = function () {
    // document.getElementById("remoteVideo").srcObject.getAudioTracks()
    // AUDIO TRACK EXIST ON MUTE AND DOES NOT SHOW IF MUTED
  };

  const isVisitorStreamMuted = function () {

  };

  it('should mute and unmute agent', function () {
    establishConnection()
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('mute agent');
        return muteAgent(true);
      })
      .then(function () {
        return isAgentButtonMuted();
      })
      .then(function (mute) {
        assert.equal(true, mute, 'agent icon must be on muted state');
        return muteAgent(false);
      })
      .then(function () {
        return isAgentButtonMuted();
      })
      .then(function (mute) {
        assert.equal(false, mute, 'agent icon must be on unmuted state');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  });

  it('should mute and unmute visitor', function () {
    establishConnection()
      .then(function () {
        log.debug('join Call');
        return joinCall();
      })
      .then(function () {
        log.debug('validate Connection');
        return validateConnection();
      })
      .then(function () {
        log.debug('mute visitor');
        return muteVisitor(true);
      })
      .then(function () {
        return isVisitorButtonMuted();
      })
      .then(function (mute) {
        assert.equal(true, mute, 'visitor icon must be on muted state');
        return muteVisitor(false);
      })
      .then(function () {
        return isVisitorButtonMuted();
      })
      .then(function (mute) {
        assert.equal(false, mute, 'visitor icon must be on unmuted state');
        return finishCall();
      })
      .catch(function (e) {
        assert.ifError(e);
        return finishCall();
      });
  });
}, TIMEOUT);
