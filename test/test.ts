import 'typings-test'
import * as should from 'should'

import * as dnsly from '../dist/index'

let testDnsly: dnsly.Dnsly

describe('dnsly', function () {
    it('should create an instance of Dnsly', function () {
        testDnsly = new dnsly.Dnsly('google')
        should(testDnsly).be.instanceOf(dnsly.Dnsly)
    })

    it('should, get a dns record for a domain', function (done) {
        testDnsly.getRecord('google.com', 'A').then(res => {
            console.log(res)
            done()
        }).catch(err => {
            console.log(err)
            done(err)
        })

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
})
