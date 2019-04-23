import Immutable from 'immutable';

const defaultState = Immutable.fromJS({
    treevisible:true
});

export default function (state=defaultState,action){
    switch(action.type){
        // case 'inited':
        //     state.set('userId',action.userId);
        case 'toggletreevisible':
            return state.set('treevisible',!state.get('treevisible'));
            break;
        default:
            return state;
    }
}
