import React from 'react';
import { GridChart } from 'yg-echarts';
import StoryWrapper from '../StoryWrapper';

export default {
    title: 'yes-framework/grid/Chart',
    component: GridChart,
};

const Template = (args) => (
    <StoryWrapper>
        <GridChart {...args} />
    </StoryWrapper>);

const argTypes = {

}
export const Pie = Template.bind({});
Pie.argTypes = argTypes;
Pie.args = {
    yigoid: 'grid1',
    title: {
        text: 'Pie',
    },
    legend: {
    },
    style: {
        flex: 1,
        width: '100%',
    },
    slice: [
        'title',
        'badget',
    ],
    series: [{
        type: 'pie',
        dataColumn: 'badget'
    }]
};
export const Bar = Template.bind({});
Bar.argTypes = argTypes;
Bar.args = {
    yigoid: 'grid1',
    title: {
        text: 'Bar',
    },
    "xAxis": {
        "type": "category"
    },
    "yAxis": {
        "type": "value"
    },
    legend: {
    },
    style: {
        flex: 1,
        width: '100%',
    },
    slice: [
        'title',
        'badget',
    ],
    series: [{
        type: 'bar',
        dataColumn: 'badget'
    }]
};

export const Line= Template.bind({});
Line.argTypes = argTypes;
Line.args = {
    yigoid: 'grid1',
    title: {
        text: 'Line',
    },
    "xAxis": {
        "type": "category"
    },
    "yAxis": {
        "type": "value"
    },
    legend: {
    },
    style: {
        flex: 1,
        width: '100%',
    },
    slice: [
        'title',
        'badget',
    ],
    series: [{
        type: 'line',
        dataColumn: 'badget'
    }]
};




