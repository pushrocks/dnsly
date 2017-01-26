export declare type TDnsProvider = 'google';
export declare type TDnsRecordType = 'A' | 'AAAA' | 'CNAME' | 'PTR' | 'MX' | 'NAPTR' | 'NS' | 'SOA' | 'SRV' | 'TXT';
export interface IDnsRecord {
    chunked?: string[];
    name: string;
    type: TDnsRecordType;
    value: string;
}
/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
export declare class Dnsly {
    dnsServerIp: string;
    dnsServerPort: number;
    /**
     * constructor for class dnsly
     */
    constructor(dnsProviderArg?: TDnsProvider);
    /**
     * gets a record
     */
    getRecord(recordNameArg: string, recordTypeArg: TDnsRecordType): Promise<IDnsRecord[]>;
    checkUntilAvailable(recordNameArg: string, recordTypeArg: TDnsRecordType, expectedValue: string): Promise<any>;
    /**
     * get A Dns Record
     */
    getRecordA(recordNameArg: string): Promise<IDnsRecord[]>;
    /**
     * get AAAA Record
     */
    getRecordAAAA(recordNameArg: string): Promise<IDnsRecord[]>;
    /**
     * gets a txt record
     */
    getRecordTxt(recordNameArg: string): Promise<IDnsRecord[]>;
    /**
     * get oridinary record
     */
    private getOrdinaryRecord(recordNameArg, recordTypeArg);
    /**
     * set the DNS provider
     */
    private _setDnsProvider(dnsProvider);
}
