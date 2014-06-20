boyo.mvc.Data = cc.Class.extend({

    _model: null,

    getDataId: function() {
        return boyo.mvc.Data; /* return class name as Proxy Name conventionally*/
    },

    onAdd: function(model) {
        this._model = model;
    },

    onRemove: function() {
        this._model = null;
    },

    getModel: function() {
        return this._model;
    }
});
