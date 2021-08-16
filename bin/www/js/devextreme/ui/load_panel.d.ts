/**
* DevExtreme (ui/load_panel.d.ts)
* Version: 21.1.5
* Build date: Mon Aug 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/
import {
    UserDefinedElement,
    DxElement
} from '../core/element';

import {
    Cancelable,
    EventInfo,
    InitializedEventInfo,
    ChangedOptionInfo
} from '../events/index';

import {
    animationConfig
} from '../animation/fx';

import {
    positionConfig
} from '../animation/position';

import dxOverlay, {
    dxOverlayAnimation,
    dxOverlayOptions
} from './overlay';

export type ContentReadyEvent = EventInfo<dxLoadPanel>;

export type DisposingEvent = EventInfo<dxLoadPanel>;

export type HidingEvent = Cancelable & EventInfo<dxLoadPanel>;

export type HiddenEvent = EventInfo<dxLoadPanel>;

export type InitializedEvent = InitializedEventInfo<dxLoadPanel>;

export type OptionChangedEvent = EventInfo<dxLoadPanel> & ChangedOptionInfo;

export type ShowingEvent = EventInfo<dxLoadPanel>;

export type ShownEvent = EventInfo<dxLoadPanel>;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please describe your scenario in the following GitHub Issue, and we will suggest a public alternative: {@link https://github.com/DevExpress/DevExtreme/issues/17885|Internal Types}.
 */
export interface dxLoadPanelOptions extends dxOverlayOptions<dxLoadPanel> {
    /**
     * Configures UI component visibility animations. This object contains two fields: show and hide.
     */
    animation?: dxLoadPanelAnimation;
    /**
     * Specifies the UI component&apos;s container.
     */
    container?: string | UserDefinedElement;
    /**
     * The delay in milliseconds after which the load panel is displayed.
     */
    delay?: number;
    /**
     * Specifies whether or not the UI component can be focused.
     */
    focusStateEnabled?: boolean;
    /**
     * Specifies the UI component&apos;s height in pixels.
     */
    height?: number | string | (() => number | string);
    /**
     * A URL pointing to an image to be used as a load indicator.
     */
    indicatorSrc?: string;
    /**
     * Specifies the maximum height the UI component can reach while resizing.
     */
    maxHeight?: number | string | (() => number | string);
    /**
     * Specifies the maximum width the UI component can reach while resizing.
     */
    maxWidth?: number | string | (() => number | string);
    /**
     * Specifies the text displayed in the load panel. Ignored in the Material Design theme.
     */
    message?: string;
    /**
     * Positions the UI component.
     */
    position?: 'bottom' | 'center' | 'left' | 'left bottom' | 'left top' | 'right' | 'right bottom' | 'right top' | 'top' | positionConfig | Function;
    /**
     * Specifies the shading color. Applies only if shading is enabled.
     */
    shadingColor?: string;
    /**
     * A Boolean value specifying whether or not to show a load indicator.
     */
    showIndicator?: boolean;
    /**
     * A Boolean value specifying whether or not to show the pane behind the load indicator.
     */
    showPane?: boolean;
    /**
     * Specifies the UI component&apos;s width in pixels.
     */
    width?: number | string | (() => number | string);
}
/**
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please describe your scenario in the following GitHub Issue, and we will suggest a public alternative: {@link https://github.com/DevExpress/DevExtreme/issues/17885|Internal Types}.
 */
export interface dxLoadPanelAnimation extends dxOverlayAnimation {
    /**
     * An object that defines the animation properties used when the UI component is being hidden.
     */
    hide?: animationConfig;
    /**
     * An object that defines the animation properties used when the UI component is being shown.
     */
    show?: animationConfig;
}
/**
 * The LoadPanel is an overlay UI component notifying the viewer that loading is in progress.
 */
export default class dxLoadPanel extends dxOverlay {
    constructor(element: UserDefinedElement, options?: dxLoadPanelOptions)
}

export type Properties = dxLoadPanelOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please describe your scenario in the following GitHub Issue, and we will suggest a public alternative: {@link https://github.com/DevExpress/DevExtreme/issues/17885|Internal Types}.
 */
export type Options = dxLoadPanelOptions;

/**
 * @deprecated use Properties instead
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please describe your scenario in the following GitHub Issue, and we will suggest a public alternative: {@link https://github.com/DevExpress/DevExtreme/issues/17885|Internal Types}.
 */
export type IOptions = dxLoadPanelOptions;
