import { YIUI } from 'yes-core';

YIUI.ExprHandlerMap = (function(){

    var INSTANCE = null;

    function _Map(){
        if(INSTANCE){
            return INSTANCE;
        }
        this.map = {};
    };

    _Map.prototype.getImpl = function(type){
        return this.map[type];
    };

    _Map.prototype.reg = function(type, name){
        this.map[type] = name;
    };

    _Map.getInstance = function(){
    	if(!INSTANCE){
            INSTANCE = new _Map();
    	}
    	return INSTANCE;
    };

    return _Map;
})();
