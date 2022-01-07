'use strict';
//var app = require('../../server/app');
var Q = require('q');
//var Brokerage = require('../../server/api/brokerage/brokerage.model');
//var User = require('../../server/api/user/user.model');
//var Acl = require('../../server/api/acl/acl.model');

describe('Main View', function() {
  var page;
  var DealerPage = require('./main.po');
  var EC = protractor.ExpectedConditions;
  // To create a new browser.
  var browser2 = browser.forkNewDriverInstance();
  var beforeAll = function() {
    return Brokerage
      .find({})
      .deleteMany({})
      .exec()
      .then(function() {
          return User.deleteMany({}).exec();
        })
        .then(function() {
            return Acl.deleteMany({}).exec();
        })
        .then(function () {
            var acl = new Acl({name: 'manager'});
            return Q.ninvoke(acl, 'save');
        })
        .then(function () {
            var acl = new Acl({name: 'agent'});
            return Q.ninvoke(acl, 'save');
        })
     .then(function() {
      Brokerage.createBrokerage({
        email: 't@t0.t',
        password: '1',
        company: 'The Brokerage',
        tennantId: 'test_tenant'
      });
    });
  };


  beforeEach(function() {
    browser2.ignoreSynchronization = true;
    browser.ignoreSynchronization = true;
    page = new DealerPage(browser2);
  });
  var isAvailable = function() {
    return browser2.driver
      .findElement(By.css('.leadsecure.leadsecure-success'))
      .getAttribute('disabled')
      .then(function(flag)
        {
          return !flag;
        }, function(err) {
          console.log(err);
          return false;
        });
  };

  var isAnswered = function() {
    return browser2.driver
      .findElement(By.css('.leadsecure.leadsecure-info'))
      .then(function(el){
          return true;
        }, function(err) {
          console.log('Answered check errors: ', err.message, err.code);
          return false;
      });
  };
  var isRinging = function() {
      return browser.driver
        .findElement(By.xpath("//a[contains(@class,'dw-pickup-b click') and contains(@title,'Accept')]"))
        .getCssValue('display')
        .then(function(text){
          console.log('display:', text);
          return text === 'block';
        }, function(err) {
          console.log('Check display error: ', err.message, err.code);
          return false;
      });
  };
  it('Setup', function() {
    beforeAll();
  });
  it('should login first', async function() {
    await browser.get('http://localhost:9000/brokerages/login');
    var email = element(by.id('email'));
    var password = element(by.id('password'));
    var loginButton = element(by.id("signin"));
    await email.sendKeys('t@t0.t');
    await password.sendKeys('1');
    await loginButton.click();
    await browser.driver.sleep(1000);
    // eslint-disable-next-line no-undef    
    expect(browser.getCurrentUrl()).toEqual('http://localhost:9000/static/dashboard.html');
    await browser2.get('http://localhost:9000/static/e2etest.html');
    await browser2.driver.findElement(By.id('testButton1')).click();
    await browser2.driver.wait(isAvailable, 30000);
    await browser2.driver.findElement(By.css('.leadsecure.leadsecure-success')).click();
    await browser.driver.wait(isRinging, 15000);
    await browser.driver.sleep(1000);
    //
    await browser.driver.switchTo().window(browser.driver.getWindowHandle());
    await browser.driver.findElement(By.tagName("body")).click();
    //await browser.driver.findElement(By.id("//a[contains(@class,'dw-pickup-b click') and contains(@title,'Accept')]")).click(); //sendKeys(protractor.Key.ENTER);
    await browser.driver.executeScript('$(".dw-pickup-b").click()');
    await browser2.driver.wait(isAnswered, 15000);

  });
});
