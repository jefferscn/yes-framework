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
const styles = StyleSheet.create({
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
class GuideTemplate extends Component {
    // constructor(...args) {
    //     super(...args);
    //     this.nextStep = ()=>this._nextStep();
    //     this.prevStep = ()=>this._prevStep();
    // }
    static contextTypes = {
        createElement: PropTypes.func,
        getBillForm: PropTypes.func,
        getContextComponent: PropTypes.func,
        getControlProps: PropTypes.func,
    }
    static getStores() {
        return [BillformStore];
    }
    static calculateState(prevState, props, context) {
        let selectedStep = props.steps[0];
        if (prevState) {
            selectedStep = prevState.steps[prevState.currentStep];
        }
        const newSteps = props.steps.filter((step) => {
            if (!step.relation) {
                return true;
            }
            const comp = context.getContextComponent(step.relation);
            if (!comp) {
                return true;
            }
            const visible = comp.getState().get('visible');
            return visible;
        });
        const newSelectedStep = newSteps.indexOf(selectedStep);
        return {
            steps: newSteps,
            currentStep: newSelectedStep,
        }
    }
    nextStep = () => {
        if (this.state.currentStep === this.state.stepCount - 1) {
            return;
        }
        this.setState({
            currentStep: this.state.currentStep + 1,
        });
    }
    prevStep = () => {
        if (this.state.currentStep === 0) {
            return;
        }
        this.setState({
            currentStep: this.state.currentStep - 1,
        });
    }
    renderGuideLine() {
        const hasPrev = this.state.currentStep > 0;
        const hasNext = this.state.currentStep < this.state.steps.length - 1;
        return (
            <View style={[styles.guide]}>
                {
                    hasPrev ? <View style={styles.guidebutton}><Button onPress={this.prevStep} title={'上一步'} /></View> : null
                }
                {
                    hasNext ? <View style={styles.guidebutton}><Button onPress={this.nextStep} title={'下一步'} /></View> : null
                }
                {
                    !hasNext ? <View style={styles.guidebutton}><YESButton yigoid={this.props.saveAction} /></View> : null 
                }
            </View>
        )
    }
    render() {
        const { steps } = this.state;
        if (!steps) {
            return null;
        }
        // const form = this.context.getBillForm();
        // if (form) {
        // if (this.props.head) {
        const head = this.context.createElement(this.props.head);
        const step = steps[this.state.currentStep];
        console.log(this.prevStep);
        const guide = this.renderGuideLine();
        return (<View style={styles.container}>
            {head}
            {
                step.items ?
                    <ScrollView>
                        <CellLayoutTemplate
                            items={step.items}
                        />
                    </ScrollView>
                    : null
            }
            {
                step.item?
                    <View style={{ flex: 1 }}>
                        {
                            this.context.createElement(step.item)
                        }
                    </View> : null
            }
            {guide}
        </View>);
        // }
        // return (<ScrollView><CellLayoutTemplate
        //     items={items}
        // /></ScrollView>);
    }
    // return <LoadingComp icon="loading" show>加载中...</LoadingComp>; // eslint-disable-line react/jsx-no-undef, max-len
}
// const WrappedNormalTemplate = getMappedComponentHOC(Guide);
const result = Container.create(GuideTemplate, {
    withProps: true,
    withContext: true,
})
defaultTemplateMapping.reg('guide', result);
export default result;
