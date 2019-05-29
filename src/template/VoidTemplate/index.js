import React, { Component } from 'react';
import defaultTemplateMapping from '../defaultTemplateMapping';
import VoidMeta from './VoidMeta';

class VoidTemplate extends Component {
    render() {
        return null;
    }
}

VoidTemplate.fromJson = (json) => {
    return new VoidMeta(json);
}
VoidTemplate.caption = "空模板";
defaultTemplateMapping.reg('void', VoidTemplate);
export default VoidTemplate;
