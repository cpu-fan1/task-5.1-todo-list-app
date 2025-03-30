import { useState } from 'react';
import styles from './todo.module.css';
import { AppContext } from '../../context';
import { useContext } from 'react';

export const Todo = ({ id, title, completed }) => {
	const { updateTodo, deleteTodo } = useContext(AppContext);
	const [isEditing, setIsEditing] = useState(false);
	const [editingTitle, setEditingTitle] = useState(title);

	const editHandler = ({ target }) => {
		const inputValue = target.value;
		setEditingTitle(inputValue);
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
						updateTodo(id, completed);
					}}
				>
					{completed ? '⟲' : '✔'}
				</button>

				<button
					className={styles['action-button-edit']}
					onClick={() => {
						if (isEditing) {
							updateTodo(id, editingTitle);
							setIsEditing(false);
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
					onClick={() => deleteTodo(id)}
				>
					✖
				</button>
			</div>
		</li>
	);
};
