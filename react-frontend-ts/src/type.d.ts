interface IUser {
  id: number,
  firstname: string,
  lastname: string,
  email: string,
  address: string,
  age: number,
}

type GlobalState = {
	userState: UserState,
}

type UserState = {
  user: IUser,
  users: IUser[],
  feedback: FeedbackCreateUser.FeedbackMessage,
}

type BaseAction = {
  type: string
  payload: any
}