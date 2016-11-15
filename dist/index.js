"use strict";
const q = require("q");
const plugins = require("./dnsly.plugins");
/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
class Dnsly {
    /**
     * constructor for class dnsly
     */
    constructor(dnsProviderArg) {
        this._setDnsProvider(dnsProviderArg);
    }
    /**
     * gets a record
     */
    getRecord(recordNameArg, recordTypeArg) {
        let done = q.defer();
        plugins.dns.resolve(recordNameArg, recordTypeArg, (err, addresses) => {
            if (err) {
                done.reject(err);
            }
            done.resolve(addresses);
        });
        return done.promise;
    }
    /**
     * set the DNS provider
     */
    _setDnsProvider(dnsProvider) {
        if (dnsProvider === 'google') {
            this.dnsServerIp = '8.8.8.8';
            this.dnsServerPort = 53;
            plugins.dns.setServers(['8.8.8.8', '8.8.4.4']);
        }
        else {
            throw new Error('unknown dns provider');
        }
    }
}
exports.Dnsly = Dnsly;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXNCO0FBQ3RCLDJDQUEwQztBQWMxQzs7R0FFRztBQUNIO0lBR0k7O09BRUc7SUFDSCxZQUFZLGNBQTRCO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0gsU0FBUyxDQUFDLGFBQXFCLEVBQUUsYUFBNkI7UUFDMUQsSUFBSSxJQUFJLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFBO1FBQ3BCLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLGFBQWEsRUFBQyxhQUFhLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUztZQUM1RCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUE7UUFDM0IsQ0FBQyxDQUFDLENBQUE7UUFDRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSyxlQUFlLENBQUMsV0FBeUI7UUFDN0MsRUFBRSxDQUFDLENBQUMsV0FBVyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUM7WUFDM0IsSUFBSSxDQUFDLFdBQVcsR0FBRyxTQUFTLENBQUE7WUFDNUIsSUFBSSxDQUFDLGFBQWEsR0FBRyxFQUFFLENBQUE7WUFDdkIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQyxTQUFTLEVBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQTtRQUNqRCxDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXBDRCxzQkFvQ0MifQ==