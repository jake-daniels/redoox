# redoox
Redux state management pattern using React Hooks.

## Usage
store.ts
```
import { initRedoox } from 'redoox'
import { Reducer } from './reducer'
import { InitialState, IState } from './state'

const { Provider, useRedux } = initRedoox(Reducer, InitialState)

export interface IAppState extends IState {}
export { Provider, useRedux }
```

component.ts
```
import { useRedux, IAppState } from './store/store'
import * as Selectors from './store/selectors'
import * as Actions from './store/actions'

export default function Example(props: IProps) {

	const extractState = (state: IAppState) => ({
		users: Selectors.getUsers(state),
		ageSum: Selectors.getAgeSum(state),
	})

	const actionMap = {
		incrementAge: Actions.incrementAge,
		decrementAge: Actions.decrementAge,
	}

	const [appState, appActions] = useRedux(extractState, actionMap)

	return (...JSX...)
}

```