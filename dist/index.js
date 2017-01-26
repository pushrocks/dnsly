"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
            for (let record of recordsArg) {
                responseArray.push({
                    name: recordNameArg,
                    value: record,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi90cy9pbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSw0QkFBMkI7QUFDM0IsMkNBQTBDO0FBcUIxQzs7R0FFRztBQUNIO0lBR0k7O09BRUc7SUFDSCxZQUFZLGlCQUErQixRQUFRO1FBQy9DLElBQUksQ0FBQyxlQUFlLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDeEMsQ0FBQztJQUVEOztPQUVHO0lBQ0csU0FBUyxDQUFDLGFBQXFCLEVBQUUsYUFBNkI7O1lBQ2hFLE1BQU0sQ0FBQyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUM7Z0JBQ3BCLEtBQUssS0FBSztvQkFDTixNQUFNLENBQUMsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxDQUFBO2dCQUNqRCxLQUFLLEdBQUc7b0JBQ0osTUFBTSxDQUFDLE1BQU0sSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLENBQUMsQ0FBQTtnQkFDL0MsS0FBSyxNQUFNO29CQUNQLE1BQU0sQ0FBQyxNQUFNLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLENBQUE7WUFDdEQsQ0FBQztRQUNMLENBQUM7S0FBQTtJQUVLLG1CQUFtQixDQUFDLGFBQXFCLEVBQUUsYUFBNkIsRUFBRSxhQUFxQjs7WUFDakcsSUFBSSxRQUFRLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksT0FBTyxHQUFHO2dCQUNWLEVBQUUsQ0FBQyxDQUFDLFFBQVEsR0FBRyxFQUFFLENBQUMsQ0FBQyxDQUFDO29CQUNoQixRQUFRLEVBQUUsQ0FBQTtvQkFDVixJQUFJLENBQUM7d0JBQ0QsSUFBSSxhQUFhLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsRUFBRSxhQUFhLENBQUMsQ0FBQTt3QkFDdEUsSUFBSSxRQUFRLEdBQUcsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQTt3QkFDckMsRUFBRSxDQUFDLENB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