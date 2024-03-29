import { __assign, __rest } from "tslib";
var COMPARISON_OPERATORS = ['eq', 'ne', 'gt', 'ge', 'lt', 'le'];
var LOGICAL_OPERATORS = ['and', 'or', 'not'];
var COLLECTION_OPERATORS = ['any', 'all'];
var BOOLEAN_FUNCTIONS = ['startswith', 'endswith', 'contains'];
var SUPPORTED_EXPAND_PROPERTIES = [
    'expand',
    'levels',
    'select',
    'skip',
    'top',
    'count',
    'orderby',
    'filter',
];
var FUNCTION_REGEX = /\((.*)\)/;
var INDEXOF_REGEX = /(?!indexof)\((\w+)\)/;
export var StandardAggregateMethods;
(function (StandardAggregateMethods) {
    StandardAggregateMethods["sum"] = "sum";
    StandardAggregateMethods["min"] = "min";
    StandardAggregateMethods["max"] = "max";
    StandardAggregateMethods["average"] = "average";
    StandardAggregateMethods["countdistinct"] = "countdistinct";
})(StandardAggregateMethods || (StandardAggregateMethods = {}));
export var raw = function (value) { return ({ type: 'raw', value: value }); };
export var guid = function (value) { return ({ type: 'guid', value: value }); };
export var duration = function (value) { return ({ type: 'duration', value: value }); };
export var binary = function (value) { return ({ type: 'binary', value: value }); };
export var json = function (value) { return ({ type: 'json', value: value }); };
export var alias = function (name, value) { return ({ type: 'alias', name: name, value: value }); };
export var decimal = function (value) { return ({ type: 'decimal', value: value }); };
export var ITEM_ROOT = "";
export default function (_a) {
    var _b = _a === void 0 ? {} : _a, $select = _b.select, $search = _b.search, $skiptoken = _b.skiptoken, $format = _b.format, top = _b.top, skip = _b.skip, filter = _b.filter, transform = _b.transform, orderBy = _b.orderBy, key = _b.key, count = _b.count, expand = _b.expand, action = _b.action, func = _b.func;
    var path = '';
    var aliases = [];
    var params = {};
    // key is not (null, undefined)
    if (key != undefined) {
        path += "(".concat(handleValue(key, aliases), ")");
    }
    if (filter || typeof count === 'object')
        params.$filter = buildFilter(typeof count === 'object' ? count : filter, aliases);
    if (transform)
        params.$apply = buildTransforms(transform);
    if (expand)
        params.$expand = buildExpand(expand);
    if (orderBy)
        params.$orderby = buildOrderBy(orderBy);
    if (count) {
        if (typeof count === 'boolean') {
            params.$count = true;
        }
        else {
            path += '/$count';
        }
    }
    if (typeof top === 'number') {
        params.$top = top;
    }
    if (typeof skip === 'number') {
        params.$skip = skip;
    }
    if (action) {
        path += "/".concat(action);
    }
    if (func) {
        if (typeof func === 'string') {
            path += "/".concat(func);
        }
        else if (typeof func === 'object') {
            var funcName = Object.keys(func)[0];
            var funcArgs = handleValue(func[funcName], aliases);
            path += "/".concat(funcName);
            if (funcArgs !== "") {
                path += "(".concat(funcArgs, ")");
            }
        }
    }
    if (aliases.length > 0) {
        Object.assign(params, aliases.reduce(function (acc, alias) {
            var _a;
            return Object.assign(acc, (_a = {}, _a["@".concat(alias.name)] = handleValue(alias.value), _a));
        }, {}));
    }
    return buildUrl(path, __assign({ $select: $select, $search: $search, $skiptoken: $skiptoken, $format: $format }, params));
}
function renderPrimitiveValue(key, val, aliases) {
    if (aliases === void 0) { aliases = []; }
    return "".concat(key, " eq ").concat(handleValue(val, aliases));
}
function buildFilter(filters, aliases, propPrefix) {
    if (filters === void 0) { filters = {}; }
    if (aliases === void 0) { aliases = []; }
    if (propPrefix === void 0) { propPrefix = ''; }
    return (Array.isArray(filters) ? filters : [filters])
        .reduce(function (acc, filter) {
        if (filter) {
            var builtFilter = buildFilterCore(filter, aliases, propPrefix);
            if (builtFilter) {
                acc.push(builtFilter);
            }
        }
        return acc;
    }, []).join(' and ');
    function buildFilterCore(filter, aliases, propPrefix) {
        if (filter === void 0) { filter = {}; }
        if (aliases === void 0) { aliases = []; }
        if (propPrefix === void 0) { propPrefix = ''; }
        var filterExpr = "";
        if (typeof filter === 'string') {
            // Use raw filter string
            filterExpr = filter;
        }
        else if (filter && typeof filter === 'object') {
            var filtersArray = Object.keys(filter).reduce(function (result, filterKey) {
                var value = filter[filterKey];
                if (value === undefined) {
                    return result;
                }
                var propName = '';
                if (propPrefix) {
                    if (filterKey === ITEM_ROOT) {
                        propName = propPrefix;
                    }
                    else if (INDEXOF_REGEX.test(filterKey)) {
                        propName = filterKey.replace(INDEXOF_REGEX, function (_, $1) { return $1.trim() === ITEM_ROOT ? "(".concat(propPrefix, ")") : "(".concat(propPrefix, "/").concat($1.trim(), ")"); });
                    }
                    else if (FUNCTION_REGEX.test(filterKey)) {
                        propName = filterKey.replace(FUNCTION_REGEX, function (_, $1) { return $1.trim() === ITEM_ROOT ? "(".concat(propPrefix, ")") : "(".concat(propPrefix, "/").concat($1.trim(), ")"); });
                    }
                    else {
                        propName = "".concat(propPrefix, "/").concat(filterKey);
                    }
                }
                else {
                    propName = filterKey;
                }
                if (filterKey === ITEM_ROOT && Array.isArray(value)) {
                    return result.concat(value.map(function (arrayValue) { return renderPrimitiveValue(propName, arrayValue); }));
                }
                if (['number', 'string', 'boolean'].indexOf(typeof value) !== -1 ||
                    value instanceof Date ||
                    value === null) {
                    // Simple key/value handled as equals operator
                    result.push(renderPrimitiveValue(propName, value, aliases));
                }
                else if (Array.isArray(value)) {
                    var op_1 = filterKey;
                    var builtFilters = value
                        .map(function (v) { return buildFilter(v, aliases, propPrefix); })
                        .filter(function (f) { return f; })
                        .map(function (f) { return (LOGICAL_OPERATORS.indexOf(op_1) !== -1 ? "(".concat(f, ")") : f); });
                    if (builtFilters.length) {
                        if (LOGICAL_OPERATORS.indexOf(op_1) !== -1) {
                            if (builtFilters.length) {
                                if (op_1 === 'not') {
                                    result.push(parseNot(builtFilters));
                                }
                                else {
                                    result.push("(".concat(builtFilters.join(" ".concat(op_1, " ")), ")"));
                                }
                            }
                        }
                        else {
                            result.push(builtFilters.join(" ".concat(op_1, " ")));
                        }
                    }
                }
                else if (LOGICAL_OPERATORS.indexOf(propName) !== -1) {
                    var op = propName;
                    var builtFilters = Object.keys(value).map(function (valueKey) {
                        var _a;
                        return buildFilterCore((_a = {}, _a[valueKey] = value[valueKey], _a));
                    });
                    if (builtFilters.length) {
                        if (op === 'not') {
                            result.push(parseNot(builtFilters));
                        }
                        else {
                            result.push("(".concat(builtFilters.join(" ".concat(op, " ")), ")"));
                        }
                    }
                }
                else if (typeof value === 'object') {
                    if ('type' in value) {
                        result.push(renderPrimitiveValue(propName, value, aliases));
                    }
                    else {
                        var operators = Object.keys(value);
                        operators.forEach(function (op) {
                            if (value[op] === undefined) {
                                return;
                            }
                            if (COMPARISON_OPERATORS.indexOf(op) !== -1) {
                                result.push("".concat(propName, " ").concat(op, " ").concat(handleValue(value[op], aliases)));
                            }
                            else if (LOGICAL_OPERATORS.indexOf(op) !== -1) {
                                if (Array.isArray(value[op])) {
                                    result.push(value[op]
                                        .map(function (v) { return '(' + buildFilterCore(v, aliases, propName) + ')'; })
                                        .join(" ".concat(op, " ")));
                                }
                                else {
                                    result.push('(' + buildFilterCore(value[op], aliases, propName) + ')');
                                }
                            }
                            else if (COLLECTION_OPERATORS.indexOf(op) !== -1) {
                                var collectionClause = buildCollectionClause(filterKey.toLowerCase(), value[op], op, propName);
                                if (collectionClause) {
                                    result.push(collectionClause);
                                }
                            }
                            else if (op === 'has') {
                                result.push("".concat(propName, " ").concat(op, " ").concat(handleValue(value[op], aliases)));
                            }
                            else if (op === 'in') {
                                var resultingValues = Array.isArray(value[op])
                                    ? value[op]
                                    : value[op].value.map(function (typedValue) { return ({
                                        type: value[op].type,
                                        value: typedValue,
                                    }); });
                                result.push(propName + ' in (' + resultingValues.map(function (v) { return handleValue(v, aliases); }).join(',') + ')');
                            }
                            else if (BOOLEAN_FUNCTIONS.indexOf(op) !== -1) {
                                // Simple boolean functions (startswith, endswith, contains)
                                result.push("".concat(op, "(").concat(propName, ",").concat(handleValue(value[op], aliases), ")"));
                            }
                            else {
                                // Nested property
                                var filter_1 = buildFilterCore(value, aliases, propName);
                                if (filter_1) {
                                    result.push(filter_1);
                                }
                            }
                        });
                    }
                }
                else {
                    throw new Error("Unexpected value type: ".concat(value));
                }
                return result;
            }, []);
            filterExpr = filtersArray.join(' and ');
        } /* else {
            throw new Error(`Unexpected filters type: ${filter}`);
          } */
        return filterExpr;
    }
    function buildCollectionClause(lambdaParameter, value, op, propName) {
        var clause = '';
        if (typeof value === 'string' || value instanceof String) {
            clause = getStringCollectionClause(lambdaParameter, value, op, propName);
        }
        else if (value) {
            // normalize {any:[{prop1: 1}, {prop2: 1}]} --> {any:{prop1: 1, prop2: 1}}; same for 'all',
            // simple values collection: {any:[{'': 'simpleVal1'}, {'': 'simpleVal2'}]} --> {any:{'': ['simpleVal1', 'simpleVal2']}}; same for 'all',
            var filterValue = Array.isArray(value) ?
                value.reduce(function (acc, item) {
                    if (item.hasOwnProperty(ITEM_ROOT)) {
                        if (!acc.hasOwnProperty(ITEM_ROOT)) {
                            acc[ITEM_ROOT] = [];
                        }
                        acc[ITEM_ROOT].push(item[ITEM_ROOT]);
                        return acc;
                    }
                    return __assign(__assign({}, acc), item);
                }, {}) : value;
            var filter = buildFilterCore(filterValue, aliases, lambdaParameter);
            clause = "".concat(propName, "/").concat(op, "(").concat(filter ? "".concat(lambdaParameter, ":").concat(filter) : '', ")");
        }
        return clause;
    }
}
function getStringCollectionClause(lambdaParameter, value, collectionOperator, propName) {
    var clause = '';
    var conditionOperator = collectionOperator == 'all' ? 'ne' : 'eq';
    clause = "".concat(propName, "/").concat(collectionOperator, "(").concat(lambdaParameter, ": ").concat(lambdaParameter, " ").concat(conditionOperator, " '").concat(value, "')");
    return clause;
}
function escapeIllegalChars(string) {
    string = string.replace(/%/g, '%25');
    string = string.replace(/\+/g, '%2B');
    string = string.replace(/\//g, '%2F');
    string = string.replace(/\?/g, '%3F');
    string = string.replace(/#/g, '%23');
    string = string.replace(/&/g, '%26');
    string = string.replace(/'/g, "''");
    return string;
}
function handleValue(value, aliases) {
    if (typeof value === 'string') {
        return "'".concat(escapeIllegalChars(value), "'");
    }
    else if (value instanceof Date) {
        return value.toISOString();
    }
    else if (typeof value === 'number') {
        return value;
    }
    else if (Array.isArray(value)) {
        return "[".concat(value.map(function (d) { return handleValue(d); }).join(','), "]");
    }
    else if (value === null) {
        return value;
    }
    else if (typeof value === 'object') {
        switch (value.type) {
            case 'raw':
            case 'guid':
                return value.value;
            case 'duration':
                return "duration'".concat(value.value, "'");
            case 'binary':
                return "binary'".concat(value.value, "'");
            case 'alias':
                // Store
                if (Array.isArray(aliases))
                    aliases.push(value);
                return "@".concat(value.name);
            case 'json':
                return escape(JSON.stringify(value.value));
            case 'decimal':
                return "".concat(value.value, "M");
            default:
                return Object.entries(value)
                    .filter(function (_a) {
                    var v = _a[1];
                    return v !== undefined;
                })
                    .map(function (_a) {
                    var k = _a[0], v = _a[1];
                    return "".concat(k, "=").concat(handleValue(v, aliases));
                }).join(',');
        }
    }
    return value;
}
function buildExpand(expands) {
    if (typeof expands === 'number') {
        return expands;
    }
    else if (typeof expands === 'string') {
        if (expands.indexOf('/') === -1) {
            return expands;
        }
        // Change `Foo/Bar/Baz` to `Foo($expand=Bar($expand=Baz))`
        return expands
            .split('/')
            .reverse()
            .reduce(function (results, item, index, arr) {
            if (index === 0) {
                // Inner-most item
                return "$expand=".concat(item);
            }
            else if (index === arr.length - 1) {
                // Outer-most item, don't add `$expand=` prefix (added above)
                return "".concat(item, "(").concat(results, ")");
            }
            else {
                // Other items
                return "$expand=".concat(item, "(").concat(results, ")");
            }
        }, '');
    }
    else if (Array.isArray(expands)) {
        return "".concat(expands.map(function (e) { return buildExpand(e); }).join(','));
    }
    else if (typeof expands === 'object') {
        var expandKeys = Object.keys(expands);
        if (expandKeys.some(function (key) { return SUPPORTED_EXPAND_PROPERTIES.indexOf(key.toLowerCase()) !== -1; })) {
            return expandKeys
                .map(function (key) {
                var value;
                switch (key) {
                    case 'filter':
                        value = buildFilter(expands[key]);
                        break;
                    case 'orderBy':
                        value = buildOrderBy(expands[key]);
                        break;
                    case 'levels':
                    case 'count':
                    case 'skip':
                    case 'top':
                        value = "".concat(expands[key]);
                        break;
                    default:
                        value = buildExpand(expands[key]);
                }
                return "$".concat(key.toLowerCase(), "=").concat(value);
            })
                .join(';');
        }
        else {
            return expandKeys
                .map(function (key) {
                var builtExpand = buildExpand(expands[key]);
                return builtExpand ? "".concat(key, "(").concat(builtExpand, ")") : key;
            })
                .join(',');
        }
    }
    return "";
}
function buildTransforms(transforms) {
    // Wrap single object an array for simplified processing
    var transformsArray = Array.isArray(transforms) ? transforms : [transforms];
    var transformsResult = transformsArray.reduce(function (result, transform) {
        var aggregate = transform.aggregate, filter = transform.filter, groupBy = transform.groupBy, rest = __rest(transform, ["aggregate", "filter", "groupBy"]);
        // TODO: support as many of the following:
        //   topcount, topsum, toppercent,
        //   bottomsum, bottomcount, bottompercent,
        //   identity, concat, expand, search, compute, isdefined
        var unsupportedKeys = Object.keys(rest);
        if (unsupportedKeys.length) {
            throw new Error("Unsupported transform(s): ".concat(unsupportedKeys));
        }
        if (aggregate) {
            result.push("aggregate(".concat(buildAggregate(aggregate), ")"));
        }
        if (filter) {
            var builtFilter = buildFilter(filter);
            if (builtFilter) {
                result.push("filter(".concat(buildFilter(builtFilter), ")"));
            }
        }
        if (groupBy) {
            result.push("groupby(".concat(buildGroupBy(groupBy), ")"));
        }
        return result;
    }, []);
    return transformsResult.join('/') || undefined;
}
function buildAggregate(aggregate) {
    // Wrap single object in an array for simplified processing
    var aggregateArray = Array.isArray(aggregate) ? aggregate : [aggregate];
    return aggregateArray
        .map(function (aggregateItem) {
        return typeof aggregateItem === "string"
            ? aggregateItem
            : Object.keys(aggregateItem).map(function (aggregateKey) {
                var aggregateValue = aggregateItem[aggregateKey];
                // TODO: Are these always required?  Can/should we default them if so?
                if (!aggregateValue.with) {
                    throw new Error("'with' property required for '".concat(aggregateKey, "'"));
                }
                if (!aggregateValue.as) {
                    throw new Error("'as' property required for '".concat(aggregateKey, "'"));
                }
                return "".concat(aggregateKey, " with ").concat(aggregateValue.with, " as ").concat(aggregateValue.as);
            });
    })
        .join(',');
}
function buildGroupBy(groupBy) {
    if (!groupBy.properties) {
        throw new Error("'properties' property required for groupBy");
    }
    var result = "(".concat(groupBy.properties.join(','), ")");
    if (groupBy.transform) {
        result += ",".concat(buildTransforms(groupBy.transform));
    }
    return result;
}
function buildOrderBy(orderBy, prefix) {
    if (prefix === void 0) { prefix = ''; }
    if (Array.isArray(orderBy)) {
        return orderBy
            .map(function (value) {
            return (Array.isArray(value) && value.length === 2 && ['asc', 'desc'].indexOf(value[1]) !== -1) ? value.join(' ') : value;
        })
            .map(function (v) { return "".concat(prefix).concat(String(v)); }).join(',');
    }
    else if (typeof orderBy === 'object') {
        return Object.entries(orderBy)
            .map(function (_a) {
            var k = _a[0], v = _a[1];
            return buildOrderBy(v, "".concat(k, "/"));
        })
            .map(function (v) { return "".concat(prefix).concat(v); }).join(',');
    }
    return "".concat(prefix).concat(String(orderBy));
}
function buildUrl(path, params) {
    // This can be refactored using URL API. But IE does not support it.
    var queries = Object.getOwnPropertyNames(params)
        .filter(function (key) { return params[key] !== undefined && params[key] !== ''; })
        .map(function (key) { return "".concat(key, "=").concat(params[key]); });
    return queries.length ? "".concat(path, "?").concat(queries.join('&')) : path;
}
function parseNot(builtFilters) {
    return "not(".concat(builtFilters.join(' and '), ")");
}
