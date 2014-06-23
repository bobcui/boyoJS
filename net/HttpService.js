boyo.net.HttpService = boyo.net.Service.extend({

	ctor: function() {

	},

	send: function(package) {
		throw new Error('method send not implement');
	},

	onPackage: function(package) {
		boyo.log('boyo.net.Service::onPackage() package=' + package.toString());
	},

	onError: function(error) {
		boyo.log('boyo.net.Service::onError() error=' + error.toString());
	}	

});