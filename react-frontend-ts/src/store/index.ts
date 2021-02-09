import { combineReducers, createStore} from 'redux';
import userReducer from './user.reducer';
import messageReducer from './message.reducer';

const store = createStore<GlobalState, any, any, any>(
    combineReducers({
        userState: userReducer,
        messageState: messageReducer,
}));
export default store;