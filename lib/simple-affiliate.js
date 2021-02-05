const fetch = require('node-fetch');

function SimpleAffiliate(token) {
	this._token = token;
}

/**
 * Generated an affiliate link.
 *
 * @param {targetLink} target link for the affiliate link.
 */
SimpleAffiliate.prototype.createAffiliateLink = async function createAffiliateLink(targetLink="") {
    const response = await fetch('https://app.simple-affiliate.com/rpc', {
        method: 'POST',
        body: JSON.stringify({
            endpoint: "affiliate",
            token: this._token,
            params: {
                kind: "generate-link",
                targetLink: targetLink,
            },
        }),
        headers: { 'Content-Type': 'application/json' }
    });
    const responseClone = response.clone();
    try {
        return await response.json();
    } catch (e) {
        console.error("Cannot Process JSON - ", await responseClone.text());
        throw e;
    }
}

module.exports = SimpleAffiliate;
