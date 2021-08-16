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

import * as React from 'react';
interface INestedOptionMeta {
    optionName: string;
    registerNestedOption(component: React.ReactElement<any>): any;
    updateFunc(newProps: any, prevProps: any): void;
    makeDirty(): void;
}
declare class NestedOption<P> extends React.PureComponent<P, any> {
    render(): React.ReactNode;
}
export default NestedOption;
export { INestedOptionMeta, };
