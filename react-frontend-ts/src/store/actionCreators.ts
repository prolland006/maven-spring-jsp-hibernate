import UserService from "../services/UserService"
import { Dispatch } from 'redux';
import { ALL_USERS, ALL_USERS_RECEIVED, CREATE_USER_FAILED, CREATE_USER_FETCHED, CREATE_USER_OK, GET_USER_FAILED, GET_USER_FETCHED, GET_USER_OK } from "./actionTypes";
import { GetUserFeedbackType } from "../model";

export const getUsersAction = (dispatch: Dispatch<BaseAction>) => {
    UserService.getUsers().then((response) => {
        dispatch({ type: ALL_USERS_RECEIVED, payload: response.data });
    });
    return { type: ALL_USERS }
};

export const createUserAction = (dispatch: Dispatch<BaseAction>, user: IUser) => {
    UserService.createUser(user).then((response) => {
        dispatch({ type: CREATE_USER_OK, payload: response.data });
    },(error) => {
        dispatch({ type: CREATE_USER_FAILED, payload: error.data });
    });
    return { type: CREATE_USER_FETCHED }
};

export const displayUserAction = (dispatch: Dispatch<BaseAction>, user: IUser) => {
    UserService.getUser(user).then((response) => {
        if (response.data.id !== GetUserFeedbackType.USER_GETTED_SUCCESSFULLY) {
            dispatch({ type: GET_USER_FAILED, payload: response.data });
        } else {
            dispatch({ type: GET_USER_OK, payload: response.data });
        }
    },(error) => {
        dispatch({ type: GET_USER_FAILED, payload: error.data });
    });
    return { type: GET_USER_FETCHED }
};