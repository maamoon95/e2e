"use strict"

var prod = {url:'https://prod.leadsecure.com/',
            user:'veios@ve',
            pass:'123456'
           }
var test = {url:'https://test.videoengager.com/',
            user:'deepspace@fake.com',
            pass:'123',
           }
var Agent = require('./po/agent');

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
    browser.waitForAngularEnabled(false)

    it("open browser",function(){
        browser.get(host('brokerages/login')); })

    it("#Login and go to dashboard", function() {
        agent.login(user,pass); })

    it("#Get visitor url", function(){
        browser.get(host('/brokerages/preferences'));

        agent.getVisitorUrl()
            .then(function(text){
                // eslint-disable-next-line no-useless-escape
                customerURL=text.replace(/http[s]:\/\/[^\/]*\//, host("")); });
        agent.cancel()
    })

    describe("/Visitor calling with video",()=>{
        it("Open visitor url", function(){
            visitor.waitForAngularEnabled(false)
            visit = agent.getVisitor(visitor);
            visit.open(customerURL);
        })

        it("/Agent accepts call", function(){
            agent.acceptChat();
        });

        it("/Agent starts video call", function(){
            agent.startWithVideo();
        });

        it("/Visitor pickups video call", function(){
            visit.answerWithVideo()
        });

        it("/Stop recording", function(){
            browser.sleep(5000);
        })

        it("/Agent hangup call", function(){
            agent.hangup();
        });
    })
})
