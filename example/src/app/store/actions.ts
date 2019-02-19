import { Action, Thunk } from 'redoox'

import { IState } from './state'
import { getUsers, IUser, IRequestState } from '../api'

export const prefix = '@user'

export const Type = {
	// Sync
	IncrementAge: `${prefix}/IncrementAge`,
	DecrementAge: `${prefix}/DecrementAge`,
	// Async
	LoadUsersRequest: `${prefix}/LoadUsersRequest`,
	LoadUsersSuccess: `${prefix}/LoadUsersSuccess`,
	LoadUsersError: `${prefix}/LoadUsersError`,
}

export type IncrementAge = Action<{ id: string }>
export function incrementAge(id: string): IncrementAge {
	return {
		type: Type.IncrementAge,
		payload: { id },
	}
}

export type DecrementAge = Action<{ id: string }>
export function decrementAge(id: string): DecrementAge {
	return {
		type: Type.DecrementAge,
		payload: { id },
	}
}

export type LoadUsers = Action<IRequestState<IUser[]>>
export function loadUsers(): Thunk<IState, LoadUsers> {
	return async (dispatch) => {
		dispatch({
			type: Type.LoadUsersRequest,
			payload: { pending: true },
		})
		try {
			const response = await getUsers()
			dispatch({
				type: Type.LoadUsersSuccess,
				payload: { pending: false, response },
			})
		} catch (error) {
			dispatch({
				type: Type.LoadUsersError,
				payload: { pending: false, error },
			})
		}
	}
}
