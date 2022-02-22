var Visitor = function(v){
    this.v = v
    this.start = (host,agent) => { return this.v.url(host(agent)) }
    this.reload = (host,agent) => { return this.v.reload() }
    this.pickupWithVideo = () => { return this.v.click('.wd-v-pickup.trn-link.dw-ring-anime') }
    this.callWithVideo   = () => { return this.v.click('(//a[@title="Call with Video"])[3]') }
    this.hangup = () => { return this.v.click('.wd-v-hangup.trn-link.delay') }
}
module.exports = Visitor;
