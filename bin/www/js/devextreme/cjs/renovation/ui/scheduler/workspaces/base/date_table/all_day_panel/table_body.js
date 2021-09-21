/**
 * DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/date_table/all_day_panel/table_body.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.AllDayPanelTableBody = exports.AllDayPanelTableBodyProps = exports.viewFunction = void 0;
var _inferno = require("inferno");
var _vdom = require("@devextreme/vdom");
var _row = require("../../row");
var _cell = require("./cell");
var _combine_classes = require("../../../../../../utils/combine_classes");
var _excluded = ["className", "dataCellTemplate", "isVerticalGroupOrientation", "leftVirtualCellCount", "leftVirtualCellWidth", "rightVirtualCellCount", "rightVirtualCellWidth", "viewData"];

function _objectWithoutProperties(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = _objectWithoutPropertiesLoose(source, excluded);
    var key, i;
    if (Object.getOwnPropertySymbols) {
        var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
        for (i = 0; i < sourceSymbolKeys.length; i++) {
            key = sourceSymbolKeys[i];
            if (excluded.indexOf(key) >= 0) {
                continue
            }
            if (!Object.prototype.propertyIsEnumerable.call(source, key)) {
                continue
            }
            target[key] = source[key]
        }
    }
    return target
}

function _objectWithoutPropertiesLoose(source, excluded) {
    if (null == source) {
        return {}
    }
    var target = {};
    var sourceKeys = Object.keys(source);
    var key, i;
    for (i = 0; i < sourceKeys.length; i++) {
        key = sourceKeys[i];
        if (excluded.indexOf(key) >= 0) {
            continue
        }
        target[key] = source[key]
    }
    return target
}

function _defineProperty(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        })
    } else {
        obj[key] = value
    }
    return obj
}

function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) {
            descriptor.writable = true
        }
        Object.defineProperty(target, descriptor.key, descriptor)
    }
}

function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) {
        _defineProperties(Constructor.prototype, protoProps)
    }
    if (staticProps) {
        _defineProperties(Constructor, staticProps)
    }
    return Constructor
}

function _inheritsLoose(subClass, superClass) {
    subClass.prototype = Object.create(superClass.prototype);
    subClass.prototype.constructor = subClass;
    _setPrototypeOf(subClass, superClass)
}

function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function(o, p) {
        o.__proto__ = p;
        return o
    };
    return _setPrototypeOf(o, p)
}

function _extends() {
    _extends = Object.assign || function(target) {
        for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                    target[key] = source[key]
                }
            }
        }
        return target
    };
    return _extends.apply(this, arguments)
}
var viewFunction = function(viewModel) {
    return (0, _inferno.createComponentVNode)(2, _row.Row, {
        leftVirtualCellWidth: viewModel.props.leftVirtualCellWidth,
        rightVirtualCellWidth: viewModel.props.rightVirtualCellWidth,
        leftVirtualCellCount: viewModel.props.leftVirtualCellCount,
        rightVirtualCellCount: viewModel.props.rightVirtualCellCount,
        className: viewModel.classes,
        children: viewModel.props.viewData.map((function(_ref) {
            var endDate = _ref.endDate,
                cellGroupIndex = _ref.groupIndex,
                groups = _ref.groups,
                cellIndex = _ref.index,
                isFirstGroupCell = _ref.isFirstGroupCell,
                isLastGroupCell = _ref.isLastGroupCell,
                key = _ref.key,
                startDate = _ref.startDate;
            return (0, _inferno.createComponentVNode)(2, _cell.AllDayPanelCell, {
                isFirstGroupCell: !viewModel.props.isVerticalGroupOrientation && isFirstGroupCell,
                isLastGroupCell: !viewModel.props.isVerticalGroupOrientation && isLastGroupCell,
                startDate: startDate,
                endDate: endDate,
                groups: groups,
                groupIndex: cellGroupIndex,
                index: cellIndex,
                dataCellTemplate: viewModel.props.dataCellTemplate
            }, key)
        }))
    })
};
exports.viewFunction = viewFunction;
var AllDayPanelTableBodyProps = {
    viewData: [],
    isVerticalGroupOrientation: false,
    className: "",
    leftVirtualCellWidth: 0,
    rightVirtualCellWidth: 0
};
exports.AllDayPanelTableBodyProps = AllDayPanelTableBodyProps;
var getTemplate = function(TemplateProp) {
    return TemplateProp && (TemplateProp.defaultProps ? function(props) {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, TemplateProp, _extends({}, props)))
    } : TemplateProp)
};
var AllDayPanelTableBody = function(_BaseInfernoComponent) {
    _inheritsLoose(AllDayPanelTableBody, _BaseInfernoComponent);

    function AllDayPanelTableBody(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        return _this
    }
    var _proto = AllDayPanelTableBody.prototype;
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props, {
                dataCellTemplate: getTemplate(props.dataCellTemplate)
            }),
            classes: this.classes,
            restAttributes: this.restAttributes
        })
    };
    _createClass(AllDayPanelTableBody, [{
        key: "classes",
        get: function() {
            var className = this.props.className;
            return (0, _combine_classes.combineClasses)(_defineProperty({
                "dx-scheduler-all-day-table-row": true
            }, className, !!className))
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.className, _this$props.dataCellTemplate, _this$props.isVerticalGroupOrientation, _this$props.leftVirtualCellCount, _this$props.leftVirtualCellWidth, _this$props.rightVirtualCellCount, _this$props.rightVirtualCellWidth, _this$props.viewData, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return AllDayPanelTableBody
}(_vdom.BaseInfernoComponent);
exports.AllDayPanelTableBody = AllDayPanelTableBody;
AllDayPanelTableBody.defaultProps = _extends({}, AllDayPanelTableBodyProps);