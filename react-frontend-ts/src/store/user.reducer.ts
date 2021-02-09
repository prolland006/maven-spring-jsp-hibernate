import { CreateUserFeedbackType } from "../model";
import * as actionTypes from "./actionTypes"

const initialState: UserState = {
  user: {
    firstname: '',
    lastname: '',
    id: -1,
    email: '',
    address: '',
    age: -1,
  },
  users: [],
  feedback: {
    id: CreateUserFeedbackType.UNDEFINED,
    message: 'undefined',
  },
  selectedUserId: -1,
}

const userReducer = (
  state: UserState = initialState,
  action: BaseAction
): UserState => {
	switch (action.type) {
      case actionTypes.ALL_USERS_RECEIVED:
        return {
          ...state, 
          users: action.payload.users, 
          feedback:  {
            id: action.payload.id,
            message: action.payload.message,
          },
          selectedUserId: -1,
        };
      case actionTypes.GET_USER_OK:
        return {
          ...state, 
          user: {
            ...action.payload.users[0]
          },
          feedback:  {
            id: action.payload.id,
            message: action.payload.message,
          },
          selectedUserId: action.payload.users.length!==0 ? action.payload.users[0].id : -1,
        };
      case actionTypes.GET_USER_FAILED:
        return {
          ...state, 
          feedback:  {
            id: action.payload.id,
            message: action.payload.message,
          }
        };
      case actionTypes.CREATE_USER_OK:
      case actionTypes.CREATE_USER_FAILED:
      case actionTypes.REMOVE_USER_OK:
      case actionTypes.REMOVE_USER_FAILED:
        return {...state, feedback: action.payload};
      case actionTypes.UPDATE_USER:
        return {
          ...state, 
          user: {
            ...action.payload
          }
        }
      default:
  }
  return {...state};
}
export default userReducer
