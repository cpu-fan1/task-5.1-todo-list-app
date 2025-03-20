import styles from './app.module.css';
import { ActionForm, SearchForm } from '../components/';
import { Link } from 'react-router-dom';

export const AppLayout = ({
	isLoading,
	task,
	setTask,
	refreshTodos,
	setSearchValue,
	filteredTodos,
	isSorted,
	setIsSorted,
}) => {
	return (
		<>
			<div className={styles.app}>
				<h1>
					<Link to="/" className={styles.link}>
						Cписок дел
					</Link>
				</h1>
				<ActionForm task={task} setTask={setTask} refreshTodos={refreshTodos} />
				<SearchForm
					setSearchValue={setSearchValue}
					isSorted={isSorted}
					setIsSorted={setIsSorted}
				/>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<ul>
						{filteredTodos().map(({ id, title, completed }) => (
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
				)}
			</div>
		</>
	);
};
