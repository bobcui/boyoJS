var MacroCommand = cc.Class.extend({

    _subCommands: [],

    addSubCommand: function(commandClassRef) {
        this._subCommands.push(commandClassRef);
    },

    execute: function(args) {
        for (var i = 0; i < this._subCommands.length; ++i) {
            var commandInstance = new _subCommands[i];
            commandInstance.execute(Array.prototype.slice.call(arguments));            
        }
    }
});
