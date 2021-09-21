/**
 * DevExtreme (cjs/ui/gantt/ui.gantt.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _renderer = _interopRequireDefault(require("../../core/renderer"));
var _data = require("../../core/utils/data");
var _extend = require("../../core/utils/extend");
var _window = require("../../core/utils/window");
var _type = require("../../core/utils/type");
var _uiGantt = require("./ui.gantt.model_changes_listener");
var _uiGanttData = _interopRequireDefault(require("./ui.gantt.data.option"));
var _load_panel = _interopRequireDefault(require("../load_panel"));
var _component_registrator = _interopRequireDefault(require("../../core/component_registrator"));
var _splitter = _interopRequireDefault(require("../splitter"));
var _ui = _interopRequireDefault(require("../widget/ui.widget"));
var _uiGantt2 = require("./ui.gantt.actions");
var _uiGantt3 = require("./ui.gantt.custom_fields");
var _uiGantt4 = require("./ui.gantt.dialogs");
var _uiGantt5 = require("./ui.gantt.export_helper");
var _uiGantt6 = require("./ui.gantt.helper");
var _uiGantt7 = require("./ui.gantt.mapping_helper");
var _uiGantt8 = require("./ui.gantt.size_helper");
var _uiGantt9 = require("./ui.gantt.templates");
var _uiGantt10 = require("./ui.gantt.bars");
var _uiGantt11 = require("./ui.gantt.treelist");
var _uiGantt12 = require("./ui.gantt.view");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
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
var window = (0, _window.getWindow)();
var GANTT_CLASS = "dx-gantt";
var GANTT_VIEW_CLASS = "dx-gantt-view";
var GANTT_TREE_LIST_WRAPPER = "dx-gantt-treelist-wrapper";
var GANTT_TOOLBAR_WRAPPER = "dx-gantt-toolbar-wrapper";
var GANTT_MAIN_WRAPPER = "dx-gantt-main-wrapper";
var GANTT_TASKS = "tasks";
var GANTT_DEPENDENCIES = "dependencies";
var GANTT_RESOURCES = "resources";
var GANTT_RESOURCE_ASSIGNMENTS = "resourceAssignments";
var GANTT_NEW_TASK_CACHE_KEY = "gantt_new_task_key";
var Gantt = function(_Widget) {
    _inheritsLoose(Gantt, _Widget);

    function Gantt() {
        return _Widget.apply(this, arguments) || this
    }
    var _proto = Gantt.prototype;
    _proto._init = function() {
        _Widget.prototype._init.call(this);
        this._isGanttRendered = false;
        this._initHelpers()
    };
    _proto._initMarkup = function() {
        _Widget.prototype._initMarkup.call(this);
        this.$element().addClass(GANTT_CLASS);
        this._$toolbarWrapper = (0, _renderer.default)("<div>").addClass(GANTT_TOOLBAR_WRAPPER).appendTo(this.$element());
        this._$toolbar = (0, _renderer.default)("<div>").appendTo(this._$toolbarWrapper);
        this._$mainWrapper = (0, _renderer.default)("<div>").addClass(GANTT_MAIN_WRAPPER).appendTo(this.$element());
        this._$treeListWrapper = (0, _renderer.default)("<div>").addClass(GANTT_TREE_LIST_WRAPPER).appendTo(this._$mainWrapper);
        this._$treeList = (0, _renderer.default)("<div>").appendTo(this._$treeListWrapper);
        this._$splitter = (0, _renderer.default)("<div>").appendTo(this._$mainWrapper);
        this._$ganttView = (0, _renderer.default)("<div>").addClass(GANTT_VIEW_CLASS).appendTo(this._$mainWrapper);
        this._$dialog = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._$loadPanel = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._$contextMenu = (0, _renderer.default)("<div>").appendTo(this.$element());
        this._refreshDataSource(GANTT_TASKS);
        this._refreshDataSource(GANTT_DEPENDENCIES);
        this._refreshDataSource(GANTT_RESOURCES);
        this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS)
    };
    _proto._clean = function() {
        var _this$_ganttView;
        null === (_this$_ganttView = this._ganttView) || void 0 === _this$_ganttView ? void 0 : _this$_ganttView._ganttViewCore.cleanMarkup();
        delete this._ganttView;
        delete this._dialogInstance;
        delete this._loadPanel;
        _Widget.prototype._clean.call(this)
    };
    _proto._refresh = function() {
        this._isGanttRendered = false;
        _Widget.prototype._refresh.call(this)
    };
    _proto._renderContent = function() {
        this._isMainElementVisible = this.$element().is(":visible");
        if (this._isMainElementVisible && !this._isGanttRendered) {
            this._isGanttRendered = true;
            this._renderBars();
            this._renderTreeList();
            this._renderSplitter()
        }
    };
    _proto._renderTreeList = function() {
        this._ganttTreeList = new _uiGantt11.GanttTreeList(this);
        this._treeList = this._ganttTreeList.getTreeList();
        this._ganttTreeList.onAfterTreeListCreate()
    };
    _proto._renderSplitter = function() {
        var _this = this;
        this._splitter = this._createComponent(this._$splitter, _splitter.default, {
            container: this.$element(),
            leftElement: this._$treeListWrapper,
            rightElement: this._$ganttView,
            onApplyPanelSize: function(e) {
                _this._sizeHelper.onApplyPanelSize(e)
            }
        });
        this._splitter.option("initialLeftPanelWidth", this.option("taskListWidth"))
    };
    _proto._renderBars = function() {
        this._bars = [];
        this._toolbar = new _uiGantt10.GanttToolbar(this._$toolbar, this);
        this._updateToolbarContent();
        this._bars.push(this._toolbar);
        this._contextMenuBar = new _uiGantt10.GanttContextMenuBar(this._$contextMenu, this);
        this._updateContextMenu();
        this._bars.push(this._contextMenuBar)
    };
    _proto._initHelpers = function() {
        this._mappingHelper = new _uiGantt7.GanttMappingHelper(this);
        this._customFieldsManager = new _uiGantt3.GanttCustomFieldsManager(this);
        this._actionsManager = new _uiGantt2.GanttActionsManager(this);
        this._ganttTemplatesManager = new _uiGantt9.GanttTemplatesManager(this);
        this._sizeHelper = new _uiGantt8.GanttSizeHelper(this)
    };
    _proto._initGanttView = function() {
        var _this2 = this;
        if (this._ganttView) {
            return
        }
        this._ganttView = this._createComponent(this._$ganttView, _uiGantt12.GanttView, {
            width: "100%",
            height: this._ganttTreeList.getOffsetHeight(),
            rowHeight: this._ganttTreeList.getRowHeight(),
            headerHeight: this._ganttTreeList.getHeaderHeight(),
            tasks: this._tasks,
            dependencies: this._dependencies,
            resources: this._resources,
            resourceAssignments: this._resourceAssignments,
            allowSelection: this.option("allowSelection"),
            selectedRowKey: this.option("selectedRowKey"),
            showResources: this.option("showResources"),
            taskTitlePosition: this.option("taskTitlePosition"),
            firstDayOfWeek: this.option("firstDayOfWeek"),
            showRowLines: this.option("showRowLines"),
            scaleType: this.option("scaleType"),
            editing: this.option("editing"),
            validation: this.option("validation"),
            stripLines: this.option("stripLines"),
            bars: this._bars,
            mainElement: this.$element(),
            onSelectionChanged: function(e) {
                _this2._ganttTreeList.selectRows(_uiGantt6.GanttHelper.getArrayFromOneElement(e.id))
            },
            onScroll: function(e) {
                _this2._ganttTreeList.scrollBy(e.scrollTop)
            },
            onDialogShowing: this._showDialog.bind(this),
            onPopupMenuShowing: this._showPopupMenu.bind(this),
            onExpandAll: this._expandAll.bind(this),
            onCollapseAll: this._collapseAll.bind(this),
            modelChangesListener: _uiGantt.ModelChangesListener.create(this),
            exportHelper: this._getExportHelper(),
            taskTooltipContentTemplate: this._ganttTemplatesManager.getTaskTooltipContentTemplateFunc(this.option("taskTooltipContentTemplate")),
            taskProgressTooltipContentTemplate: this._ganttTemplatesManager.getTaskProgressTooltipContentTemplateFunc(this.option("taskProgressTooltipContentTemplate")),
            taskTimeTooltipContentTemplate: this._ganttTemplatesManager.getTaskTimeTooltipContentTemplateFunc(this.option("taskTimeTooltipContentTemplate")),
            taskContentTemplate: this._ganttTemplatesManager.getTaskContentTemplateFunc(this.option("taskContentTemplate")),
            onTaskClick: function(e) {
                _this2._ganttTreeList.onRowClick(e)
            },
            onTaskDblClick: function(e) {
                _this2._ganttTreeList.onRowDblClick(e)
            },
            onAdjustControl: function() {
                _this2._sizeHelper.onAdjustControl()
            }
        });
        this._fireContentReadyAction()
    };
    _proto._refreshDataSource = function(name) {
        var _this3 = this;
        var dataOption = this["_".concat(name, "Option")];
        if (dataOption) {
            dataOption.dispose();
            delete this["_".concat(name, "Option")];
            delete this["_".concat(name)]
        }
        dataOption = new _uiGanttData.default(name, this._getLoadPanel(), (function(name, data) {
            _this3._dataSourceChanged(name, data)
        }));
        dataOption.option("dataSource", this._getSpecificDataSourceOption(name));
        dataOption._refreshDataSource();
        this["_".concat(name, "Option")] = dataOption
    };
    _proto._getSpecificDataSourceOption = function(name) {
        var dataSource = this.option("".concat(name, ".dataSource"));
        if (!dataSource || Array.isArray(dataSource)) {
            return {
                store: {
                    type: "array",
                    data: null !== dataSource && void 0 !== dataSource ? dataSource : [],
                    key: this.option("".concat(name, ".keyExpr"))
                }
            }
        }
        return dataSource
    };
    _proto._dataSourceChanged = function(dataSourceName, data) {
        var _this4 = this;
        var getters = _uiGantt6.GanttHelper.compileGettersByOption(this.option(dataSourceName));
        var validatedData = this._validateSourceData(dataSourceName, data);
        var mappedData = validatedData.map(_uiGantt6.GanttHelper.prepareMapHandler(getters));
        this["_".concat(dataSourceName)] = mappedData;
        this._setGanttViewOption(dataSourceName, mappedData);
        if (dataSourceName === GANTT_TASKS) {
            var _this$_ganttTreeList, _this$_ganttTreeList2;
            this._tasksRaw = validatedData;
            var expandedRowKeys = validatedData.map((function(t) {
                return t[_this4.option("tasks.parentIdExpr")]
            })).filter((function(value, index, self) {
                return value && self.indexOf(value) === index
            }));
            null === (_this$_ganttTreeList = this._ganttTreeList) || void 0 === _this$_ganttTreeList ? void 0 : _this$_ganttTreeList.setOption("expandedRowKeys", expandedRowKeys);
            null === (_this$_ganttTreeList2 = this._ganttTreeList) || void 0 === _this$_ganttTreeList2 ? void 0 : _this$_ganttTreeList2.updateDataSource(validatedData)
        }
    };
    _proto._validateSourceData = function(dataSourceName, data) {
        return data && dataSourceName === GANTT_TASKS ? this._validateTaskData(data) : data
    };
    _proto._validateTaskData = function(data) {
        var _this$option;
        var keyGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")));
        var parentIdGetter = (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".parentIdExpr")));
        var rootValue = null !== (_this$option = this.option("rootValue")) && void 0 !== _this$option ? _this$option : "dx_dxt_gantt_default_root_value";
        var validationTree = {};
        for (var i = 0; i < data.length; i++) {
            var item = data[i];
            if (item) {
                var _validationTree$key;
                var key = keyGetter(item);
                var isRootTask = key === rootValue;
                var treeItem = null !== (_validationTree$key = validationTree[key]) && void 0 !== _validationTree$key ? _validationTree$key : validationTree[key] = {
                    key: key,
                    children: []
                };
                if (!isRootTask) {
                    var _parentIdGetter, _validationTree$paren;
                    var parentId = null !== (_parentIdGetter = parentIdGetter(item)) && void 0 !== _parentIdGetter ? _parentIdGetter : rootValue;
                    var parentTreeItem = null !== (_validationTree$paren = validationTree[parentId]) && void 0 !== _validationTree$paren ? _validationTree$paren : validationTree[parentId] = {
                        key: parentId,
                        children: []
                    };
                    parentTreeItem.children.push(treeItem);
                    treeItem.parent = parentTreeItem
                }
            }
        }
        var validKeys = [rootValue];
        this._appendChildKeys(validationTree[rootValue], validKeys);
        return data.filter((function(item) {
            return validKeys.indexOf(keyGetter(item)) > -1
        }))
    };
    _proto._appendChildKeys = function(treeItem, keys) {
        var children = null === treeItem || void 0 === treeItem ? void 0 : treeItem.children;
        for (var i = 0; i < (null === children || void 0 === children ? void 0 : children.length); i++) {
            var child = children[i];
            keys.push(child.key);
            this._appendChildKeys(child, keys)
        }
    };
    _proto._onRecordInserted = function(optionName, record, callback) {
        var _this5 = this;
        var dataOption = this["_".concat(optionName, "Option")];
        if (dataOption) {
            var data = _uiGantt6.GanttHelper.getStoreObject(this.option(optionName), record);
            var isTaskInsert = optionName === GANTT_TASKS;
            if (isTaskInsert) {
                this._customFieldsManager.addCustomFieldsDataFromCache(GANTT_NEW_TASK_CACHE_KEY, data)
            }
            dataOption.insert(data, (function(response) {
                var keyGetter = (0, _data.compileGetter)(_this5.option("".concat(optionName, ".keyExpr")));
                var insertedId = keyGetter(response);
                callback(insertedId);
                dataOption._reloadDataSource().done((function(data) {
                    if (isTaskInsert) {
                        _this5._ganttTreeList.onTaskInserted(insertedId, record.parentId)
                    }
                }));
                if (isTaskInsert) {
                    setTimeout((function() {
                        _this5._sizeHelper.updateGanttRowHeights()
                    }), 300)
                }
                _this5._actionsManager.raiseInsertedAction(optionName, data, insertedId)
            }))
        }
    };
    _proto._onRecordUpdated = function(optionName, key, fieldName, value) {
        var _this6 = this;
        var dataOption = this["_".concat(optionName, "Option")];
        var isTaskUpdated = optionName === GANTT_TASKS;
        if (dataOption) {
            var setter = (0, _data.compileSetter)(this.option("".concat(optionName, ".").concat(fieldName, "Expr")));
            var data = {};
            setter(data, value);
            var hasCustomFieldsData = isTaskUpdated && this._customFieldsManager.cache.hasData(key);
            if (hasCustomFieldsData) {
                this._customFieldsManager.addCustomFieldsDataFromCache(key, data)
            }
            dataOption.update(key, data, (function() {
                dataOption._reloadDataSource();
                _this6._actionsManager.raiseUpdatedAction(optionName, data, key)
            }))
        }
    };
    _proto._onRecordRemoved = function(optionName, key, data) {
        var _this7 = this;
        var dataOption = this["_".concat(optionName, "Option")];
        if (dataOption) {
            dataOption.remove(key, (function() {
                dataOption._reloadDataSource();
                _this7._actionsManager.raiseDeletedAction(optionName, key, _this7._mappingHelper.convertCoreToMappedData(optionName, data))
            }))
        }
    };
    _proto._onParentTaskUpdated = function(data) {
        var mappedData = this.getTaskDataByCoreData(data);
        this._actionsManager.raiseUpdatedAction(GANTT_TASKS, mappedData, data.id)
    };
    _proto._onParentTasksRecalculated = function(data) {
        var _this$_ganttTreeList3;
        var setters = _uiGantt6.GanttHelper.compileSettersByOption(this.option(GANTT_TASKS));
        var treeDataSource = this._customFieldsManager.appendCustomFields(data.map(_uiGantt6.GanttHelper.prepareSetterMapHandler(setters)));
        null === (_this$_ganttTreeList3 = this._ganttTreeList) || void 0 === _this$_ganttTreeList3 ? void 0 : _this$_ganttTreeList3.setOption("dataSource", treeDataSource)
    };
    _proto._getToolbarItems = function() {
        var items = this.option("toolbar.items");
        return items ? items : []
    };
    _proto._updateToolbarContent = function() {
        var items = this._getToolbarItems();
        if (items.length) {
            this._$toolbarWrapper.show()
        } else {
            this._$toolbarWrapper.hide()
        }
        this._toolbar && this._toolbar.createItems(items);
        this._updateBarItemsState()
    };
    _proto._updateContextMenu = function() {
        var contextMenuOptions = this.option("contextMenu");
        if (contextMenuOptions.enabled && this._contextMenuBar) {
            this._contextMenuBar.createItems(contextMenuOptions.items);
            this._updateBarItemsState()
        }
    };
    _proto._updateBarItemsState = function() {
        this._ganttView && this._ganttView.updateBarItemsState()
    };
    _proto._showDialog = function(e) {
        if (!this._dialogInstance) {
            this._dialogInstance = new _uiGantt4.GanttDialog(this, this._$dialog)
        }
        this._dialogInstance.show(e.name, e.parameters, e.callback, e.afterClosing, this.option("editing"))
    };
    _proto._showPopupMenu = function(info) {
        if (this.option("contextMenu.enabled")) {
            this._ganttView.getBarManager().updateContextMenu();
            var args = {
                cancel: false,
                event: info.event,
                targetType: info.type,
                targetKey: info.key,
                items: (0, _extend.extend)(true, [], this._contextMenuBar._items),
                data: "task" === info.type ? this.getTaskData(info.key) : this.getDependencyData(info.key)
            };
            this._actionsManager.raiseContextMenuPreparing(args);
            if (!args.cancel) {
                this._contextMenuBar.show(info.position, args.items)
            }
        }
    };
    _proto._getLoadPanel = function() {
        if (!this._loadPanel) {
            this._loadPanel = this._createComponent(this._$loadPanel, _load_panel.default, {
                position: {
                    of: this.$element()
                }
            })
        }
        return this._loadPanel
    };
    _proto._getTaskKeyGetter = function() {
        return (0, _data.compileGetter)(this.option("".concat(GANTT_TASKS, ".keyExpr")))
    };
    _proto._setGanttViewOption = function(optionName, value) {
        this._ganttView && this._ganttView.option(optionName, value)
    };
    _proto._getGanttViewOption = function(optionName, value) {
        var _this$_ganttView2;
        return null === (_this$_ganttView2 = this._ganttView) || void 0 === _this$_ganttView2 ? void 0 : _this$_ganttView2.option(optionName)
    };
    _proto._getExportHelper = function() {
        var _this$_exportHelper;
        null !== (_this$_exportHelper = this._exportHelper) && void 0 !== _this$_exportHelper ? _this$_exportHelper : this._exportHelper = new _uiGantt5.GanttExportHelper(this);
        return this._exportHelper
    };
    _proto._executeCoreCommand = function(id) {
        this._ganttView.executeCoreCommand(id)
    };
    _proto._expandAll = function() {
        this._changeExpandAll(true)
    };
    _proto._collapseAll = function() {
        this._changeExpandAll(false)
    };
    _proto._changeExpandAll = function(expanded) {
        var _promise, _this8 = this;
        var keysToExpand = [];
        this._treeList.forEachNode((function(node) {
            var _node$children;
            if (null !== (_node$children = node.children) && void 0 !== _node$children && _node$children.length) {
                keysToExpand.push(node.key)
            }
        }));
        var promise;
        this._lockRowExpandEvent = keysToExpand.length > 0;
        var state = keysToExpand.reduce((function(previous, key, index) {
            previous[key] = expanded;
            var action = expanded ? _this8._treeList.expandRow : _this8._treeList.collapseRow;
            var isLast = index === keysToExpand.length - 1;
            if (isLast) {
                promise = action(key)
            } else {
                action(key)
            }
            return previous
        }), {});
        null === (_promise = promise) || void 0 === _promise ? void 0 : _promise.then((function() {
            _this8._ganttView._ganttViewCore.applyTasksExpandedState(state);
            _this8._sizeHelper.adjustHeight();
            delete _this8._lockRowExpandEvent
        }))
    };
    _proto._onTreeListRowExpandChanged = function(e, expanded) {
        if (!this._lockRowExpandEvent) {
            this._ganttView.changeTaskExpanded(e.key, expanded);
            this._sizeHelper.adjustHeight()
        }
    };
    _proto.getTaskResources = function(key) {
        var _this9 = this;
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        var coreData = this._ganttView._ganttViewCore.getTaskResources(key);
        return coreData.map((function(r) {
            return _this9._mappingHelper.convertCoreToMappedData(GANTT_RESOURCES, r)
        }))
    };
    _proto.getVisibleTaskKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleTaskKeys()
    };
    _proto.getVisibleDependencyKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleDependencyKeys()
    };
    _proto.getVisibleResourceKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleResourceKeys()
    };
    _proto.getVisibleResourceAssignmentKeys = function() {
        return this._ganttView._ganttViewCore.getVisibleResourceAssignmentKeys()
    };
    _proto.getTaskData = function(key) {
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        var coreData = this._ganttView._ganttViewCore.getTaskData(key);
        var mappedData = this.getTaskDataByCoreData(coreData);
        return mappedData
    };
    _proto.getTaskDataByCoreData = function(coreData) {
        var mappedData = coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_TASKS, coreData) : null;
        this._customFieldsManager.addCustomFieldsData(coreData.id, mappedData);
        return mappedData
    };
    _proto.insertTask = function(data) {
        this._customFieldsManager.saveCustomFieldsDataToCache(GANTT_NEW_TASK_CACHE_KEY, data);
        this._ganttView._ganttViewCore.insertTask(this._mappingHelper.convertMappedToCoreData(GANTT_TASKS, data))
    };
    _proto.deleteTask = function(key) {
        this._ganttView._ganttViewCore.deleteTask(key)
    };
    _proto.updateTask = function(key, data) {
        var coreTaskData = this._mappingHelper.convertMappedToCoreData(GANTT_TASKS, data);
        var isCustomFieldsUpdateOnly = !Object.keys(coreTaskData).length;
        this._customFieldsManager.saveCustomFieldsDataToCache(key, data, true, isCustomFieldsUpdateOnly);
        this._ganttView._ganttViewCore.updateTask(key, coreTaskData)
    };
    _proto.getDependencyData = function(key) {
        if (!(0, _type.isDefined)(key)) {
            return null
        }
        var coreData = this._ganttView._ganttViewCore.getDependencyData(key);
        return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_DEPENDENCIES, coreData) : null
    };
    _proto.insertDependency = function(data) {
        this._ganttView._ganttViewCore.insertDependency(this._mappingHelper.convertMappedToCoreData(GANTT_DEPENDENCIES, data))
    };
    _proto.deleteDependency = function(key) {
        this._ganttView._ganttViewCore.deleteDependency(key)
    };
    _proto.getResourceData = function(key) {
        var coreData = this._ganttView._ganttViewCore.getResourceData(key);
        return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCES, coreData) : null
    };
    _proto.deleteResource = function(key) {
        this._ganttView._ganttViewCore.deleteResource(key)
    };
    _proto.insertResource = function(data, taskKeys) {
        this._ganttView._ganttViewCore.insertResource(this._mappingHelper.convertMappedToCoreData(GANTT_RESOURCES, data), taskKeys)
    };
    _proto.getResourceAssignmentData = function(key) {
        var coreData = this._ganttView._ganttViewCore.getResourceAssignmentData(key);
        return coreData ? this._mappingHelper.convertCoreToMappedData(GANTT_RESOURCE_ASSIGNMENTS, coreData) : null
    };
    _proto.assignResourceToTask = function(resourceKey, taskKey) {
        this._ganttView._ganttViewCore.assignResourceToTask(resourceKey, taskKey)
    };
    _proto.unassignResourceFromTask = function(resourceKey, taskKey) {
        this._ganttView._ganttViewCore.unassignResourceFromTask(resourceKey, taskKey)
    };
    _proto.updateDimensions = function() {
        this._sizeHelper.onAdjustControl()
    };
    _proto.scrollToDate = function(date) {
        this._ganttView._ganttViewCore.scrollToDate(date)
    };
    _proto.showResourceManagerDialog = function() {
        this._ganttView._ganttViewCore.showResourcesDialog()
    };
    _proto.exportToPdf = function(options) {
        var _fullOptions$docCreat, _window$jspdf$jsPDF, _window$jspdf, _fullOptions$format, _this10 = this;
        this._exportHelper.reset();
        var fullOptions = (0, _extend.extend)({}, options);
        if (fullOptions.createDocumentMethod) {
            fullOptions.docCreateMethod = fullOptions.createDocumentMethod
        }
        null !== (_fullOptions$docCreat = fullOptions.docCreateMethod) && void 0 !== _fullOptions$docCreat ? _fullOptions$docCreat : fullOptions.docCreateMethod = null !== (_window$jspdf$jsPDF = null === (_window$jspdf = window.jspdf) || void 0 === _window$jspdf ? void 0 : _window$jspdf.jsPDF) && void 0 !== _window$jspdf$jsPDF ? _window$jspdf$jsPDF : window.jsPDF;
        null !== (_fullOptions$format = fullOptions.format) && void 0 !== _fullOptions$format ? _fullOptions$format : fullOptions.format = "a4";
        return new Promise((function(resolve) {
            var _this10$_ganttView;
            var doc = null === (_this10$_ganttView = _this10._ganttView) || void 0 === _this10$_ganttView ? void 0 : _this10$_ganttView._ganttViewCore.exportToPdf(fullOptions);
            resolve(doc)
        }))
    };
    _proto._getDefaultOptions = function() {
        return (0, _extend.extend)(_Widget.prototype._getDefaultOptions.call(this), _uiGantt6.GanttHelper.getDefaultOptions())
    };
    _proto._optionChanged = function(args) {
        var _this$_ganttTreeList4, _this$_sizeHelper, _this$_ganttTreeList5, _this$_actionsManager, _this$_actionsManager2, _this$_actionsManager3, _this$_actionsManager4, _this$_actionsManager5, _this$_actionsManager6, _this$_actionsManager7, _this$_actionsManager8, _this$_actionsManager9, _this$_actionsManager10, _this$_actionsManager11, _this$_actionsManager12, _this$_actionsManager13, _this$_actionsManager14, _this$_actionsManager15, _this$_actionsManager16, _this$_actionsManager17, _this$_actionsManager18, _this$_actionsManager19, _this$_actionsManager20, _this$_actionsManager21, _this$_actionsManager22, _this$_actionsManager23, _this$_actionsManager24, _this$_actionsManager25, _this$_actionsManager26, _this$_ganttTreeList6, _this$_ganttTreeList7, _this$_ganttTemplates, _this$_ganttTemplates2, _this$_ganttTemplates3, _this$_ganttTemplates4, _this$_ganttTreeList8, _this$_sizeHelper2, _this$_sizeHelper3;
        switch (args.name) {
            case "tasks":
                this._refreshDataSource(GANTT_TASKS);
                break;
            case "dependencies":
                this._refreshDataSource(GANTT_DEPENDENCIES);
                break;
            case "resources":
                this._refreshDataSource(GANTT_RESOURCES);
                break;
            case "resourceAssignments":
                this._refreshDataSource(GANTT_RESOURCE_ASSIGNMENTS);
                break;
            case "columns":
                null === (_this$_ganttTreeList4 = this._ganttTreeList) || void 0 === _this$_ganttTreeList4 ? void 0 : _this$_ganttTreeList4.setOption("columns", this._ganttTreeList.getColumns());
                break;
            case "taskListWidth":
                null === (_this$_sizeHelper = this._sizeHelper) || void 0 === _this$_sizeHelper ? void 0 : _this$_sizeHelper.setInnerElementsWidth();
                break;
            case "showResources":
                this._setGanttViewOption("showResources", args.value);
                break;
            case "taskTitlePosition":
                this._setGanttViewOption("taskTitlePosition", args.value);
                break;
            case "firstDayOfWeek":
                this._setGanttViewOption("firstDayOfWeek", args.value);
                break;
            case "selectedRowKey":
                null === (_this$_ganttTreeList5 = this._ganttTreeList) || void 0 === _this$_ganttTreeList5 ? void 0 : _this$_ganttTreeList5.selectRows(_uiGantt6.GanttHelper.getArrayFromOneElement(args.value));
                break;
            case "onSelectionChanged":
                null === (_this$_actionsManager = this._actionsManager) || void 0 === _this$_actionsManager ? void 0 : _this$_actionsManager.createSelectionChangedAction();
                break;
            case "onTaskClick":
                null === (_this$_actionsManager2 = this._actionsManager) || void 0 === _this$_actionsManager2 ? void 0 : _this$_actionsManager2.createTaskClickAction();
                break;
            case "onTaskDblClick":
                null === (_this$_actionsManager3 = this._actionsManager) || void 0 === _this$_actionsManager3 ? void 0 : _this$_actionsManager3.createTaskDblClickAction();
                break;
            case "onTaskInserting":
                null === (_this$_actionsManager4 = this._actionsManager) || void 0 === _this$_actionsManager4 ? void 0 : _this$_actionsManager4.createTaskInsertingAction();
                break;
            case "onTaskInserted":
                null === (_this$_actionsManager5 = this._actionsManager) || void 0 === _this$_actionsManager5 ? void 0 : _this$_actionsManager5.createTaskInsertedAction();
                break;
            case "onTaskDeleting":
                null === (_this$_actionsManager6 = this._actionsManager) || void 0 === _this$_actionsManager6 ? void 0 : _this$_actionsManager6.createTaskDeletingAction();
                break;
            case "onTaskDeleted":
                null === (_this$_actionsManager7 = this._actionsManager) || void 0 === _this$_actionsManager7 ? void 0 : _this$_actionsManager7.createTaskDeletedAction();
                break;
            case "onTaskUpdating":
                null === (_this$_actionsManager8 = this._actionsManager) || void 0 === _this$_actionsManager8 ? void 0 : _this$_actionsManager8.createTaskUpdatingAction();
                break;
            case "onTaskUpdated":
                null === (_this$_actionsManager9 = this._actionsManager) || void 0 === _this$_actionsManager9 ? void 0 : _this$_actionsManager9.createTaskUpdatedAction();
                break;
            case "onTaskMoving":
                null === (_this$_actionsManager10 = this._actionsManager) || void 0 === _this$_actionsManager10 ? void 0 : _this$_actionsManager10.createTaskMovingAction();
                break;
            case "onTaskEditDialogShowing":
                null === (_this$_actionsManager11 = this._actionsManager) || void 0 === _this$_actionsManager11 ? void 0 : _this$_actionsManager11.createTaskEditDialogShowingAction();
                break;
            case "onResourceManagerDialogShowing":
                null === (_this$_actionsManager12 = this._actionsManager) || void 0 === _this$_actionsManager12 ? void 0 : _this$_actionsManager12.createResourceManagerDialogShowingAction();
                break;
            case "onDependencyInserting":
                null === (_this$_actionsManager13 = this._actionsManager) || void 0 === _this$_actionsManager13 ? void 0 : _this$_actionsManager13.createDependencyInsertingAction();
                break;
            case "onDependencyInserted":
                null === (_this$_actionsManager14 = this._actionsManager) || void 0 === _this$_actionsManager14 ? void 0 : _this$_actionsManager14.createDependencyInsertedAction();
                break;
            case "onDependencyDeleting":
                null === (_this$_actionsManager15 = this._actionsManager) || void 0 === _this$_actionsManager15 ? void 0 : _this$_actionsManager15.createDependencyDeletingAction();
                break;
            case "onDependencyDeleted":
                null === (_this$_actionsManager16 = this._actionsManager) || void 0 === _this$_actionsManager16 ? void 0 : _this$_actionsManager16.createDependencyDeletedAction();
                break;
            case "onResourceInserting":
                null === (_this$_actionsManager17 = this._actionsManager) || void 0 === _this$_actionsManager17 ? void 0 : _this$_actionsManager17.createResourceInsertingAction();
                break;
            case "onResourceInserted":
                null === (_this$_actionsManager18 = this._actionsManager) || void 0 === _this$_actionsManager18 ? void 0 : _this$_actionsManager18.createResourceInsertedAction();
                break;
            case "onResourceDeleting":
                null === (_this$_actionsManager19 = this._actionsManager) || void 0 === _this$_actionsManager19 ? void 0 : _this$_actionsManager19.createResourceDeletingAction();
                break;
            case "onResourceDeleted":
                null === (_this$_actionsManager20 = this._actionsManager) || void 0 === _this$_actionsManager20 ? void 0 : _this$_actionsManager20.createResourceDeletedAction();
                break;
            case "onResourceAssigning":
                null === (_this$_actionsManager21 = this._actionsManager) || void 0 === _this$_actionsManager21 ? void 0 : _this$_actionsManager21.createResourceAssigningAction();
                break;
            case "onResourceAssigned":
                null === (_this$_actionsManager22 = this._actionsManager) || void 0 === _this$_actionsManager22 ? void 0 : _this$_actionsManager22.createResourceAssignedAction();
                break;
            case "onResourceUnassigning":
                null === (_this$_actionsManager23 = this._actionsManager) || void 0 === _this$_actionsManager23 ? void 0 : _this$_actionsManager23.createResourceUnassigningAction();
                break;
            case "onResourceUnassigned":
                null === (_this$_actionsManager24 = this._actionsManager) || void 0 === _this$_actionsManager24 ? void 0 : _this$_actionsManager24.createResourceUnassignedAction();
                break;
            case "onCustomCommand":
                null === (_this$_actionsManager25 = this._actionsManager) || void 0 === _this$_actionsManager25 ? void 0 : _this$_actionsManager25.createCustomCommandAction();
                break;
            case "onContextMenuPreparing":
                null === (_this$_actionsManager26 = this._actionsManager) || void 0 === _this$_actionsManager26 ? void 0 : _this$_actionsManager26.createContextMenuPreparingAction();
                break;
            case "allowSelection":
                null === (_this$_ganttTreeList6 = this._ganttTreeList) || void 0 === _this$_ganttTreeList6 ? void 0 : _this$_ganttTreeList6.setOption("selection.mode", _uiGantt6.GanttHelper.getSelectionMode(args.value));
                this._setGanttViewOption("allowSelection", args.value);
                break;
            case "showRowLines":
                null === (_this$_ganttTreeList7 = this._ganttTreeList) || void 0 === _this$_ganttTreeList7 ? void 0 : _this$_ganttTreeList7.setOption("showRowLines", args.value);
                this._setGanttViewOption("showRowLines", args.value);
                break;
            case "stripLines":
                this._setGanttViewOption("stripLines", args.value);
                break;
            case "scaleType":
                this._setGanttViewOption("scaleType", args.value);
                break;
            case "editing":
                this._setGanttViewOption("editing", this.option(args.name));
                break;
            case "validation":
                this._setGanttViewOption("validation", this.option(args.name));
                break;
            case "toolbar":
                this._updateToolbarContent();
                break;
            case "contextMenu":
                this._updateContextMenu();
                break;
            case "taskTooltipContentTemplate":
                this._setGanttViewOption("taskTooltipContentTemplate", null === (_this$_ganttTemplates = this._ganttTemplatesManager) || void 0 === _this$_ganttTemplates ? void 0 : _this$_ganttTemplates.getTaskTooltipContentTemplateFunc(args.value));
                break;
            case "taskProgressTooltipContentTemplate":
                this._setGanttViewOption("taskProgressTooltipContentTemplate", null === (_this$_ganttTemplates2 = this._ganttTemplatesManager) || void 0 === _this$_ganttTemplates2 ? void 0 : _this$_ganttTemplates2.getTaskProgressTooltipContentTemplateFunc(args.value));
                break;
            case "taskTimeTooltipContentTemplate":
                this._setGanttViewOption("taskTimeTooltipContentTemplate", null === (_this$_ganttTemplates3 = this._ganttTemplatesManager) || void 0 === _this$_ganttTemplates3 ? void 0 : _this$_ganttTemplates3.getTaskTimeTooltipContentTemplateFunc(args.value));
                break;
            case "taskContentTemplate":
                this._setGanttViewOption("taskContentTemplate", null === (_this$_ganttTemplates4 = this._ganttTemplatesManager) || void 0 === _this$_ganttTemplates4 ? void 0 : _this$_ganttTemplates4.getTaskContentTemplateFunc(args.value));
                break;
            case "rootValue":
                null === (_this$_ganttTreeList8 = this._ganttTreeList) || void 0 === _this$_ganttTreeList8 ? void 0 : _this$_ganttTreeList8.setOption("rootValue", args.value);
                break;
            case "width":
                _Widget.prototype._optionChanged.call(this, args);
                null === (_this$_sizeHelper2 = this._sizeHelper) || void 0 === _this$_sizeHelper2 ? void 0 : _this$_sizeHelper2.updateGanttWidth();
                break;
            case "height":
                _Widget.prototype._optionChanged.call(this, args);
                null === (_this$_sizeHelper3 = this._sizeHelper) || void 0 === _this$_sizeHelper3 ? void 0 : _this$_sizeHelper3.setGanttHeight(this._$element.height());
                break;
            case "sorting":
                break;
            default:
                _Widget.prototype._optionChanged.call(this, args)
        }
    };
    return Gantt
}(_ui.default);
(0, _component_registrator.default)("dxGantt", Gantt);
var _default = Gantt;
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;
