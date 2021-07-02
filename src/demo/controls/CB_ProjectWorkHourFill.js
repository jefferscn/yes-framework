import React, { PureComponent } from 'react';
import { Modal, NavBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types';
import { BackHandler } from 'yes-intf';
import NormalTemplate from '../../template/NormalTemplate';
import config from '../config/billforms/CB_ProjectWorkHourFill_V.json';
import { ChainDict } from 'yes-comp-react-native-web';
import { View } from 'react-native';

export default class ProjectWorkHourFill extends PureComponent {
    static contextTypes = {
        getBillForm: PropTypes.func,
    }
    onClose = () => {
        this.props.onClose && this.props.onClose();
    }
    onCancel = () => {
        this.props.onClose && this.props.onClose();
    }
    state = {
        step: 1,
    }
    stepBack = () => {
        this.backHandler && this.backHandler();
        this.setState({
            step: 1,
        });
    }
    onSelectChange = () => {
        this.backHandler = BackHandler.addPreEventListener(() => {
            this.stepBack();
        })
        this.setState({
            step: 2,
        });
    }
    render() {
        const { status } = this.props;
        if (status === 'NEW') {
            if (this.state.step === 1) {
                return (<Modal
                    visible={true}
                    popup={true}
                    animationType={'slide-up'}
                    transparent
                    maskClosable={true}
                    onClose={this.onClose}
                // wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                // afterClose={this.onClose}
                >
                    <View style={{ height: 500 }}>
                        <ChainDict
                            yigoid="Period"
                            inline
                            onChange={this.onSelectChange}
                            itemStyle={{
                                height: 45,
                                borderBottomWidth: 1,
                                borderBottomColor: 'lightgrey',
                                justifyContent: "center",
                                alignItems: "center"
                            }}
                        />
                    </View>
                </Modal>);
            }
            if (this.state.step === 2) {
                return (<Modal
                    visible={true}
                    maskStyle={{ zIndex: 899 }}
                    wrapClassName="fullscreen"
                    maskClosable={false}
                >
                    <NormalTemplate {...this.props} meta={config} />
                </Modal>
                )
            }
        }
        return (
            <NormalTemplate {...this.props} meta={config} />
        )
    }
}

