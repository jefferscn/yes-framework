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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
import escape from 'escape-string-regexp';
import * as queryString from 'query-string';
import checkLegacyPathConfig from './checkLegacyPathConfig';
/**
 * Utility to parse a path string to initial state object accepted by the container.
 * This is useful for deep linking when we need to handle the incoming URL.
 *
 * @example
 * ```js
 * getStateFromPath(
 *   '/chat/jane/42',
 *   {
 *     screens: {
 *       Chat: {
 *         path: 'chat/:author/:id',
 *         parse: { id: Number }
 *       }
 *     }
 *   }
 * )
 * ```
 * @param path Path string to parse and convert, e.g. /foo/bar?count=42.
 * @param options Extra options to fine-tune how to parse the path.
 */
export default function getStateFromPath(path, options) {
    var _a;
    var _b = checkLegacyPathConfig(options), legacy = _b[0], compatOptions = _b[1];
    var initialRoutes = [];
    if (compatOptions === null || compatOptions === void 0 ? void 0 : compatOptions.initialRouteName) {
        initialRoutes.push({
            initialRouteName: compatOptions.initialRouteName,
            parentScreens: [],
        });
    }
    var screens = compatOptions === null || compatOptions === void 0 ? void 0 : compatOptions.screens;
    var remaining = path
        .replace(/\/+/g, '/') // Replace multiple slash (//) with single ones
        .replace(/^\//, '') // Remove extra leading slash
        .replace(/\?.*$/, ''); // Remove query params which we will handle later
    // Make sure there is a trailing slash
    remaining = remaining.endsWith('/') ? remaining : remaining + "/";
    if (screens === undefined) {
        // When no config is specified, use the path segments as route names
        var routes = remaining
            .split('/')
            .filter(Boolean)
            .map(function (segment, i, self) {
            var name = decodeURIComponent(segment);
            if (i === self.length - 1) {
                return { name: name, params: parseQueryParams(path) };
            }
            return { name: name };
        });
        if (routes.length) {
            return createNestedStateObject(routes, initialRoutes);
        }
        return undefined;
    }
    // Create a normalized configs array which will be easier to use
    var configs = (_a = [])
        .concat.apply(_a, Object.keys(screens).map(function (key) {
        return createNormalizedConfigs(legacy, key, screens, [], initialRoutes, []);
    })).sort(function (a, b) {
        // Sort config so that:
        // - the most exhaustive ones are always at the beginning
        // - patterns with wildcard are always at the end
        // If 2 patterns are same, move the one with less route names up
        // This is an error state, so it's only useful for consistent error messages
        if (a.pattern === b.pattern) {
            return b.routeNames.join('>').localeCompare(a.routeNames.join('>'));
        }
        // If one of the patterns starts with the other, it's more exhaustive
        // So move it up
        if (a.pattern.startsWith(b.pattern)) {
            return -1;
        }
        if (b.pattern.startsWith(a.pattern)) {
            return 1;
        }
        var aParts = a.pattern.split('/');
        var bParts = b.pattern.split('/');
        var aWildcardIndex = aParts.indexOf('*');
        var bWildcardIndex = bParts.indexOf('*');
        // If only one of the patterns has a wildcard, move it down in the list
        if (aWildcardIndex === -1 && bWildcardIndex !== -1) {
            return -1;
        }
        if (aWildcardIndex !== -1 && bWildcardIndex === -1) {
            return 1;
        }
        if (aWildcardIndex === bWildcardIndex) {
            // If `b` has more `/`, it's more exhaustive
            // So we move it up in the list
            return bParts.length - aParts.length;
        }
        // If the wildcard appears later in the pattern (has higher index), it's more specific
        // So we move it up in the list
        return bWildcardIndex - aWildcardIndex;
    });
    // Check for duplicate patterns in the config
    configs.reduce(function (acc, config) {
        var _a;
        if (acc[config.pattern]) {
            var a_1 = acc[config.pattern].routeNames;
            var b_1 = config.routeNames;
            // It's not a problem if the path string omitted from a inner most screen
            // For example, it's ok if a path resolves to `A > B > C` or `A > B`
            var intersects = a_1.length > b_1.length
                ? b_1.every(function (it, i) { return a_1[i] === it; })
                : a_1.every(function (it, i) { return b_1[i] === it; });
            if (!intersects) {
                throw new Error("Found conflicting screens with the same pattern. The pattern '" + config.pattern + "' resolves to both '" + a_1.join(' > ') + "' and '" + b_1.join(' > ') + "'. Patterns must be unique and cannot resolve to more than one screen.");
            }
        }
        return Object.assign(acc, (_a = {},
            _a[config.pattern] = config,
            _a));
    }, {});
    if (remaining === '/') {
        // We need to add special handling of empty path so navigation to empty path also works
        // When handling empty path, we should only look at the root level config
        var match_1 = configs.find(function (config) {
            return config.path === '' &&
                config.routeNames.every(
                // Make sure that none of the parent configs have a non-empty path defined
                function (name) { var _a; return !((_a = configs.find(function (c) { return c.screen === name; })) === null || _a === void 0 ? void 0 : _a.path); });
        });
        if (match_1) {
            return createNestedStateObject(match_1.routeNames.map(function (name, i, self) {
                if (i === self.length - 1) {
                    return { name: name, params: parseQueryParams(path, match_1.parse) };
                }
                return { name: name };
            }), initialRoutes);
        }
        return undefined;
    }
    var result;
    var current;
    if (legacy === false) {
        // If we're not in legacy mode,, we match the whole path against the regex instead of segments
        // This makes sure matches such as wildcard will catch any unmatched routes, even if nested
        var _c = matchAgainstConfigs(remaining, configs.map(function (c) { return (__assign(__assign({}, c), { 
            // Add `$` to the regex to make sure it matches till end of the path and not just beginning
            regex: c.regex ? new RegExp(c.regex.source + '$') : undefined })); })), routes = _c.routes, remainingPath = _c.remainingPath;
        if (routes !== undefined) {
            // This will always be empty if full path matched
            current = createNestedStateObject(routes, initialRoutes);
            remaining = remainingPath;
            result = current;
        }
    }
    else {
        // In legacy mode, we divide the path into segments and match piece by piece
        // This preserves the legacy behaviour, but we should remove it in next major
        while (remaining) {
            var _d = matchAgainstConfigs(remaining, configs), routes = _d.routes, remainingPath = _d.remainingPath;
            remaining = remainingPath;
            // If we hadn't matched any segments earlier, use the path as route name
            if (routes === undefined) {
                var segments = remaining.split('/');
                routes = [{ name: decodeURIComponent(segments[0]) }];
                segments.shift();
                remaining = segments.join('/');
            }
            var state = createNestedStateObject(routes, initialRoutes);
            if (current) {
                // The state should be nested inside the deepest route we parsed before
                while (current === null || current === void 0 ? void 0 : current.routes[current.index || 0].state) {
                    current = current.routes[current.index || 0].state;
                }
                current.routes[(current === null || current === void 0 ? void 0 : current.index) || 0].state = state;
            }
            else {
                result = state;
            }
            current = state;
        }
    }
    if (current == null || result == null) {
        return undefined;
    }
    var route = findFocusedRoute(current);
    var params = parseQueryParams(path, findParseConfigForRoute(route.name, configs));
    if (params) {
        // @ts-expect-error: params should be treated as read-only, but we're creating the state here so it doesn't matter
        route.params = __assign(__assign({}, route.params), params);
    }
    return result;
}
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
var matchAgainstConfigs = function (remaining, configs) {
    var _a;
    var routes;
    var remainingPath = remaining;
    var _loop_1 = function (config) {
        if (!config.regex) {
            return "continue";
        }
        var match = remainingPath.match(config.regex);
        // If our regex matches, we need to extract params from the path
        if (match) {
            var matchedParams_1 = (_a = config.pattern) === null || _a === void 0 ? void 0 : _a.split('/').filter(function (p) { return p.startsWith(':'); }).reduce(function (acc, p, i) {
                var _a;
                return Object.assign(acc, (_a = {},
                    // The param segments appear every second item starting from 2 in the regex match result
                    _a[p] = match[(i + 1) * 2].replace(/\//, ''),
                    _a));
            }, {});
            routes = config.routeNames.map(function (name) {
                var _a;
                var config = configs.find(function (c) { return c.screen === name; });
                var params = (_a = config === null || config === void 0 ? void 0 : config.path) === null || _a === void 0 ? void 0 : _a.split('/').filter(function (p) { return p.startsWith(':'); }).reduce(function (acc, p) {
                    var _a;
                    var value = matchedParams_1[p];
                    if (value) {
                        var key = p.replace(/^:/, '').replace(/\?$/, '');
                        acc[key] = ((_a = config.parse) === null || _a === void 0 ? void 0 : _a[key]) ? config.parse[key](value) : value;
                    }
                    return acc;
                }, {});
                if (params && Object.keys(params).length) {
                    return { name: name, params: params };
                }
                return { name: name };
            });
            remainingPath = remainingPath.replace(match[1], '');
            return "break";
        }
    };
    // Go through all configs, and see if the next path segment matches our regex
    for (var _i = 0, configs_1 = configs; _i < configs_1.length; _i++) {
        var config = configs_1[_i];
        var state_1 = _loop_1(config);
        if (state_1 === "break")
            break;
    }
    return { routes: routes, remainingPath: remainingPath };
};
var createNormalizedConfigs = function (legacy, screen, routeConfig, routeNames, initials, parentScreens, parentPattern) {
    if (routeNames === void 0) { routeNames = []; }
    var configs = [];
    routeNames.push(screen);
    parentScreens.push(screen);
    var config = routeConfig[screen];
    if (typeof config === 'string') {
        // If a string is specified as the value of the key(e.g. Foo: '/path'), use it as the pattern
        var pattern = parentPattern ? joinPaths(parentPattern, config) : config;
        configs.push(createConfigItem(legacy, screen, routeNames, pattern, config));
    }
    else if (typeof config === 'object') {
        var pattern_1;
        // if an object is specified as the value (e.g. Foo: { ... }),
        // it can have `path` property and
        // it could have `screens` prop which has nested configs
        if (typeof config.path === 'string') {
            if (legacy) {
                pattern_1 =
                    config.exact !== true && parentPattern
                        ? joinPaths(parentPattern, config.path)
                        : config.path;
            }
            else {
                if (config.exact && config.path === undefined) {
                    throw new Error("A 'path' needs to be specified when specifying 'exact: true'. If you don't want this screen in the URL, specify it as empty string, e.g. `path: ''`.");
                }
                pattern_1 =
                    config.exact !== true
                        ? joinPaths(parentPattern || '', config.path || '')
                        : config.path || '';
            }
            configs.push(createConfigItem(legacy, screen, routeNames, pattern_1, config.path, config.parse));
        }
        if (config.screens) {
            // property `initialRouteName` without `screens` has no purpose
            if (config.initialRouteName) {
                initials.push({
                    initialRouteName: config.initialRouteName,
                    parentScreens: parentScreens,
                });
            }
            Object.keys(config.screens).forEach(function (nestedConfig) {
                var result = createNormalizedConfigs(legacy, nestedConfig, config.screens, routeNames, initials, __spreadArray([], parentScreens), pattern_1 !== null && pattern_1 !== void 0 ? pattern_1 : parentPattern);
                configs.push.apply(configs, result);
            });
        }
    }
    routeNames.pop();
    return configs;
};
var createConfigItem = function (legacy, screen, routeNames, pattern, path, parse) {
    // Normalize pattern to remove any leading, trailing slashes, duplicate slashes etc.
    pattern = pattern.split('/').filter(Boolean).join('/');
    var regex = pattern
        ? new RegExp("^(" + pattern
            .split('/')
            .map(function (it) {
            if (legacy && it === '*') {
                throw new Error("Please update your config to the new format to use wildcard pattern ('*'). https://reactnavigation.org/docs/configuring-links/#updating-config");
            }
            if (it.startsWith(':')) {
                return "(([^/]+\\/)" + (it.endsWith('?') ? '?' : '') + ")";
            }
            return (it === '*' ? '.*' : escape(it)) + "\\/";
        })
            .join('') + ")")
        : undefined;
    return {
        screen: screen,
        regex: regex,
        pattern: pattern,
        path: path,
        // The routeNames array is mutated, so copy it to keep the current state
        routeNames: __spreadArray([], routeNames),
        parse: parse,
    };
};
var findParseConfigForRoute = function (routeName, flatConfig) {
    for (var _i = 0, flatConfig_1 = flatConfig; _i < flatConfig_1.length; _i++) {
        var config = flatConfig_1[_i];
        if (routeName === config.routeNames[config.routeNames.length - 1]) {
            return config.parse;
        }
    }
    return undefined;
};
// Try to find an initial route connected with the one passed
var findInitialRoute = function (routeName, parentScreens, initialRoutes) {
    for (var _i = 0, initialRoutes_1 = initialRoutes; _i < initialRoutes_1.length; _i++) {
        var config = initialRoutes_1[_i];
        if (parentScreens.length === config.parentScreens.length) {
            var sameParents = true;
            for (var i = 0; i < parentScreens.length; i++) {
                if (parentScreens[i].localeCompare(config.parentScreens[i]) !== 0) {
                    sameParents = false;
                    break;
                }
            }
            if (sameParents) {
                return routeName !== config.initialRouteName
                    ? config.initialRouteName
                    : undefined;
            }
        }
    }
    return undefined;
};
// returns state object with values depending on whether
// it is the end of state and if there is initialRoute for this level
var createStateObject = function (initialRoute, route, isEmpty) {
    if (isEmpty) {
        if (initialRoute) {
            return {
                index: 1,
                routes: [{ name: initialRoute }, route],
            };
        }
        else {
            return {
                routes: [route],
            };
        }
    }
    else {
        if (initialRoute) {
            return {
                index: 1,
                routes: [{ name: initialRoute }, __assign(__assign({}, route), { state: { routes: [] } })],
            };
        }
        else {
            return {
                routes: [__assign(__assign({}, route), { state: { routes: [] } })],
            };
        }
    }
};
var createNestedStateObject = function (routes, initialRoutes) {
    var state;
    var route = routes.shift();
    var parentScreens = [];
    var initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
    parentScreens.push(route.name);
    state = createStateObject(initialRoute, route, routes.length === 0);
    if (routes.length > 0) {
        var nestedState = state;
        while ((route = routes.shift())) {
            initialRoute = findInitialRoute(route.name, parentScreens, initialRoutes);
            var nestedStateIndex = nestedState.index || nestedState.routes.length - 1;
            nestedState.routes[nestedStateIndex].state = createStateObject(initialRoute, route, routes.length === 0);
            if (routes.length > 0) {
                nestedState = nestedState.routes[nestedStateIndex]
                    .state;
            }
            parentScreens.push(route.name);
        }
    }
    return state;
};
var findFocusedRoute = function (state) {
    var current = state;
    while (current === null || current === void 0 ? void 0 : current.routes[current.index || 0].state) {
        // The query params apply to the deepest route
        current = current.routes[current.index || 0].state;
    }
    var route = current.routes[(current === null || current === void 0 ? void 0 : current.index) || 0];
    return route;
};
var parseQueryParams = function (path, parseConfig) {
    var query = path.split('?')[1];
    var params = queryString.parse(query);
    if (parseConfig) {
        Object.keys(params).forEach(function (name) {
            if (parseConfig[name] && typeof params[name] === 'string') {
                params[name] = parseConfig[name](params[name]);
            }
        });
    }
    return Object.keys(params).length ? params : undefined;
};
