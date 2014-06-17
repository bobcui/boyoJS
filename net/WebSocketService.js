var boyo.net.WebSocketService = boyo.net.Service.extend({

	_webSocket: null,

	this._wsiSendBinary = new WebSocket("ws://echo.websocket.org");

	ctor: function(url) {
		this._webSocket = new WebSocket(url);
		this._webSocket.onOpen = function(event) {
			cc.log('websocket[' +  +'']);
		};
		this._webSocket.onMessage = function(event) {

		};
		this._webSocket.onError = function(event) {

		}



	}

	send: function(msg) {
		throw new Error('method send not implement');
	},

	onPackage: function(package) {
		cc.log('boyo.net.Service::onPackage() package=' + package);
	},

	onError: function(error) {
		cc.log('boyo.net.Service::onError() error=' + error);
	},




bool WebSocket::init(const Delegate& delegate,
                     const std::string& url,
                     const std::vector<std::string>* protocols/* = nullptr*/)

	onConnect: function() {

	}





	onPackage: function() {
		return;
	}

	send: function(msg) {
		return;
	}

});