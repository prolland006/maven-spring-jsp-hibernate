import { combineReducers, createStore} from 'redux';
import reducer from './reducer';

const store = createStore<GlobalState, any, any, any>(
    combineReducers({
        userState: reducer
}));
export default store;