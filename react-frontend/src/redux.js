import { createStore, combineReducers } from 'redux'
import users from './reducers/userReducer'
import UserService from './services/UserService';

export const reducers = combineReducers({ users });

//////////
// actions
export const getUsersReceived = (users) => {
    return { type: 'ALL_USERS_RECEIVED', payload: users }
};


export const getUsers = () => {
    UserService.getUsers().then((response) => {
        store.dispatch(getUsersReceived(response.data));
    });

    return { type: 'ALL_USERS' }
};

////////
// store
export function configureStore() {
    const store = createStore(reducers, {});
    return store;
};
  
export const store = configureStore();