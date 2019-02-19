export interface IRequestState<R, E = any> {
	pending: boolean
	response?: R
	error?: E
}

export interface IUser {
	id: string
	name: string
	age: number
}

const USERS_MOCK = [
	{ id: 'a', name: 'Alice', age: 23 },
	{ id: 'b', name: 'Bob', age: 57 },
	{ id: 'c', name: 'Connor', age: 41 },
]

export async function getUsers() {
	return new Promise<IUser[]>((resolve) => {
		window.setTimeout(() => resolve(USERS_MOCK), 500)
	})
}
