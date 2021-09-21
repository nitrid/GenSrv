/**
* DevExtreme (data/load_options.d.ts)
* Version: 21.1.5
* Build date: Mon Aug 02 2021
*
* Copyright (c) 2012 - 2021 Developer Express Inc. ALL RIGHTS RESERVED
* Read about DevExtreme licensing here: https://js.devexpress.com/Licensing/
*/

/**
 * 
 * @deprecated Attention! This type is for internal purposes only. If you used it previously, please describe your scenario in the following GitHub Issue, and we will suggest a public alternative: {@link https://github.com/DevExpress/DevExtreme/issues/17885|Internal Types}.
 */
export interface LoadOptions {
    /**
     * An object for storing additional settings that should be sent to the server. Relevant to the ODataStore only.
     */
    customQueryParams?: any;
    /**
     * An array of strings that represent the names of navigation properties to be loaded simultaneously with the ODataStore.
     */
    expand?: any;
    /**
     * A filter expression.
     */
    filter?: any;
    /**
     * A group expression.
     */
    group?: any;
    /**
     * A group summary expression. Used with the group setting.
     */
    groupSummary?: any;
    /**
     * The IDs of the rows being expanded. Relevant only when the CustomStore is used in the TreeList UI component.
     */
    parentIds?: Array<any>;
    /**
     * Indicates whether a top-level group count is required. Used in conjunction with the filter, take, skip, requireTotalCount, and group settings.
     */
    requireGroupCount?: boolean;
    /**
     * Indicates whether the total count of data objects is needed.
     */
    requireTotalCount?: boolean;
    /**
     * A data field or expression whose value is compared to the search value.
     */
    searchExpr?: string | Function | Array<string | Function>;
    /**
     * A comparison operation. Can have one of the following values: &apos;=&apos;, &apos;&lt;&gt;&apos;, &apos;&gt;&apos;, &apos;&gt;=&apos;, &apos;&lt;&apos;, &apos;&lt;=&apos;, &apos;startswith&apos;, &apos;endswith&apos;, &apos;contains&apos;, &apos;notcontains&apos;, &apos;isblank&apos; and &apos;isnotblank&apos;.
     */
    searchOperation?: string;
    /**
     * The current search value.
     */
    searchValue?: any;
    /**
     * A select expression.
     */
    select?: any;
    /**
     * The number of data objects to be skipped from the result set&apos;s start. In conjunction with take, used to implement paging.
     */
    skip?: number;
    /**
     * A sort expression.
     */
    sort?: any;
    /**
     * The number of data objects to be loaded. In conjunction with skip, used to implement paging.
     */
    take?: number;
    /**
     * A total summary expression.
     */
    totalSummary?: any;
    /**
     * An object for storing additional settings that should be sent to the server.
     */
    userData?: any;
}
