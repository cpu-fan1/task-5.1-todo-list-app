import styles from './app.module.css';
import { ActionForm, SearchForm } from '../components/';
import { completeToggle, deleteTaskButton } from '../utils';

export const AppLayout = ({
	todos,
	isLoading,
	task,
	setTask,
	setSearchValue,
	isSorted,
	setIsSorted,
}) => {
	return (
		<>
			<div className={styles.app}>
				<h1>Cписок дел</h1>
				<ActionForm task={task} setTask={setTask} />
				<SearchForm
					setSearchValue={setSearchValue}
					isSorted={isSorted}
					setIsSorted={setIsSorted}
				/>
				{isLoading ? (
					<div className={styles.loader}></div>
				) : (
					<ul>
						{Object.entries(todos).map(([id, { title, completed }]) => (
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
											completeToggle(id, title, completed);
										}}
									>
										{completed ? '⟲' : '✔'}
									</button>
									<button
										className={styles['action-button-delete']}
										onClick={() => deleteTaskButton(id)}
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
