var boyo.mvc.View = cc.Class.extend({

    _uiMap = [],

    addUI: function(ui) {
        this._uiMap[ui.getUIName()] = ui;
        ui.onAdd(this);
    },

    getUI: function(uiName) {
        return this._uiMap[uiName];
    },

    removeUI: function(uiName)
    {
        var ui = this._uiMap[uiName];
        if (ui) {
            ui.onRemove();
        }
        return ui;
    },

    hasUi: function(uiName) {
        return this._uiMap[uiName] != null;
    },
});

boyo.mvc.View.getInstance = function() {
    if (boyo.mvc.View._instance == null) {
        boyo.mvc.View._instance = new boyo.mvc.View();
    }
    return boyo.mvc.View._instance;
}
