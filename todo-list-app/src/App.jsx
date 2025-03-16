import { useState, useEffect } from 'react';
import { AppLayout } from './AppLayout';
import { Routes, Route } from 'react-router-dom';
import { TaskPage, Page404 } from '../components/';

function App() {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);
	const [modalActive, setModalActive] = useState(false);
	const [editingTask, setEditingTask] = useState(null);

	const refreshTodos = () => setRefreshTodosFlag(!refreshTodosFlag);

	useEffect(() => {
		setIsLoading(true);

		fetch('http://localhost:3005/todos')
			.then((loadedData) => loadedData.json())
			.then((loadedTodos) => {
				setTodos(loadedTodos);
			})
			.finally(() => setIsLoading(false));
	}, [refreshTodosFlag]);

	const filteredTodos = () => {
		let result = todos;
		if (searchValue) {
			result = result.filter((todo) =>
				todo.title.toLowerCase().includes(searchValue),
			);
		}
		if (isSorted) {
			result = [...result].sort((a, b) => a.title.localeCompare(b.title));
		}
		return result;
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					<AppLayout
						todos={todos}
						setTodos={setTodos}
						isLoading={isLoading}
						task={task}
						setTask={setTask}
						refreshTodos={refreshTodos}
						setSearchValue={setSearchValue}
						filteredTodos={filteredTodos}
						isSorted={isSorted}
						setIsSorted={setIsSorted}
						modalActive={modalActive}
						setModalActive={setModalActive}
						editingTask={editingTask}
						setEditingTask={setEditingTask}
					/>
				}
			/>
			<Route
				path="task/:id"
				element={
					<TaskPage
						todos={todos}
						setTodos={setTodos}
						refreshTodos={refreshTodos}
						isLoading={isLoading}
						setIsLoading={setIsLoading}
						modalActive={modalActive}
						setModalActive={setModalActive}
						editingTask={editingTask}
						setEditingTask={setEditingTask}
					/>
				}
			/>
			<Route path="*" element={<Page404 />} />
		</Routes>
	);
}
export default App;
