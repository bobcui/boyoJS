boyo.net.WebSocketService = boyo.net.Service.extend({

	_url: null,
	_keepAlive: 0,
	_lazyConnect: true,
	_webSocket: null,

	this._wsiSendBinary = new WebSocket("ws://echo.websocket.org");

	ctor: function(url, config) {
		this._url = url;


		this._webSocket = new WebSocket(url);
		this._webSocket.onOpen = function(event) {
			cc.log('websocket[' +  +'']);
		};
		this._webSocket.onMessage = function(event) {

		};
		this._webSocket.onError = function(event) {

		}
	},

	_initWebSocket: function() {
		this._webSocket = new WebSocket(this._url);

	},

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