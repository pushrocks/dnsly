# @pushrocks/smartdns
smart dns methods written in TypeScript

## Availabililty and Links
* [npmjs.org (npm package)](https://www.npmjs.com/package/@pushrocks/smartdns)
* [gitlab.com (source)](https://gitlab.com/pushrocks/smartdns)
* [github.com (source mirror)](https://github.com/pushrocks/smartdns)
* [docs (typedoc)](https://pushrocks.gitlab.io/smartdns/)

## Status for master
[![pipeline status](https://gitlab.com/pushrocks/smartdns/badges/master/pipeline.svg)](https://gitlab.com/pushrocks/smartdns/commits/master)
[![coverage report](https://gitlab.com/pushrocks/smartdns/badges/master/coverage.svg)](https://gitlab.com/pushrocks/smartdns/commits/master)
[![npm downloads per month](https://img.shields.io/npm/dm/@pushrocks/smartdns.svg)](https://www.npmjs.com/package/@pushrocks/smartdns)
[![Known Vulnerabilities](https://snyk.io/test/npm/@pushrocks/smartdns/badge.svg)](https://snyk.io/test/npm/@pushrocks/smartdns)
[![TypeScript](https://img.shields.io/badge/TypeScript->=%203.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![node](https://img.shields.io/badge/node->=%2010.x.x-blue.svg)](https://nodejs.org/dist/latest-v10.x/docs/api/)
[![JavaScript Style Guide](https://img.shields.io/badge/code%20style-prettier-ff69b4.svg)](https://prettier.io/)

## Usage

Use TypeScript for best in class instellisense.

```typescript
const mySmartDns = new smartdns.SmartDns(); // uses Google DNS Https API
const demoRecord = mySmartDns.getRecord('example.com', 'AAAA'); // returns promise
/*
demoRecord looks like this:
{
  name: 'example.com',
  type: 'A',
  dnsSecEnabled: true,
  value: '104.24.103.243'
}
*/
```

## Contribution

We are always happy for code contributions. If you are not the code contributing type that is ok. Still, maintaining Open Source repositories takes considerable time and thought. If you like the quality of what we do and our modules are useful to you we would appreciate a little monthly contribution: You can [contribute one time](https://lossless.link/contribute-onetime) or [contribute monthly](https://lossless.link/contribute). :)

For further information read the linked docs at the top of this readme.

> MIT licensed | **&copy;** [Lossless GmbH](https://lossless.gmbh)
| By using this npm module you agree to our [privacy policy](https://lossless.gmbH/privacy)

[![repo-footer](https://lossless.gitlab.io/publicrelations/repofooter.svg)](https://maintainedby.lossless.com)
