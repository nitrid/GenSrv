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
exports.ToolbarItem = exports.Show = exports.Position = exports.Offset = exports.My = exports.Hide = exports.Collision = exports.BoundaryOffset = exports.At = exports.Animation = exports.Popup = void 0;
var popup_1 = require("devextreme/ui/popup");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var Popup = /** @class */ (function (_super) {
    __extends(Popup, _super);
    function Popup() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = popup_1.default;
        _this.isPortalComponent = true;
        _this.subscribableOptions = ["height", "position", "visible", "width"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onHidden", "onHiding", "onInitialized", "onResize", "onResizeEnd", "onResizeStart", "onShowing", "onShown", "onTitleRendered"];
        _this._defaults = {
            defaultHeight: "height",
            defaultPosition: "position",
            defaultVisible: "visible",
            defaultWidth: "width"
        };
        _this._expectedChildren = {
            animation: { optionName: "animation", isCollectionItem: false },
            position: { optionName: "position", isCollectionItem: false },
            toolbarItem: { optionName: "toolbarItems", isCollectionItem: true }
        };
        _this._templateProps = [{
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
        return _this;
    }
    Object.defineProperty(Popup.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return Popup;
}(component_1.Component));
exports.Popup = Popup;
Popup.propTypes = {
    accessKey: PropTypes.string,
    animation: PropTypes.object,
    closeOnOutsideClick: PropTypes.oneOfType([
        PropTypes.bool,
        PropTypes.func
    ]),
    deferRendering: PropTypes.bool,
    disabled: PropTypes.bool,
    dragEnabled: PropTypes.bool,
    focusStateEnabled: PropTypes.bool,
    fullScreen: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
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
    onResize: PropTypes.func,
    onResizeEnd: PropTypes.func,
    onResizeStart: PropTypes.func,
    onShowing: PropTypes.func,
    onShown: PropTypes.func,
    onTitleRendered: PropTypes.func,
    position: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.object,
        PropTypes.oneOf([
            "bottom",
            "center",
            "left",
            "left bottom",
            "left top",
            "right",
            "right bottom",
            "right top",
            "top"
        ])
    ]),
    resizeEnabled: PropTypes.bool,
    rtlEnabled: PropTypes.bool,
    shading: PropTypes.bool,
    shadingColor: PropTypes.string,
    showCloseButton: PropTypes.bool,
    showTitle: PropTypes.bool,
    tabIndex: PropTypes.number,
    title: PropTypes.string,
    toolbarItems: PropTypes.array,
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
exports.default = Popup;
