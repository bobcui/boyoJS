boyo.net.WebSocketService = boyo.net.Service.extend({

	_url: null,
	_protocol: null,
	_connectionTimeout: -1,
	_connectOnRequest: false,
	_messages: [],
	_webSocket: null,
	_timeoutId: null,
	_closed: false,

	ctor: function(url, protocol, config) {
		this._url = url;
		this._protocol = protocol;
		config = config || {};		
		this._connectionTimeout = config.connectionTimeout || this._connectionTimeout;
		this._connectOnRequest = config.connectOnRequest || this._connectOnRequest;

		if (!this._connectOnRequest) {
			this._initWebSocket();
		}
	},

	close: function() {
		this._messages = [];
		this._close();	
		this._closed = true;
	},

	send: function(message) {
		if (this._closed) {
			throw new Error('boyo.net.WebSocketService::send() WebSocketService already closed');
		}

		if (!this._webSocket) {
			this._initWebSocket();
		}

		if (this._webSocket.readyState == WebSocket.OPEN) {
			this._send(message);
		}
		else {
			this._messages.push(message);
		}
	},

	onMessage: function(message) {},
	onError: function(event) {},

	onConnect: function(event) {},
	onDisconnect: function(event) {},

	_initWebSocket: function() {
		boyo.log('boyo.net.WebSocketService::_initWebSocket() url=[%s]', this._url);

		this._webSocket = new WebSocket(this._url, this._protocol);
		var self = this;

		this._webSocket.onopen = function(event) {
			boyo.log('boyo.net.WebSocketService::onConnect() url=[%s]', self._url);
			if (self._webSocket.readyState == WebSocket.OPEN) {
				self._flush();
			}
			self.onConnect(event);
		};

		this._webSocket.onmessage = function(event) {
			boyo.log('boyo.net.WebSocketService::onMessage() message=%j', message);			
			self._updateTimeout();
			self.onMessage(event.data);
		};

		this._webSocket.onerror = function(event) {
			boyo.log('boyo.net.WebSocketService::onError() event=%j', event);
			self.onError(event);
			self._close();
		};

		this._webSocket.onclose = function(event) {
			boyo.log('boyo.net.WebSocketService::onDisconnect() url=[%s]', self._url);
			self.onDisconnect(event);
			self._close();
			if (!self._closed && !self._connectOnRequest) {
				self._initWebSocket();
			}
		};
	},

	_close: function() {
		if (this._webSocket) {
			this._webSocket.close();
			this._webSocket = null;
		}
		if (this._timeoutId) {
			clearTimeout(this._timeoutId);
			this._timeoutId = null;
		}
	},	

	_send: function(message) {
		boyo.log('boyo.net.WebSocketService::_send() send message=%j', message);		
		this._webSocket.send(message);
		this._updateTimeout();
	},

	_flush: function() {
		for (var i=0; i<this._messages.length; ++i) {
			this._webSocket.send(this._messages[i]);
		}
		this._messages = [];
		this._updateTimeout();
	},

	_updateTimeout: function() {
		if (this._connectionTimeout > 0) {
			if (this._timeoutId) {
				clearTimeout(this._timeoutId);
			}

			var self = this;
			this._timeoutId = setTimeout(function() {
				boyo.log('boyo.net.WebSocketService::_updateTimeout() connection timeout');
				self._webSocket.close();
			}, this._connectionTimeout);
		}
	}
});