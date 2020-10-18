import * as actionTypes from "./actionTypes"

const initialState: UserState = {
  users: [],
}

const reducer = (
  state: UserState = initialState,
  action: UserAction
): UserState => {
	switch (action.type) {
      case actionTypes.ALL_USERS:
        return {...state};
      case actionTypes.ALL_USERS_RECEIVED:
        return {...state, users: action.users};
      default:
  }
  return {...state};
}
export default reducer