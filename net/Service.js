boyo.net.Service = cc.Class.extend({

	send: function(message) {
		throw new Error('method send not implement');
	},

	onMessage: function(message) {
		boyo.log('boyo.net.Service::onMessage() message=%j', message);
	},

	onError: function(error) {
		boyo.log('boyo.net.Service::onError() error=%j', error);
	}

});