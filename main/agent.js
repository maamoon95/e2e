var Agent = function(a){
    this.a = a
    this.login = (host,user,pass) => { return this.a.url(host('brokerages/login'))
                                       .then(()=> this.a.setValue("[name=email]", user))
                                       .then(()=> this.a.setValue("[name=password]", pass))
                                       .then(()=> this.a.click("//button[contains(.,'Sign In')]"))
                                       .then(()=> this.totalUsers(0))
                                       .then(()=> this.online())
                       }
    this.reject = () => this.a.click("//a[@class='dw-hangup-b click' and @title='Reject']")
    this.acceptChat = () => this.a.click("//a[@title='Accept']")
    this.closeCall = () => {return this.a.click('a.close-but-wd')}
    this.pickupWithVideo = () => {return this.a.click('.wd-v-pickup.trn-link.dw-ring-anime')}
    this.callWithVideo = () =>  { return this.a.click('#dw_start_video_btn5d56da58-6810-62f6-0ddc-b2003843dc23')}
    this.hangup = () => { return this.a.click('.wd-v-hangup.trn-link.delay') }
    this.totalUsers = (count) => { return this.a.waitForExist("//span[@id='total_users_online' and text()=" + count +"]",150000) }
    this.online = () => { return this.a.waitForExist("//span[@id='agent_status' and @style='background:#72aa01;']",10000) }
}


module.exports = Agent;
