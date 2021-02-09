import UserService from "../services/UserService"
import { Dispatch } from 'redux';
import { ALL_MESSAGES, ALL_MESSAGES_RECEIVED, ALL_USERS, ALL_USERS_RECEIVED, CREATE_MESSAGE_FAILED, CREATE_MESSAGE_OK, CREATE_USER_FAILED, CREATE_USER_FETCHED, CREATE_USER_OK, GET_USER_FAILED, GET_USER_FETCHED, GET_USER_OK } from "./actionTypes";
import { REMOVE_USER_FAILED, REMOVE_USER_FETCHED, REMOVE_USER_OK } from "./actionTypes";
import { GetUserFeedbackType } from "../model";
import MessageService from "../services/MessageService";

export const getUsersAction = (dispatch: Dispatch<BaseAction>) => {
    UserService.getUsers().then((response) => {
        dispatch({ type: ALL_USERS_RECEIVED, payload: response.data });
    });
    return { type: ALL_USERS }
};

export const getMessagesAction = (dispatch: Dispatch<BaseAction>) => {
    UserService.getMessages().then((response) => {
        dispatch({ type: ALL_MESSAGES_RECEIVED, payload: response.data });
    });
    return { type: ALL_MESSAGES }
};

export const createMessageAction = (dispatch: Dispatch<BaseAction>, message: IMessage) => {
    MessageService.createMessage(message).then((response) => {
        dispatch({ type: CREATE_MESSAGE_OK, payload: response.data });
        getMessagesAction(dispatch);
    },(error) => {
        dispatch({ type: CREATE_MESSAGE_FAILED, payload: error.data });
    });
    return { type: CREATE_USER_FETCHED }
};

export const createUserAction = (dispatch: Dispatch<BaseAction>, user: IUser) => {
    UserService.createUser(user).then((response) => {
        dispatch({ type: CREATE_USER_OK, payload: response.data });
        getUsersAction(dispatch);
    },(error) => {
        dispatch({ type: CREATE_USER_FAILED, payload: error.data });
    });
    return { type: CREATE_USER_FETCHED }
};

export const removeUserAction = (dispatch: Dispatch<BaseAction>, id: number) => {
    UserService.removeUser(id).then((response) => {
        dispatch({ type: REMOVE_USER_OK, payload: response.data });
        getUsersAction(dispatch);
    },(error) => {
        dispatch({ type: REMOVE_USER_FAILED, payload: error.data });
    });
    return { type: REMOVE_USER_FETCHED }
};

export const displayUserAction = (dispatch: Dispatch<BaseAction>, id: number) => {
    UserService.getUserId(id).then((response) => {
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

export const searchUserAction = (dispatch: Dispatch<BaseAction>, user: IUser) => {
    UserService.findUsers(user).then((response) => {
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