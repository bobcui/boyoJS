var boyo.mvc.UI = cc.Class.extend({

    _view = null,

    getUIName: function() {
        return 'boyo.mvc.UI'; /* class name as MediatorId conventionally*/
    },

    onAdd: function(view) {
        this._view = view;
    },

    onRemove: function() {
        this._view = null;
    },

    getView: function() {
        return this._view;
    }
});
