import styles from './todo.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { editingSelector } from '../../selectors';
import { deleteTodo, updateTodo } from '../../actions';

export const Todo = ({ id, title, completed }) => {
	const dispatch = useDispatch();
	const { editingValue, editingId } = useSelector(editingSelector);

	const isEditing = editingId === id;

	const editHandler = ({ target }) => {
		dispatch({ type: 'SET_EDITING_VALUE', payload: target.value });
	};

	const deleteHandler = () => {
		dispatch(deleteTodo(id));
	};

	const startEditHandler = () => {
		dispatch({ type: 'START_EDITING', payload: { id, title } });
	};

	const editAndSaveHandler = () => {
		dispatch(updateTodo(id, editingValue));
		dispatch({ type: 'EDITING_FINISHED' });
	};

	return (
		<li>
			{isEditing ? (
				<input
					type="text"
					placeholder="✎ Откорректируйте дело"
					value={editingValue}
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
						dispatch(updateTodo(id, completed));
					}}
				>
					{completed ? '⟲' : '✔'}
				</button>

				<button
					className={styles['action-button-edit']}
					onClick={isEditing ? editAndSaveHandler : startEditHandler}
				>
					{isEditing ? '🖪' : '🖊'}
				</button>

				<button
					className={styles['action-button-delete']}
					onClick={deleteHandler}
				>
					✖
				</button>
			</div>
		</li>
	);
};
