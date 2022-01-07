// conf.js
exports.config = {
//    framework: 'mocha',
    seleniumAddress: 'http://localhost:4444/wd/hub',
    specs: ['*e2e.js'],

    capabilities: {
        'browserName':'chrome',
        'chromeOptions': {
            'args': ['use-fake-ui-for-media-stream','disable-web-security'],
            prefs: {
                'VideoCaptureAllowedUrls': ['.*']
            }
        }
    }
}
