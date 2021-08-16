/**
 * DevExtreme (esm/viz/tree_map/plain_data_source.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import TreeMapBase from "./tree_map.base";
var proto = TreeMapBase.prototype;
proto._optionChangesMap.idField = proto._optionChangesMap.parentField = "NODES_CREATE";
proto._processDataSourceItems = function(items) {
    var i;
    var struct = {};
    var currentItem;
    var idField = this._getOption("idField", true);
    var parentField = this._getOption("parentField", true);
    var parentId;
    var rootNodes = [];
    var tmpItems;
    var item;
    if (!idField || !parentField || 0 === items.length) {
        return {
            items: items,
            isPlain: false
        }
    }
    for (i = 0; i < items.length; i++) {
        currentItem = items[i];
        parentId = currentItem[parentField];
        if (parentId) {
            struct[parentId] = struct[parentId] || {
                items: []
            };
            tmpItems = struct[parentId].items
        } else {
            tmpItems = rootNodes
        }
        tmpItems.push(currentItem)
    }
    treeFiller({
        struct: struct,
        idField: idField
    }, rootNodes);
    for (item in struct) {
        struct[item] && rootNodes.push(struct[item])
    }
    return {
        items: rootNodes,
        isPlain: true
    }
};

function treeFiller(context, items) {
    var currentItem;
    var i;
    var struct = context.struct;
    var id;
    for (i = 0; i < items.length; i++) {
        currentItem = items[i];
        id = currentItem[context.idField];
        if (struct[id]) {
            currentItem.items = struct[id].items;
            struct[id] = null;
            treeFiller(context, currentItem.items)
        }
    }
}
