var boyo.mvc.Controller = cc.Class.extend({
    executeCommand: function(commandClassRef, args) {
        var commandInstance = new commandClassRef();
        commandInstance.execute(Array.prototype.slice.call(arguments, 1));
    }
});

boyo.mvc.Controller.getInstance = function() {
    if (boyo.mvc.Controller._instance == null) {
        boyo.mvc.Controller._instance = new boyo.mvc.Controller();
    }
    return boyo.mvc.Controller._instance;
}
