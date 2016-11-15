/// <reference types="q" />
import * as q from 'q';
export declare type TDnsProvider = 'google';
export declare type TDnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'PTR' | 'MX' | 'NAPTR' | 'NS' | 'SOA' | 'SRV' | 'TXT';
/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
export declare class Dnsly {
    dnsServerIp: string;
    dnsServerPort: number;
    /**
     * constructor for class dnsly
     */
    constructor(dnsProviderArg: TDnsProvider);
    /**
     * gets a record
     */
    getRecord(recordNameArg: string, recordTypeArg: TDnsRecordType): q.Promise<{}>;
    /**
     * set the DNS provider
     */
    private _setDnsProvider(dnsProvider);
}
