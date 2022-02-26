const { browser } = require('protractor');

module.exports = class Page {
  // All pages browser handles
  static handles = [];
	
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
    await browser.executeScript('window.open()');
    const windows = await browser.getAllWindowHandles();
    if(Page.handles.length === 0) { // handle first run
      this.myHandle = windows[1];
    } else { // assume on every new window we got one more hanlde
      const index = Page.handles.indexOf(this.myHandle);
      if (index > -1) {
        Page.handles.splice(index, 1);
      }
      this.myHandle = windows[Page.handles.length];
    }
    Page.handles = windows;
    await this.switchTo();
    await this.open(url);
  }
}

