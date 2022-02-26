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

Tests are run using configuration specified in config.js based on NODE_ENV.

```bash
NODE_ENV=environment npm run test     
```
**environment** can be one of:
 - dev - will run against dev.videoengager.com
 - test - will run against localhost:9000 (to be used in travis runs)
 - staging - will run against staging.leadsecure.com

## Configuration

"npm run dev-test" command will run "server.js" (which will run a static visitor page in :3000 port) and "npx protractor".

Set "NODE_ENV" as "test", "production" or "staging" to switch between servers.

Configure test parameters from "tests/lib/config.js"

Protractor configurations are from: "./protractor.conf.js"

Template test: "single.button.demo.spec.js"
