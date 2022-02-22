"use strict"

var prod = {url:'https://prod.leadsecure.com/',
            user:'veios@ve',
            pass:'123456'
           }
var test = {url:'https://test.videoengager.com/',
            user:'deepspace@fake.com',
            pass:'123'
           }
var Agent1 = require('../po/agent');
var Agent = require('../main/main.po');

var current= test;
var EC = protractor.ExpectedConditions;
function host(text){
    return current.url+text;
}

describe("Login", function(){
    var visitor = browser.forkNewDriverInstance();
    var visit;
    var user = current.user;
    var pass = current.pass;
    var customerURL = undefined
    var agent = new Agent(browser);
    var agent1 = new Agent1(browser);
    browser.waitForAngularEnabled(false)

    it("open browser",function(){
        browser.get(host('brokerages/login')); })

    it("#Login and go to dashboard", function() {
        agent1.login(user,pass); })

    it("#Get visitor url", function(){
        browser.get(host('/brokerages/preferences'));

        agent1.getVisitorUrl()
            .then(function(text){
                // eslint-disable-next-line no-useless-escape
                customerURL=text.replace(/http[s]:\/\/[^\/]*\//, host("")); });
        agent1.cancel()
    })

    describe("/Visitor calling with video",()=>{
        it("Open visitor url", function(){

            visitor.waitForAngularEnabled(false)
            visit = agent1.getVisitor(visitor);
            visit.open(customerURL);
        })

        it("/Visitor starts video call", function(){
            visit.callWithVideo()
        });

        it("/Agent pickup video call", function(){
            agent1.callWithVideo();
        });

        it("/Stop recording", function(){
            browser.sleep(5000);
            agent1.changeRecording();
            browser.sleep(5000);
            agent1.changeRecording();
            browser.sleep(5000);
        })

        it("/Agent hangup call", function(){
            agent1.hangup();
        });

        it("/Agent is calling back",function(){
            agent1.callOnly()
        });

        it("/Visitor is picking up back",function(){
            visitor.wait(EC.elementToBeClickable(visitor.element(by.xpath("//a[@class='wd-v-pickup trn-link dw-ring-anime']"))), 50000);
            visitor.element(by.xpath("//a[@class='wd-v-pickup trn-link dw-ring-anime']")).click();
            visitor.sleep(10000);
        });
    })
})
