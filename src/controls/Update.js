import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { ActivityIndicator } from 'antd-mobile';

export default class Update extends PureComponent {
    state = {
        updating: false,
        percent: 0,
    }
    updateAndroid = async () => {
        const { url } = this.props;
        this.setState({
            updating: true,
        });
        try {
            await this.updateAndroid(url);
        } catch (ex) {

        } finally {
            this.setState({
                updating: false,
            });
        }
    }
    updateAndroid(url) {
        return new Promise(function (resolve, reject) {
            window.resolveLocalFileSystemURL(cordova.file.externalRootDirectory, function (fs) {
                //创建文件
                fs.getFile('android.apk', { create: true }, function (fileEntry) {
                    this.download(fileEntry, url).catch(reject);
                }, reject);
            }, reject)
        })
    }

    download(fileEntry, url) {
        return new Promise(function (resolve, reject) {
            var ft = new FileTransfer();
            var fileURL = fileEntry.toURL();
            //监听下载进度
            ft.onprogress = function (e) {
                console.info(e);
                if (e.lengthComputable) {
                    var percent = (e.loaded / e.total) * 100;
                    // changeMsg('downloading package ' + percent.toFixed(2) + '%');
                    this.setState({
                        percent,
                    });
                }
            }
            ft.download(url, fileURL, function (entry) {
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
        const { title, url, platform } = this.props;
        if (platform === 'android') {
            return (
                <View>
                    <TouchableOpacity onPress={this.updateAndroid}>
                        <View>
                            <Text>{title}</Text>
                        </View>
                    </TouchableOpacity>
                    {
                       this.state.updating? <ActivityIndicator toast text={`下载中(${this.state.percent}%)`} />: null
                    }
                </View>
            )
        }
        return <a href={url} class="dialog-btn">{title}</a>
    }
}
