import { useState, useEffect } from 'react';
import { AppLayout } from './AppLayout';

function App() {
	const [todos, setTodos] = useState([]);
	const [task, setTask] = useState('');
	const [isLoading, setIsLoading] = useState(false);
	const [refreshTodosFlag, setRefreshTodosFlag] = useState(false);
	const [searchValue, setSearchValue] = useState('');
	const [isSorted, setIsSorted] = useState(false);

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
		// if (!searchValue) {
		// 	return todos;
		// }
		// return todos.filter((todo) => todo.title.toLowerCase().includes(searchValue));

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
		/>
	);
}
export default App;
