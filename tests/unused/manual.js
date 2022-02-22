var webdriverio = require('webdriverio');
var options = { desiredCapabilities: { browserName: 'chrome' } };
var agent = webdriverio.remote(options);
var visitor = webdriverio.remote(options);
var visitor1 = webdriverio.remote(options);

var Agent = require('../main/agent')
var Visitor = require('../main/visitor')

var prod = {url:'https://prod.leadsecure.com/',
            user:'veios@ve',
            pass:'123456',
            shorturl:"TBD"
           }

var test = {url:'https://test.videoengager.com/',
            user:'angelpopov@labssoft.com',
            pass:'tarator',
            shorturl: "AngelP"
           }

var local = {url:'http://localhost:9000/',
             user:'t@t',
             pass:'1',
             shorturl: "NO_CN"
            }

var current= local;

function host(text){
    return current.url+text;
}

const startState = {agents :[],
                    visitors :[]}


function merge(obj){ return (state) => {return {...state,...obj}}}
function isTrue(prop) { return state => { return state[prop] }}
function isNot(fn) { return (state) => { return !fn(state) }}
function pred(fn) { return (state) => { return fn(state) }}


var a = new Agent(agent)
var v = new Visitor(visitor)
var v1 = new Visitor(visitor1)

var visitors = [v, v1]
var dict ={}

dict["new visitor"]=
    { check  : state=> visitors.length > 0,
      action : (state) => visitors[0]
      .start(host, current.shorturl)
      .then(()=>a.totalUsers(state.visitors.length+1)),
      updater : (state) => { var v = visitors[0];
                             visitors = visitors.slice(1)
                             return {...state, visitors : [v].concat(state.visitors)} } }

dict["end visitor"] =
    { check  : state => state.visitors.length > 0,
      action : (state) => state.visitors[0].start(host, "End")//reload()
      .then(() => a.totalUsers(state.visitors.length-1)),
      updater : (state) => { var v = state.visitors[0];
                             visitors = [v].concat(visitors)
                             return {...state, visitors : state.visitors.slice(1)} } }

dict["shift visitors"] =
    { check  : state => state.visitors.length > 1,
      action : (state) => a.totalUsers(state.visitors.length),
      updater : (state) => { var v = state.visitors[0];
                             return {...state, visitors : state.visitors.slice(1).concat([v])} } }

function available(state) {
    return Object.entries(dict).filter(([key,action]) => action.check(state));
}

console.log( available(startState) )

function clear(){
    visitors = [v, v1]
    return Promise.all([a.login(host,current.user,current.pass),v.start(host, "initial"),v1.start(host, "initial")])
}

function execSteps(state, steps) {
    const name = steps[0]
    const action = dict[name]
    console.log("executing ", name)
    return action.action(state).then( () => { const newState = action.updater(state);
                                         const next =  steps.slice(1);
                                         //console.log("old state ", state);
                                         //console.log("new state ", newState);
                                         if (next.length>0)
                                             return execSteps(newState,steps.slice(1))
                                         else
                                             return new Promise((resolve,reject) => resolve(newState))
                                       })
}

function runCase(steps){
    return clear()
        .then(()=> execSteps({agents :[],
                             visitors :[]},
                             steps))
        .catch(e=> console.log("Error:",e.message))
}

function execPath(candidates = available(startState).map(el=>[el[0]])) {// -> new candidates
    const selected = candidates[0]
    console.log("----------- executing:",selected)
    return clear()
        .then(() => execSteps(startState,selected)
              .then(newState => {
                  console.log("state at end:", newState)
                  const nextActions = available(newState).map(el=>el[0])
                  return execPath(candidates.slice(1).concat(nextActions.map(action => selected.concat([action]))))}))
        .catch(e=> {console.log("Error:",e.message);console.log(selected); throw e})
}

Promise.all([visitor.init(),visitor1.init()])
    .then(()=>agent.init())
    .then(()=>execPath())
    .catch(e=>console.log("Error:", e.message,e))

/*
function home() {a.url(host('brokerages/login'));}
function logout(){return a.click("#dashboard_logout");}
function accept(){return a.click('[title=Accept]');}
function cancelMyCall(){return a.click('[id=cancel_call_button]').catch((e)=>console.log(e))}
function closeCall(){return a.click('a.close-but-wd').catch((e)=>console.log(e))}
function callWithVideo(){return a.click('[title="Start Video Call"]').catch((e)=>console.log(e));}
function incallWithVideo(){return a.click('#callButton_1').catch((e)=>console.log(e));}
function incallOnly(){return a.click('#callAudioButton_1').catch((e)=>console.log(e));}
function hangup(){return a.click('#hangupButton').catch((e)=>console.log(e))}
function showHideVideo(){return a.click('#showHideVideo').catch((e)=>console.log(e)) };
function pause(){ return a.click('a#showHideVideo.wd-v-video').catch((e)=>console.log(e)); }
function unpause(){ return a.click('a#showHideVideo.wd-v-novideo').catch((e)=>console.log(e));}
function info(){return a.click('a.wd-v-info.trn-link').catch((e)=>console.log(e)) };
function mute(){return a.click('#showHideAudio.wd-v-sound').catch((e)=>console.log(e)) };
function unmute(){return a.click('#showHideAudio.wd-v-nosound').catch((e)=>console.log(e)) };
function hold(){return a.click('a#holdButton.wd-v-hold').catch((e)=>console.log(e)) };
function unhold(){return a.click('a#holdButton.wd-v-resume').catch((e)=>console.log(e)) };
function recordingStart(){return a.click('div.wd-video-c > a.wd-v-recording.trn-link.recording-off').catch((e)=>console.log(e));}
function recordingStop(){return a.click('div.wd-video-c > a.wd-v-recording.trn-link.recording-on').catch((e)=>console.log(e));}

function waitToAppear(timeout){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,timeout)
    })
}

function restart(){
    closeCall()
        .then(()=>callWithVideo())
        .then(()=>waitToAppear(3000))
        .then(()=>v.click('.wd-v-pickup.trn-link.dw-ring-anime'))
        .then(()=>console.log("Ready"))
}

function search(paths){
    console.log("Processing",paths)
    const first  = paths[0];
    const last = paths.slice(1);
    console.log("Processing",first)
    const lastState = execSteps({ recording: true, hold: false, mute: false, pause: false },first)
    const next = available(lastState)
    return last.concat(next.map((action) => {return first.concat([action])}))
}
*/
