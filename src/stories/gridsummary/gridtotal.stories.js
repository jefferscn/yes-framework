import React from 'react';
import StoryWrapper from '../StoryWrapper';
import { Text, View } from 'react-native';
import GridBadge from '../../controls/Yigo/Grid/GridBadge';

export default {
    title: 'yes-framework/gridsummary/GridTotalCountBadge',
    component: GridBadge.GridTotalCountBadge,
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
            <GridBadge.GridTotalCountBadge {...args} >
                <Text style={{flex: 1}}>待办</Text>
            </GridBadge.GridTotalCountBadge>
        </View>
    </StoryWrapper>);

const argTypes = {

}
export const Base = Template.bind({});
Base.argTypes = argTypes;
Base.args = {
    yigoid: 'grid1',
};
