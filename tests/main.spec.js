/* global it By describe element by beforeEach expect  */
const { browser } = require('protractor');
const log = require('./lib/logger');
const config = require('./lib/config');
log.init(config.logger);

describe('Main View', function () {
  // To create a new browser.
  const browser2 = browser.forkNewDriverInstance();

  beforeEach(function () {
    browser2.ignoreSynchronization = true;
    browser.ignoreSynchronization = true;
    this.button_broker1 = browser2.element(by.xpath("//button[contains(.,'Dealer #1')]"));
  });

  const isAvailable = function () {
    return browser2.driver
      .findElement(By.css('.leadsecure.leadsecure-success'))
      .getAttribute('disabled')
      .then(function (flag) {
        return !flag;
      }, function (err) {
        log.error(err);
        return false;
      });
  };

  const isAnswered = function () {
    return browser2.driver
      .findElement(By.css('.leadsecure.leadsecure-info'))
      .then(function (el) {
        return true;
      }, function (err) {
        log.error('Answered check errors: ', err.message, err.code);
        return false;
      });
  };
  const isRinging = function () {
    return browser.driver
      .findElement(By.xpath("//a[contains(@class,'dw-pickup-b click') and contains(@title,'Accept')]"))
      .getCssValue('display')
      .then(function (text) {
        log.debug('display:', text);
        return text === 'block';
      }, function (err) {
        log.error('Check display error: ', err.message, err.code);
        return false;
      });
  };

  it('should login first', async function () {
    await browser.get(config.test_env.baseURL + '/brokerages/login');
    const email = element(by.id('email'));
    const password = element(by.id('password'));
    const loginButton = element(by.id('signin'));
    await email.sendKeys('t@t');
    await password.sendKeys('1');
    await loginButton.click();
    await browser.driver.sleep(1000);
    expect(browser.getCurrentUrl()).toEqual(config.test_env.baseURL + '/static/dashboard.html');
    await browser2.get(config.test_env.baseURL + '/static/e2etest.html');
    await browser2.driver.findElement(By.id('testButton1')).click();
    await browser2.driver.wait(isAvailable, 30000);
    await browser2.driver.findElement(By.css('.leadsecure.leadsecure-success')).click();
    await browser.driver.wait(isRinging, 15000);
    await browser.driver.sleep(1000);
    await browser.driver.switchTo().window(browser.driver.getWindowHandle());
    await browser.driver.findElement(By.tagName('body')).click();
    await browser.driver.executeScript('$(".dw-pickup-b").click()');
    await browser2.driver.wait(isAnswered, 15000);
  });
});
