import 'typings-test'
import { expect } from 'smartchai'

import * as dnsly from '../dist/index'

let testDnsly: dnsly.Dnsly

describe('dnsly', function () {
    it('should create an instance of Dnsly', function () {
        testDnsly = new dnsly.Dnsly('google')
        expect(testDnsly).to.be.instanceOf(dnsly.Dnsly)
    })

    it('should get an A DNS Record', function () {
        return expect(testDnsly.getRecordA('dnsly_a.bleu.de')).to.eventually.deep.equal([{
            name: 'dnsly_a.bleu.de',
            value:  '127.0.0.1',
            type: 'A'
        }])
    })

    it('should get an AAAA Record', function () {
        return expect(testDnsly.getRecordAAAA('dnsly_aaaa.bleu.de')).to.eventually.deep.equal([{
            name: 'dnsly_aaaa.bleu.de',
            value:  '::1',
            type: 'AAAA'
        }])
    })

    it('should get a txt record', function() {
        return expect(testDnsly.getRecordTxt('dnsly_txt.bleu.de')).to.eventually.deep.equal([{
            chunked: ['sometext_txt'],
            name: 'dnsly_txt.bleu.de',
            value: 'sometext_txt',
            type: 'TXT'
        }])
    })

    it('should, get a mx record for a domain', function (done) {
        testDnsly.getRecord('google.com', 'MX').then(res => {
            console.log(res)
            done()
        }).catch(err => {
            console.log(err)
            done(err)
        })

    })

    it('should check until DNS is available', function() {
        return expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de','TXT','sometext_txt')).to.eventually.be.true
    })

    it('should check until DNS is available an return false if it fails', function() {
        this.timeout(30000)
        return expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de','TXT','sometext_txt2')).to.eventually.be.false
    })

    it('should check until DNS is available an return false if it fails', function() {
        this.timeout(30000)
        return expect(
            testDnsly.checkUntilAvailable('dnsly_txtNotThere.bleu.de','TXT','sometext_txt2')
        ).to.eventually.be.false
    })
})
