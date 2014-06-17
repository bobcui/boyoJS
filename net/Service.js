var boyo.net.Service = cc.Class.extend({

	send: function(msg) {
		throw new Error('method send not implement');
	},

	onPackage: function(package) {
		cc.log('boyo.net.Service::onPackage() package=' + package);
	},

	onError: function(error) {
		cc.log('boyo.net.Service::onError() error=' + error);
	},

});