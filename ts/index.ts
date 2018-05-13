import * as smartq from 'smartq';
import * as plugins from './dnsly.plugins';

export type TDnsProvider = 'google';
export type TDnsRecordType =
  | 'A'
  | 'AAAA'
  | 'CNAME'
  | 'PTR'
  | 'MX'
  | 'NAPTR'
  | 'NS'
  | 'SOA'
  | 'SRV'
  | 'TXT';

export interface IDnsRecord {
  chunked?: string[];
  name: string;
  type: TDnsRecordType;
  value: string;
}

/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
export class Smartdns {
  dnsServerIp: string;
  dnsServerPort: number;
  /**
   * constructor for class dnsly
   */
  constructor(dnsProviderArg: TDnsProvider = 'google') {
    this._setDnsProvider(dnsProviderArg);
  }

  async checkUntilAvailable(
    recordNameArg: string,
    recordTypeArg: TDnsRecordType,
    expectedValue: string
  ) {
    let cycleArg = 0;
    let doCheck = async () => {
      if (cycleArg < 30) {
        cycleArg++;
        try {
          let myRecordArray = await this.getRecord(recordNameArg, recordTypeArg);
          let myRecord = myRecordArray[0].value;
          if (myRecord === expectedValue) {
            return true;
          } else {
            await plugins.smartdelay.delayFor(500);
            return await doCheck();
          }
        } catch (err) {
          await plugins.smartdelay.delayFor(500);
          return await doCheck();
        }
      } else {
        console.log('failed permanently...');
        return false;
      }
    };
    return await doCheck();
  }

  /**
   * get A Dns Record
   */
  async getRecordA(recordNameArg: string): Promise<IDnsRecord[]> {
    return await this.getRecord(recordNameArg, 'A');
  }

  /**
   * get AAAA Record
   */
  async getRecordAAAA(recordNameArg: string) {
    return await this.getRecord(recordNameArg, 'AAAA');
  }

  /**
   * gets a txt record
   */
  getRecordTxt(recordNameArg: string): Promise<IDnsRecord[]> {
    let done = smartq.defer<IDnsRecord[]>();
    plugins.dns.resolveTxt(recordNameArg, (err, recordsArg) => {
      if (err) {
        done.reject(err);
        return;
      }
      let responseArray: IDnsRecord[] = [];
      for (let record of recordsArg) {
        let recordAny: any = record; // fix wrong typings
        responseArray.push({
          chunked: recordAny,
          name: recordNameArg,
          value: recordAny.join(' '),
          type: 'TXT'
        });
      }
      done.resolve(responseArray);
    });
    return done.promise;
  }

  /**
   * get oridinary record
   */
  getRecord(recordNameArg: string, recordTypeArg: TDnsRecordType): Promise<IDnsRecord[]> {
    let done = smartq.defer<IDnsRecord[]>();
    plugins.dns.resolve(recordNameArg, recordTypeArg, (err, recordsArg) => {
      if (err) {
        done.reject(err);
        return;
      }
      let responseArray: IDnsRecord[] = [];
      for (let recordKey in recordsArg) {
        responseArray.push({
          name: recordNameArg,
          value: recordsArg[recordKey],
          type: recordTypeArg
        });
      }
      done.resolve(responseArray);
    });
    return done.promise;
  }

  getNameServer(domainNameArg: string) {
    const done = smartq.defer();
    plugins.dns.resolveNs(domainNameArg, (err, result) => {
      if (!err) {
        done.resolve(result);
      } else {
        console.log(err);
        done.reject(err);
      }
    });
  }

  /**
   * set the DNS provider
   */
  private _setDnsProvider(dnsProvider: TDnsProvider) {
    if (dnsProvider === 'google') {
      this.dnsServerIp = '8.8.8.8';
      this.dnsServerPort = 53;
      plugins.dns.setServers(['8.8.8.8', '8.8.4.4']);
    } else {
      throw new Error('unknown dns provider');
    }
  }
}
