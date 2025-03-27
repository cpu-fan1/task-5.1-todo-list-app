import { Routes, Route } from 'react-router-dom';
import { TodosListPage, TaskPage, Page404 } from './pages';

function App() {
	return (
		<Routes>
			<Route path="/" element={<TodosListPage />} />
			<Route path="task/:id" element={<TaskPage />} />
			<Route path="*" element={<Page404 />} />
		</Routes>
	);
}
export default App;
