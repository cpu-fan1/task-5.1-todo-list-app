import styles from './app.module.css';
import { ControlPanel, Todo } from './components';
import { useDispatch, useSelector } from 'react-redux';
import { controlPanelSelector, todosSelector } from './selectors';
import { useEffect } from 'react';
import { readTodos } from './actions';

function App() {
	const dispatch = useDispatch();
	const { todos, loading } = useSelector(todosSelector);
	const { searchValue, isSorted } = useSelector(controlPanelSelector);

	useEffect(() => {
		dispatch(readTodos());
	}, [dispatch]);

	const filteredTodos = searchValue
		? todos.filter((todo) => todo.title.toLowerCase().includes(searchValue))
		: todos;

	const sortedTodos = isSorted
		? [...filteredTodos].sort((a, b) => a.title.localeCompare(b.title))
		: filteredTodos;

	if (loading) return <div className={styles.loader}></div>;

	return (
		<div className={styles.app}>
			<h1>Cписок дел</h1>
			<ControlPanel />
			<ul>
				{sortedTodos.map(({ id, title, completed }) => (
					<Todo key={id} id={id} title={title} completed={completed} />
				))}
			</ul>
		</div>
	);
}
export default App;
