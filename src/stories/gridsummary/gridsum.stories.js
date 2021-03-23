import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { Text, View } from 'react-native';
import GridBadge from '../../controls/Yigo/Grid/GridBadge';

export default {
    title: 'yes-framework/gridsummary/GridSum',
    component: GridBadge.GridSumBadge,
};

const Template = (args) => (
    <StoryWrapper>
        <View style={{
            width: 100,
            height: 60,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'lightgray',
        }}>
            <GridBadge.GridSumBadge {...args} >
                <Text style={{flex: 1}}>待办</Text>
            </GridBadge.GridSumBadge>
        </View>
    </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
    sumField: 'score',
};
