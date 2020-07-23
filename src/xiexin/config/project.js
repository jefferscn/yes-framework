import ProjectCfg from './project.json';
import global from 'global';

const globalCfg = global.projectCfg;

const result = Object.assign({},
    ProjectCfg, globalCfg
);
//这里需要做一下处理，如果在全局环境中包含了项目的配置信息，则直接从全局环境中获取

export default result;
