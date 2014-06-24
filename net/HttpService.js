boyo.net.HttpService = boyo.net.Service.extend({
	_xhrOpenParamConstructor: null,
	_reponseTimeout: -1,
	_messages: [],
	_timeoutId: null,
	_xhr: null,
	_xhrAbort: false,
	_closed: false,			

	ctor: function(xhrOpenParamConstructor, reponseTimeout) {
		this._xhrOpenParamConstructor = xhrOpenParamConstructor || this._xhrOpenParamConstructor;
		this._reponseTimeout = reponseTimeout || this._reponseTimeout;

		if (!this._xhrOpenParamConstructor) {
			throw new Error('boyo.net.HttpService::ctor() xhrOpenParamConstructor cannot be null');
		}		
	},

	close: function() {
		this._clearTimeout();
		this._closeXhr();
		this._messages = [];
		this._closed = true;
	},

	send: function(message) {
		if (this._closed) {
			throw new Error('boyo.net.HttpService::send() HttpService already closed');
		}

		if (this._xhr !== null) {
			this._messages.push(message);
			boyo.log("boyo.net.HttpService::send() waiting for response and sent delay, this._messages.length=%d message=%j", this._messages.length, message);
		}
		else {
			this._send(message);
		}
	},

	onMessage: function(message) {},
	onError: function(event) {},

	_send: function(message) {
		var self = this;
		var xhr = this._xhr = new XMLHttpRequest();
		this._xhrAbort = false;
		var openParams = this._xhrOpenParamConstructor(message);
		xhr.open.apply(xhr, openParams);

		xhr.onreadystatechange = function () {
			boyo.log("state=%d code=%d", xhr.readyState, xhr.status);
            if (xhr.readyState == 4 && !self._xhrAbort) {
            	self._xhr = null;
            	self._clearTimeout();
				self._sendNext();
				boyo.log("state=%d code=%d", xhr.readyState, xhr.status);
				if (xhr.status == 200) {
					boyo.log('boyo.net.HttpService::onMessage() message=%j', xhr.response);	
	            	self.onMessage(xhr.response, message);
	            }
	            else {
	            	boyo.log('boyo.net.HttpService::onError() xhr.status=%d', xhr.status);
	            	self.onError({'type':'statuscode', 'statuscode':xhr.status}, message);
	            }
            }
        };

		boyo.log('boyo.net.HttpService::_send() message=%j', message);
		xhr.send(message);

		if (this._reponseTimeout > 0) {
			this._timeoutId = setTimeout(function() {
            	self._closeXhr();
				self._clearTimeout();            	
				self._sendNext();

				boyo.log('boyo.net.HttpService::onError() response timeout');
				self.onError({"type":"timeout"}, message);
			}, this._reponseTimeout);
		}
	},

	_sendNext: function() {
		var nextMessage = this._messages.shift();
		if (nextMessage) {
			this._send(nextMessage);
		}
	},

	_closeXhr: function() {
		if (this._xhr !== null) {
			this._xhrAbort = true;
			this._xhr.abort();
			this._xhr = null;		
		}
	},

	_clearTimeout: function() {
    	if (this._timeoutId !== null) {
			clearTimeout(this._timeoutId);
			this._timeoutId = null;
		}
	},

});