declare module 'simple-affiliate' {
  export default class SimpleAffiliate {
    /**
     * Library to interact with SimpleAffiliate (Shopify plugin) APIs.
     */
    constructor(authToken: string);

    /**
     * Generated an affiliate link.
     * 
     * @param {targetLink} target link for the affiliate link.
     */
    createAffiliateLink(targetLink?: string): Promise<object>;
  }
}
