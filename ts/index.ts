import * as plugins from './dnsly.plugins';

export type TDnsProvider = 'google' | 'cloudflare';
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
  constructor(dnsProviderArg: TDnsProvider = 'cloudflare') {
    this._setDnsProvider(dnsProviderArg);
  }

  /**
   * check a dns record until it has propagated to Google DNS
   * should be considerably fast
   * @param recordNameArg
   * @param recordTypeArg
   * @param expectedValue
   */
  async checkUntilAvailable(
    recordNameArg: string,
    recordTypeArg: TDnsRecordType,
    expectedValue: string,
    cyclesArg: number = 50,
    intervalArg: number = 500
  ) {
    let runCycles = 0;
    let doCheck = async () => {
      if (runCycles < cyclesArg) {
        runCycles++;
        try {
          let myRecordArray = await this.getRecord(recordNameArg, recordTypeArg);
          let myRecord = myRecordArray[0].value[0];
          if (myRecord === expectedValue) {
            return true;
          } else {
            await plugins.smartdelay.delayFor(intervalArg);
            return await doCheck();
          }
        } catch (err) {
          await plugins.smartdelay.delayFor(intervalArg);
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
    let done = plugins.smartpromise.defer<IDnsRecord[]>();
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
    let done = plugins.smartpromise.defer<IDnsRecord[]>();
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
    const done = plugins.smartpromise.defer();
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
    } else if (dnsProvider === 'cloudflare') {
      this.dnsServerIp = '1.1.1.1';
      this.dnsServerPort = 53;
      plugins.dns.setServers(['1.1.1.1', '1.0.0.1']);
    } else {
      throw new Error('unknown dns provider');
    }
  }
}
