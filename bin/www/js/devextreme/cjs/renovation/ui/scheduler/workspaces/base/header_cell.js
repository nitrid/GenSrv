/**
 * DevExtreme (cjs/renovation/ui/scheduler/workspaces/base/header_cell.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.HeaderCell = exports.viewFunction = void 0;
var _inferno = require("inferno");
var _vdom = require("@devextreme/vdom");
var _ordinary_cell = require("./ordinary_cell");
var _excluded = ["children", "className", "colSpan", "styles"];

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
var viewFunction = function(_ref) {
    var _ref$props = _ref.props,
        children = _ref$props.children,
        className = _ref$props.className,
        colSpan = _ref$props.colSpan,
        styles = _ref$props.styles;
    return (0, _inferno.createVNode)(1, "th", className, children, 0, {
        style: (0, _vdom.normalizeStyles)(styles),
        colSpan: colSpan
    })
};
exports.viewFunction = viewFunction;
var HeaderCell = function(_BaseInfernoComponent) {
    _inheritsLoose(HeaderCell, _BaseInfernoComponent);

    function HeaderCell(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        return _this
    }
    var _proto = HeaderCell.prototype;
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            restAttributes: this.restAttributes
        })
    };
    _createClass(HeaderCell, [{
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.children, _this$props.className, _this$props.colSpan, _this$props.styles, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return HeaderCell
}(_vdom.BaseInfernoComponent);
exports.HeaderCell = HeaderCell;
HeaderCell.defaultProps = _extends({}, _ordinary_cell.CellProps);