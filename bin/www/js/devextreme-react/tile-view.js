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
exports.Item = exports.TileView = void 0;
var tile_view_1 = require("devextreme/ui/tile_view");
var PropTypes = require("prop-types");
var component_1 = require("./core/component");
var nested_option_1 = require("./core/nested-option");
var TileView = /** @class */ (function (_super) {
    __extends(TileView, _super);
    function TileView() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._WidgetClass = tile_view_1.default;
        _this.subscribableOptions = ["items"];
        _this.independentEvents = ["onContentReady", "onDisposing", "onInitialized", "onItemClick", "onItemContextMenu", "onItemHold", "onItemRendered"];
        _this._defaults = {
            defaultItems: "items"
        };
        _this._expectedChildren = {
            item: { optionName: "items", isCollectionItem: true }
        };
        _this._templateProps = [{
                tmplOption: "itemTemplate",
                render: "itemRender",
                component: "itemComponent",
                keyFn: "itemKeyFn"
            }];
        return _this;
    }
    Object.defineProperty(TileView.prototype, "instance", {
        get: function () {
            return this._instance;
        },
        enumerable: false,
        configurable: true
    });
    return TileView;
}(component_1.Component));
exports.TileView = TileView;
TileView.propTypes = {
    accessKey: PropTypes.string,
    activeStateEnabled: PropTypes.bool,
    baseItemHeight: PropTypes.number,
    baseItemWidth: PropTypes.number,
    dataSource: PropTypes.oneOfType([
        PropTypes.array,
        PropTypes.object,
        PropTypes.string
    ]),
    direction: PropTypes.oneOf([
        "horizontal",
        "vertical"
    ]),
    disabled: PropTypes.bool,
    focusStateEnabled: PropTypes.bool,
    height: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ]),
    hint: PropTypes.string,
    hoverStateEnabled: PropTypes.bool,
    itemHoldTimeout: PropTypes.number,
    itemMargin: PropTypes.number,
    items: PropTypes.array,
    noDataText: PropTypes.string,
    onContentReady: PropTypes.func,
    onDisposing: PropTypes.func,
    onInitialized: PropTypes.func,
    onItemClick: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.string
    ]),
    onItemContextMenu: PropTypes.func,
    onItemHold: PropTypes.func,
    onItemRendered: PropTypes.func,
    onOptionChanged: PropTypes.func,
    rtlEnabled: PropTypes.bool,
    showScrollbar: PropTypes.bool,
    tabIndex: PropTypes.number,
    visible: PropTypes.bool,
    width: PropTypes.oneOfType([
        PropTypes.func,
        PropTypes.number,
        PropTypes.string
    ])
};
var Item = /** @class */ (function (_super) {
    __extends(Item, _super);
    function Item() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Item.OptionName = "items";
    Item.IsCollectionItem = true;
    Item.TemplateProps = [{
            tmplOption: "template",
            render: "render",
            component: "component",
            keyFn: "keyFn"
        }];
    return Item;
}(nested_option_1.default));
exports.Item = Item;
exports.default = TileView;
