import App from '../../components/App';
import { connect } from 'react-redux';
import { toggleTree } from '../../actions/statusaction';

export default connect(
    (state,ownerProps)=>({
        treevisible:state.statusreducer.get('treevisible')
    }),
    (dispatch)=>({
        toggleTree:()=>{
            dispatch(toggleTree());
        }
    })
)(App);
