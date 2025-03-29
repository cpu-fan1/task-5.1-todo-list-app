import { useState, useEffect } from 'react';
import styles from './app.module.css';
import { ControlPanel, Todo } from './components';

function App() {
	const [todos, setTodos] = useState([]);
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

	if (isLoading) return <div className={styles.loader}></div>;

	return (
		<div className={styles.app}>
			<h1>Cписок дел</h1>
			<ControlPanel
				refreshTodos={refreshTodos}
				setSearchValue={setSearchValue}
				isSorted={isSorted}
				setIsSorted={setIsSorted}
			/>
			<ul>
				{filteredTodos().map(({ id, title, completed }) => (
					<Todo
						key={id}
						id={id}
						title={title}
						completed={completed}
						todos={todos}
						setTodos={setTodos}
					/>
				))}
			</ul>
		</div>
	);
}
export default App;
