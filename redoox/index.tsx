import * as React from 'react'

export type Action<P = any> = {
	type: string
	payload: P
}

export type Thunk<S, A extends Action = any> = (dispatch: Dispatch<S, A>, getState: GetState<S>) => void

export type Dispatchable<S, P = any> = Action<P> | Thunk<S>

export type Dispatch<S, A extends Dispatchable<S>> = (action: A) => void

export type GetState<S> = () => S

export type AnyReducer = React.Reducer<any, any>

export type DispatchMap<S> = { [key: string]: (...args: any[]) => Action | Thunk<S, Action> }

type ArgsTypes<F> = F extends (...args: infer Args) => infer R ? Args : never

type AppActions<ActionMap> = { [P in keyof ActionMap]: ActionMap[P] }

export function initRedoox<R extends AnyReducer, S extends React.ReducerState<R>>(reducer: R, initialState: S) {
	const StateContext = React.createContext<S | null>(null)
	const DispatchContext = React.createContext<React.Dispatch<React.ReducerAction<R>> | null>(null)

	function Provider(props: { children: JSX.Element }) {
		const [appState, dispatch] = React.useReducer(reducer, initialState)
		return (
			<StateContext.Provider value={appState}>
				<DispatchContext.Provider value={dispatch}>{props.children}</DispatchContext.Provider>
			</StateContext.Provider>
		)
	}

	function useRedux<StateExtract, ActionMap extends DispatchMap<S>>(
		extractState: (state: S) => StateExtract,
		actionMap: ActionMap,
	) {
		const appState = React.useContext(StateContext) as S
		const dispatch = React.useContext(DispatchContext) as React.Dispatch<React.ReducerAction<R>>

		const stateExtract = extractState(appState)

		const actions = Object.keys(actionMap).reduce((acc: object, key: string) => {
			const actionCreator = actionMap[key]
			const fn = (...args: ArgsTypes<typeof actionCreator>) => {
				const action = actionCreator(...args)
				if (typeof action === 'function') {
					action(dispatch as Dispatch<S, Action<any>>, () => appState)
				} else {
					dispatch(action as React.ReducerAction<R>)
				}
			}
			return { ...acc, [key]: fn }
		}, {})

		return [stateExtract, actions] as [StateExtract, AppActions<ActionMap>]
	}

	return { Provider, useRedux }
}
