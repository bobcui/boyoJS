boyo.mvc.View = cc.Class.extend({

    _uiMap: [],

    addUI: function(ui) {
        this._uiMap[ui.getUiId()] = ui;
        ui.onAdd(this);
    },

    getUI: function(uiId) {
        return this._uiMap[uiId];
    },

    removeUI: function(uiId)
    {
        var ui = this._uiMap[uiId];
        if (ui) {
            this._uiMap[uiId] = null;
            ui.onRemove();
        }
        return ui;
    },

    hasUi: function(uiId) {
        return this._uiMap[uiId] != null;
    }
});

boyo.mvc.View.getInstance = function() {
    if (boyo.mvc.View._instance == null) {
        boyo.mvc.View._instance = new boyo.mvc.View();
    }
    return boyo.mvc.View._instance;
}
