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
exports.ShowEvent = exports.Show = exports.Position = exports.Offset = exports.My = exports.HideEvent = exports.Hide = exports.Collision = exports.BoundaryOffset = exports.At = exports.Animation = exports.Tooltip = void 0;
var tooltip_1 = require("devextreme/ui/tooltip");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Tooltip = /** @class */ (function (_super) {
    __extends(Tooltip, _super);
    function Tooltip() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = tooltip_1.default;
        _this.isPortalComponent = true;
        _this.subscribableOptions = ["height", "position", "visible", "width"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onShowing", "onShown"];
        _this._defaults = {
            defaultHeight: "height",
            defaultPosition: "position",
            defaultVisible: "visible",
            defaultWidth: "width"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            hideEvent: { optionName: "hideEvent", isCollectionItem: false },
            position: { optionName: "position", isCollectionItem: false },
            showEvent: { optionName: "showEvent", isCollectionItem: false }
        };
        _this._templateProps = [{
                tmplOption: "contentTemplate",
                render: "contentRender",
                component: "contentComponent",
                keyFn: "contentKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(Tooltip.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Tooltip;
}(component_1.Component));
exports.Tooltip = Tooltip;
Tooltip.propTypes = {
    animation: PropTypes.object,
    closeOnOutsideClick: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    deferRendering: PropTypes.bool,
    disabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hideEvent: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    maxHeight: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    maxWidth: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    minHeight: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    minWidth: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onHidden: PropTypes.func,
    onHiding: PropTypes.func,
    onInitialized: PropTypes.func,
    onOptionChanged: PropTypes.func,
    onShowing: PropTypes.func,
    onShown: PropTypes.func,
    position: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.oneOf([
            "bottom",
            "left",
            "right",
            "top"
        ])
    ]),
    rtlEnabled: PropTypes.bool,
    shading: PropTypes.bool,
    shadingColor: PropTypes.string,
    showEvent: PropTypes.oneOfType([
        PropTypes.object,
        PropTypes.string
    ]),
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
var Collision = /** @class */ (function (_super) {
    __extends(Collision, _super);
    function Collision() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Collision.OptionName = "collision";
    return Collision;
}(nested_option_1.default));
exports.Collision = Collision;
var Hide = /** @class */ (function (_super) {
    __extends(Hide, _super);
    function Hide() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Hide.OptionName = "hide";
    return Hide;
}(nested_option_1.default));
exports.Hide = Hide;
var HideEvent = /** @class */ (function (_super) {
    __extends(HideEvent, _super);
    function HideEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    HideEvent.OptionName = "hideEvent";
    return HideEvent;
}(nested_option_1.default));
exports.HideEvent = HideEvent;
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
var ShowEvent = /** @class */ (function (_super) {
    __extends(ShowEvent, _super);
    function ShowEvent() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    ShowEvent.OptionName = "showEvent";
    return ShowEvent;
}(nested_option_1.default));
exports.ShowEvent = ShowEvent;
exports.default = Tooltip;
