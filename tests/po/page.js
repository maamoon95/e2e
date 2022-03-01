const { browser } = require('protractor');
const assert = require('assert');

module.exports = class Page {
  // Parent page handle, to workaround webdriver 'already closed'
  // we will always switch to parent before opening new windows
  static parentHandle = "";
  
  constructor() {
    // Instance browser handle
    this.myHandle = "";
  };
  
  switchTo = async function () {
    await browser.switchTo().window(this.myHandle);
  };

  open = async function (url) {
    browser.waitForAngularEnabled(false);
    await browser.get(url);
    const handle = await browser.getWindowHandle();
    this.myHandle = handle;
  };

  openAsNew = async function (url) {
    browser.waitForAngularEnabled(false);
    if(Page.parentHandle) {
      this.myHandle = Page.parentHandle;
      await this.switchTo();
    } 
    await browser.executeScript('window.open()');

    const windows = await browser.getAllWindowHandles();
    Page.parentHandle = windows[0];
    this.myHandle = windows[windows.length - 1];
    await this.switchTo();
    await this.open(url);
  }
}

