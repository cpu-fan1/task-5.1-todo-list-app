import { useState } from 'react';
import styles from './todo.module.css';
import { deleteTask, completeToggle } from '../../api';

export const Todo = ({ id, title, completed, todos, setTodos }) => {
	const [isEditing, setIsEditing] = useState(false);
	const [editingTitle, setEditingTitle] = useState(title);

	const editHandler = ({ target }) => {
		const inputValue = target.value;
		setEditingTitle(inputValue);
	};

	const saveEditHandler = () => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, title: editingTitle } : todo,
			),
		);
		fetch(`http://localhost:3005/todos/${id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editingTitle,
				completed: completed,
			}),
		}).then(() => {
			setIsEditing(false);
		});
	};

	return (
		<li>
			{isEditing ? (
				<input
					type="text"
					placeholder="✎ Откорректируйте дело"
					value={editingTitle}
					onChange={editHandler}
				/>
			) : (
				<p className={completed ? styles.completed : ''}>{title}</p>
			)}
			<div className={styles['action-buttons']}>
				<button
					className={
						completed
							? styles['action-button-completed']
							: styles['action-button-confirm']
					}
					onClick={() => {
						completeToggle(todos, id, title, completed, setTodos);
					}}
				>
					{completed ? '⟲' : '✔'}
				</button>

				<button
					className={styles['action-button-edit']}
					onClick={() => {
						if (isEditing) {
							saveEditHandler();
						} else {
							setIsEditing(true);
							setEditingTitle(title);
						}
					}}
				>
					{isEditing ? '🖪' : '🖊'}
				</button>

				<button
					className={styles['action-button-delete']}
					onClick={() => deleteTask(todos, id, setTodos)}
				>
					✖
				</button>
			</div>
		</li>
	);
};
