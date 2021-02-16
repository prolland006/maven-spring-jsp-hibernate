interface IUser {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  address: string,
  age: number,
  company: string,
}

interface IMessage {
  id: number,
  description: string,
  time: Date|null,
}

type GlobalState = {
	userState: UserState,
	messageState: MessageState,
}

type MessageState = {
  message: IMessage,
  messages: IMessage[],
  feedback: FeedbackCreateMessage.FeedbackMessage,
  selectedMessageId: number,
}

type UserState = {
  user: IUser,
  users: IUser[],
  feedback: FeedbackCreateUser.FeedbackMessage,
  selectedUserId: number,
}

type BaseAction = {
  type: string
  payload: any
}