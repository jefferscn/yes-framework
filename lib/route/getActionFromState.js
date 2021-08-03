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
import keyGenerator from './KeyGenerator';
export default function getActionFromState(state, options) {
    var _a, _b, _c;
    // Create a normalized configs object which will be easier to use
    var normalizedConfig = options ? createNormalizedConfigItem(options) : {};
    var routes = state.index != null ? state.routes.slice(0, state.index + 1) : state.routes;
    if (routes.length === 0) {
        return undefined;
    }
    if (!((routes.length === 1 && routes[0].key === undefined) ||
        (routes.length === 2 &&
            routes[0].key === undefined &&
            routes[0].name === (normalizedConfig === null || normalizedConfig === void 0 ? void 0 : normalizedConfig.initialRouteName) &&
            routes[1].key === undefined))) {
        return {
            type: 'RESET',
            payload: state,
        };
    }
    var route = state.routes[(_a = state.index) !== null && _a !== void 0 ? _a : state.routes.length - 1];
    var current = route === null || route === void 0 ? void 0 : route.state;
    var config = (_b = normalizedConfig === null || normalizedConfig === void 0 ? void 0 : normalizedConfig.screens) === null || _b === void 0 ? void 0 : _b[route === null || route === void 0 ? void 0 : route.name];
    var params = __assign({}, route.params);
    var payload = route ? { name: route.name, params: params } : undefined;
    while (current) {
        if (current.routes.length === 0) {
            return undefined;
        }
        var routes_1 = current.index != null
            ? current.routes.slice(0, current.index + 1)
            : current.routes;
        var route_1 = routes_1[routes_1.length - 1];
        // Explicitly set to override existing value when merging params
        Object.assign(params, {
            initial: undefined,
            screen: undefined,
            params: undefined,
            state: undefined,
        });
        if (routes_1.length === 1 && routes_1[0].key === undefined) {
            params.initial = true;
            params.screen = route_1.name;
        }
        else if (routes_1.length === 2 &&
            routes_1[0].key === undefined &&
            routes_1[0].name === (config === null || config === void 0 ? void 0 : config.initialRouteName) &&
            routes_1[1].key === undefined) {
            params.initial = false;
            params.screen = route_1.name;
        }
        else {
            params.state = current;
            break;
        }
        if (route_1.state) {
            params.params = __assign({}, route_1.params);
            params = params.params;
        }
        else {
            params.params = route_1.params;
        }
        current = route_1.state;
        config = (_c = config === null || config === void 0 ? void 0 : config.screens) === null || _c === void 0 ? void 0 : _c[route_1.name];
    }
    if (!payload) {
        return;
    }
    keyGenerator(payload);
    // if(key) {
    //   payload.key = key;
    // }
    // Try to construct payload for a `NAVIGATE` action from the state
    // This lets us preserve the navigation state and not lose it
    return {
        type: 'NAVIGATE',
        payload: payload,
    };
}
var createNormalizedConfigItem = function (config) {
    return typeof config === 'object' && config != null
        ? {
            initialRouteName: config.initialRouteName,
            screens: config.screens != null
                ? createNormalizedConfigs(config.screens)
                : undefined,
        }
        : {};
};
var createNormalizedConfigs = function (options) {
    return Object.entries(options).reduce(function (acc, _a) {
        var k = _a[0], v = _a[1];
        acc[k] = createNormalizedConfigItem(v);
        return acc;
    }, {});
};
