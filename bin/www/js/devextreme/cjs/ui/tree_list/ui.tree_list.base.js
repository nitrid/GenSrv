/**
 * DevExtreme (cjs/ui/tree_list/ui.tree_list.base.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiTree_list = _interopRequireDefault(require("./ui.tree_list.core"));
var _themes = require("../themes");
require("./ui.tree_list.column_headers");
require("./ui.tree_list.columns_controller");
require("./ui.tree_list.data_controller");
require("./ui.tree_list.sorting");
require("./ui.tree_list.rows");
require("./ui.tree_list.context_menu");
require("./ui.tree_list.error_handling");
require("./ui.tree_list.grid_view");
require("./ui.tree_list.header_panel");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var callModuleItemsMethod = _uiTree_list.default.callModuleItemsMethod;
var DATAGRID_ROW_SELECTOR = ".dx-row";
var TREELIST_CLASS = "dx-treelist";
_uiTree_list.default.registerModulesOrder(["stateStoring", "columns", "selection", "editorFactory", "columnChooser", "editingRowBased", "editingFormBased", "editingCellBased", "editing", "grouping", "masterDetail", "validating", "adaptivity", "data", "virtualScrolling", "columnHeaders", "filterRow", "headerPanel", "headerFilter", "sorting", "search", "rows", "pager", "columnsResizingReordering", "contextMenu", "keyboardNavigation", "errorHandling", "summary", "columnFixing", "export", "gridView"]);
var TreeList = _ui.default.inherit({
    _activeStateUnit: DATAGRID_ROW_SELECTOR,
    _getDefaultOptions: function() {
        var result = this.callBase();
        (0, _iterator.each)(_uiTree_list.default.modules, (function() {
            if ((0, _type.isFunction)(this.defaultOptions)) {
                (0, _extend.extend)(true, result, this.defaultOptions())
            }
        }));
        return result
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: function() {
                return (0, _themes.isMaterial)()
            },
            options: {
                showRowLines: true,
                showColumnLines: false,
                headerFilter: {
                    height: 315
                },
                editing: {
                    useIcons: true
                }
            }
        }])
    },
    _init: function() {
        this.callBase();
        _uiTree_list.default.processModules(this, _uiTree_list.default);
        callModuleItemsMethod(this, "init")
    },
    _clean: _common.noop,
    _optionChanged: function(args) {
        callModuleItemsMethod(this, "optionChanged", [args]);
        if (!args.handled) {
            this.callBase(args)
        }
    },
    _dimensionChanged: function() {
        this.updateDimensions(true)
    },
    _visibilityChanged: function(visible) {
        if (visible) {
            this.updateDimensions()
        }
    },
    _initMarkup: function() {
        this.callBase.apply(this, arguments);
        this.$element().addClass(TREELIST_CLASS);
        this.getView("gridView").render(this.$element())
    },
    _renderContentImpl: function() {
        this.getView("gridView").update()
    },
    _renderContent: function() {
        var that = this;
        (0, _common.deferRender)((function() {
            that._renderContentImpl()
        }))
    },
    _dispose: function() {
        this.callBase();
        callModuleItemsMethod(this, "dispose")
    },
    isReady: function() {
        return this.getController("data").isReady()
    },
    beginUpdate: function() {
        this.callBase();
        callModuleItemsMethod(this, "beginUpdate")
    },
    endUpdate: function() {
        callModuleItemsMethod(this, "endUpdate");
        this.callBase()
    },
    getController: function(name) {
        return this._controllers[name]
    },
    getView: function(name) {
        return this._views[name]
    },
    focus: function(element) {
        this.callBase();
        if ((0, _type.isDefined)(element)) {
            this.getController("keyboardNavigation").focus(element)
        }
    }
});
TreeList.registerModule = _uiTree_list.default.registerModule.bind(_uiTree_list.default);
(0, _component_registrator.default)("dxTreeList", TreeList);
var _default = TreeList;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;