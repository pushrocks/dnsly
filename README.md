# dnsly
smart dns methods written in TypeScript

## Availabililty
[![npm](https://push.rocks/assets/repo-button-npm.svg)](https://www.npmjs.com/package/dnsly)
[![git](https://push.rocks/assets/repo-button-git.svg)](https://gitlab.com/pushrocks/dnsly)
[![git](https://push.rocks/assets/repo-button-mirror.svg)](https://github.com/pushrocks/dnsly)
[![docs](https://push.rocks/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/dnsly/)

## Status for master
[![build status](https://gitlab.com/pushrocks/dnsly/badges/master/build.svg)](https://gitlab.com/pushrocks/dnsly/commits/master)
[![coverage report](https://gitlab.com/pushrocks/dnsly/badges/master/coverage.svg)](https://gitlab.com/pushrocks/dnsly/commits/master)
[![Dependency Status](https://david-dm.org/pushrocks/dnsly.svg)](https://david-dm.org/pushrocks/dnsly)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/dnsly/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/dnsly/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/dnsly/badges/code.svg)](https://www.bithound.io/github/pushrocks/dnsly)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage
we recommend the use of TypeScript for optimal intellisense
```javascript
import * as dnsly from 'dnsly'

let myDnsly = new dnsly.Dnsly('google') // uses Google DNS Servers e.g 8.8.8.8
myDnsly.getRecord('example.com','AAAA') // returns promise
    .then(record => { // AAAA record for google.com
        // do something 
    })
```

[![npm](https://push.rocks/assets/repo-header.svg)](https://push.rocks)
