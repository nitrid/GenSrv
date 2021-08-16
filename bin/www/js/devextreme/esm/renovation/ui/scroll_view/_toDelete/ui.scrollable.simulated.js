/**
 * DevExtreme (esm/renovation/ui/scroll_view/_toDelete/ui.scrollable.simulated.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import Class from "../../core/class";
var SCROLLABLE_SIMULATED = "dxSimulatedScrollable";
var SCROLLABLE_STRATEGY = "dxScrollableStrategy";
var SCROLLABLE_SIMULATED_CURSOR = SCROLLABLE_SIMULATED + "Cursor";
var SCROLLABLE_SIMULATED_KEYBOARD = SCROLLABLE_SIMULATED + "Keyboard";
var SCROLLABLE_SIMULATED_CLASS = "dx-scrollable-simulated";
var hoveredScrollable;
var activeScrollable;
export var SimulatedStrategy = Class.inherit({
    _saveActive: function() {
        activeScrollable = this
    },
    _resetActive: function() {
        if (activeScrollable === this) {
            activeScrollable = null
        }
    },
    handleMove: function(e) {
        if (this._isLocked()) {
            this._resetActive();
            return
        }
        this._saveActive()
    },
    handleEnd: function(e) {
        this._resetActive();
        this._refreshCursorState(e.originalEvent && e.originalEvent.target)
    },
    handleCancel: function(e) {
        this._resetActive()
    },
    handleStop: function() {
        this._resetActive()
    },
    handleScroll: function() {
        this._component._updateRtlConfig()
    },
    _cursorEnterHandler: function(e) {
        e = e || {};
        e.originalEvent = e.originalEvent || {};
        if (activeScrollable || e.originalEvent._hoverHandled) {
            return
        }
        if (hoveredScrollable) {
            hoveredScrollable._cursorLeaveHandler()
        }
        hoveredScrollable = this;
        this._eventHandler("cursorEnter");
        e.originalEvent._hoverHandled = true
    },
    _cursorLeaveHandler: function(e) {
        if (hoveredScrollable !== this || activeScrollable === hoveredScrollable) {
            return
        }
        this._eventHandler("cursorLeave");
        hoveredScrollable = null;
        this._refreshCursorState(e && e.relatedTarget)
    },
    _refreshCursorState: function(target) {
        if (!this._isHoverMode() && (!target || activeScrollable)) {
            return
        }
        var $target = $(target);
        var $scrollable = $target.closest(".".concat(SCROLLABLE_SIMULATED_CLASS, ":not(.dx-state-disabled)"));
        var targetScrollable = $scrollable.length && $scrollable.data(SCROLLABLE_STRATEGY);
        if (hoveredScrollable && hoveredScrollable !== targetScrollable) {
            hoveredScrollable._cursorLeaveHandler()
        }
        if (targetScrollable) {
            targetScrollable._cursorEnterHandler()
        }
    },
    dispose: function() {
        this._resetActive();
        if (hoveredScrollable === this) {
            hoveredScrollable = null
        }
        this._eventHandler("dispose");
        this._detachEventHandlers();
        this._$element.removeClass(SCROLLABLE_SIMULATED_CLASS);
        this._eventForUserAction = null;
        clearTimeout(this._validateWheelTimer);
        clearTimeout(this._updateHandlerTimeout)
    },
    _detachEventHandlers: function() {
        eventsEngine.off(this._$element, ".".concat(SCROLLABLE_SIMULATED_CURSOR));
        eventsEngine.off(this._$container, ".".concat(SCROLLABLE_SIMULATED_KEYBOARD))
    }
});
