# VideoEngager e2e Test

## Installation

```bash
npm install
npm run webdriver
```

## Run test in dev

```bash
npm run dev-test     
```

## Configuration

"npm run test" command will run "server.js" which will run a static visitor page in :3000 port with "npx protractor" .

Tests are pointing to staging.

Configure this from "test.spec.js" and "static/single-button-genesys-demo.html"

Protractor configurations are from: "./protractor.conf.js"
