boyo.encoder.MacroEncoder = cc.Class.extend({

    _subEncoders: [],

    addSubEncoder: function(encoder) {
        this._subEncoders.push(encoder);
    },

    encode: function(object) {
        var data = object;
        for (var i = 0; i < this._subEncoders.length; ++i) {
            data = this._subEncoders[i].encoder(data);
        }
        return data;
    },

    decode: function(data) {
        var object = data;
        for (var i = this._subEncoders.length-1; i >= 0; --i) {
            object = this._subEncoders[i].decode(object);
        }
        return object;        
    }
});
