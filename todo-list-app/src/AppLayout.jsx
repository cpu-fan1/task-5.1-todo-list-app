import styles from './app.module.css';
import { ActionForm, SearchForm, EditModalWindow } from '../components/';
import { completeToggle, deleteTask } from '../api';

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
	modalActive,
	setModalActive,
	editingTask,
	setEditingTask,
}) => {
	return (
		<>
			<EditModalWindow
				todos={todos}
				setTodos={setTodos}
				modalActive={modalActive}
				setModalActive={setModalActive}
				editingTask={editingTask}
			/>
			<div className={styles.app}>
				<h1>Cписок дел</h1>
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
								<p className={completed ? `${styles.completed}` : ''}>
									{title}
								</p>
								<div className={styles['action-buttons']}>
									<button
										className={
											completed
												? styles['action-button-completed']
												: styles['action-button-confirm']
										}
										onClick={() => {
											completeToggle(
												todos,
												id,
												title,
												completed,
												setTodos,
												refreshTodos,
											);
										}}
									>
										{completed ? '⟲' : '✔'}
									</button>
									<button
										className={styles['action-button-edit']}
										onClick={() => {
											setEditingTask({ id, title, completed });
											setModalActive(true);
										}}
									>
										🖊
									</button>
									<button
										className={styles['action-button-delete']}
										onClick={() =>
											deleteTask(todos, id, refreshTodos, setTodos)
										}
									>
										✖
									</button>
								</div>
							</li>
						))}
					</ul>
				)}
			</div>
		</>
	);
};
