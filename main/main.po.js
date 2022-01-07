/**
 * This file uses the Page Object pattern to define the main page for tests
 * https://docs.google.com/presentation/d/1B6manhG0zEXkC-H-tPo2vwU06JhL8w9-XCF9oehXzAQ
 */

'use strict';

var MainPage = function(browser) {
  // this.heroEl = element(by.css('.leadsecure.leadsecure-info'));
  // this.h1El = this.heroEl.element(by.css('h1'));
  // this.imgEl = this.heroEl.element(by.css('img'));
  this.button_broker1 = browser.element(by.xpath("//button[contains(.,'Dealer #1')]"));
};

module.exports = MainPage;

