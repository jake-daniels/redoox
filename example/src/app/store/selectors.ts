import { createSelector } from 'reselect'
import { IState } from './state'

export const getState = (state: IState) => state

export const getUsers = createSelector(
	[getState],
	(state) => {
		return state.users
	},
)

export const getAgeSum = createSelector(
	[getUsers],
	(users) => {
		return users.reduce((acc, user) => acc + user.age, 0)
	},
)
