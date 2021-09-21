/**
 * DevExtreme (cjs/renovation/ui/grids/grid_base/grid_base_view_wrapper.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.GridBaseViewWrapper = exports.GridBaseViewWrapperProps = exports.viewFunction = void 0;
var _inferno = require("inferno");
var _vdom = require("@devextreme/vdom");
var _renderer = _interopRequireDefault(require("../../../../core/renderer"));
var _excluded = ["view"];

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}

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

function _assertThisInitialized(self) {
    if (void 0 === self) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
    }
    return self
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
    var viewRef = _ref.viewRef;
    return (0, _inferno.createVNode)(1, "div", null, null, 1, null, null, viewRef)
};
exports.viewFunction = viewFunction;
var GridBaseViewWrapperProps = {};
exports.GridBaseViewWrapperProps = GridBaseViewWrapperProps;
var GridBaseViewWrapper = function(_InfernoComponent) {
    _inheritsLoose(GridBaseViewWrapper, _InfernoComponent);

    function GridBaseViewWrapper(props) {
        var _this;
        _this = _InfernoComponent.call(this, props) || this;
        _this.state = {};
        _this.viewRef = (0, _inferno.createRef)();
        _this.renderView = _this.renderView.bind(_assertThisInitialized(_this));
        return _this
    }
    var _proto = GridBaseViewWrapper.prototype;
    _proto.createEffects = function() {
        return [new _vdom.InfernoEffect(this.renderView, [])]
    };
    _proto.updateEffects = function() {};
    _proto.renderView = function() {
        var $element = (0, _renderer.default)(this.viewRef.current);
        this.props.view._$element = $element;
        this.props.view._$parent = $element.parent();
        this.props.view.render()
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            viewRef: this.viewRef,
            restAttributes: this.restAttributes
        })
    };
    _createClass(GridBaseViewWrapper, [{
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.view, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return GridBaseViewWrapper
}(_vdom.InfernoComponent);
exports.GridBaseViewWrapper = GridBaseViewWrapper;
GridBaseViewWrapper.defaultProps = _extends({}, GridBaseViewWrapperProps);
