import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from './app/store/store'
import Example from './app/Example'

function App() {
	const title = 'redoox - Use Redux state management pattern with React Hooks'
	return (
		<Provider>
			<Example title={title} />
		</Provider>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
