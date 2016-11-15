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
    dnsSocketInstance
    /**
     * constructor for class dnsly
     */
    constructor(dnsProviderArg: TDnsProvider) {
        this._setDnsProvider(dnsProviderArg)
        this.dnsSocketInstance = plugins.dnsSocket()
    }

    /**
     * gets a record
     */
    getRecord(recordNameArg: string, recordTypeArg: TDnsRecordType) {
        let done = q.defer()
        this.dnsSocketInstance.query(
            {
                questions: [{
                    type: recordTypeArg,
                    name: recordNameArg
                }]
            },
            this.dnsServerPort,
            this.dnsServerIp,
            (err, res) => {
                if (err) {
                    done.reject(err)
                }
                done.resolve(res)
            })
        return done.promise
    }

    /**
     * close the dnsly instance
     */
    close() {
        this.dnsSocketInstance.destroy()
    }

    /**
     * set the DNS provider
     */
    private _setDnsProvider(dnsProvider: TDnsProvider) {
        if (dnsProvider === 'google') {
            this.dnsServerIp = '8.8.8.8'
            this.dnsServerPort = 53
        } else {
            throw new Error('unknown dns provider')
        }
    }
}