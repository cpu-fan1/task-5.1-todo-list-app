import styles from './app.module.css';
import { ActionForm, SearchForm, EditModalWindow } from '../components/';
import { NavLink } from 'react-router-dom';

export const AppLayout = ({
	todos,
	setTodos,
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
					<NavLink to="/" className={styles.link}>
						Cписок дел
					</NavLink>
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
								<NavLink to={`task/${id}`}>
									<p
										className={`${styles.todo} ${completed ? `${styles.completed}` : ''}`}
									>
										{title}
									</p>
								</NavLink>
								{/* <div className={styles['action-buttons']}>
									<button
										className={styles['action-button-edit']}
										onClick={() => {
											setEditingTask({ id, title, completed });
											setModalActive(true);
										}}
									>
										🖊
									</button>
								</div> */}
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};
