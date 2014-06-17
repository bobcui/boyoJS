var boyo.mvc.Model = cc.Class.extend({

    _dataMap = [],

    addData: function(data) {
        this._dataMap[data.dataName()] = data;
        data.onAdd(this);
    },

    getData: function(dataName) {
        return this._dataMap[dataName];
    },

    hasData: function(dataName) {
        return this._dataMap[dataName] != null;
    },

    removeData: function(dataName) {
        var data = this._dataMap[dataName];
        if (data) {
            data.onRemove();
        }
        return data;
    }
});

boyo.mvc.Model.getInstance = function() {
    if (boyo.mvc.Model._instance == null) {
        boyo.mvc.Model._instance = new boyo.mvc.Model();
    }
    return boyo.mvc.Model._instance;
}
