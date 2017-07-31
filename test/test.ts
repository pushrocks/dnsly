import { expect, tap } from 'tapbundle'

import * as dnsly from '../ts/index'

let testDnsly: dnsly.Dnsly

tap.test('should create an instance of Dnsly', async () => {
  testDnsly = new dnsly.Dnsly('google')
  expect(testDnsly).to.be.instanceOf(dnsly.Dnsly)
})

tap.test('should get an A DNS Record', async () => {
  return expect(testDnsly.getRecordA('dnsly_a.bleu.de')).to.eventually.deep.equal([{
    name: 'dnsly_a.bleu.de',
    value: '127.0.0.1',
    type: 'A'
  }])
})

tap.test('should get an AAAA Record', async () => {
  return expect(testDnsly.getRecordAAAA('dnsly_aaaa.bleu.de')).to.eventually.deep.equal([{
    name: 'dnsly_aaaa.bleu.de',
    value: '::1',
    type: 'AAAA'
  }])
})

tap.test('should get a txt record', async () => {
  return expect(testDnsly.getRecordTxt('dnsly_txt.bleu.de')).to.eventually.deep.equal([{
    chunked: ['sometext_txt'],
    name: 'dnsly_txt.bleu.de',
    value: 'sometext_txt',
    type: 'TXT'
  }])
})

tap.test('should, get a mx record for a domain', async () => {
  let res = await testDnsly.getRecord('google.com', 'MX')
  console.log(res)
})

tap.test('should check until DNS is available', async () => {
  return expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de', 'TXT', 'sometext_txt')).to.eventually.be.true
})

tap.test('should check until DNS is available an return false if it fails', async () => {
  return expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de', 'TXT', 'sometext_txt2')).to.eventually.be.false
})

tap.test('should check until DNS is available an return false if it fails', async () => {
  return expect(
    testDnsly.checkUntilAvailable('dnsly_txtNotThere.bleu.de', 'TXT', 'sometext_txt2')
  ).to.eventually.be.false
})

tap.start()
