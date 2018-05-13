# @pushrocks/smartdns

smart dns methods written in TypeScript

## Availabililty

[![npm](https://pushrocks.gitlab.io/assets/repo-button-npm.svg)](https://www.npmjs.com/package/@pushrocks/smartdns)
[![git](https://pushrocks.gitlab.io/assets/repo-button-git.svg)](https://GitLab.com/pushrocks/smartdns)
[![git](https://pushrocks.gitlab.io/assets/repo-button-mirror.svg)](https://github.com/pushrocks/smartdns)
[![docs](https://pushrocks.gitlab.io/assets/repo-button-docs.svg)](https://pushrocks.gitlab.io/smartdns/)

## Status for master

[![build status](https://GitLab.com/pushrocks/smartdns/badges/master/build.svg)](https://GitLab.com/pushrocks/smartdns/commits/master)
[![coverage report](https://GitLab.com/pushrocks/smartdns/badges/master/coverage.svg)](https://GitLab.com/pushrocks/smartdns/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartdns.svg)](https://www.npmjs.com/package/@pushrocks/smartdns)
[![Dependency Status](https://david-dm.org/pushrocks/smartdns.svg)](https://david-dm.org/pushrocks/smartdns)
[![bitHound Dependencies](https://www.bithound.io/github/pushrocks/smartdns/badges/dependencies.svg)](https://www.bithound.io/github/pushrocks/smartdns/master/dependencies/npm)
[![bitHound Code](https://www.bithound.io/github/pushrocks/smartdns/badges/code.svg)](https://www.bithound.io/github/pushrocks/smartdns)
[![TypeScript](https://img.shields.io/badge/TypeScript-2.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%206.x.x-blue.svg)](https://nodejs.org/dist/latest-v6.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

## Usage

Use TypeScript for best in class instellisense.

```typescript
let myDnsly = new dnsly.Dnsly('google'); // uses Google DNS Servers e.g 8.8.8.8
myDnsly
  .getRecord('example.com', 'AAAA') // returns promise
  .then((record: dnsly.I_AAAA) => {
    // AAAA record for google.com, the I_AAAA will give you proper typings for the record return type
    // do something
  });
```

For further information read the linked docs at the top of this README.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
> | By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy.html)

[![repo-footer](https://pushrocks.gitlab.io/assets/repo-footer.svg)](https://push.rocks)
