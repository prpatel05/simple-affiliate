# simple-affiliate
Library to interact with SimpleAffiliate (Shopify plugin) APIs

## Supported Functionality
* Creation of AffiliateLinks

# Installation
Via NPM:
```
npm install simple-affiliate
```

# Usage
```
const SimpleAffiliate = require('simple-affiliate');
const simpleAffiliate = new SimpleAffiliate("AUTH_TOKEN");
const jsonResult = await simpleAffiliate.createAffiliateLink();
```

## createAffiliateLink([targetLink])
Return the payload from the SimpleAffiliate web page.

NOTE: Will need to manually inspect `jsonResult.authData.linkRows` for the affiliate link.
E.g.
```
const affiliateLinks = json.authData.linkRows.filter(row => row.targetPath == targetLink);
```