var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import * as queryString from 'query-string';
import checkLegacyPathConfig from './checkLegacyPathConfig';
var getActiveRoute = function (state) {
    var route = typeof state.index === 'number'
        ? state.routes[state.index]
        : state.routes[state.routes.length - 1];
    if (route.state) {
        return getActiveRoute(route.state);
    }
    return route;
};
/**
 * Utility to serialize a navigation state object to a path string.
 *
 * @example
 * ```js
 * getPathFromState(
 *   {
 *     routes: [
 *       {
 *         name: 'Chat',
 *         params: { author: 'Jane', id: 42 },
 *       },
 *     ],
 *   },
 *   {
 *     screens: {
 *       Chat: {
 *         path: 'chat/:author/:id',
 *         stringify: { author: author => author.toLowerCase() }
 *       }
 *     }
 *   }
 * )
 * ```
 *
 * @param state Navigation state to serialize.
 * @param options Extra options to fine-tune how to serialize the path.
 * @returns Path representing the state, e.g. /foo/bar?count=42.
 */
export default function getPathFromState(state, options) {
    var _a;
    if (state == null) {
        throw Error("Got 'undefined' for the navigation state. You must pass a valid state object.");
    }
    var _b = checkLegacyPathConfig(options), legacy = _b[0], compatOptions = _b[1];
    // Create a normalized configs object which will be easier to use
    var configs = compatOptions
        ? createNormalizedConfigs(legacy, compatOptions.screens)
        : {};
    var path = '#';
    var current = state;
    var allParams = {};
    var _loop_1 = function () {
        var index = typeof current.index === 'number' ? current.index : 0;
        var route = current.routes[index];
        var pattern = void 0;
        var focusedParams;
        var focusedRoute = getActiveRoute(state);
        var currentOptions = configs;
        // Keep all the route names that appeared during going deeper in config in case the pattern is resolved to undefined
        var nestedRouteNames = [];
        var hasNext = true;
        var _loop_2 = function () {
            pattern = currentOptions[route.name].pattern;
            nestedRouteNames.push(route.name);
            if (route.params) {
                var stringify_1 = (_a = currentOptions[route.name]) === null || _a === void 0 ? void 0 : _a.stringify;
                var currentParams = fromEntries(Object.entries(route.params).map(function (_a) {
                    var key = _a[0], value = _a[1];
                    return [
                        key,
                        (stringify_1 === null || stringify_1 === void 0 ? void 0 : stringify_1[key]) ? stringify_1[key](value) : String(value),
                    ];
                }));
                if (pattern) {
                    Object.assign(allParams, currentParams);
                }
                if (focusedRoute === route) {
                    // If this is the focused route, keep the params for later use
                    // We save it here since it's been stringified already
                    focusedParams = __assign({}, currentParams);
                    pattern === null || pattern === void 0 ? void 0 : pattern.split('/').filter(function (p) { return p.startsWith(':'); }).forEach(function (p) {
                        var name = getParamName(p);
                        // Remove the params present in the pattern since we'll only use the rest for query string
                        if (focusedParams) {
                            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                            delete focusedParams[name];
                        }
                    });
                }
            }
            // If there is no `screens` property or no nested state, we return pattern
            if (!currentOptions[route.name].screens || route.state === undefined) {
                hasNext = false;
            }
            else {
                index =
                    typeof route.state.index === 'number'
                        ? route.state.index
                        : route.state.routes.length - 1;
                var nextRoute = route.state.routes[index];
                var nestedConfig = currentOptions[route.name].screens;
                // if there is config for next route name, we go deeper
                if (nestedConfig && nextRoute.name in nestedConfig) {
                    route = nextRoute;
                    currentOptions = nestedConfig;
                }
                else {
                    // If not, there is no sense in going deeper in config
                    hasNext = false;
                }
            }
        };
        while (route.name in currentOptions && hasNext) {
            _loop_2();
        }
        if (pattern === undefined) {
            pattern = nestedRouteNames.join('/');
        }
        if (currentOptions[route.name] !== undefined) {
            path += pattern
                .split('/')
                .map(function (p) {
                var name = getParamName(p);
                // We don't know what to show for wildcard patterns
                // Showing the route name seems ok, though whatever we show here will be incorrect
                // Since the page doesn't actually exist
                if (p === '*') {
                    if (legacy) {
                        throw new Error("Please update your config to the new format to use wildcard pattern ('*'). https://reactnavigation.org/docs/configuring-links/#updating-config");
                    }
                    return route.name;
                }
                // If the path has a pattern for a param, put the param in the path
                if (p.startsWith(':')) {
                    var value = allParams[name];
                    if (value === undefined && p.endsWith('?')) {
                        // Optional params without value assigned in route.params should be ignored
                        return '';
                    }
                    return encodeURIComponent(value);
                }
                return encodeURIComponent(p);
            })
                .join('/');
        }
        else {
            path += encodeURIComponent(route.name);
        }
        if (!focusedParams) {
            focusedParams = focusedRoute.params;
        }
        if (route.state) {
            path += '/';
        }
        else if (focusedParams) {
            for (var param in focusedParams) {
                if (focusedParams[param] === 'undefined') {
                    // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
                    delete focusedParams[param];
                }
            }
            var query = queryString.stringify(focusedParams);
            if (query) {
                path += "?" + query;
            }
        }
        current = route.state;
    };
    while (current) {
        _loop_1();
    }
    // Remove multiple as well as trailing slashes
    path = path.replace(/\/+/g, '/');
    path = path.length > 1 ? path.replace(/\/$/, '') : path;
    return path;
}
// Object.fromEntries is not available in older iOS versions
var fromEntries = function (entries) {
    return entries.reduce(function (acc, _a) {
        var k = _a[0], v = _a[1];
        if (acc.hasOwnProperty(k)) {
            throw new Error("A value for key '" + k + "' already exists in the object.");
        }
        acc[k] = v;
        return acc;
    }, {});
};
var getParamName = function (pattern) {
    return pattern.replace(/^:/, '').replace(/\?$/, '');
};
var joinPaths = function () {
    var _a;
    var paths = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        paths[_i] = arguments[_i];
    }
    return (_a = [])
        .concat.apply(_a, paths.map(function (p) { return p.split('/'); })).filter(Boolean)
        .join('/');
};
var createConfigItem = function (legacy, config, parentPattern) {
    if (typeof config === 'string') {
        // If a string is specified as the value of the key(e.g. Foo: '/path'), use it as the pattern
        var pattern_1 = parentPattern ? joinPaths(parentPattern, config) : config;
        return { pattern: pattern_1 };
    }
    // If an object is specified as the value (e.g. Foo: { ... }),
    // It can have `path` property and `screens` prop which has nested configs
    var pattern;
    if (legacy) {
        pattern =
            config.exact !== true && parentPattern && config.path
                ? joinPaths(parentPattern, config.path)
                : config.path;
    }
    else {
        if (config.exact && config.path === undefined) {
            throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
        }
        pattern =
            config.exact !== true
                ? joinPaths(parentPattern || '', config.path || '')
                : config.path || '';
    }
    var screens = config.screens
        ? createNormalizedConfigs(legacy, config.screens, pattern)
        : undefined;
    return {
        // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
        pattern: pattern === null || pattern === void 0 ? void 0 : pattern.split('/').filter(Boolean).join('/'),
        stringify: config.stringify,
        screens: screens,
    };
};
var createNormalizedConfigs = function (legacy, options, pattern) {
    return fromEntries(Object.entries(options).map(function (_a) {
        var name = _a[0], c = _a[1];
        var result = createConfigItem(legacy, c, pattern);
        return [name, result];
    }));
};
