import React from "react";
import { VirtualizedList, Text } from "react-native";
import StoryWrapper from '../StoryWrapper';

const data = [];

for (let i = 0; i < 10001; i++) {
    data.push(i);
}
const VIEWABILITY_CONFIG={
    minimumViewTime: 3000,
    viewAreaCoveragePercentThreshold: 100,
    waitForInteraction: 300,
};

class App extends React.Component {
    getItemLayout = (item, index) => {
        return {
            length: 40,
            offset: 40 * index,
            index,
        }
    }
    render() {
        return (
            <VirtualizedList
                data={data}
                viewabilityConfig={VIEWABILITY_CONFIG}
                getItem={(data, index) => data[index]}
                getItemCount={data => data.length}
                keyExtractor={item => String(item)}
                windowSize={12}
                initialNumToRender={20}
                getItemLayout={this.getItemLayout}
                renderItem={({ item }) => (
                    <Text
                        style={{
                            height: 40,
                            paddingHorizontal: 20,
                            paddingVertical: 20,
                            backgroundColor: item % 2 === 0 ? "white" : "hsl(0, 0%, 92%)"
                        }}
                    >
                        {item}
                    </Text>
                )}
            />
        );
    }
}

export default {
    title: 'yes-framework/grid/VirtualizedList',
    component: App,
}

const Template = (args) => (
    <StoryWrapper>
        <App {...args} />
    </StoryWrapper>
)

export const Base = Template.bind({});
