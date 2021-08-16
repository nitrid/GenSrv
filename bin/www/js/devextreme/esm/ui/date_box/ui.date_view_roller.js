/**
 * DevExtreme (esm/ui/date_box/ui.date_view_roller.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import $ from "../../core/renderer";
import eventsEngine from "../../events/core/events_engine";
import registerComponent from "../../core/component_registrator";
import {
    extend
} from "../../core/utils/extend";
import {
    each
} from "../../core/utils/iterator";
import {
    addNamespace
} from "../../events/utils/index";
import {
    name as clickEventName
} from "../../events/click";
import Scrollable from "../scroll_view/ui.scrollable";
import devices from "../../core/devices";
import fx from "../../animation/fx";
import {
    resetPosition
} from "../../animation/translator";
var DATEVIEW_ROLLER_CLASS = "dx-dateviewroller";
var DATEVIEW_ROLLER_ACTIVE_CLASS = "dx-state-active";
var DATEVIEW_ROLLER_CURRENT_CLASS = "dx-dateviewroller-current";
var DATEVIEW_ROLLER_ITEM_CLASS = "dx-dateview-item";
var DATEVIEW_ROLLER_ITEM_SELECTED_CLASS = "dx-dateview-item-selected";
var DATEVIEW_ROLLER_ITEM_SELECTED_FRAME_CLASS = "dx-dateview-item-selected-frame";
var DATEVIEW_ROLLER_ITEM_SELECTED_BORDER_CLASS = "dx-dateview-item-selected-border";
var DateViewRoller = Scrollable.inherit({
    _getDefaultOptions: function() {
        return extend(this.callBase(), {
            showScrollbar: false,
            useNative: false,
            selectedIndex: 0,
            bounceEnabled: false,
            items: [],
            showOnClick: false,
            onClick: null,
            onSelectedIndexChanged: null
        })
    },
    _defaultOptionsRules: function() {
        return this.callBase().concat([{
            device: {
                platform: "generic"
            },
            options: {
                scrollByContent: true
            }
        }])
    },
    _init: function() {
        this.callBase();
        this._renderSelectedItemFrame()
    },
    _render: function() {
        this.callBase();
        this.$element().addClass(DATEVIEW_ROLLER_CLASS);
        this._renderContainerClick();
        this._renderItems();
        this._renderSelectedValue();
        this._renderItemsClick();
        this._renderWheelEvent();
        this._wrapAction("_endAction", this._endActionHandler.bind(this));
        this._renderSelectedIndexChanged()
    },
    _renderSelectedIndexChanged: function() {
        this._selectedIndexChanged = this._createActionByOption("onSelectedIndexChanged")
    },
    _renderWheelEvent: function() {
        eventsEngine.on(this._$container, "dxmousewheel", e => {
            this._isWheelScrolled = true
        })
    },
    _renderContainerClick: function() {
        if (!this.option("showOnClick")) {
            return
        }
        var eventName = addNamespace(clickEventName, this.NAME);
        var clickAction = this._createActionByOption("onClick");
        eventsEngine.off(this._$container, eventName);
        eventsEngine.on(this._$container, eventName, (function(e) {
            clickAction({
                event: e
            })
        }))
    },
    _wrapAction: function(actionName, callback) {
        var strategy = this._strategy;
        var originalAction = strategy[actionName];
        strategy[actionName] = function() {
            callback.apply(this, arguments);
            return originalAction.apply(this, arguments)
        }
    },
    _renderItems: function() {
        var items = this.option("items") || [];
        var $items = $();
        this._$content.empty();
        items.forEach((function(item) {
            $items = $items.add($("<div>").addClass(DATEVIEW_ROLLER_ITEM_CLASS).append(item))
        }));
        this._$content.append($items);
        this._$items = $items;
        this.update()
    },
    _renderSelectedItemFrame: function() {
        $("<div>").addClass(DATEVIEW_ROLLER_ITEM_SELECTED_FRAME_CLASS).append($("<div>").addClass(DATEVIEW_ROLLER_ITEM_SELECTED_BORDER_CLASS)).appendTo(this._$container)
    },
    _renderSelectedValue: function(selectedIndex) {
        var index = this._fitIndex(null !== selectedIndex && void 0 !== selectedIndex ? selectedIndex : this.option("selectedIndex"));
        this._moveTo({
            top: this._getItemPosition(index)
        });
        this._renderActiveStateItem()
    },
    _fitIndex: function(index) {
        var items = this.option("items") || [];
        var itemCount = items.length;
        if (index >= itemCount) {
            return itemCount - 1
        }
        if (index < 0) {
            return 0
        }
        return index
    },
    _getItemPosition: function(index) {
        return Math.round(this._itemHeight() * index)
    },
    _renderItemsClick: function() {
        var itemSelector = this._getItemSelector();
        var eventName = addNamespace(clickEventName, this.NAME);
        eventsEngine.off(this.$element(), eventName, itemSelector);
        eventsEngine.on(this.$element(), eventName, itemSelector, this._itemClickHandler.bind(this))
    },
    _getItemSelector: function() {
        return "." + DATEVIEW_ROLLER_ITEM_CLASS
    },
    _itemClickHandler: function(e) {
        this.option("selectedIndex", this._itemElementIndex(e.currentTarget))
    },
    _itemElementIndex: function(itemElement) {
        return this._itemElements().index(itemElement)
    },
    _itemElements: function() {
        return this.$element().find(this._getItemSelector())
    },
    _renderActiveStateItem: function() {
        var selectedIndex = this.option("selectedIndex");
        each(this._$items, (function(index) {
            $(this).toggleClass(DATEVIEW_ROLLER_ITEM_SELECTED_CLASS, selectedIndex === index)
        }))
    },
    _shouldScrollToNeighborItem: function() {
        return "desktop" === devices.real().deviceType && this._isWheelScrolled
    },
    _moveTo: function(targetLocation) {
        targetLocation = this._normalizeLocation(targetLocation);
        var location = this._location();
        var delta = {
            x: -(location.left - targetLocation.left),
            y: -(location.top - targetLocation.top)
        };
        if (this._isVisible() && (delta.x || delta.y)) {
            this._strategy._prepareDirections(true);
            if (this._animation && !this._shouldScrollToNeighborItem()) {
                var that = this;
                fx.stop(this._$content);
                fx.animate(this._$content, {
                    duration: 200,
                    type: "slide",
                    to: {
                        top: Math.floor(delta.y)
                    },
                    complete: function() {
                        resetPosition(that._$content);
                        that._strategy.handleMove({
                            delta: delta
                        })
                    }
                });
                delete this._animation
            } else {
                this._strategy.handleMove({
                    delta: delta
                })
            }
        }
    },
    _validate: function(e) {
        return this._strategy.validate(e)
    },
    _fitSelectedIndexInRange: function(index) {
        var itemsCount = this.option("items").length;
        return Math.max(Math.min(index, itemsCount - 1), 0)
    },
    _isInNullNeighborhood: function(x) {
        return -.1 <= x && x <= .1
    },
    _getSelectedIndexAfterScroll: function(currentSelectedIndex) {
        var locationTop = -this._location().top;
        var currentSelectedIndexPosition = currentSelectedIndex * this._itemHeight();
        var dy = locationTop - currentSelectedIndexPosition;
        if (this._isInNullNeighborhood(dy)) {
            return currentSelectedIndex
        }
        var direction = dy > 0 ? 1 : -1;
        var newSelectedIndex = this._fitSelectedIndexInRange(currentSelectedIndex + direction);
        return newSelectedIndex
    },
    _getNewSelectedIndex: function(currentSelectedIndex) {
        if (this._shouldScrollToNeighborItem()) {
            return this._getSelectedIndexAfterScroll(currentSelectedIndex)
        }
        this._animation = true;
        var ratio = -this._location().top / this._itemHeight();
        return Math.round(ratio)
    },
    _endActionHandler: function() {
        var currentSelectedIndex = this.option("selectedIndex");
        var newSelectedIndex = this._getNewSelectedIndex(currentSelectedIndex);
        if (newSelectedIndex === currentSelectedIndex) {
            this._renderSelectedValue(newSelectedIndex)
        } else {
            this.option("selectedIndex", newSelectedIndex)
        }
        this._isWheelScrolled = false
    },
    _itemHeight: function() {
        var $item = this._$items.first();
        return $item.height()
    },
    _toggleActive: function(state) {
        this.$element().toggleClass(DATEVIEW_ROLLER_ACTIVE_CLASS, state)
    },
    _isVisible: function() {
        return this._$container.is(":visible")
    },
    _fireSelectedIndexChanged: function(value, previousValue) {
        this._selectedIndexChanged({
            value: value,
            previousValue: previousValue,
            event: void 0
        })
    },
    _visibilityChanged: function(visible) {
        this.callBase(visible);
        if (visible) {
            this._renderSelectedValue(this.option("selectedIndex"))
        }
        this.toggleActiveState(false)
    },
    toggleActiveState: function(state) {
        this.$element().toggleClass(DATEVIEW_ROLLER_CURRENT_CLASS, state)
    },
    _refreshSelectedIndex: function() {
        var selectedIndex = this.option("selectedIndex");
        var fitIndex = this._fitIndex(selectedIndex);
        if (fitIndex === selectedIndex) {
            this._renderActiveStateItem()
        } else {
            this.option("selectedIndex", fitIndex)
        }
    },
    _optionChanged: function(args) {
        switch (args.name) {
            case "selectedIndex":
                this._fireSelectedIndexChanged(args.value, args.previousValue);
                this._renderSelectedValue(args.value);
                break;
            case "items":
                this._renderItems();
                this._refreshSelectedIndex();
                break;
            case "onClick":
            case "showOnClick":
                this._renderContainerClick();
                break;
            case "onSelectedIndexChanged":
                this._renderSelectedIndexChanged();
                break;
            default:
                this.callBase(args)
        }
    }
});
registerComponent("dxDateViewRoller", DateViewRoller);
export default DateViewRoller;
