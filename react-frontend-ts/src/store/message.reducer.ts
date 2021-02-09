import { CreateMessageFeedbackType } from "../model";
import * as actionTypes from "./actionTypes"

const initialState: MessageState = {
  message: {
    id: -1,
    description: '',
    time: new Date(),
  },
  messages: [],
  feedback: {
    id: CreateMessageFeedbackType.UNDEFINED,
    message: 'undefined',
  },
  selectedMessageId: -1,
}

const messageReducer = (
  state: MessageState = initialState,
  action: BaseAction
): MessageState => {
	switch (action.type) {
      case actionTypes.ALL_MESSAGES_RECEIVED:
        return {
          ...state, 
          messages: action.payload.users, 
          feedback:  {
            id: action.payload.id,
            message: action.payload.message,
          },
          selectedMessageId: -1,
        };
      case actionTypes.CREATE_MESSAGE_OK:
      case actionTypes.CREATE_MESSAGE_FAILED:
        return {...state, feedback: action.payload};
      case actionTypes.UPDATE_MESSAGE:
      return {
        ...state, 
        message: {
          ...action.payload
        }
      }
      default:
  }
  return {...state};
}
export default messageReducer
