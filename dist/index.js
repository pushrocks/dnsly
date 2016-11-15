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
        this.dnsSocketInstance = plugins.dnsSocket();
    }
    /**
     * gets a record
     */
    getRecord(recordNameArg, recordTypeArg) {
        let done = q.defer();
        this.dnsSocketInstance.query({
            questions: [{
                    type: recordTypeArg,
                    name: recordNameArg
                }]
        }, this.dnsServerPort, this.dnsServerIp, (err, res) => {
            if (err) {
                done.reject(err);
            }
            done.resolve(res);
        });
        return done.promise;
    }
    /**
     * close the dnsly instance
     */
    close() {
        this.dnsSocketInstance.destroy();
    }
    /**
     * set the DNS provider
     */
    _setDnsProvider(dnsProvider) {
        if (dnsProvider === 'google') {
            this.dnsServerIp = '8.8.8.8';
            this.dnsServerPort = 53;
        }
        else {
            throw new Error('unknown dns provider');
        }
    }
}
exports.Dnsly = Dnsly;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsdUJBQXNCO0FBQ3RCLDJDQUEwQztBQWMxQzs7R0FFRztBQUNIO0lBSUk7O09BRUc7SUFDSCxZQUFZLGNBQTRCO1FBQ3BDLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUE7UUFDcEMsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQTtJQUNoRCxDQUFDO0lBRUQ7O09BRUc7SUFDSCxTQUFTLENBQUMsYUFBcUIsRUFBRSxhQUE2QjtRQUMxRCxJQUFJLElBQUksR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUE7UUFDcEIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FDeEI7WUFDSSxTQUFTLEVBQUUsQ0FBQztvQkFDUixJQUFJLEVBQUUsYUFBYTtvQkFDbkIsSUFBSSxFQUFFLGFBQWE7aUJBQ3RCLENBQUM7U0FDTCxFQUNELElBQUksQ0FBQyxhQUFhLEVBQ2xCLElBQUksQ0FBQyxXQUFXLEVBQ2hCLENBQUMsR0FBRyxFQUFFLEdBQUc7WUFDTCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNOLElBQUksQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUE7WUFDcEIsQ0FBQztZQUNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUE7UUFDckIsQ0FBQyxDQUFDLENBQUE7UUFDTixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQTtJQUN2QixDQUFDO0lBRUQ7O09BRUc7SUFDSCxLQUFLO1FBQ0QsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sRUFBRSxDQUFBO0lBQ3BDLENBQUM7SUFFRDs7T0FFRztJQUNLLGVBQWUsQ0FBQyxXQUF5QjtRQUM3QyxFQUFFLENBQUMsQ0FBQyxXQUFXLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQztZQUMzQixJQUFJLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQTtZQUM1QixJQUFJLENBQUMsYUFBYSxHQUFHLEVBQUUsQ0FBQTtRQUMzQixDQUFDO1FBQUMsSUFBSSxDQUFDLENBQUM7WUFDSixNQUFNLElBQUksS0FBSyxDQUFDLHNCQUFzQixDQUFDLENBQUE7UUFDM0MsQ0FBQztJQUNMLENBQUM7Q0FDSjtBQXJERCxzQkFxREMifQ==