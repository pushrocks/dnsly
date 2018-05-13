# dnsly

smart dns methods written in TypeScript

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/dnsly)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/dnsly)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/dnsly)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/dnsly/)

## Status for master

[![build status](https://GitLab.com/pushrocks/dnsly/badges/master/build.svg)](https://GitLab.com/pushrocks/dnsly/commits/master)
[![coverage report](https://GitLab.com/pushrocks/dnsly/badges/master/coverage.svg)](https://GitLab.com/pushrocks/dnsly/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/dnsly.svg)](https://www.npmjs.com/package/dnsly)
[![Dependency Status](https://david-dm.org/pushrocks/dnsly.svg)](https://david-dm.org/pushrocks/dnsly)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/dnsly/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/dnsly/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/dnsly/badges/code.svg)](https://www.bithound.io/github/pushrocks/dnsly)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

```javascript
import * as dnsly from 'dnsly';

let myDnsly = new dnsly.Dnsly('google'); // uses Google DNS Servers e.g 8.8.8.8
myDnsly
  .getRecord('example.com', 'AAAA') // returns promise
  .then((record: dnsly.I_AAAA) => {
    // AAAA record for google.com, the I_AAAA will give you proper typings for the record return type
    // do something
  });
```

Use TypeScript for best in class instellisense.

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
