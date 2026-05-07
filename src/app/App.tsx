import { ToastContainer } from 'react-toastify';

import { RoutProvider } from '@app/providers';

function App() {
	return (
		<div className="App">
			<ToastContainer limit={7} />
			<RoutProvider />
		</div>
	);
}

export default App;
