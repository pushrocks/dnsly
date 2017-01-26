"use strict";
require("typings-test");
const smartchai_1 = require("smartchai");
const dnsly = require("../dist/index");
let testDnsly;
describe('dnsly', function () {
    it('should create an instance of Dnsly', function () {
        testDnsly = new dnsly.Dnsly('google');
        smartchai_1.expect(testDnsly).to.be.instanceOf(dnsly.Dnsly);
    });
    it('should get an A DNS Record', function () {
        return smartchai_1.expect(testDnsly.getRecordA('dnsly_a.bleu.de')).to.eventually.deep.equal([{
                name: 'dnsly_a.bleu.de',
                value: '127.0.0.1',
                type: 'A'
            }]);
    });
    it('should get an AAAA Record', function () {
        return smartchai_1.expect(testDnsly.getRecordAAAA('dnsly_aaaa.bleu.de')).to.eventually.deep.equal([{
                name: 'dnsly_aaaa.bleu.de',
                value: '::1',
                type: 'AAAA'
            }]);
    });
    it('should get a txt record', function () {
        return smartchai_1.expect(testDnsly.getRecordTxt('dnsly_txt.bleu.de')).to.eventually.deep.equal([{
                chunked: ['sometext_txt'],
                name: 'dnsly_txt.bleu.de',
                value: 'sometext_txt',
                type: 'TXT'
            }]);
    });
    it('should, get a mx record for a domain', function (done) {
        testDnsly.getRecord('google.com', 'MX').then(res => {
            console.log(res);
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });
    });
    it('should check until DNS is available', function () {
        return smartchai_1.expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de', 'TXT', 'sometext_txt')).to.eventually.be.true;
    });
    it('should check until DNS is available an return false if it fails', function () {
        this.timeout(30000);
        return smartchai_1.expect(testDnsly.checkUntilAvailable('dnsly_txt.bleu.de', 'TXT', 'sometext_txt2')).to.eventually.be.false;
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQix5Q0FBa0M7QUFFbEMsdUNBQXNDO0FBRXRDLElBQUksU0FBc0IsQ0FBQTtBQUUxQixRQUFRLENBQUMsT0FBTyxFQUFFO0lBQ2QsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3JDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckMsa0JBQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUE7SUFDbkQsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsNEJBQTRCLEVBQUU7UUFDN0IsTUFBTSxDQUFDLGtCQUFNLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzdFLElBQUksRUFBRSxpQkFBaUI7Z0JBQ3ZCLEtBQUssRUFBRyxXQUFXO2dCQUNuQixJQUFJLEVBQUUsR0FBRzthQUNaLENBQUMsQ0FBQyxDQUFBO0lBQ1AsQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsMkJBQTJCLEVBQUU7UUFDNUIsTUFBTSxDQUFDLGtCQUFNLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQ25GLElBQUksRUFBRSxvQkFBb0I7Z0JBQzFCLEtBQUssRUFBRyxLQUFLO2dCQUNiLElBQUksRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDLENBQUE7SUFDUCxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyx5QkFBeUIsRUFBRTtRQUMxQixNQUFNLENBQUMsa0JBQU0sQ0FBQyxTQUFTLENBQUMsWUFBWSxDQUFDLG1CQUFtQixDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztnQkFDakYsT0FBTyxFQUFFLENBQUMsY0FBYyxDQUFDO2dCQUN6QixJQUFJLEVBQUUsbUJBQW1CO2dCQUN6QixLQUFLLEVBQUUsY0FBYztnQkFDckIsSUFBSSxFQUFFLEtBQUs7YUFDZCxDQUFDLENBQUMsQ0FBQTtJQUNQLENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLHNDQUFzQyxFQUFFLFVBQVUsSUFBSTtRQUNyRCxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUM1QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksRUFBRSxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMscUNBQXFDLEVBQUU7UUFDdEMsTUFBTSxDQUFDLGtCQUFNLENBQUMsU0FBUyxDQUFDLG1CQUFtQixDQUFDLG1CQUFtQixFQUFDLEtBQUssRUFBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQTtJQUNoSCxDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQyxpRUFBaUUsRUFBRTtRQUNsRSxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFBO1FBQ25CLE1BQU0sQ0FBQyxrQkFBTSxDQUFDLFNBQVMsQ0FBQyxtQkFBbUIsQ0FBQyxtQkFBbUIsRUFBQyxLQUFLLEVBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUE7SUFDbEgsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9