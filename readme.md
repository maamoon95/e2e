# VideoEngager e2e Test

## Installation

```bash
npm install
npm run webdriver
```

## Run

```bash
npm run test
```

## Configuration

"npm run test" command will run "server.js" which will run a static page in :3000 port with "npx protractor" . 
Tests are pointing to staging. configure this from "test.spec.js" and "static/single-button-genesys-demo.html"

protractor configurations are from: "./protractor.conf.js"
