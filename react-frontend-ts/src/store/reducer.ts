import { FeedbackType } from "../model";
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
    id: FeedbackType.UNDEFINED,
    message: 'undefined',
  },
}

const reducer = (
  state: UserState = initialState,
  action: BaseAction
): UserState => {
	switch (action.type) {
      case actionTypes.ALL_USERS:
        return {...state};
      case actionTypes.ALL_USERS_RECEIVED:
        return {...state, users: action.payload};
      case actionTypes.CREATE_USER_OK:
      case actionTypes.CREATE_USER_FAILED:
        return {...state, feedback: action.payload};
      default:
  }
  return {...state};
}
export default reducer