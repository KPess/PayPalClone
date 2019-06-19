import React from 'react';
import routes from './routes';
import store from './redux/store';

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