const chai = require('chai')
const expect = chai.expect;
const assert = chai.assert;
const proxyquire = require('proxyquire');
const stderr = require("test-console").stderr;
chai.use(require('chai-as-promised'));

const loadMocks = () => {
    const SimpleAffiliate = proxyquire('../lib/simple-affiliate', {
        'node-fetch': () => {
            return new Promise((resolve) => {
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

const loadBadMocks = () => {
    const SimpleAffiliate = proxyquire('../lib/simple-affiliate', {
        'node-fetch': () => {
            return new Promise((resolve) => {
                resolve({
                    json: () => {
                        throw Error();
                    },
                    text: () => {
                        return "text";
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
    it('should call affiliate API when fails', async function () {
        const { SimpleAffiliate } = loadBadMocks();
        const simpleAffiliate = new SimpleAffiliate("test_token");
        let inspect = stderr.inspect();
        await expect(simpleAffiliate.createAffiliateLink()).to.be.rejectedWith(Error);
        inspect.restore();
        chai.assert.deepEqual(inspect.output, ["Cannot Process JSON -  text\n"]);
    });
});
