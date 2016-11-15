import * as q from 'q'
import * as plugins from './dnsly.plugins'

export type TDnsProvider = 'google'
export type TDnsRecordType = 'A'
    | 'AAAA'
    | 'CNAME'
    | 'PTR'
    | 'MX'
    | 'NAPTR'
    | 'NS'
    | 'SOA'
    | 'SRV'
    | 'TXT'

/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
export class Dnsly {
    dnsServerIp: string
    dnsServerPort: number
    /**
     * constructor for class dnsly
     */
    constructor(dnsProviderArg: TDnsProvider) {
        this._setDnsProvider(dnsProviderArg)
    }

    /**
     * gets a record
     */
    getRecord(recordNameArg: string, recordTypeArg: TDnsRecordType) {
        let done = q.defer()
        plugins.dns.resolve(recordNameArg,recordTypeArg, (err, addresses) => {
            if (err) {
                done.reject(err)
            }
            done.resolve(addresses)
        })
        return done.promise
    }

    /**
     * set the DNS provider
     */
    private _setDnsProvider(dnsProvider: TDnsProvider) {
        if (dnsProvider === 'google') {
            this.dnsServerIp = '8.8.8.8'
            this.dnsServerPort = 53
            plugins.dns.setServers(['8.8.8.8','8.8.4.4'])
        } else {
            throw new Error('unknown dns provider')
        }
    }
}