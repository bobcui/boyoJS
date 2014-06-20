boyo.encoder.JsonEncoder = cc.Class.extend({
	encode: function(object) {
		return JSON.stringify(object);
	},

	decode: function(data) {
		return JSON.parse(data);
	},
});