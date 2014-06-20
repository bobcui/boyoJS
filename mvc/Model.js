boyo.mvc.Model = cc.Class.extend({

    _dataMap: [],

    addData: function(data) {
        this._dataMap[data.getDataId()] = data;
        data.onAdd(this);
    },

    getData: function(dataId) {
        return this._dataMap[dataId];
    },

    hasData: function(dataId) {
        return this._dataMap[dataId] != null;
    },

    removeData: function(dataId) {
        var data = this._dataMap[dataId];
        if (data) {
            this._dataMap[dataId]= null;
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
