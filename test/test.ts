import { expect, tap } from '@pushrocks/tapbundle';

import * as smartdns from '../ts/index';

let testDnsly: smartdns.Smartdns;

tap.test('should create an instance of Dnsly', async () => {
  testDnsly = new smartdns.Smartdns({});
  expect(testDnsly).to.be.instanceOf(smartdns.Smartdns);
});

tap.test('should get an A DNS Record', async () => {
  return expect(testDnsly.getRecordA('dnsly_a.bleu.de')).to.eventually.deep.equal([
    {
      name: 'dnsly_a.bleu.de',
      value: '127.0.0.1',
      dnsSecEnabled: false,
      type: 'A'
    }
  ]);
});

tap.test('should get an AAAA Record', async () => {
  return expect(testDnsly.getRecordAAAA('dnsly_aaaa.bleu.de')).to.eventually.deep.equal([
    {
      name: 'dnsly_aaaa.bleu.de',
      value: '::1',
      dnsSecEnabled: false,
      type: 'AAAA'
    }
  ]);
});

tap.test('should get a txt record', async () => {
  return expect(testDnsly.getRecordTxt('dnsly_txt.bleu.de')).to.eventually.deep.equal([
    {
      name: 'dnsly_txt.bleu.de',
      value: 'sometext_txt',
      type: 'TXT',
      dnsSecEnabled: false
    }
  ]);
});

tap.test('should, get a mx record for a domain', async () => {
  const res = await testDnsly.getRecord('bleu.de', 'MX');
  console.log(res);
});

tap.test('should check until DNS is available', async () => {
  return expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de', 'TXT', 'sometext_txt')).to
    .eventually.be.true;
});

tap.test('should check until DNS is available an return false if it fails', async () => {
  return expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de', 'TXT', 'sometext_txt2')).to
    .eventually.be.false;
});

tap.test('should check until DNS is available an return false if it fails', async () => {
  return expect(testDnsly.checkUntilAvailable('dnsly_txtNotThere.bleu.de', 'TXT', 'sometext_txt2'))
    .to.eventually.be.false;
});

tap.test('should get name server for hostname', async () => {
  let result = await testDnsly.getNameServer('bleu.de');
  console.log(result);
});

tap.test('should detect dns sec', async () => {
  const result = await testDnsly.getRecordA('lossless.com');
  console.log(result[0]);
  expect(result[0].dnsSecEnabled).to.be.true;
})

tap.start();
