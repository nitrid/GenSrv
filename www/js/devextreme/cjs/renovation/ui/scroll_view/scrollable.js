/**
 * DevExtreme (cjs/renovation/ui/scroll_view/scrollable.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.defaultOptions = defaultOptions;
exports.Scrollable = exports.defaultOptionRules = exports.ScrollablePropsType = exports.viewFunction = void 0;
var _inferno = require("inferno");
var _vdom = require("@devextreme/vdom");
var _base_props = require("../common/base_props");
var _scrollable_props = require("./scrollable_props");
var _scrollable_native = require("./scrollable_native");
var _scrollable_simulated = require("./scrollable_simulated");
var _utils = require("../../../core/options/utils");
var _devices = _interopRequireDefault(require("../../../core/devices"));
var _support = require("../../../core/utils/support");
var _widget = require("../common/widget");
var _scrollable_simulated_props = require("./scrollable_simulated_props");
var _excluded = ["aria", "bounceEnabled", "children", "classes", "direction", "disabled", "forceGeneratePockets", "height", "inertiaEnabled", "needScrollViewContentWrapper", "needScrollViewLoadPanel", "onBounce", "onEnd", "onPullDown", "onReachBottom", "onScroll", "onStart", "onStop", "onUpdated", "pullDownEnabled", "pulledDownText", "pullingDownText", "reachBottomEnabled", "reachBottomText", "refreshingText", "rtlEnabled", "scrollByContent", "scrollByThumb", "showScrollbar", "updateManually", "useKeyboard", "useNative", "useSimulatedScrollbar", "visible", "width"];

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
    var _viewModel$props = viewModel.props,
        aria = _viewModel$props.aria,
        bounceEnabled = _viewModel$props.bounceEnabled,
        children = _viewModel$props.children,
        direction = _viewModel$props.direction,
        disabled = _viewModel$props.disabled,
        forceGeneratePockets = _viewModel$props.forceGeneratePockets,
        height = _viewModel$props.height,
        inertiaEnabled = _viewModel$props.inertiaEnabled,
        needScrollViewContentWrapper = _viewModel$props.needScrollViewContentWrapper,
        needScrollViewLoadPanel = _viewModel$props.needScrollViewLoadPanel,
        onBounce = _viewModel$props.onBounce,
        onEnd = _viewModel$props.onEnd,
        onPullDown = _viewModel$props.onPullDown,
        onReachBottom = _viewModel$props.onReachBottom,
        onScroll = _viewModel$props.onScroll,
        onStart = _viewModel$props.onStart,
        onStop = _viewModel$props.onStop,
        onUpdated = _viewModel$props.onUpdated,
        pullDownEnabled = _viewModel$props.pullDownEnabled,
        pulledDownText = _viewModel$props.pulledDownText,
        pullingDownText = _viewModel$props.pullingDownText,
        reachBottomEnabled = _viewModel$props.reachBottomEnabled,
        reachBottomText = _viewModel$props.reachBottomText,
        refreshingText = _viewModel$props.refreshingText,
        rtlEnabled = _viewModel$props.rtlEnabled,
        scrollByContent = _viewModel$props.scrollByContent,
        scrollByThumb = _viewModel$props.scrollByThumb,
        showScrollbar = _viewModel$props.showScrollbar,
        updateManually = _viewModel$props.updateManually,
        useKeyboard = _viewModel$props.useKeyboard,
        useNative = _viewModel$props.useNative,
        useSimulatedScrollbar = _viewModel$props.useSimulatedScrollbar,
        visible = _viewModel$props.visible,
        width = _viewModel$props.width,
        restAttributes = viewModel.restAttributes,
        scrollableNativeRef = viewModel.scrollableNativeRef,
        scrollableSimulatedRef = viewModel.scrollableSimulatedRef;
    return useNative ? (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _scrollable_native.ScrollableNative, _extends({
        aria: aria,
        width: width,
        height: height,
        disabled: disabled,
        visible: visible,
        rtlEnabled: rtlEnabled,
        direction: direction,
        showScrollbar: showScrollbar,
        scrollByThumb: scrollByThumb,
        updateManually: updateManually,
        pullDownEnabled: pullDownEnabled,
        reachBottomEnabled: reachBottomEnabled,
        forceGeneratePockets: forceGeneratePockets,
        needScrollViewContentWrapper: needScrollViewContentWrapper,
        needScrollViewLoadPanel: needScrollViewLoadPanel,
        onScroll: onScroll,
        onUpdated: onUpdated,
        onPullDown: onPullDown,
        onReachBottom: onReachBottom,
        pulledDownText: pulledDownText,
        pullingDownText: pullingDownText,
        refreshingText: refreshingText,
        reachBottomText: reachBottomText,
        useSimulatedScrollbar: useSimulatedScrollbar
    }, restAttributes, {
        children: children
    }), null, scrollableNativeRef)) : (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, _scrollable_simulated.ScrollableSimulated, _extends({
        aria: aria,
        width: width,
        height: height,
        disabled: disabled,
        visible: visible,
        rtlEnabled: rtlEnabled,
        direction: direction,
        showScrollbar: showScrollbar,
        scrollByThumb: scrollByThumb,
        updateManually: updateManually,
        pullDownEnabled: pullDownEnabled,
        reachBottomEnabled: reachBottomEnabled,
        forceGeneratePockets: forceGeneratePockets,
        needScrollViewContentWrapper: needScrollViewContentWrapper,
        needScrollViewLoadPanel: needScrollViewLoadPanel,
        onScroll: onScroll,
        onUpdated: onUpdated,
        onPullDown: onPullDown,
        onReachBottom: onReachBottom,
        pulledDownText: pulledDownText,
        pullingDownText: pullingDownText,
        refreshingText: refreshingText,
        reachBottomText: reachBottomText,
        inertiaEnabled: inertiaEnabled,
        bounceEnabled: bounceEnabled,
        scrollByContent: scrollByContent,
        useKeyboard: useKeyboard,
        onStart: onStart,
        onEnd: onEnd,
        onBounce: onBounce,
        onStop: onStop
    }, restAttributes, {
        children: children
    }), null, scrollableSimulatedRef))
};
exports.viewFunction = viewFunction;
var ScrollablePropsType = {
    useNative: _scrollable_props.ScrollableProps.useNative,
    direction: _scrollable_props.ScrollableProps.direction,
    showScrollbar: _scrollable_props.ScrollableProps.showScrollbar,
    bounceEnabled: _scrollable_props.ScrollableProps.bounceEnabled,
    scrollByContent: _scrollable_props.ScrollableProps.scrollByContent,
    scrollByThumb: _scrollable_props.ScrollableProps.scrollByThumb,
    updateManually: _scrollable_props.ScrollableProps.updateManually,
    pullDownEnabled: _scrollable_props.ScrollableProps.pullDownEnabled,
    reachBottomEnabled: _scrollable_props.ScrollableProps.reachBottomEnabled,
    forceGeneratePockets: _scrollable_props.ScrollableProps.forceGeneratePockets,
    needScrollViewContentWrapper: _scrollable_props.ScrollableProps.needScrollViewContentWrapper,
    needScrollViewLoadPanel: _scrollable_props.ScrollableProps.needScrollViewLoadPanel,
    aria: _widget.WidgetProps.aria,
    disabled: _base_props.BaseWidgetProps.disabled,
    visible: _base_props.BaseWidgetProps.visible,
    inertiaEnabled: _scrollable_simulated_props.ScrollableSimulatedProps.inertiaEnabled,
    useKeyboard: _scrollable_simulated_props.ScrollableSimulatedProps.useKeyboard
};
exports.ScrollablePropsType = ScrollablePropsType;
var defaultOptionRules = (0, _utils.createDefaultOptionRules)([{
    device: function(_device) {
        return !_devices.default.isSimulator() && "desktop" === _devices.default.real().deviceType && "generic" === _device.platform
    },
    options: {
        bounceEnabled: false,
        scrollByContent: _support.touch,
        scrollByThumb: true,
        showScrollbar: "onHover"
    }
}, {
    device: function() {
        return !_support.nativeScrolling
    },
    options: {
        useNative: false
    }
}]);
exports.defaultOptionRules = defaultOptionRules;
var Scrollable = function(_InfernoWrapperCompon) {
    _inheritsLoose(Scrollable, _InfernoWrapperCompon);

    function Scrollable(props) {
        var _this;
        _this = _InfernoWrapperCompon.call(this, props) || this;
        _this.state = {};
        _this.scrollableNativeRef = (0, _inferno.createRef)();
        _this.scrollableSimulatedRef = (0, _inferno.createRef)();
        _this.content = _this.content.bind(_assertThisInitialized(_this));
        _this.scrollBy = _this.scrollBy.bind(_assertThisInitialized(_this));
        _this.update = _this.update.bind(_assertThisInitialized(_this));
        _this.release = _this.release.bind(_assertThisInitialized(_this));
        _this.refresh = _this.refresh.bind(_assertThisInitialized(_this));
        _this.scrollTo = _this.scrollTo.bind(_assertThisInitialized(_this));
        _this.scrollToElement = _this.scrollToElement.bind(_assertThisInitialized(_this));
        _this.scrollHeight = _this.scrollHeight.bind(_assertThisInitialized(_this));
        _this.scrollWidth = _this.scrollWidth.bind(_assertThisInitialized(_this));
        _this.scrollOffset = _this.scrollOffset.bind(_assertThisInitialized(_this));
        _this.scrollTop = _this.scrollTop.bind(_assertThisInitialized(_this));
        _this.scrollLeft = _this.scrollLeft.bind(_assertThisInitialized(_this));
        _this.clientHeight = _this.clientHeight.bind(_assertThisInitialized(_this));
        _this.clientWidth = _this.clientWidth.bind(_assertThisInitialized(_this));
        _this.validate = _this.validate.bind(_assertThisInitialized(_this));
        _this.getScrollElementPosition = _this.getScrollElementPosition.bind(_assertThisInitialized(_this));
        return _this
    }
    var _proto = Scrollable.prototype;
    _proto.validate = function(e) {
        return this.scrollableRef.validate(e)
    };
    _proto.content = function() {
        return this.scrollableRef.content()
    };
    _proto.scrollBy = function(distance) {
        this.scrollableRef.scrollBy(distance)
    };
    _proto.update = function() {
        this.scrollableRef.update()
    };
    _proto.release = function() {
        return this.scrollableRef.release()
    };
    _proto.refresh = function() {
        this.scrollableRef.refresh()
    };
    _proto.scrollTo = function(targetLocation) {
        this.scrollableRef.scrollTo(targetLocation)
    };
    _proto.scrollToElement = function(element) {
        this.scrollableRef.scrollToElement(element)
    };
    _proto.scrollHeight = function() {
        return this.scrollableRef.scrollHeight()
    };
    _proto.scrollWidth = function() {
        return this.scrollableRef.scrollWidth()
    };
    _proto.scrollOffset = function() {
        return this.scrollableRef.scrollOffset()
    };
    _proto.scrollTop = function() {
        return this.scrollableRef.scrollTop()
    };
    _proto.scrollLeft = function() {
        return this.scrollableRef.scrollLeft()
    };
    _proto.clientHeight = function() {
        return this.scrollableRef.clientHeight()
    };
    _proto.clientWidth = function() {
        return this.scrollableRef.clientWidth()
    };
    _proto.getScrollElementPosition = function(element, direction) {
        return this.scrollableRef.getElementLocation(element, direction)
    };
    _proto.render = function() {
        var props = this.props;
        return viewFunction({
            props: _extends({}, props),
            scrollableNativeRef: this.scrollableNativeRef,
            scrollableSimulatedRef: this.scrollableSimulatedRef,
            validate: this.validate,
            scrollableRef: this.scrollableRef,
            restAttributes: this.restAttributes
        })
    };
    _createClass(Scrollable, [{
        key: "scrollableRef",
        get: function() {
            if (this.props.useNative) {
                return this.scrollableNativeRef.current
            }
            return this.scrollableSimulatedRef.current
        }
    }, {
        key: "restAttributes",
        get: function() {
            var _this$props = this.props,
                restProps = (_this$props.aria, _this$props.bounceEnabled, _this$props.children, _this$props.classes, _this$props.direction, _this$props.disabled, _this$props.forceGeneratePockets, _this$props.height, _this$props.inertiaEnabled, _this$props.needScrollViewContentWrapper, _this$props.needScrollViewLoadPanel, _this$props.onBounce, _this$props.onEnd, _this$props.onPullDown, _this$props.onReachBottom, _this$props.onScroll, _this$props.onStart, _this$props.onStop, _this$props.onUpdated, _this$props.pullDownEnabled, _this$props.pulledDownText, _this$props.pullingDownText, _this$props.reachBottomEnabled, _this$props.reachBottomText, _this$props.refreshingText, _this$props.rtlEnabled, _this$props.scrollByContent, _this$props.scrollByThumb, _this$props.showScrollbar, _this$props.updateManually, _this$props.useKeyboard, _this$props.useNative, _this$props.useSimulatedScrollbar, _this$props.visible, _this$props.width, _objectWithoutProperties(_this$props, _excluded));
            return restProps
        }
    }]);
    return Scrollable
}(_vdom.InfernoWrapperComponent);
exports.Scrollable = Scrollable;

function __createDefaultProps() {
    return _extends({}, ScrollablePropsType, (0, _utils.convertRulesToOptions)(defaultOptionRules))
}
Scrollable.defaultProps = __createDefaultProps();
var __defaultOptionRules = [];

function defaultOptions(rule) {
    __defaultOptionRules.push(rule);
    Scrollable.defaultProps = _extends({}, __createDefaultProps(), (0, _utils.convertRulesToOptions)(__defaultOptionRules))
}
