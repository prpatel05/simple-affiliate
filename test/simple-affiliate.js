const expect = require('chai').expect;
const proxyquire = require('proxyquire');

const loadMocks = () => {
    const SimpleAffiliate = proxyquire('../lib/simple-affiliate', {
            'node-fetch': () => {
                return new Promise((resolve, reject) => {
                    resolve({
                        json: () => {
                            return {test: "test"};
                        }
                    });
                });
            }
        }
    );
    return {
        SimpleAffiliate
    }
  }

describe('SimpleAffiliate', function () {
    it('should call affiliate API', async function () {
        const { SimpleAffiliate } = loadMocks();
        const simpleAffiliate = new SimpleAffiliate("test_token");
        const result = await simpleAffiliate.createAffiliateLink();
        expect(result.test).to.equal("test");
    });
});