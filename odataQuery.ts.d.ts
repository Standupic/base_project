export declare type PlainObject = {
    [property: string]: any;
};
export declare type Select<T> = string | keyof T | Array<keyof T>;
export declare type NestedOrderBy<T> = {
    [P in keyof T]?: T[P] extends Array<infer E> ? OrderBy<E> : OrderBy<T[P]>;
};
export declare type OrderBy<T> = string | OrderByOptions<T> | Array<OrderByOptions<T>> | NestedOrderBy<T>;
export declare type Filter = string | PlainObject | Array<string | PlainObject>;
export declare type NestedExpandOptions<T> = {
    [P in keyof T]?: (T[P] extends Array<infer E> ? Partial<ExpandOptions<E>> : Partial<ExpandOptions<T[P]>>);
};
export declare type Expand<T> = string | keyof T | NestedExpandOptions<T> | Array<keyof T | NestedExpandOptions<T>> | Array<string | NestedExpandOptions<T>>;
export declare enum StandardAggregateMethods {
    sum = "sum",
    min = "min",
    max = "max",
    average = "average",
    countdistinct = "countdistinct"
}
export declare type Aggregate = string | {
    [propertyName: string]: {
        with: StandardAggregateMethods;
        as: string;
    };
};
export declare type OrderByOptions<T> = keyof T | [keyof T, 'asc' | 'desc'];
export declare type ExpandOptions<T> = {
    select: Select<T>;
    filter: Filter;
    orderBy: OrderBy<T>;
    skip: number;
    top: number;
    levels: number | 'max';
    count: boolean | Filter;
    expand: Expand<T>;
};
export declare type Transform<T> = {
    aggregate?: Aggregate | Array<Aggregate>;
    filter?: Filter;
    groupBy?: GroupBy<T>;
};
export declare type GroupBy<T> = {
    properties: Array<keyof T>;
    transform?: Transform<T>;
};
export declare type Raw = {
    type: 'raw';
    value: any;
};
export declare type Guid = {
    type: 'guid';
    value: any;
};
export declare type Duration = {
    type: 'duration';
    value: any;
};
export declare type Binary = {
    type: 'binary';
    value: any;
};
export declare type Json = {
    type: 'json';
    value: any;
};
export declare type Alias = {
    type: 'alias';
    name: string;
    value: any;
};
export declare type Decimal = {
    type: 'decimal';
    value: any;
};
export declare type Value = string | Date | number | boolean | Raw | Guid | Duration | Binary | Json | Alias | Decimal;
export declare const raw: (value: string) => Raw;
export declare const guid: (value: string) => Guid;
export declare const duration: (value: string) => Duration;
export declare const binary: (value: string) => Binary;
export declare const json: (value: PlainObject) => Json;
export declare const alias: (name: string, value: PlainObject) => Alias;
export declare const decimal: (value: string) => Decimal;
export declare type QueryOptions<T> = ExpandOptions<T> & {
    search: string;
    transform: PlainObject | PlainObject[];
    skip: number;
    skiptoken: string;
    key: string | number | PlainObject;
    count: boolean | Filter;
    action: string;
    func: string | {
        [functionName: string]: {
            [parameterName: string]: any;
        };
    };
    format: string;
    aliases: Alias[];
};
export declare const ITEM_ROOT = "";
export default function <T>({ select: $select, search: $search, skiptoken: $skiptoken, format: $format, top, skip, filter, transform, orderBy, key, count, expand, action, func }?: Partial<QueryOptions<T>>): string;
