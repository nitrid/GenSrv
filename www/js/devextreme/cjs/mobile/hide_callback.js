/**
 * DevExtreme (cjs/mobile/hide_callback.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.hideCallback = void 0;
var _array = require("../core/utils/array");
var hideCallback = function() {
    var callbacks = [];
    return {
        add: function(callback) {
            var indexOfCallback = (0, _array.inArray)(callback, callbacks);
            if (-1 === indexOfCallback) {
                callbacks.push(callback)
            }
        },
        remove: function(callback) {
            var indexOfCallback = (0, _array.inArray)(callback, callbacks);
            if (-1 !== indexOfCallback) {
                callbacks.splice(indexOfCallback, 1)
            }
        },
        fire: function() {
            var callback = callbacks.pop();
            var result = !!callback;
            if (result) {
                callback()
            }
            return result
        },
        hasCallback: function() {
            return callbacks.length > 0
        }
    }
}();
exports.hideCallback = hideCallback;
