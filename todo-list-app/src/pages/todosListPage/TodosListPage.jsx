import styles from './todoslistpage.module.css';
import { ControlPanel } from '../../components';
import { useTodos } from '../../hooks/useTodos';
import { Link } from 'react-router-dom';

export const TodosListPage = () => {
	const {
		todos: sortedTodos,
		isLoading,
		error,
		isSorted,
		setIsSorted,
		setSearchValue,
		createTodo,
	} = useTodos();

	if (isLoading) return <div className={styles.loader}></div>;

	if (error) return <div>Неизвестная ошибка!</div>;

	return (
		<div className={styles.app}>
			<h1>
				<Link to="/" className={styles.link}>
					Cписок дел
				</Link>
			</h1>
			<ControlPanel
				isSorted={isSorted}
				setIsSorted={setIsSorted}
				setSearchValue={setSearchValue}
				createTodo={createTodo}
			/>
			<ul>
				{sortedTodos.map(({ id, title, completed }) => (
					<li key={id}>
						<Link to={`task/${id}`}>
							<p
								className={`${styles.todo} ${completed ? `${styles.completed}` : ''}`}
							>
								{title}
							</p>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
};
