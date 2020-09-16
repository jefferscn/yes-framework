import React from 'react';
import fontAwesome from 'react-native-vector-icons/Fonts/FontAwesome.ttf';
import { injectFont } from 'yes-web/dist/webutil';
import StoryContext from 'yes-comp-react-native-web/stories/StoryContext';

injectFont(fontAwesome, 'FontAwesome');
import '../patch/antd-mobile.css';

import AppWrapper from '../AppWrapper';
import { ProjectCfg } from '../config/index';
import control from '../config/control';

export default ({ children }) => (<AppWrapper
    control={control}
    projectCfg={ProjectCfg}
>
    <StoryContext>
        {children}
    </StoryContext>
</AppWrapper>);
