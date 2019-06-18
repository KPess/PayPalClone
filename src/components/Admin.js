import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import routes from './routes';
import store from './redux/store';
import './App.css'

function App() {
	return (
		<Provider store={store}>
			<HashRouter>
				<div className='App'>
					{routes}
				</div>
			</HashRouter>
		</Provider>
	)
}

export default App;