import UserService from "../services/UserService"
import { Dispatch } from 'redux';

export const getUsersAction = (dispatch: Dispatch<BaseAction>) => {
    UserService.getUsers().then((response) => {
        dispatch({ type: 'ALL_USERS_RECEIVED', payload: response.data });
    });
    return { type: 'ALL_USERS' }
};

export const createUserAction = (dispatch: Dispatch<BaseAction>, user: IUser) => {
    UserService.createUser(user).then((response) => {
        dispatch({ type: 'CREATE_USER_OK', payload: response.data });
    },(error) => {
        dispatch({ type: 'CREATE_USER_FAILED', payload: error.data });
    });
    return { type: 'CREATE_USER_FETCHED' }
};