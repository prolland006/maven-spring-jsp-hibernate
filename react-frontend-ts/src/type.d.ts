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
	users: IUser[]
}

type UserAction = {
  type: string
  users: IUser[]
}
