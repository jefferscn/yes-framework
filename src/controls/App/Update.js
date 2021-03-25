import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'antd-mobile';

export default class Update extends PureComponent {
    state = {
        updating: false,
        percent: 0,
    }
    updateAndroid = async () => {
        const { url, onPress } = this.props;
        onPress && onPress();
        if(this.state.updating) {
            return;
        }
        this.setState({
            updating: true,
        });
        try {
            await this._updateAndroid(url);
        } catch (ex) {

        } finally {
            this.setState({
                updating: false,
            });
        }
    }
    _updateAndroid(url) {
        return new Promise((resolve, reject) => {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, (fs) => {
                //创建文件
                fs.getFile('android.apk', { create: true }, (fileEntry) => {
                    this.download(fileEntry, url).catch(reject);
                }, reject);
            }, reject)
        })
    }

    download(fileEntry, url) {
        return new Promise((resolve, reject) => {
            var ft = new FileTransfer();
            var fileURL = fileEntry.toURL();
            //监听下载进度
            ft.onprogress = (e) => {
                console.info(e);
                if (e.lengthComputable) {
                    var percent = (e.loaded / e.total) * 100;
                    // changeMsg('downloading package ' + percent.toFixed(2) + '%');
                    this.setState({
                        percent: percent.toFixed(2),
                    });
                }
            }
            ft.download(url, fileURL, (entry) => {
                cordova.plugins.fileOpener2.open(
                    entry.toURL(),
                    'application/vnd.android.package-archive', {
                    error: function (da) {
                        console.log(da);
                        reject();

                    },
                    success: function (data) {
                        resolve();
                    }
                });
                resolve();
            }, function (err) {
                reject(err);
            });
        });
    }
    render() {
        const { title, url, platform, style, titleStyle }  = this.props;
        if (platform === 'android') {
            return (
                <View style={style}>
                    <TouchableOpacity onPress={this.updateAndroid}>
                        <View>
                            <Text style={titleStyle}>{title}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                        this.state.updating ? <ActivityIndicator toast text={`下载中(${this.state.percent}%)`} /> : null
                    }
                </View>
            )
        }
        return <a href={url} style={StyleSheet.flatten([{ display: 'flex' }, style, titleStyle])} className="dialog-btn">{title}</a>
    }
}
