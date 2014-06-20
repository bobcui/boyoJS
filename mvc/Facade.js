boyo.mvc.Facade = cc.Class.extend({

    model: null,
    view: null,
    controller: null,

    ctor: function() {
        this._super();
        this.model = new model;
        this.view = new view;
        this.controller = new controller;
    },

    // model funcs
    addData: function(data) {
        return this.model.addData(data);
    },

    getData: function(dataName) {
        return this.model.getData(dataName);
    },

    hasData: function(dataName) {
        return this.model.hasData(dataName);
    },

    removeData: function(dataName) {
        return this.model.removeData(dataName);
    },

    // view funcs
    addUI: function(ui) {
        return this.view.addUI(ui);
    },

    getUI: function(uiName) {
        return this.view.getUI(uiName);
    },

    removeUI: function(uiName) {
        return this.view.removeUI(uiName);
    },

    hasUi: function(uiName) {
        return this.view.hasUi(uiName);
    },    

    // controller funcs
    executeCommand: function(commandClassRef, args) {
        return this.controller.executeCommand(commandClassRef, Array.prototype.slice.call(arguments, 1));
    }
});

boyo.mvc.Facade.getInstance = function() {
    if (boyo.mvc.Facade._instance == null) {
        boyo.mvc.Facade._instance = new boyo.mvc.Facade();
    }
    return boyo.mvc.Facade._instance;
}
