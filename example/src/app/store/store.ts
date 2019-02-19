import { initRedoox } from 'redoox'
import { Reducer } from './reducer'
import { InitialState, IState } from './state'

const { Provider, useRedux } = initRedoox(Reducer, InitialState)

export interface IAppState extends IState {}

export { Provider, useRedux }
