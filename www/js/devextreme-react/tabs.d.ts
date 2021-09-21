/*!
 * devextreme-react
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 *
 * This software may be modified and distributed under the terms
 * of the MIT license. See the LICENSE file in the root of the project for details.
 *
 * https://github.com/DevExpress/devextreme-react
 */

/// <reference types="react" />
import dxTabs, { IOptions } from "devextreme/ui/tabs";
import { Component as BaseComponent, IHtmlOptions } from "./core/component";
import NestedOption from "./core/nested-option";
interface ITabsOptions extends IOptions, IHtmlOptions {
    itemRender?: (...params: any) => React.ReactNode;
    itemComponent?: React.ComponentType<any>;
    itemKeyFn?: (data: any) => string;
    defaultItems?: any;
    defaultSelectedIndex?: any;
    defaultSelectedItem?: any;
    defaultSelectedItemKeys?: any;
    defaultSelectedItems?: any;
    onItemsChange?: (value: any) => void;
    onSelectedIndexChange?: (value: any) => void;
    onSelectedItemChange?: (value: any) => void;
    onSelectedItemKeysChange?: (value: any) => void;
    onSelectedItemsChange?: (value: any) => void;
}
declare class Tabs extends BaseComponent<ITabsOptions> {
    get instance(): dxTabs;
    protected _WidgetClass: typeof dxTabs;
    protected subscribableOptions: string[];
    protected independentEvents: string[];
    protected _defaults: {
        defaultItems: string;
        defaultSelectedIndex: string;
        defaultSelectedItem: string;
        defaultSelectedItemKeys: string;
        defaultSelectedItems: string;
    };
    protected _expectedChildren: {
        item: {
            optionName: string;
            isCollectionItem: boolean;
        };
    };
    protected _templateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
interface IItemProps {
    badge?: any;
    disabled?: any;
    html?: any;
    icon?: any;
    template?: any;
    text?: any;
    visible?: any;
    render?: (...params: any) => React.ReactNode;
    component?: React.ComponentType<any>;
    keyFn?: (data: any) => string;
}
declare class Item extends NestedOption<IItemProps> {
    static OptionName: string;
    static IsCollectionItem: boolean;
    static TemplateProps: {
        tmplOption: string;
        render: string;
        component: string;
        keyFn: string;
    }[];
}
export default Tabs;
export { Tabs, ITabsOptions, Item, IItemProps };
