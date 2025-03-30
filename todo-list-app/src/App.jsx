import styles from './app.module.css';
import { ControlPanel, Todo } from './components';
import { useTodos } from './hooks/useTodos';
import { AppContext } from './context.js';

function App() {
	const todosContext = useTodos();

	if (todosContext.isLoading) return <div className={styles.loader}></div>;

	return (
		<AppContext value={todosContext}>
			<div className={styles.app}>
				<h1>Cписок дел</h1>
				<ControlPanel />
				<ul>
					{todosContext.todos.map(({ id, title, completed }) => (
						<Todo key={id} id={id} title={title} completed={completed} />
					))}
				</ul>
			</div>
		</AppContext>
	);
}
export default App;
