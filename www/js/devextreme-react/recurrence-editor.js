/*!
 * devextreme-react
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RecurrenceEditor = void 0;
var recurrence_editor_1 = require("devextreme/ui/recurrence_editor");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var RecurrenceEditor = /** @class */ (function (_super) {
    __extends(RecurrenceEditor, _super);
    function RecurrenceEditor() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = recurrence_editor_1.default;
        _this.subscribableOptions = ["value"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized"];
        _this._defaults = {
            defaultValue: "value"
        };
        return _this;
    }
    Object.defineProperty(RecurrenceEditor.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return RecurrenceEditor;
}(component_1.Component));
exports.RecurrenceEditor = RecurrenceEditor;
RecurrenceEditor.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    disabled: PropTypes.bool,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    isValid: PropTypes.bool,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onValueChanged: PropTypes.func,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    tabIndex: PropTypes.number,
    validationErrors: PropTypes.array,
    validationMessageMode: PropTypes.oneOf([
        "always",
        "auto"
    ]),
    validationStatus: PropTypes.oneOf([
        "valid",
        "invalid",
        "pending"
    ]),
    value: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
exports.default = RecurrenceEditor;
