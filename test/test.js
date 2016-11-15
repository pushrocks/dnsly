"use strict";
require("typings-test");
const should = require("should");
const dnsly = require("../dist/index");
let testDnsly;
describe('dnsly', function () {
    it('should create an instance of Dnsly', function () {
        testDnsly = new dnsly.Dnsly('google');
        should(testDnsly).be.instanceOf(dnsly.Dnsly);
    });
    it('should, get a dns record for a domain when called quickly', function (done) {
        testDnsly.getRecord('google.com', 'A').then(res => {
            console.log(res);
            done();
        }).catch(err => {
            console.log(err);
            done(err);
        });
    });
    it('should, get a dns record for a domain when called with timeout', function (done) {
        setTimeout(() => {
            testDnsly.getRecord('google.com', 'A').then(res => {
                console.log(res);
                done();
            }).catch(err => {
                console.log(err);
                done(err);
            });
        }, 1000);
    });
    it('should get a dns record for a domain when called with second instance and timeout', function (done) {
        this.timeout(10000);
        let testDnsly2 = new dnsly.Dnsly('google');
        setTimeout(() => {
            testDnsly2.getRecord('google.com', 'MX').then(res => {
                console.log(res);
                done();
                testDnsly2.close();
            }).catch(err => {
                console.log(err);
                done(err);
            });
        }, 5000);
    });
    it('should close the instance', function () {
        testDnsly.close();
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLHdCQUFxQjtBQUNyQixpQ0FBZ0M7QUFFaEMsdUNBQXNDO0FBRXRDLElBQUksU0FBc0IsQ0FBQTtBQUUxQixRQUFRLENBQUMsT0FBTyxFQUFFO0lBQ2QsRUFBRSxDQUFDLG9DQUFvQyxFQUFFO1FBQ3JDLFNBQVMsR0FBRyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUE7UUFDckMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFBO0lBQ2hELENBQUMsQ0FBQyxDQUFBO0lBRUYsRUFBRSxDQUFDLDJEQUEyRCxFQUFFLFVBQVUsSUFBSTtRQUMxRSxTQUFTLENBQUMsU0FBUyxDQUFDLFlBQVksRUFBRSxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRztZQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksRUFBRSxDQUFBO1FBQ1YsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7WUFDUixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtRQUNiLENBQUMsQ0FBQyxDQUFBO0lBRU4sQ0FBQyxDQUFDLENBQUE7SUFFRixFQUFFLENBQUMsZ0VBQWdFLEVBQUUsVUFBVSxJQUFJO1FBQy9FLFVBQVUsQ0FBQztZQUNQLFNBQVMsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUMzQyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixJQUFJLEVBQUUsQ0FBQTtZQUNWLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHO2dCQUNSLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUE7Z0JBQ2hCLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQTtZQUNiLENBQUMsQ0FBQyxDQUFBO1FBQ04sQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFBO0lBRVosQ0FBQyxDQUFDLENBQUE7SUFDRixFQUFFLENBQUMsbUZBQW1GLEVBQUUsVUFBVSxJQUFJO1FBQ2xHLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUE7UUFDbkIsSUFBSSxVQUFVLEdBQUcsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFBO1FBQzFDLFVBQVUsQ0FBQztZQUNQLFVBQVUsQ0FBQyxTQUFTLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHO2dCQUM3QyxPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFBO2dCQUNoQixJQUFJLEVBQUUsQ0FBQTtnQkFDTixVQUFVLENBQUMsS0FBSyxFQUFFLENBQUE7WUFDdEIsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUc7Z0JBQ1IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQTtnQkFDaEIsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFBO1lBQ2IsQ0FBQyxDQUFDLENBQUE7UUFDTixDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUE7SUFFWixDQUFDLENBQUMsQ0FBQTtJQUVGLEVBQUUsQ0FBQywyQkFBMkIsRUFBRTtRQUM1QixTQUFTLENBQUMsS0FBSyxFQUFFLENBQUE7SUFDckIsQ0FBQyxDQUFDLENBQUE7QUFDTixDQUFDLENBQUMsQ0FBQSJ9