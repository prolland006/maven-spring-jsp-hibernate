import UserService from "../services/UserService"
import { Dispatch } from 'redux';

export const getUsersAction = (dispatch: Dispatch<UserAction>) => {
    UserService.getUsers().then((response) => {
        dispatch({ type: 'ALL_USERS_RECEIVED', users: response.data });
    });
    return { type: 'ALL_USERS' }
};