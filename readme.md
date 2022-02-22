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

"npm run dev-test" command will run "server.js" (which will run a static visitor page in :3000 port) and "npx protractor".

Set "NODE_ENV" as "test", "production" or "staging" to switch between servers.

Configure test parameters from "tests/lib/config.js"

Protractor configurations are from: "./protractor.conf.js"

Template test: "single.button.demo.spec.js"
