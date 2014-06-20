boyo.net.Service = cc.Class.extend({

	send: function(msg) {
		throw new Error('method send not implement');
	},

	onPackage: function(package) {
		boyo.log('boyo.net.Service::onPackage() package=' + package.toString());
	},

	onError: function(error) {
		boyo.log('boyo.net.Service::onError() error=' + error.toString());
	}

});