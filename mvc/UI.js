boyo.mvc.Ui = cc.Class.extend({

    _view: null,

    getUiId: function() {
        return boyo.mvc.Ui;
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
