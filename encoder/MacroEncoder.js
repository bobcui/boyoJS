boyo.encoder.MacroEncoder = cc.Class.extend({
    _encoders: [],

    ctor: function() {
        this._super();
        for (var i=0; i<arguments.length; ++i) {
            this.addEncoder(arguments[i]);
        }
    },

    addEncoder: function(encoder) {
        this._encoders.push(encoder);
    },

    encode: function(object) {
        var data = object;
        for (var i = 0; i < this._encoders.length; ++i) {
            data = this._encoders[i].encoder(data);
        }
        return data;
    },

    decode: function(data) {
        var object = data;
        for (var i = this._encoders.length-1; i >= 0; --i) {
            object = this._encoders[i].decode(object);
        }
        return object;        
    }
});
