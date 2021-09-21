/**
 * DevExtreme (esm/renovation/ui/pager/utils/get_element_width.js)
 * Version: 21.1.5
 * Build date: Mon Aug 02 2021
 *
 * Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
 * Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
 */
import getElementComputedStyle from "../../../utils/get_computed_style";
import {
    toNumber
} from "../../../utils/type_conversion";
export function getElementStyle(name, element) {
    var computedStyle = getElementComputedStyle(element) || {};
    return toNumber(computedStyle[name])
}
export function getElementWidth(element) {
    return getElementStyle("width", element)
}
export function getElementMinWidth(element) {
    return getElementStyle("minWidth", element)
}
