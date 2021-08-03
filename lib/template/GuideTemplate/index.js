var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React, { Component } from 'react';
import { ScrollView, View, StyleSheet, Button } from 'react-native';
import { Button as YESButton } from 'yes-comp-react-native-web'; // eslint-disable-line import/no-unresolved
// import { getMappedComponentHOC } from 'yes'; // eslint-disable-line import/no-unresolved
import defaultTemplateMapping from '../defaultTemplateMapping';
import CellLayoutTemplate from '../TabTemplate/CellLayoutTemplate';
import PropTypes from 'prop-types';
import { BillformStore } from 'yes-intf';
import { Container } from 'flux/utils';
// const { CustomBillForm, LoadingComp } = Components;
var styles = StyleSheet.create({
    container: {
        flexGrow: 1,
        flexBasis: 0,
    },
    guide: {
        flexDirection: 'row',
        paddingTop: 6,
        paddingBottom: 6,
        paddingLeft: 12,
        paddingRight: 12,
    },
    guidebutton: {
        borderRadius: 10,
        flex: 1,
        flexDirection: 'column',
    },
});
var GuideTemplate = /** @class */ (function (_super) {
    __extends(GuideTemplate, _super);
    function GuideTemplate() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.nextStep = function () {
            if (_this.state.currentStep === _this.state.stepCount - 1) {
                return;
            }
            _this.setState({
                currentStep: _this.state.currentStep + 1,
            });
        };
        _this.prevStep = function () {
            if (_this.state.currentStep === 0) {
                return;
            }
            _this.setState({
                currentStep: _this.state.currentStep - 1,
            });
        };
        return _this;
        // return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
    }
    GuideTemplate.getStores = function () {
        return [BillformStore];
    };
    GuideTemplate.calculateState = function (prevState, props, context) {
        var selectedStep = props.steps[0];
        if (prevState) {
            selectedStep = prevState.steps[prevState.currentStep];
        }
        var newSteps = props.steps.filter(function (step) {
            if (!step.relation) {
                return true;
            }
            var comp = context.getContextComponent(step.relation);
            if (!comp) {
                return true;
            }
            var visible = comp.getState().get('visible');
            return visible;
        });
        var newSelectedStep = newSteps.indexOf(selectedStep);
        return {
            steps: newSteps,
            currentStep: newSelectedStep,
        };
    };
    GuideTemplate.prototype.renderGuideLine = function () {
        var hasPrev = this.state.currentStep > 0;
        var hasNext = this.state.currentStep < this.state.steps.length - 1;
        return (React.createElement(View, { style: [styles.guide] },
            hasPrev ? React.createElement(View, { style: styles.guidebutton },
                React.createElement(Button, { onPress: this.prevStep, title: '上一步' })) : null,
            hasNext ? React.createElement(View, { style: styles.guidebutton },
                React.createElement(Button, { onPress: this.nextStep, title: '下一步' })) : null,
            !hasNext ? React.createElement(View, { style: styles.guidebutton },
                React.createElement(YESButton, { yigoid: this.props.saveAction })) : null));
    };
    GuideTemplate.prototype.render = function () {
        var steps = this.state.steps;
        if (!steps) {
            return null;
        }
        // const form = this.context.getBillForm();
        // if (form) {
        // if (this.props.head) {
        var head = this.context.createElement(this.props.head);
        var step = steps[this.state.currentStep];
        console.log(this.prevStep);
        var guide = this.renderGuideLine();
        return (React.createElement(View, { style: styles.container },
            head,
            step.items ?
                React.createElement(ScrollView, null,
                    React.createElement(CellLayoutTemplate, { items: step.items }))
                : null,
            step.item ?
                React.createElement(View, { style: { flex: 1 } }, this.context.createElement(step.item)) : null,
            guide));
        // }
        // return (<ScrollView><CellLayoutTemplate
        //     items={items}
        // /></ScrollView>);
    };
    // constructor(...args) {
    //     super(...args);
    //     this.nextStep = ()=>this._nextStep();
    //     this.prevStep = ()=>this._prevStep();
    // }
    GuideTemplate.contextTypes = {
        createElement: PropTypes.func,
        getBillForm: PropTypes.func,
        getContextComponent: PropTypes.func,
        getControlProps: PropTypes.func,
    };
    return GuideTemplate;
}(Component));
// const WrappedNormalTemplate = getMappedComponentHOC(Guide);
var result = Container.create(GuideTemplate, {
    withProps: true,
    withContext: true,
});
defaultTemplateMapping.reg('guide', result);
export default result;
