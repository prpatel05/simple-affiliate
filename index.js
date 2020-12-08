const SimpleAffiliate = require('./lib/simple-affiliate');

module.exports = function(token) {
	return new SimpleAffiliate(token);
};