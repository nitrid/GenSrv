/**
 * DevExtreme (cjs/renovation/ui/overlay.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.Overlay = exports.OverlayProps = exports.viewFunction = void 0;
var _inferno = require("inferno");
var _vdom = require("@devextreme/vdom");
var _widget = require("./common/widget");
var _ui = _interopRequireDefault(require("../../ui/overlay/ui.overlay"));
var _dom_component_wrapper = require("./common/dom_component_wrapper");
var _excluded = ["rootElementRef"],
    _excluded2 = ["_checkParentVisibility", "_feedbackHideTimeout", "_feedbackShowTimeout", "accessKey", "activeStateEnabled", "activeStateUnit", "animation", "aria", "children", "className", "classes", "closeOnOutsideClick", "closeOnTargetScroll", "container", "contentTemplate", "disabled", "focusStateEnabled", "height", "hint", "hoverStateEnabled", "integrationOptions", "maxWidth", "name", "onActive", "onClick", "onContentReady", "onDimensionChanged", "onFocusIn", "onFocusOut", "onHoverEnd", "onHoverStart", "onInactive", "onKeyDown", "onKeyboardHandled", "onVisibilityChange", "position", "propagateOutsideClick", "rootElementRef", "rtlEnabled", "shading", "tabIndex", "templatesRenderAsynchronously", "visible", "width"];

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
var viewFunction = function(_ref) {
    var componentProps = _ref.componentProps,
        rootElementRef = _ref.props.rootElementRef,
        restAttributes = _ref.restAttributes;
    return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _dom_component_wrapper.DomComponentWrapper, _extends({
        rootElementRef: rootElementRef,
        componentType: _ui.default,
        componentProps: componentProps
    }, restAttributes)))
};
exports.viewFunction = viewFunction;
var OverlayProps = _extends({}, _widget.WidgetProps, {
    integrationOptions: {},
    templatesRenderAsynchronously: false,
    shading: true,
    closeOnOutsideClick: false,
    closeOnTargetScroll: false,
    animation: {
        type: "pop",
        duration: 300,
        to: {
            opacity: 0,
            scale: .55
        },
        from: {
            opacity: 1,
            scale: 1
        }
    },
    visible: false,
    propagateOutsideClick: true,
    _checkParentVisibility: false,
    rtlEnabled: false,
    contentTemplate: "content",
    maxWidth: null
});
exports.OverlayProps = OverlayProps;
var Overlay = function(_BaseInfernoComponent) {
    _inheritsLoose(Overlay, _BaseInfernoComponent);

    function Overlay(props) {
        var _this;
        _this = _BaseInfernoComponent.call(this, props) || this;
        _this.state = {};
        return _this
    }
    var _proto = Overlay.prototype;
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            componentProps: this.componentProps,
            restAttributes: this.restAttributes
        })
    };
    _createClass(Overlay, [{
        key: "componentProps",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.rootElementRef, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props2 = this.props,
                restProps = (_this$props2._checkParentVisibility, _this$props2._feedbackHideTimeout, _this$props2._feedbackShowTimeout, _this$props2.accessKey, _this$props2.activeStateEnabled, _this$props2.activeStateUnit, _this$props2.animation, _this$props2.aria, _this$props2.children, _this$props2.className, _this$props2.classes, _this$props2.closeOnOutsideClick, _this$props2.closeOnTargetScroll, _this$props2.container, _this$props2.contentTemplate, _this$props2.disabled, _this$props2.focusStateEnabled, _this$props2.height, _this$props2.hint, _this$props2.hoverStateEnabled, _this$props2.integrationOptions, _this$props2.maxWidth, _this$props2.name, _this$props2.onActive, _this$props2.onClick, _this$props2.onContentReady, _this$props2.onDimensionChanged, _this$props2.onFocusIn, _this$props2.onFocusOut, _this$props2.onHoverEnd, _this$props2.onHoverStart, _this$props2.onInactive, _this$props2.onKeyDown, _this$props2.onKeyboardHandled, _this$props2.onVisibilityChange, _this$props2.position, _this$props2.propagateOutsideClick, _this$props2.rootElementRef, _this$props2.rtlEnabled, _this$props2.shading, _this$props2.tabIndex, _this$props2.templatesRenderAsynchronously, _this$props2.visible, _this$props2.width, _objectWithoutProperties(_this$props2, _excluded2));
            return restProps
        }
    }]);
    return Overlay
}(_vdom.BaseInfernoComponent);
exports.Overlay = Overlay;
Overlay.defaultProps = _extends({}, OverlayProps);
