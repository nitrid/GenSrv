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
exports.ToolbarItem = exports.Show = exports.Position = exports.Options = exports.Offset = exports.My = exports.Hide = exports.DropDownOptions = exports.DisplayFormat = exports.Collision = exports.CalendarOptions = exports.Button = exports.BoundaryOffset = exports.At = exports.Animation = exports.DateBox = void 0;
var date_box_1 = require("devextreme/ui/date_box");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var DateBox = /** @class */ (function (_super) {
    __extends(DateBox, _super);
    function DateBox() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = date_box_1.default;
        _this.subscribableOptions = ["opened", "value"];
        _this.independentEvents = ["onChange", "onClosed", "onContentReady", "onCopy", "onCut", "onDisposing", "onEnterKey", "onFocusIn", "onFocusOut", "onInitialized", "onInput", "onKeyDown", "onKeyUp", "onOpened", "onPaste"];
        _this._defaults = {
            defaultOpened: "opened",
            defaultValue: "value"
        };
        _this._expectedChildren = {
            button: { optionName: "buttons", isCollectionItem: true },
            calendarOptions: { optionName: "calendarOptions", isCollectionItem: false },
            displayFormat: { optionName: "displayFormat", isCollectionItem: false },
            dropDownOptions: { optionName: "dropDownOptions", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "dropDownButtonTemplate",
                render: "dropDownButtonRender",
                component: "dropDownButtonComponent",
                keyFn: "dropDownButtonKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(DateBox.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return DateBox;
}(component_1.Component));
exports.DateBox = DateBox;
DateBox.propTypes = {
    acceptCustomValue: PropTypes.bool,
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    adaptivityEnabled: PropTypes.bool,
    applyButtonText: PropTypes.string,
    applyValueMode: PropTypes.oneOf([
        "instantly",
        "useButtons"
    ]),
    buttons: PropTypes.array,
    calendarOptions: PropTypes.object,
    cancelButtonText: PropTypes.string,
    dateOutOfRangeMessage: PropTypes.string,
    dateSerializationFormat: PropTypes.string,
    deferRendering: PropTypes.bool,
    disabled: PropTypes.bool,
    disabledDates: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.func
    ]),
    displayFormat: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.func,
        PropTypes.string
    ]),
    dropDownOptions: PropTypes.object,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    interval: PropTypes.number,
    invalidDateMessage: PropTypes.string,
    isValid: PropTypes.bool,
    maxLength: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.string
    ]),
    name: PropTypes.string,
    onChange: PropTypes.func,
    onClosed: PropTypes.func,
    onContentReady: PropTypes.func,
    onCopy: PropTypes.func,
    onCut: PropTypes.func,
    onDisposing: PropTypes.func,
    onEnterKey: PropTypes.func,
    onFocusIn: PropTypes.func,
    onFocusOut: PropTypes.func,
    onInitialized: PropTypes.func,
    onInput: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onOpened: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onPaste: PropTypes.func,
    onValueChanged: PropTypes.func,
    opened: PropTypes.bool,
    openOnFieldClick: PropTypes.bool,
    pickerType: PropTypes.oneOf([
        "calendar",
        "list",
        "native",
        "rollers"
    ]),
    placeholder: PropTypes.string,
    readOnly: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    showAnalogClock: PropTypes.bool,
    showClearButton: PropTypes.bool,
    showDropDownButton: PropTypes.bool,
    spellcheck: PropTypes.bool,
    stylingMode: PropTypes.oneOf([
        "outlined",
        "underlined",
        "filled"
    ]),
    tabIndex: PropTypes.number,
    text: PropTypes.string,
    type: PropTypes.oneOf([
        "date",
        "datetime",
        "time"
    ]),
    useMaskBehavior: PropTypes.bool,
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
    valueChangeEvent: PropTypes.string,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Animation = /** @class */ (function (_super) {
    __extends(Animation, _super);
    function Animation() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Animation.OptionName = "animation";
    Animation.ExpectedChildren = {
        hide: { optionName: "hide", isCollectionItem: false },
        show: { optionName: "show", isCollectionItem: false }
    };
    return Animation;
}(nested_option_1.default));
exports.Animation = Animation;
var At = /** @class */ (function (_super) {
    __extends(At, _super);
    function At() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    At.OptionName = "at";
    return At;
}(nested_option_1.default));
exports.At = At;
var BoundaryOffset = /** @class */ (function (_super) {
    __extends(BoundaryOffset, _super);
    function BoundaryOffset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    BoundaryOffset.OptionName = "boundaryOffset";
    return BoundaryOffset;
}(nested_option_1.default));
exports.BoundaryOffset = BoundaryOffset;
var Button = /** @class */ (function (_super) {
    __extends(Button, _super);
    function Button() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Button.OptionName = "buttons";
    Button.IsCollectionItem = true;
    Button.ExpectedChildren = {
        options: { optionName: "options", isCollectionItem: false }
    };
    return Button;
}(nested_option_1.default));
exports.Button = Button;
var CalendarOptions = /** @class */ (function (_super) {
    __extends(CalendarOptions, _super);
    function CalendarOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    CalendarOptions.OptionName = "calendarOptions";
    CalendarOptions.DefaultsProps = {
        defaultValue: "value",
        defaultZoomLevel: "zoomLevel"
    };
    CalendarOptions.TemplateProps = [{
            tmplOption: "cellTemplate",
            render: "cellRender",
            component: "cellComponent",
            keyFn: "cellKeyFn"
        }];
    return CalendarOptions;
}(nested_option_1.default));
exports.CalendarOptions = CalendarOptions;
var Collision = /** @class */ (function (_super) {
    __extends(Collision, _super);
    function Collision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collision.OptionName = "collision";
    return Collision;
}(nested_option_1.default));
exports.Collision = Collision;
var DisplayFormat = /** @class */ (function (_super) {
    __extends(DisplayFormat, _super);
    function DisplayFormat() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DisplayFormat.OptionName = "displayFormat";
    return DisplayFormat;
}(nested_option_1.default));
exports.DisplayFormat = DisplayFormat;
var DropDownOptions = /** @class */ (function (_super) {
    __extends(DropDownOptions, _super);
    function DropDownOptions() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    DropDownOptions.OptionName = "dropDownOptions";
    DropDownOptions.DefaultsProps = {
        defaultHeight: "height",
        defaultPosition: "position",
        defaultVisible: "visible",
        defaultWidth: "width"
    };
    DropDownOptions.ExpectedChildren = {
        animation: { optionName: "animation", isCollectionItem: false },
        position: { optionName: "position", isCollectionItem: false },
        toolbarItem: { optionName: "toolbarItems", isCollectionItem: true }
    };
    DropDownOptions.TemplateProps = [{
            tmplOption: "contentTemplate",
            render: "contentRender",
            component: "contentComponent",
            keyFn: "contentKeyFn"
        }, {
            tmplOption: "titleTemplate",
            render: "titleRender",
            component: "titleComponent",
            keyFn: "titleKeyFn"
        }];
    return DropDownOptions;
}(nested_option_1.default));
exports.DropDownOptions = DropDownOptions;
var Hide = /** @class */ (function (_super) {
    __extends(Hide, _super);
    function Hide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hide.OptionName = "hide";
    return Hide;
}(nested_option_1.default));
exports.Hide = Hide;
var My = /** @class */ (function (_super) {
    __extends(My, _super);
    function My() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    My.OptionName = "my";
    return My;
}(nested_option_1.default));
exports.My = My;
var Offset = /** @class */ (function (_super) {
    __extends(Offset, _super);
    function Offset() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Offset.OptionName = "offset";
    return Offset;
}(nested_option_1.default));
exports.Offset = Offset;
var Options = /** @class */ (function (_super) {
    __extends(Options, _super);
    function Options() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Options.OptionName = "options";
    Options.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Options;
}(nested_option_1.default));
exports.Options = Options;
var Position = /** @class */ (function (_super) {
    __extends(Position, _super);
    function Position() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Position.OptionName = "position";
    Position.ExpectedChildren = {
        at: { optionName: "at", isCollectionItem: false },
        boundaryOffset: { optionName: "boundaryOffset", isCollectionItem: false },
        collision: { optionName: "collision", isCollectionItem: false },
        my: { optionName: "my", isCollectionItem: false },
        offset: { optionName: "offset", isCollectionItem: false }
    };
    return Position;
}(nested_option_1.default));
exports.Position = Position;
var Show = /** @class */ (function (_super) {
    __extends(Show, _super);
    function Show() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Show.OptionName = "show";
    return Show;
}(nested_option_1.default));
exports.Show = Show;
var ToolbarItem = /** @class */ (function (_super) {
    __extends(ToolbarItem, _super);
    function ToolbarItem() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ToolbarItem.OptionName = "toolbarItems";
    ToolbarItem.IsCollectionItem = true;
    ToolbarItem.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return ToolbarItem;
}(nested_option_1.default));
exports.ToolbarItem = ToolbarItem;
exports.default = DateBox;
