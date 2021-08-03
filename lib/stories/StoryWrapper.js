import React from 'react';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';
import { ControlMappings } from 'yes-comp-react-native-web';
injectFont(fontAwesome, 'FontAwesome');
import '../patch/antd-mobile.css';
import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';
var StoryWrapper = function (_a) {
    var children = _a.children;
    return (React.createElement(AppWrapper, { control: control, projectCfg: ProjectCfg },
        React.createElement(StoryContext, { controlMapping: ControlMappings.defaultControlMapping }, children)));
};
StoryWrapper.displayName = "StoryWrapper";
export default StoryWrapper;
