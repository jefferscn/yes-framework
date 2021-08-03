'use strict';
import { App } from "yes-comp-react-native-web";
import createAppOptions from "./createAppOptions";
import { ProjectCfg, RouteCfg, LoginCfg, ModalCfg, OpenwithHandler, billforms } from './config/index';
import control from './config/control.js';
import { util } from './project';
export default new App(createAppOptions(ProjectCfg, RouteCfg, LoginCfg, ModalCfg, OpenwithHandler, billforms, control, util));
