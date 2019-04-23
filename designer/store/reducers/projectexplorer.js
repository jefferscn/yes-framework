import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    treedata: {},
    selectitem: '',
});

export default function (state=defaultState,action){
    switch(action.type){
        case 'expanditem':
            break;
        case 'collapseitem':
            return state.setIn(action.path, )
            break;
        case 'selectitem':
            return state.set('selectitem', action.item);
            break;
        default:
            return state;
    }
}
