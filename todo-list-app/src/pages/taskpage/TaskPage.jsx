import { useParams, Link, useNavigate } from 'react-router-dom';
import styles from './taskpage.module.css';
import { useEffect, useRef, useState } from 'react';
import { useTodos } from '../../hooks/useTodos';

export const TaskPage = () => {
	const { isLoading, setIsLoading, deleteTodo, updateTodo } = useTodos();
	const navigate = useNavigate();
	const params = useParams();
	const [pickedTask, setPickedTask] = useState(null);
	const [isEditing, setIsEditing] = useState(false);
	const [editingId, setEditingId] = useState(null);
	const textAreaRef = useRef(null);

	useEffect(() => {
		setIsLoading(true);
		fetch(`http://localhost:3005/todos/${params.id}`)
			.then((loadedData) => loadedData.json())
			.then((data) => setPickedTask(data))
			.catch(() => setPickedTask(null))
			.finally(() => setIsLoading(false));
	}, [params.id, setIsLoading]);

	useEffect(() => {
		if (isEditing && textAreaRef.current) {
			textAreaRef.current.style.height = 'auto';
			textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
		}
	}, [isEditing, pickedTask?.title]);

	const editChange = ({ target }) => {
		const textAreaValue = target.value;
		setPickedTask((prevTask) => ({ ...prevTask, title: textAreaValue }));
		updateTodo(pickedTask.id, target.value);
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
	};

	const completeToggle = () => {
		updateTodo(pickedTask.id, pickedTask.completed);
		setPickedTask((prevTask) => ({ ...prevTask, completed: !prevTask.completed }));
	};

	if (isLoading) return <div className={styles.loader}></div>;
	if (!pickedTask) return <p> Дело не найдено</p>;

	return (
		<div className={styles.container}>
			<h1>Дело:</h1>
			<button>
				<Link to="/" className={styles['back-button']}>
					◀ Назад
				</Link>
			</button>
			<div className={styles['task-page']}>
				{isEditing && editingId === pickedTask.id ? (
					<textarea
						ref={textAreaRef}
						name="edit"
						className={styles['edit-textarea']}
						placeholder="✎ Откорректируйте дело"
						value={pickedTask.title}
						onChange={editChange}
					/>
				) : (
					<p className={pickedTask.completed ? `${styles.completed}` : ''}>
						{pickedTask.title}
					</p>
				)}
				<div className={styles['action-buttons']}>
					<button
						className={
							pickedTask.completed
								? styles['action-button-completed']
								: styles['action-button-confirm']
						}
						onClick={completeToggle}
					>
						{pickedTask.completed ? '⟲' : '✔'}
					</button>
					<button
						className={styles['action-button-edit']}
						onClick={() => {
							setIsEditing(!isEditing);
							setEditingId(pickedTask.id);
						}}
					>
						{isEditing && editingId === pickedTask.id ? '🖪' : '🖊'}
					</button>
					<button
						className={styles['action-button-delete']}
						onClick={() => {
							deleteTodo(pickedTask.id);
							navigate('/');
						}}
					>
						✖
					</button>
				</div>
			</div>
		</div>
	);
};
