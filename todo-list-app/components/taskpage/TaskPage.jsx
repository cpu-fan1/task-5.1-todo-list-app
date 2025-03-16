import { useParams, NavLink } from 'react-router-dom';
import styles from './taskpage.module.css';
import { useEffect, useState } from 'react';
import { completeToggle, deleteTask } from '../../api';
import { EditModalWindow } from '../editmodalwindow/EditModalWindow';

export const TaskPage = ({
	todos,
	setTodos,
	refreshTodos,
	isLoading,
	setIsLoading,
	modalActive,
	setModalActive,
	editingTask,
	setEditingTask,
}) => {
	const params = useParams();
	const [pickedTask, setPickedTask] = useState(null);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todos/${params.id}`)
			.then((loadedData) => loadedData.json())
			.then((data) => setPickedTask(data))
			.catch(() => setPickedTask(null))
			.finally(() => setIsLoading(false));
	}, [params.id, setIsLoading]);

	return (
		<div className={styles.container}>
			<EditModalWindow
				todos={todos}
				setTodos={setTodos}
				modalActive={modalActive}
				setModalActive={setModalActive}
				editingTask={editingTask}
				setPickedTask={setPickedTask}
			/>
			<h1>Дело:</h1>
			<NavLink to="/" className={styles['back-button']}>
				<button>◀ Назад</button>
			</NavLink>
			{isLoading ? (
				<div className={styles.loader}></div>
			) : pickedTask ? (
				<div className={styles['task-page']}>
					<p className={pickedTask.completed ? `${styles.completed}` : ''}>
						{pickedTask.title}
					</p>
					<div className={styles['action-buttons']}>
						<button
							className={
								pickedTask.completed
									? styles['action-button-completed']
									: styles['action-button-confirm']
							}
							onClick={() => {
								completeToggle(
									todos,
									pickedTask.id,
									pickedTask.title,
									pickedTask.completed,
									setTodos,
									refreshTodos,
									setPickedTask,
								);
							}}
						>
							{pickedTask.completed ? '⟲' : '✔'}
						</button>
						<button
							className={styles['action-button-edit']}
							onClick={() => {
								setEditingTask({
									id: pickedTask.id,
									title: pickedTask.title,
									completed: pickedTask.completed,
								});
								setModalActive(true);
							}}
						>
							🖊
						</button>
						<button
							className={styles['action-button-delete']}
							onClick={() =>
								deleteTask(todos, pickedTask.id, setTodos, setPickedTask)
							}
						>
							✖
						</button>
					</div>
				</div>
			) : (
				<p> Дело не найдено</p>
			)}
		</div>
	);
};
