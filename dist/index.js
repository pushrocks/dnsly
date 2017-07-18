"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const q = require("smartq");
const plugins = require("./dnsly.plugins");
/**
 * class dnsly offers methods for working with dns from a dns provider like Google DNS
 */
class Dnsly {
    /**
     * constructor for class dnsly
     */
    constructor(dnsProviderArg = 'google') {
        this._setDnsProvider(dnsProviderArg);
    }
    /**
     * gets a record
     */
    getRecord(recordNameArg, recordTypeArg) {
        return __awaiter(this, void 0, void 0, function* () {
            switch (recordTypeArg) {
                case 'TXT':
                    return yield this.getRecordTxt(recordNameArg);
                case 'A':
                    return yield this.getRecordA(recordNameArg);
                case 'AAAA':
                    return yield this.getRecordAAAA(recordNameArg);
            }
        });
    }
    checkUntilAvailable(recordNameArg, recordTypeArg, expectedValue) {
        return __awaiter(this, void 0, void 0, function* () {
            let cycleArg = 0;
            let doCheck = () => __awaiter(this, void 0, void 0, function* () {
                if (cycleArg < 30) {
                    cycleArg++;
                    try {
                        let myRecordArray = yield this.getRecord(recordNameArg, recordTypeArg);
                        let myRecord = myRecordArray[0].value;
                        if (myRecord === expectedValue) {
                            return true;
                        }
                        else {
                            yield plugins.smartdelay.delayFor(500);
                            return yield doCheck();
                        }
                    }
                    catch (err) {
                        yield plugins.smartdelay.delayFor(500);
                        return yield doCheck();
                    }
                }
                else {
                    console.log('failed permanently...');
                    return false;
                }
            });
            return yield doCheck();
        });
    }
    /**
     * get A Dns Record
     */
    getRecordA(recordNameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getOrdinaryRecord(recordNameArg, 'A');
        });
    }
    /**
     * get AAAA Record
     */
    getRecordAAAA(recordNameArg) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.getOrdinaryRecord(recordNameArg, 'AAAA');
        });
    }
    /**
     * gets a txt record
     */
    getRecordTxt(recordNameArg) {
        let done = q.defer();
        plugins.dns.resolveTxt(recordNameArg, (err, recordsArg) => {
            if (err) {
                done.reject(err);
                return;
            }
            let responseArray = [];
            for (let record of recordsArg) {
                let recordAny = record; // fix wrong typings
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
    getOrdinaryRecord(recordNameArg, recordTypeArg) {
        let done = q.defer();
        plugins.dns.resolve(recordNameArg, recordTypeArg, (err, recordsArg) => {
            if (err) {
                done.reject(err);
                return;
            }
            let responseArray = [];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQUEsNEJBQTJCO0FBQzNCLDJDQUEwQztBQXFCMUM7O0dBRUc7QUFDSDtJQUdFOztPQUVHO0lBQ0gsWUFBWSxpQkFBK0IsUUFBUTtRQUNqRCxJQUFJLENBQUMsZUFBZSxDQUFDLGNBQWMsQ0FBQyxDQUFBO0lBQ3RDLENBQUM7SUFFRDs7T0FFRztJQUNHLFNBQVMsQ0FBRSxhQUFxQixFQUFFLGFBQTZCOztZQUNuRSxNQUFNLENBQUMsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2dCQUN0QixLQUFLLEtBQUs7b0JBQ1IsTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDL0MsS0FBSyxHQUFHO29CQUNOLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxDQUFDLENBQUE7Z0JBQzdDLEtBQUssTUFBTTtvQkFDVCxNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFBO1lBQ2xELENBQUM7UUFDSCxDQUFDO0tBQUE7SUFFSyxtQkFBbUIsQ0FBRSxhQUFxQixFQUFFLGFBQTZCLEVBQUUsYUFBcUI7O1lBQ3BHLElBQUksUUFBUSxHQUFHLENBQUMsQ0FBQTtZQUNoQixJQUFJLE9BQU8sR0FBRztnQkFDWixFQUFFLENBQUMsQ0FBQyxRQUFRLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztvQkFDbEIsUUFBUSxFQUFFLENBQUE7b0JBQ1YsSUFBSSxDQUFDO3dCQUNILElBQUksYUFBYSxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLEVBQUUsYUFBYSxDQUFDLENBQUE7d0JBQ3RFLElBQUksUUFBUSxHQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUE7d0JBQ3JDLEVBQUUsQ0FBQyxD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