import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

function versionCompare(v1, v2, options) {
    var lexicographical = options && options.lexicographical,
        zeroExtend = options && options.zeroExtend,
        v1parts = v1.split('.'),
        v2parts = v2.split('.');

    function isValidPart(x) {
        return (lexicographical ? /^\d+[A-Za-z]*$/ : /^\d+$/).test(x);
    }

    if (!v1parts.every(isValidPart) || !v2parts.every(isValidPart)) {
        return NaN;
    }

    if (zeroExtend) {
        while (v1parts.length < v2parts.length) v1parts.push("0");
        while (v2parts.length < v1parts.length) v2parts.push("0");
    }

    if (!lexicographical) {
        v1parts = v1parts.map(Number);
        v2parts = v2parts.map(Number);
    }

    for (var i = 0; i < v1parts.length; ++i) {
        if (v2parts.length == i) {
            return 1;
        }

        if (v1parts[i] == v2parts[i]) {
            continue;
        }
        else if (v1parts[i] > v2parts[i]) {
            return 1;
        }
        else {
            return -1;
        }
    }

    if (v1parts.length != v2parts.length) {
        return -1;
    }

    return 0;
}
export default (Comp) => {
    return class AppStatusWrap extends PureComponent {
        static contextTypes = {
            getVersion: PropTypes.func,
            checkLatestVersion: PropTypes.func,
            getPlatform: PropTypes.func,
        }
        state = {
            currentVersion: '',
            fetching: false,
            latestVersion: '',
            canUpdakte: false,
            platform: 'browser',
        }

        updateVersion = async () => {
            if (this.context.getVersion && this.context.checkLatestVersion) {
                this.setState({
                    fetching: true,
                });
                const currentVersion = await this.context.getVersion();
                this.setState({
                    currentVersion,
                });
                const appInfo= await this.context.checkLatestVersion();
                const platform = this.context.getPlatform();
                if (appInfo) {
                    const result = versionCompare(appInfo.Version, currentVersion);
                    const canUpdate = result > 0;
                    this.setState({
                        fetching: false,
                        latestVersion: appInfo.Version,
                        url: appInfo.Url,
                        platform,
                        canUpdate,
                    });
                } else {
                    this.setState({
                        fetching: false,
                    });
                }
            }
        }
        render() {
            return <Comp
                updateVersion={this.updateVersion}
                {...this.state}
                {...this.props}
            />
        }
    }
}
