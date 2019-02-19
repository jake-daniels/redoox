import './example.css'
import React from 'react'

import { useRedux, IAppState } from './store/store'
import * as Selectors from './store/selectors'
import * as Actions from './store/actions'

interface IProps {
	title: string
}

export default function Example(props: IProps) {
	const extractState = (state: IAppState) => ({
		users: Selectors.getUsers(state),
		ageSum: Selectors.getAgeSum(state),
	})

	const actionMap = {
		loadUsers: Actions.loadUsers,
		incrementAge: Actions.incrementAge,
		decrementAge: Actions.decrementAge,
	}

	const [appState, appActions] = useRedux(extractState, actionMap)

	const getYounger = (id: string) => () => appActions.decrementAge(id)
	const getOlder = (id: string) => () => appActions.incrementAge(id)

	return (
		<div className='example'>
			<h3>{props.title}</h3>
			<div>
				<button className='btn' onClick={appActions.loadUsers}>
					Load Users
				</button>
			</div>
			<br />
			{appState.users.length === 0 && <div>No users yet.</div>}
			{appState.users.length > 0 && (
				<>
					<div className='users'>
						{appState.users.map((user) => (
							<div key={user.id} className='user'>
								<div className='info'>
									<div>Name: {user.name}</div>
									<div>Age: {user.age}</div>
								</div>
								<div>
									<button onClick={getYounger(user.id)}>Get younger</button>
									<button onClick={getOlder(user.id)}>Get older</button>
								</div>
							</div>
						))}
					</div>
					<div className='age-sum'>Age SUM: {appState.ageSum}</div>
				</>
			)}
		</div>
	)
}
