"use strict"
var assert = require('assert');
var EC = protractor.ExpectedConditions;

function Agent(browser){
    this.login = (user,pass) => {
        return browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//button[contains(.,'Sign In')]"))),5000,"Wait for signin button to appear.")
            .then( () => browser.element(by.name('email')).sendKeys(user))
            .then( () => browser.element(by.name('password')).sendKeys(pass))
            .then( () => browser.element(by.xpath("//button[contains(.,'Sign In')]")).click())
            .then( () => browser.wait(EC.urlContains('static/dashboard.html'), 5000));
    }

    this.getVisitorUrl = () => { return  browser.wait(EC.urlContains('brokerages/preferences'), 5000, "Wait for url preferences to appear.")
                                 .then(() => browser.element(by.xpath("//input[contains(@placeholder, 'Agent')]"))
                                       .getAttribute("value"));}

    this.cancel = () =>{ return browser.element(by.xpath("//button[text()='Cancel']")).click(); }

    this.getVisitor = (browser) => { return new Visitor(browser)};

    this.acceptChat = ()=> { return browser.wait(
        EC.elementToBeClickable(browser.element(by.xpath("//a[@title='Accept']"))),5000,"Wait for button with title Accept to appear.")
                             .then( () => browser.element(by.xpath("//a[@title='Accept']")).click())
                             }

    this.startWithVideo = ()=> { return browser.wait(
        EC.elementToBeClickable(browser.element(by.xpath("//a[@title='Start Video Call' and @style='display: block']"))),
        5000,
        "Wait for startVideo button to appear.")
                                 .then( () => browser.element(by.xpath("//a[@title='Start Video Call' and @style='display: block']")).click())
                             .then( () => browser.wait(
                                 EC.elementToBeClickable(browser.element(by.xpath("//a[text()='CANCEL']")))
                                 , 15000
                                 , "startWithVideo:Wait for hangup button."))}

    this.callWithVideo = () => { return browser.wait(
        EC.elementToBeClickable(browser.element(by.xpath("//a[@title='Accept with Video and Audio']")))
        , 5000
        , "Wait for 'Accept with Video and Audio'")
                                 .then( () => browser.element(by.xpath("//a[@title='Accept with Video and Audio']")).click())
                                 .then( () => browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[@id='hangupButton']"))),15000, "callWithVideo: Wait for hangup button"))
                               }
    this.callOnly = () => { return browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[@id='callButton_1']"))), 15000, "Wait for callonly button")
                            .then( () => browser.element(by.xpath("//a[@id='callButton_1']")).click())
                            .then( () => browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[text()='CANCEL']"))), 15000, "Wait for cancel button"));
                          }

    this.changeRecording = () => { return browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[@title='Recording']"))),15000, "Wait for button Recording.")
                                  .then(() => { return browser.element(by.xpath("//a[@title='Recording']")).click()})}
    this.hangup = () => { return browser.element(by.xpath("//a[@id='hangupButton']")).click()
                          .then(() => browser.wait(EC.invisibilityOf(browser.element(by.xpath("//a[@id='hangupButton']"))), 15000, "Wait for button hangup."))}

}

function Visitor(browser){
    this.open = (customerURL) => {
        return browser.get(customerURL)
            .then(() => browser.wait(EC.elementToBeClickable(browser.element(by.xpath("(//a[@title='Call with Video'])[1]"))), 15000, "Wait for button 'Call with Video'."));
    }

    this.answerWithVideo = () => {
        return browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[@class='wd-v-pickup trn-link dw-ring-anime']"))), 5000,"Wait for button 'Accept with Video'.").then(
            ()=> browser.element(by.xpath("//a[@class='wd-v-pickup trn-link dw-ring-anime']")).click())
            .then(() => browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[text()='CANCEL']"))), 15000,"Waiting for call to start"))
    };

    this.callWithVideo = () => {
        return browser.element(by.xpath("(//a[@title='Call with Video'])[1]")).click()
            .then(() => browser.wait(EC.elementToBeClickable(browser.element(by.xpath("//a[text()='CANCEL']"))), 15000, "Waiting for 'Cancel' button."))
    };
}

module.exports = Agent;
