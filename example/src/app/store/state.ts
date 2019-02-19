import { IUser } from '../api'

export interface IState {
	pending: boolean
	users: IUser[]
	error?: any
}

export const InitialState: IState = {
	pending: false,
	users: [],
}
