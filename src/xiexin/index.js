import { AppDispatcher, BillformStore } from 'yes-intf';
export { default as font } from './font';
export { default as billforms } from './config/billforms';
export { default as ProjectCfg } from './config/project';
export { default as LoginCfg } from './config/login.json';
export { default as RouteCfg } from './config/route.json';
export { default as controls } from './config/control';
export { default as util } from './util';
export { default as ModalCfg } from './config/modal.json';
import './damaopatch';
import './patch';

AppDispatcher.register((action)=>{
    switch(action.type){
        case 'WORKFLOWCHANGE':
            setTimeout(()=>{
                BillformStore.reloadFormData("ToDoListTotal.-1");
            }, 0)
    }
});
