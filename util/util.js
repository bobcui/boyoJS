boyo.util = {

	isArray: Array.isArray,
	isBoolean: function(arg) { return typeof arg === 'boolean'; },
	isNull: function(arg) {return arg === null; },
	isNullOrUndefined: function(arg) { return arg == null; },
	isNumber: function(arg) { return typeof arg === 'number'; },
	isString: function(arg) { return typeof arg === 'string'; },
	isSymbol: function(arg) { return typeof arg === 'symbol'; },
	isUndefined: function(arg) { return arg === void 0; },
	isRegExp: function(re) { return isObject(re) && objectToString(re) === '[object RegExp]'; },
 	isObject: function(arg) { return typeof arg === 'object' && arg !== null; },
	isDate: function(d) { return isObject(d) && objectToString(d) === '[object Date]'; },
	isError: function(e) { return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error); },
	isFunction: function(arg) { return typeof arg === 'function'; },
	isPrimitive: function(arg) {
		return arg === null ||
         typeof arg === 'boolean' ||
         typeof arg === 'number' ||
         typeof arg === 'string' ||
         typeof arg === 'symbol' ||  // ES6 symbol
         typeof arg === 'undefined';
	},

	format: function(f) {
	    if (!this.isString(f)) {
	        var objects = [];
	        for (var i = 0; i < arguments.length; i++) {
	            objects.push(arguments[i]);
	        }
	        return objects.join(' ');
	    }

	    var i = 1;
	    var args = arguments;
	    var len = args.length;
	    var formatRegExp = /%[sdj%]/g;
	    var str = String(f).replace(formatRegExp, function(x) {
	        if (x === '%%') return '%';
	        if (i >= len) return x;
	        switch (x) {
	            case '%s': return String(args[i++]);
	            case '%d': return Number(args[i++]);
	            case '%j':
	                try {
	                    return JSON.stringify(args[i++]);
	                } catch (_) {
	                    return '[Circular]';
	                }
	            default:
	                return x;
	        }
	    });
	    for (var x = args[i]; i < len; x = args[++i]) {
            str += ' ' + x;
	    }
	    return str;
	},

	// 02/04 16:19:34
	timestamp: function() {
		function pad(n) {
			return n < 10 ? '0' + n.toString(10) : n.toString(10);
		};
		var d = new Date();
		var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
		return pad(d.getMonth()) + '/' + pad(d.getDate()) + ' ' + time;
	},

	log: function() {
		cc.log([this.timestamp(), this.format.apply(this, Array.prototype.slice.call(arguments))].join(' - '));
	},

	warn: function(args) {
		cc.warn([this.timestamp(), this.format.apply(this, Array.prototype.slice.call(arguments))].join(' - '));
	},

	error: function(args) {
		cc.error([this.timestamp(), this.format.apply(this, Array.prototype.slice.call(arguments))].join(' - '));
	},

	assert: function(cond, msg) {
		cc.assert(cond, this.format.apply(this, Array.prototype.slice.call(arguments, 1)));	
	},

	copyObject: function(src, dest) {
		src = src || {};
		dest = dest || {};
		for(var k in src) dest[k]=src[k];
	},

	invokeCallback: function(cb) {
		if ( !! cb && this.isFunction(cb) ) {
			cb.apply(null, Array.prototype.slice.call(arguments, 1));
		}
	}

};

boyo.util.copyObject(boyo.util, boyo);