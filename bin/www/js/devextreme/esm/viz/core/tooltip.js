/**
 * DevExtreme (esm/viz/core/tooltip.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import domAdapter from "../../core/dom_adapter";
import {
    getWindow
} from "../../core/utils/window";
import {
    camelize
} from "../../core/utils/inflector";
import $ from "../../core/renderer";
import {
    Renderer
} from "./renderers/renderer";
import {
    isFunction,
    isPlainObject,
    isDefined
} from "../../core/utils/type";
import {
    extend
} from "../../core/utils/extend";
import {
    patchFontOptions,
    normalizeEnum
} from "./utils";
import formatHelper from "../../format_helper";
import {
    Plaque
} from "./plaque";
var format = formatHelper.format;
var mathCeil = Math.ceil;
var mathMax = Math.max;
var mathMin = Math.min;
var window = getWindow();
var DEFAULT_HTML_GROUP_WIDTH = 3e3;

function hideElement($element) {
    $element.css({
        left: "-9999px"
    }).detach()
}

function getSpecialFormatOptions(options, specialFormat) {
    var result = options;
    switch (specialFormat) {
        case "argument":
            result = {
                format: options.argumentFormat
            };
            break;
        case "percent":
            result = {
                format: {
                    type: "percent",
                    precision: options.format && options.format.percentPrecision
                }
            }
    }
    return result
}
export var Tooltip = function(params) {
    var renderer;
    this._eventTrigger = params.eventTrigger;
    this._widgetRoot = params.widgetRoot;
    this._widget = params.widget;
    this._wrapper = $("<div>").css({
        position: "absolute",
        overflow: "hidden",
        pointerEvents: "none"
    }).addClass(params.cssClass);
    this._renderer = renderer = new Renderer({
        pathModified: params.pathModified,
        container: this._wrapper[0]
    });
    var root = renderer.root;
    root.attr({
        "pointer-events": "none"
    });
    this._text = renderer.text(void 0, 0, 0);
    this._textGroupHtml = $("<div>").css({
        position: "absolute",
        padding: 0,
        margin: 0,
        border: "0px solid transparent"
    }).appendTo(this._wrapper);
    this._textHtml = $("<div>").css({
        position: "relative",
        display: "inline-block",
        padding: 0,
        margin: 0,
        border: "0px solid transparent"
    }).appendTo(this._textGroupHtml)
};
Tooltip.prototype = {
    constructor: Tooltip,
    dispose: function() {
        this._wrapper.remove();
        this._renderer.dispose();
        this._options = this._widgetRoot = null
    },
    _getContainer: function() {
        var options = this._options;
        var container = $(this._widgetRoot).closest(options.container);
        if (0 === container.length) {
            container = $(options.container)
        }
        return (container.length ? container : $("body")).get(0)
    },
    setTemplate(contentTemplate) {
        this._template = contentTemplate ? this._widget._getTemplate(contentTemplate) : null
    },
    setOptions: function(options) {
        options = options || {};
        var that = this;
        that._options = options;
        that._textFontStyles = patchFontOptions(options.font);
        that._textFontStyles.color = that._textFontStyles.fill;
        that._wrapper.css({
            zIndex: options.zIndex
        });
        that._customizeTooltip = options.customizeTooltip;
        var textGroupHtml = that._textGroupHtml;
        var textHtml = that._textHtml;
        if (this.plaque) {
            this.plaque.clear()
        }
        this.setTemplate(options.contentTemplate);
        var pointerEvents = options.interactive ? "auto" : "none";
        if (options.interactive) {
            this._renderer.root.css({
                "-ms-user-select": "auto",
                "-moz-user-select": "auto",
                "-webkit-user-select": "auto"
            })
        }
        this.plaque = new Plaque({
            opacity: that._options.opacity,
            color: that._options.color,
            border: that._options.border,
            paddingLeftRight: that._options.paddingLeftRight,
            paddingTopBottom: that._options.paddingTopBottom,
            arrowLength: that._options.arrowLength,
            arrowWidth: 20,
            shadow: that._options.shadow,
            cornerRadius: that._options.cornerRadius
        }, that, that._renderer.root, _ref => {
            var {
                group: group,
                onRender: onRender,
                eventData: eventData,
                isMoving: isMoving,
                templateCallback: templateCallback = (() => {})
            } = _ref;
            var state = that._state;
            if (!isMoving) {
                var template = that._template;
                var useTemplate = template && !state.formatObject.skipTemplate;
                if (state.html || useTemplate) {
                    textGroupHtml.css({
                        color: state.textColor,
                        width: DEFAULT_HTML_GROUP_WIDTH,
                        pointerEvents: pointerEvents
                    });
                    if (useTemplate) {
                        template.render({
                            model: state.formatObject,
                            container: textHtml,
                            onRendered: () => {
                                state.html = textHtml.html();
                                if (0 === textHtml.width() && 0 === textHtml.height()) {
                                    this.plaque.clear();
                                    templateCallback(false);
                                    return
                                }
                                onRender();
                                that._riseEvents(eventData);
                                that._moveWrapper();
                                that.plaque.customizeCloud({
                                    fill: state.color,
                                    stroke: state.borderColor,
                                    "pointer-events": pointerEvents
                                });
                                templateCallback(true)
                            }
                        });
                        return
                    } else {
                        that._text.attr({
                            text: ""
                        });
                        textHtml.html(state.html)
                    }
                } else {
                    that._text.css({
                        fill: state.textColor
                    }).attr({
                        text: state.text,
                        class: options.cssClass,
                        "pointer-events": pointerEvents
                    }).append(group.attr({
                        align: options.textAlignment
                    }))
                }
                that._riseEvents(eventData);
                that.plaque.customizeCloud({
                    fill: state.color,
                    stroke: state.borderColor,
                    "pointer-events": pointerEvents
                })
            }
            onRender();
            that._moveWrapper();
            return true
        }, true, (tooltip, g) => {
            var state = tooltip._state;
            if (state.html) {
                var bBox;
                var getComputedStyle = window.getComputedStyle;
                if (getComputedStyle) {
                    bBox = getComputedStyle(textHtml.get(0));
                    bBox = {
                        x: 0,
                        y: 0,
                        width: mathCeil(parseFloat(bBox.width)),
                        height: mathCeil(parseFloat(bBox.height))
                    }
                } else {
                    bBox = textHtml.get(0).getBoundingClientRect();
                    bBox = {
                        x: 0,
                        y: 0,
                        width: mathCeil(bBox.width ? bBox.width : bBox.right - bBox.left),
                        height: mathCeil(bBox.height ? bBox.height : bBox.bottom - bBox.top)
                    }
                }
                return bBox
            }
            return g.getBBox()
        }, (tooltip, g, x, y) => {
            var state = tooltip._state;
            if (state.html) {
                that._textGroupHtml.css({
                    left: x,
                    top: y
                })
            } else {
                g.move(x, y)
            }
        });
        return that
    },
    _riseEvents: function(eventData) {
        this._eventData && this._eventTrigger("tooltipHidden", this._eventData);
        this._eventData = eventData;
        this._eventTrigger("tooltipShown", this._eventData)
    },
    setRendererOptions: function(options) {
        this._renderer.setOptions(options);
        this._textGroupHtml.css({
            direction: options.rtl ? "rtl" : "ltr"
        });
        return this
    },
    update: function(options) {
        this.setOptions(options);
        hideElement(this._wrapper);
        var normalizedCSS = {};
        for (var name in this._textFontStyles) {
            normalizedCSS[camelize(name)] = this._textFontStyles[name]
        }
        this._textGroupHtml.css(normalizedCSS);
        this._text.css(this._textFontStyles);
        this._eventData = null;
        return this
    },
    _prepare: function(formatObject, state) {
        var customizeTooltip = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : this._customizeTooltip;
        var options = this._options;
        var customize = {};
        if (isFunction(customizeTooltip)) {
            customize = customizeTooltip.call(formatObject, formatObject);
            customize = isPlainObject(customize) ? customize : {};
            if ("text" in customize) {
                state.text = isDefined(customize.text) ? String(customize.text) : ""
            }
            if ("html" in customize) {
                state.html = isDefined(customize.html) ? String(customize.html) : ""
            }
        }
        if (!("text" in state) && !("html" in state)) {
            state.text = formatObject.valueText || formatObject.description || ""
        }
        state.color = customize.color || options.color;
        state.borderColor = customize.borderColor || (options.border || {}).color;
        state.textColor = customize.fontColor || (this._textFontStyles || {}).color;
        return !!state.text || !!state.html || !!this._template
    },
    show: function(formatObject, params, eventData, customizeTooltip, templateCallback) {
        if (this._options.forceEvents) {
            eventData.x = params.x;
            eventData.y = params.y - params.offset;
            this._riseEvents(eventData);
            return true
        }
        var state = {
            formatObject: formatObject,
            eventData: eventData,
            templateCallback: templateCallback
        };
        if (!this._prepare(formatObject, state, customizeTooltip)) {
            return false
        }
        this._state = state;
        this._wrapper.appendTo(this._getContainer());
        this._clear();
        var parameters = extend({}, this._options, {
            canvas: this._getCanvas()
        }, state, {
            x: params.x,
            y: params.y,
            offset: params.offset
        });
        return this.plaque.clear().draw(parameters)
    },
    isCursorOnTooltip: function(x, y) {
        if (this._options.interactive) {
            var box = this.plaque.getBBox();
            return x > box.x && x < box.x + box.width && y > box.y && y < box.y + box.height
        }
        return false
    },
    hide: function() {
        hideElement(this._wrapper);
        if (this._eventData) {
            this._eventTrigger("tooltipHidden", this._eventData);
            this._clear();
            this._eventData = null
        }
    },
    _clear() {
        this._textHtml.empty()
    },
    move: function(x, y, offset) {
        this.plaque.draw({
            x: x,
            y: y,
            offset: offset,
            canvas: this._getCanvas(),
            isMoving: true
        })
    },
    _moveWrapper: function() {
        var plaqueBBox = this.plaque.getBBox();
        this._renderer.resize(plaqueBBox.width, plaqueBBox.height);
        var offset = this._wrapper.css({
            left: 0,
            top: 0
        }).offset();
        var left = plaqueBBox.x;
        var top = plaqueBBox.y;
        this._wrapper.css({
            left: left - offset.left,
            top: top - offset.top
        });
        this.plaque.moveRoot(-left, -top);
        if (this._state.html) {
            this._textHtml.css({
                left: -left,
                top: -top
            });
            this._textGroupHtml.css({
                width: mathCeil(this._textHtml.width())
            })
        }
    },
    formatValue: function(value, _specialFormat) {
        var options = _specialFormat ? getSpecialFormatOptions(this._options, _specialFormat) : this._options;
        return format(value, options.format)
    },
    getLocation: function() {
        return normalizeEnum(this._options.location)
    },
    isEnabled: function() {
        return !!this._options.enabled || !!this._options.forceEvents
    },
    isShared: function() {
        return !!this._options.shared
    },
    _getCanvas: function() {
        var container = this._getContainer();
        var containerBox = container.getBoundingClientRect();
        var html = domAdapter.getDocumentElement();
        var document = domAdapter.getDocument();
        var left = window.pageXOffset || html.scrollLeft || 0;
        var top = window.pageYOffset || html.scrollTop || 0;
        var box = {
            left: left,
            top: top,
            width: mathMax(html.clientWidth, document.body.clientWidth) + left,
            height: mathMax(document.body.scrollHeight, html.scrollHeight, document.body.offsetHeight, html.offsetHeight, document.body.clientHeight, html.clientHeight),
            right: 0,
            bottom: 0
        };
        if (container !== domAdapter.getBody()) {
            left = mathMax(box.left, box.left + containerBox.left);
            top = mathMax(box.top, box.top + containerBox.top);
            box.width = mathMin(containerBox.width, box.width) + left + box.left;
            box.height = mathMin(containerBox.height, box.height) + top + box.top;
            box.left = left;
            box.top = top
        }
        return box
    }
};
export var plugin = {
    name: "tooltip",
    init: function() {
        this._initTooltip()
    },
    dispose: function() {
        this._disposeTooltip()
    },
    members: {
        _initTooltip: function() {
            this._tooltip = new Tooltip({
                cssClass: this._rootClassPrefix + "-tooltip",
                eventTrigger: this._eventTrigger,
                pathModified: this.option("pathModified"),
                widgetRoot: this.element(),
                widget: this
            })
        },
        _disposeTooltip: function() {
            this._tooltip.dispose();
            this._tooltip = null
        },
        _setTooltipRendererOptions: function() {
            this._tooltip.setRendererOptions(this._getRendererOptions())
        },
        _setTooltipOptions: function() {
            this._tooltip.update(this._getOption("tooltip"))
        }
    },
    extenders: {
        _stopCurrentHandling() {
            this._tooltip && this._tooltip.hide()
        }
    },
    customize: function(constructor) {
        var proto = constructor.prototype;
        proto._eventsMap.onTooltipShown = {
            name: "tooltipShown"
        };
        proto._eventsMap.onTooltipHidden = {
            name: "tooltipHidden"
        };
        constructor.addChange({
            code: "TOOLTIP_RENDERER",
            handler: function() {
                this._setTooltipRendererOptions()
            },
            isThemeDependent: true,
            isOptionChange: true
        });
        constructor.addChange({
            code: "TOOLTIP",
            handler: function() {
                this._setTooltipOptions()
            },
            isThemeDependent: true,
            isOptionChange: true,
            option: "tooltip"
        })
    },
    fontFields: ["tooltip.font"]
};
