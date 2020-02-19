import * as plugins from './dnsly.plugins';

export type TDnsProvider = 'google' | 'cloudflare';

export interface ISmartDnsConstructorOptions {}

export interface IGoogleDNSHTTPSResponse {
  Status: number;
  TC: boolean;
  RD: boolean;
  RA: boolean;
  AD: boolean;
  CD: boolean;
  Question: Array<{ name: string; type: number }>;
  Answer: Array<{ name: string; type: number; TTL: number; data: string }>;
  Additional: [];
  Comment: string;
}

/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
export class Smartdns {
  public dnsServerIp: string;
  public dnsServerPort: number;

  public dnsTypeMap: { [key: string]: number } = {
    A: 1,
    AAAA: 28,
    CNAME: 5,
    MX: 15,
    TXT: 16
  };

  /**
   * constructor for class dnsly
   */
  constructor(optionsArg: ISmartDnsConstructorOptions) {}

  /**
   * check a dns record until it has propagated to Google DNS
   * should be considerably fast
   * @param recordNameArg
   * @param recordTypeArg
   * @param expectedValue
   */
  public async checkUntilAvailable(
    recordNameArg: string,
    recordTypeArg: plugins.tsclass.network.TDnsRecordType,
    expectedValue: string,
    cyclesArg: number = 50,
    intervalArg: number = 500
  ) {
    let runCycles = 0;
    const doCheck = async () => {
      if (runCycles < cyclesArg) {
        runCycles++;
        try {
          const myRecordArray = await this.getRecordWithNodeDNS(recordNameArg, recordTypeArg);
          const myRecord = myRecordArray[0].value;
          if (myRecord === expectedValue) {
            console.log(`smartdns: .checkUntilAvailable() verified that wanted >>>${recordTypeArg}<<< record exists for >>>${recordNameArg}<<< with value >>>${expectedValue}<<<`);
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
        console.log(
          `smartdns: .checkUntilAvailable() failed permanently for ${recordNameArg} with value ${recordTypeArg} - ${expectedValue}...`
        );
        return false;
      }
    };
    return await doCheck();
  }

  /**
   * get A Dns Record
   */
  public async getRecordA(recordNameArg: string): Promise<plugins.tsclass.network.IDnsRecord[]> {
    return await this.getRecord(recordNameArg, 'A');
  }

  /**
   * get AAAA Record
   */
  public async getRecordAAAA(recordNameArg: string) {
    return await this.getRecord(recordNameArg, 'AAAA');
  }

  /**
   * gets a txt record
   */
  public async getRecordTxt(recordNameArg: string): Promise<plugins.tsclass.network.IDnsRecord[]> {
    return await this.getRecord(recordNameArg, 'TXT');
  }

  public async getRecord(
    recordNameArg: string,
    recordTypeArg: plugins.tsclass.network.TDnsRecordType
  ): Promise<plugins.tsclass.network.IDnsRecord[]> {
    const requestUrl = `https://dns.google/resolve?name=${recordNameArg}&type=${recordTypeArg}&do=1`;
    const response = await plugins.smartrequest.request(requestUrl, {
      method: 'GET'
    });
    const returnArray: plugins.tsclass.network.IDnsRecord[] = [];
    const responseBody: IGoogleDNSHTTPSResponse = response.body;
    for (const dnsEntry of responseBody.Answer) {
      if (dnsEntry.data.startsWith('"') && dnsEntry.data.endsWith('"')) {
        dnsEntry.data = dnsEntry.data.replace(/^"(.*)"$/, '$1');
      }
      if (dnsEntry.name.endsWith('.')) {
        dnsEntry.name = dnsEntry.name.substring(0, dnsEntry.name.length - 1);
      }
      returnArray.push({
        name: dnsEntry.name,
        type: this.convertDnsTypeNumberToTypeName(dnsEntry.type),
        dnsSecEnabled: responseBody.AD,
        value: dnsEntry.data
      });
    }
    // console.log(responseBody);
    return returnArray;
  }

  /**
   * gets a record using nodejs dns resolver
   */
  public async getRecordWithNodeDNS(
    recordNameArg: string,
    recordTypeArg: plugins.tsclass.network.TDnsRecordType
  ): Promise<plugins.tsclass.network.IDnsRecord[]> {
    this.setNodeDnsProvider('cloudflare');
    const done = plugins.smartpromise.defer<plugins.tsclass.network.IDnsRecord[]>();
    plugins.dns.resolve(recordNameArg, recordTypeArg, (err, recordsArg) => {
      if (err) {
        done.reject(err);
        return;
      }
      const returnArray: plugins.tsclass.network.IDnsRecord[] = [];
      for (const recordKey in recordsArg) {
        returnArray.push({
          name: recordNameArg,
          value: recordsArg[recordKey][0],
          type: recordTypeArg,
          dnsSecEnabled: false
        });
      }
      done.resolve(returnArray);
    });
    return done.promise;
  }

  public async getNameServer(domainNameArg: string): Promise<string[]> {
    const done = plugins.smartpromise.defer<string[]>();
    plugins.dns.resolveNs(domainNameArg, (err, result) => {
      if (!err) {
        done.resolve(result);
      } else {
        console.log(err);
        done.reject(err);
      }
    });
    return await done.promise;
  }

  /**
   * set the DNS provider
   */
  public setNodeDnsProvider(dnsProvider: TDnsProvider) {
    if (!this.dnsServerIp) {
      console.log(
        `Warning: Setting the nodejs dns authority to ${dnsProvider}. Only do this if you know what you are doing.`
      );
    }
    if (dnsProvider === 'google' && this.dnsServerIp !== '8.8.8.8') {
      this.dnsServerIp = '8.8.8.8';
      this.dnsServerPort = 53;
      plugins.dns.setServers(['8.8.8.8', '8.8.4.4']);
    } else if (dnsProvider === 'cloudflare' && this.dnsServerIp !== '1.1.1.1') {
      this.dnsServerIp = '1.1.1.1';
      this.dnsServerPort = 53;
      plugins.dns.setServers(['1.1.1.1', '1.0.0.1']);
    } else {
      throw new Error('unknown dns provider');
    }
  }

  public convertDnsTypeNameToTypeNumber(dnsTypeNameArg: string): number {
    return this.dnsTypeMap[dnsTypeNameArg];
  }

  public convertDnsTypeNumberToTypeName(
    dnsTypeNumberArg: number
  ): plugins.tsclass.network.TDnsRecordType {
    for (const key in this.dnsTypeMap) {
      if (this.dnsTypeMap[key] === dnsTypeNumberArg) {
        return key as plugins.tsclass.network.TDnsRecordType;
      }
    }
    return null;
  }
}
