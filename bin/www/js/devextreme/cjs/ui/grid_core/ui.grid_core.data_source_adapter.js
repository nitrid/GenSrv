/**
 * DevExtreme (cjs/ui/grid_core/ui.grid_core.data_source_adapter.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
"use strict";
exports.default = void 0;
var _callbacks = _interopRequireDefault(require("../../core/utils/callbacks"));
var _uiData_grid = _interopRequireDefault(require("../data_grid/ui.data_grid.core"));
var _common = require("../../core/utils/common");
var _type = require("../../core/utils/type");
var _iterator = require("../../core/utils/iterator");
var _extend = require("../../core/utils/extend");
var _array_store = _interopRequireDefault(require("../../data/array_store"));
var _array_utils = require("../../data/array_utils");
var _deferred = require("../../core/utils/deferred");

function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    }
}
var _default = _uiData_grid.default.Controller.inherit(function() {
    function cloneItems(items, groupCount) {
        if (items) {
            items = items.slice(0);
            if (groupCount) {
                for (var i = 0; i < items.length; i++) {
                    items[i] = (0, _extend.extend)({
                        key: items[i].key
                    }, items[i]);
                    items[i].items = cloneItems(items[i].items, groupCount - 1)
                }
            }
        }
        return items
    }

    function calculateOperationTypes(loadOptions, lastLoadOptions, isFullReload) {
        var operationTypes = {
            reload: true,
            fullReload: true
        };
        if (lastLoadOptions) {
            operationTypes = {
                sorting: !_uiData_grid.default.equalSortParameters(loadOptions.sort, lastLoadOptions.sort),
                grouping: !_uiData_grid.default.equalSortParameters(loadOptions.group, lastLoadOptions.group, true),
                groupExpanding: !_uiData_grid.default.equalSortParameters(loadOptions.group, lastLoadOptions.group) || lastLoadOptions.groupExpand,
                filtering: !_uiData_grid.default.equalFilterParameters(loadOptions.filter, lastLoadOptions.filter),
                pageIndex: loadOptions.pageIndex !== lastLoadOptions.pageIndex,
                skip: loadOptions.skip !== lastLoadOptions.skip,
                take: loadOptions.take !== lastLoadOptions.take,
                pageSize: loadOptions.pageSize !== lastLoadOptions.pageSize,
                fullReload: isFullReload
            };
            operationTypes.reload = isFullReload || operationTypes.sorting || operationTypes.grouping || operationTypes.filtering;
            operationTypes.paging = operationTypes.pageIndex || operationTypes.pageSize || operationTypes.take
        }
        return operationTypes
    }

    function getPageKey(pageIndex, loadPageCount) {
        return (0, _type.isDefined)(loadPageCount) ? "".concat(pageIndex, ":").concat(loadPageCount) : pageIndex
    }

    function getPageDataFromCache(options) {
        var key = getPageKey(options.pageIndex, options.loadPageCount);
        return options.cachedPagesData.pages[key]
    }
    return {
        init: function(dataSource, remoteOperations) {
            var that = this;
            that._dataSource = dataSource;
            that._remoteOperations = remoteOperations || {};
            that._isLastPage = !dataSource.isLastPage();
            that._hasLastPage = false;
            that._currentTotalCount = 0;
            that._cachedPagesData = {
                pages: {}
            };
            that._lastOperationTypes = {};
            that._eventsStrategy = dataSource._eventsStrategy;
            that._skipCorrection = 0;
            that._isLoadingAll = false;
            that.changed = (0, _callbacks.default)();
            that.loadingChanged = (0, _callbacks.default)();
            that.loadError = (0, _callbacks.default)();
            that.customizeStoreLoadOptions = (0, _callbacks.default)();
            that.changing = (0, _callbacks.default)();
            that._dataChangedHandler = that._handleDataChanged.bind(that);
            that._dataLoadingHandler = that._handleDataLoading.bind(that);
            that._dataLoadedHandler = that._handleDataLoaded.bind(that);
            that._loadingChangedHandler = that._handleLoadingChanged.bind(that);
            that._loadErrorHandler = that._handleLoadError.bind(that);
            that._pushHandler = that._handlePush.bind(that);
            that._changingHandler = that._handleChanging.bind(that);
            dataSource.on("changed", that._dataChangedHandler);
            dataSource.on("customizeStoreLoadOptions", that._dataLoadingHandler);
            dataSource.on("customizeLoadResult", that._dataLoadedHandler);
            dataSource.on("loadingChanged", that._loadingChangedHandler);
            dataSource.on("loadError", that._loadErrorHandler);
            dataSource.on("changing", that._changingHandler);
            dataSource.store().on("push", that._pushHandler);
            (0, _iterator.each)(dataSource, (function(memberName, member) {
                if (!that[memberName] && (0, _type.isFunction)(member)) {
                    that[memberName] = function() {
                        return this._dataSource[memberName].apply(this._dataSource, arguments)
                    }
                }
            }))
        },
        remoteOperations: function() {
            return this._remoteOperations
        },
        dispose: function(isSharedDataSource) {
            var dataSource = this._dataSource;
            var store = dataSource.store();
            dataSource.off("changed", this._dataChangedHandler);
            dataSource.off("customizeStoreLoadOptions", this._dataLoadingHandler);
            dataSource.off("customizeLoadResult", this._dataLoadedHandler);
            dataSource.off("loadingChanged", this._loadingChangedHandler);
            dataSource.off("loadError", this._loadErrorHandler);
            dataSource.off("changing", this._changingHandler);
            store && store.off("push", this._pushHandler);
            if (!isSharedDataSource) {
                dataSource.dispose()
            }
        },
        refresh: function(options, operationTypes) {
            var dataSource = this._dataSource;
            if (operationTypes.reload) {
                this.resetCurrentTotalCount();
                this._isLastPage = !dataSource.paginate();
                this._hasLastPage = this._isLastPage
            }
        },
        resetCurrentTotalCount: function() {
            this._currentTotalCount = 0;
            this._skipCorrection = 0
        },
        resetCache: function() {
            this._cachedStoreData = void 0;
            this._cachedPagingData = void 0
        },
        resetPagesCache: function() {
            this._cachedPagesData = {
                pages: {}
            }
        },
        _needClearStoreDataCache: function() {
            var remoteOperations = this.remoteOperations();
            var operationTypes = calculateOperationTypes(this._lastLoadOptions || {}, {});
            var isLocalOperations = Object.keys(remoteOperations).every((function(operationName) {
                return !operationTypes[operationName] || !remoteOperations[operationName]
            }));
            return !isLocalOperations
        },
        push: function(changes, fromStore) {
            var store = this.store();
            if (this._needClearStoreDataCache()) {
                this._cachedStoreData = void 0
            }
            this._cachedPagingData = void 0;
            this.resetPagesCache(true);
            if (this._cachedStoreData) {
                (0, _array_utils.applyBatch)({
                    keyInfo: store,
                    data: this._cachedStoreData,
                    changes: changes
                })
            }
            if (!fromStore) {
                this._applyBatch(changes)
            }
        },
        getDataIndexGetter: function() {
            var _this = this;
            if (!this._dataIndexGetter) {
                var indexByKey;
                var storeData;
                var store = this.store();
                this._dataIndexGetter = function(data) {
                    var isCacheUpdated = storeData && storeData !== _this._cachedStoreData;
                    if (!indexByKey || isCacheUpdated) {
                        storeData = _this._cachedStoreData || [];
                        indexByKey = {};
                        for (var i = 0; i < storeData.length; i++) {
                            indexByKey[(0, _common.getKeyHash)(store.keyOf(storeData[i]))] = i
                        }
                    }
                    return indexByKey[(0, _common.getKeyHash)(store.keyOf(data))]
                }
            }
            return this._dataIndexGetter
        },
        _getKeyInfo: function() {
            return this.store()
        },
        _applyBatch: function(changes) {
            var _this2 = this;
            var keyInfo = this._getKeyInfo();
            var dataSource = this._dataSource;
            var groupCount = _uiData_grid.default.normalizeSortingInfo(this.group()).length;
            var totalCount = this.totalCount();
            var isVirtualMode = "virtual" === this.option("scrolling.mode");
            changes = changes.filter((function(change) {
                return !dataSource.paginate() || "insert" !== change.type || void 0 !== change.index
            }));
            var getItemCount = function() {
                return groupCount ? _this2.itemsCount() : _this2._items.length
            };
            var oldItemCount = getItemCount();
            (0, _array_utils.applyBatch)({
                keyInfo: keyInfo,
                data: this._items,
                changes: changes,
                groupCount: groupCount,
                useInsertIndex: true
            });
            (0, _array_utils.applyBatch)({
                keyInfo: keyInfo,
                data: dataSource.items(),
                changes: changes,
                groupCount: groupCount,
                useInsertIndex: true
            });
            if (this._currentTotalCount > 0 || isVirtualMode && totalCount === oldItemCount) {
                this._skipCorrection += getItemCount() - oldItemCount
            }
            changes.splice(0, changes.length)
        },
        _handlePush: function(changes) {
            this.push(changes, true)
        },
        _handleChanging: function(e) {
            this.changing.fire(e);
            this._applyBatch(e.changes)
        },
        _needCleanCacheByOperation: function(operationType, remoteOperations) {
            var operationTypesByOrder = ["filtering", "sorting", "paging"];
            var operationTypeIndex = operationTypesByOrder.indexOf(operationType);
            var currentOperationTypes = operationTypeIndex >= 0 ? operationTypesByOrder.slice(operationTypeIndex) : [operationType];
            return currentOperationTypes.some((function(operationType) {
                return remoteOperations[operationType]
            }))
        },
        _customizeRemoteOperations: function(options, operationTypes) {
            var that = this;
            var cachedStoreData = that._cachedStoreData;
            var cachedPagingData = that._cachedPagingData;
            var cachedPagesData = that._cachedPagesData;
            if (options.storeLoadOptions.filter && !options.remoteOperations.filtering || options.storeLoadOptions.sort && !options.remoteOperations.sorting) {
                options.remoteOperations = {
                    filtering: options.remoteOperations.filtering
                }
            }
            if (operationTypes.fullReload) {
                cachedStoreData = void 0;
                cachedPagingData = void 0;
                cachedPagesData = {
                    pages: {}
                }
            } else {
                if (operationTypes.reload) {
                    cachedPagingData = void 0;
                    cachedPagesData = {
                        pages: {}
                    }
                } else if (operationTypes.pageSize || operationTypes.groupExpanding) {
                    cachedPagesData = {
                        pages: {}
                    }
                }(0, _iterator.each)(operationTypes, (function(operationType, value) {
                    if (value && that._needCleanCacheByOperation(operationType, options.remoteOperations)) {
                        cachedStoreData = void 0;
                        cachedPagingData = void 0
                    }
                }))
            }
            if (cachedPagingData) {
                options.remoteOperations.paging = false
            }
            options.cachedStoreData = cachedStoreData;
            options.cachedPagingData = cachedPagingData;
            options.cachedPagesData = cachedPagesData;
            if (!options.isCustomLoading) {
                that._cachedStoreData = cachedStoreData;
                that._cachedPagingData = cachedPagingData;
                that._cachedPagesData = cachedPagesData
            }
        },
        _handleDataLoading: function(options) {
            var _this3 = this;
            var dataSource = this._dataSource;
            var lastLoadOptions = this._lastLoadOptions;
            this.customizeStoreLoadOptions.fire(options);
            options.delay = this.option("loadingTimeout");
            options.originalStoreLoadOptions = options.storeLoadOptions;
            options.remoteOperations = (0, _extend.extend)({}, this.remoteOperations());
            var isFullReload = !this.isLoaded() && !this._isRefreshing;
            if (this.option("integrationOptions.renderedOnServer") && !this.isLoaded()) {
                options.delay = void 0
            }
            var loadOptions = (0, _extend.extend)({
                pageIndex: this.pageIndex(),
                pageSize: this.pageSize()
            }, options.storeLoadOptions);
            var operationTypes = calculateOperationTypes(loadOptions, lastLoadOptions, isFullReload);
            this._customizeRemoteOperations(options, operationTypes);
            if (!options.isCustomLoading) {
                var isRefreshing = this._isRefreshing;
                options.pageIndex = dataSource.pageIndex();
                options.lastLoadOptions = loadOptions;
                options.operationTypes = operationTypes;
                this._loadingOperationTypes = operationTypes;
                this._isRefreshing = true;
                (0, _deferred.when)(isRefreshing || this._isRefreshed || this.refresh(options, operationTypes)).done((function() {
                    if (_this3._lastOperationId === options.operationId) {
                        _this3._isRefreshed = true;
                        _this3.load().always((function() {
                            _this3._isRefreshed = false
                        }))
                    }
                })).fail((function() {
                    dataSource.cancel(options.operationId)
                })).always((function() {
                    _this3._isRefreshing = false
                }));
                dataSource.cancel(this._lastOperationId);
                this._lastOperationId = options.operationId;
                if (this._isRefreshing) {
                    dataSource.cancel(this._lastOperationId)
                }
            }
            this._handleDataLoadingCore(options)
        },
        _handleDataLoadingCore: function(options) {
            var remoteOperations = options.remoteOperations;
            options.loadOptions = {};
            var cachedExtra = options.cachedPagesData.extra;
            var localLoadOptionNames = {
                filter: !remoteOperations.filtering,
                sort: !remoteOperations.sorting,
                group: !remoteOperations.grouping,
                summary: !remoteOperations.summary,
                skip: !remoteOperations.paging,
                take: !remoteOperations.paging,
                requireTotalCount: cachedExtra && "totalCount" in cachedExtra || !remoteOperations.paging
            };
            (0, _iterator.each)(options.storeLoadOptions, (function(optionName, optionValue) {
                if (localLoadOptionNames[optionName]) {
                    options.loadOptions[optionName] = optionValue;
                    delete options.storeLoadOptions[optionName]
                }
            }));
            if (cachedExtra) {
                options.extra = cachedExtra
            }
            options.data = getPageDataFromCache(options) || options.cachedStoreData
        },
        _handleDataLoaded: function(options) {
            var _this4 = this;
            var loadOptions = options.loadOptions;
            var localPaging = options.remoteOperations && !options.remoteOperations.paging;
            var cachedPagesData = options.cachedPagesData;
            var storeLoadOptions = options.storeLoadOptions;
            var needCache = false !== this.option("cacheEnabled") && storeLoadOptions;
            var needPageCache = needCache && !options.isCustomLoading && cachedPagesData && (!localPaging || storeLoadOptions.group);
            var needPagingCache = needCache && localPaging;
            var needStoreCache = needPagingCache && !options.isCustomLoading;
            if (!loadOptions) {
                this._dataSource.cancel(options.operationId);
                return
            }
            if (options.lastLoadOptions) {
                this._lastLoadOptions = options.lastLoadOptions;
                Object.keys(options.operationTypes).forEach((function(operationType) {
                    _this4._lastOperationTypes[operationType] = _this4._lastOperationTypes[operationType] || options.operationTypes[operationType]
                }))
            }
            if (localPaging) {
                options.skip = loadOptions.skip;
                options.take = loadOptions.take;
                delete loadOptions.skip;
                delete loadOptions.take
            }
            if (loadOptions.group) {
                loadOptions.group = options.group || loadOptions.group
            }
            var groupCount = _uiData_grid.default.normalizeSortingInfo(storeLoadOptions.group || loadOptions.group).length;
            if (!needPageCache || !getPageDataFromCache(options)) {
                if (needPagingCache && options.cachedPagingData) {
                    options.data = cloneItems(options.cachedPagingData, groupCount)
                } else {
                    if (needStoreCache) {
                        if (!this._cachedStoreData) {
                            this._cachedStoreData = cloneItems(options.data, _uiData_grid.default.normalizeSortingInfo(storeLoadOptions.group).length)
                        } else if (options.mergeStoreLoadData) {
                            options.data = this._cachedStoreData = this._cachedStoreData.concat(options.data)
                        }
                    }
                    new _array_store.default(options.data).load(loadOptions).done((function(data) {
                        options.data = data;
                        if (needStoreCache) {
                            _this4._cachedPagingData = cloneItems(options.data, groupCount)
                        }
                    })).fail((function(error) {
                        options.data = (new _deferred.Deferred).reject(error)
                    }))
                }
                if (loadOptions.requireTotalCount && localPaging) {
                    options.extra = (0, _type.isPlainObject)(options.extra) ? options.extra : {};
                    options.extra.totalCount = options.data.length
                }
                if (options.extra && options.extra.totalCount >= 0 && (false === storeLoadOptions.requireTotalCount || false === loadOptions.requireTotalCount)) {
                    options.extra.totalCount = -1
                }
                this._handleDataLoadedCore(options);
                if (needPageCache) {
                    cachedPagesData.extra = cachedPagesData.extra || (0, _extend.extend)({}, options.extra);
                    (0, _deferred.when)(options.data).done((function(data) {
                        ! function(options, data) {
                            var pageIndex = options.pageIndex;
                            if (void 0 !== pageIndex) {
                                var key = getPageKey(pageIndex, options.loadPageCount);
                                options.cachedPagesData.pages[key] = data
                            }
                        }(options, cloneItems(data, groupCount))
                    }))
                }
            }
            options.storeLoadOptions = options.originalStoreLoadOptions
        },
        _handleDataLoadedCore: function(options) {
            if (options.remoteOperations && !options.remoteOperations.paging && Array.isArray(options.data)) {
                if (void 0 !== options.skip) {
                    options.data = options.data.slice(options.skip)
                }
                if (void 0 !== options.take) {
                    options.data = options.data.slice(0, options.take)
                }
            }
        },
        _handleLoadingChanged: function(isLoading) {
            this.loadingChanged.fire(isLoading)
        },
        _handleLoadError: function(error) {
            this.loadError.fire(error);
            this.changed.fire({
                changeType: "loadError",
                error: error
            })
        },
        _loadPageSize: function() {
            return this.pageSize()
        },
        _handleDataChanged: function(args) {
            var currentTotalCount;
            var dataSource = this._dataSource;
            var isLoading = false;
            var itemsCount = this.itemsCount();
            this._isLastPage = !itemsCount || !this._loadPageSize() || itemsCount < this._loadPageSize();
            if (this._isLastPage) {
                this._hasLastPage = true
            }
            if (dataSource.totalCount() >= 0) {
                if (dataSource.pageIndex() >= this.pageCount()) {
                    dataSource.pageIndex(this.pageCount() - 1);
                    this.pageIndex(dataSource.pageIndex());
                    this.resetPagesCache();
                    dataSource.load();
                    isLoading = true
                }
            } else if (!args || (0, _type.isDefined)(args.changeType)) {
                currentTotalCount = dataSource.pageIndex() * this.pageSize() + itemsCount;
                this._currentTotalCount = Math.max(this._currentTotalCount, currentTotalCount);
                if (0 === itemsCount && dataSource.pageIndex() >= this.pageCount()) {
                    dataSource.pageIndex(this.pageCount() - 1);
                    if ("infinite" !== this.option("scrolling.mode")) {
                        dataSource.load();
                        isLoading = true
                    }
                }
            }
            if (!isLoading) {
                this._operationTypes = this._lastOperationTypes;
                this._lastOperationTypes = {};
                this.component._optionCache = {};
                this.changed.fire(args);
                this.component._optionCache = void 0
            }
        },
        _scheduleCustomLoadCallbacks: function(deferred) {
            var that = this;
            that._isCustomLoading = true;
            deferred.always((function() {
                that._isCustomLoading = false
            }))
        },
        loadingOperationTypes: function() {
            return this._loadingOperationTypes
        },
        operationTypes: function() {
            return this._operationTypes
        },
        lastLoadOptions: function() {
            return this._lastLoadOptions || {}
        },
        isLastPage: function() {
            return this._isLastPage
        },
        totalCount: function() {
            return parseInt((this._currentTotalCount || this._dataSource.totalCount()) + this._skipCorrection)
        },
        itemsCount: function() {
            return this._dataSource.items().length
        },
        totalItemsCount: function() {
            return this.totalCount()
        },
        pageSize: function() {
            var dataSource = this._dataSource;
            if (!arguments.length && !dataSource.paginate()) {
                return 0
            }
            return dataSource.pageSize.apply(dataSource, arguments)
        },
        pageCount: function() {
            var count = this.totalItemsCount() - this._skipCorrection;
            var pageSize = this.pageSize();
            if (pageSize && count > 0) {
                return Math.max(1, Math.ceil(count / pageSize))
            }
            return 1
        },
        hasKnownLastPage: function() {
            return this._hasLastPage || this._dataSource.totalCount() >= 0
        },
        loadFromStore: function(loadOptions, store) {
            var dataSource = this._dataSource;
            var d = new _deferred.Deferred;
            if (!dataSource) {
                return
            }
            store = store || dataSource.store();
            store.load(loadOptions).done((function(data, extra) {
                if (data && !Array.isArray(data) && Array.isArray(data.data)) {
                    extra = data;
                    data = data.data
                }
                d.resolve(data, extra)
            })).fail(d.reject);
            return d
        },
        isCustomLoading: function() {
            return !!this._isCustomLoading
        },
        load: function(options) {
            var _this5 = this;
            var that = this;
            var dataSource = that._dataSource;
            var d = new _deferred.Deferred;
            if (options) {
                var store = dataSource.store();
                var dataSourceLoadOptions = dataSource.loadOptions();
                var loadResult = {
                    storeLoadOptions: options,
                    isCustomLoading: true
                };
                (0, _iterator.each)(store._customLoadOptions() || [], (function(_, optionName) {
                    if (!(optionName in loadResult.storeLoadOptions)) {
                        loadResult.storeLoadOptions[optionName] = dataSourceLoadOptions[optionName]
                    }
                }));
                this._isLoadingAll = options.isLoadingAll;
                that._scheduleCustomLoadCallbacks(d);
                dataSource._scheduleLoadCallbacks(d);
                that._handleDataLoading(loadResult);
                ! function(action, timeout) {
                    if ((0, _type.isDefined)(timeout)) {
                        (0, _common.executeAsync)(action, timeout)
                    } else {
                        action()
                    }
                }((function() {
                    if (!dataSource.store()) {
                        return d.reject("canceled")
                    }(0, _deferred.when)(loadResult.data || that.loadFromStore(loadResult.storeLoadOptions)).done((function(data, extra) {
                        loadResult.data = data;
                        loadResult.extra = extra || {};
                        that._handleDataLoaded(loadResult);
                        if (options.requireTotalCount && void 0 === loadResult.extra.totalCount) {
                            loadResult.extra.totalCount = store.totalCount(loadResult.storeLoadOptions)
                        }(0, _deferred.when)(loadResult.data, loadResult.extra.totalCount).done((function(data, totalCount) {
                            loadResult.extra.totalCount = totalCount;
                            d.resolve(data, loadResult.extra)
                        })).fail(d.reject)
                    })).fail(d.reject)
                }), that.option("loadingTimeout"));
                return d.fail((function() {
                    that._eventsStrategy.fireEvent("loadError", arguments)
                })).always((function() {
                    _this5._isLoadingAll = false
                })).promise()
            } else {
                return dataSource.load()
            }
        },
        reload: function(full) {
            return full ? this._dataSource.reload() : this._dataSource.load()
        },
        getCachedStoreData: function() {
            return this._cachedStoreData
        }
    }
}());
exports.default = _default;
module.exports = exports.default;
module.exports.default = exports.default;