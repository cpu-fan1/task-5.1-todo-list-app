import { useState, useRef, useEffect } from 'react';
import { EditModalWindowLayout } from './EditModalWindowLayout';

export const EditModalWindow = ({
	todos,
	setTodos,
	modalActive,
	setModalActive,
	refreshTodos,
	editingTask,
}) => {
	const [buttonActive, setButtonActive] = useState(false);
	const [editedTask, setEditedTask] = useState('');
	const textAreaRef = useRef(null);

	useEffect(() => {
		if (modalActive && editingTask) {
			setEditedTask(editingTask.title);
			setButtonActive(editingTask.title.trim().length > 0);
		}
	}, [modalActive, editingTask]);

	const onSubmit = (event) => {
		event.preventDefault();

		setTodos(
			todos.map((todo) =>
				todo.id === editingTask.id ? { ...todo, title: editedTask } : todo,
			),
		);
		setModalActive(false);
		setButtonActive(false);

		fetch(`http://localhost:3005/todos/${editingTask.id}`, {
			method: 'PUT',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: editedTask,
				completed: editingTask.completed,
			}),
		}).then(() => {
			setEditedTask('');
			refreshTodos();
		});
	};

	const editHandler = (event) => {
		const textAreaValue = event.target.value;
		setEditedTask(textAreaValue);
		setButtonActive(textAreaValue.trim().length > 0);
		textAreaRef.current.style.height = 'auto';
		textAreaRef.current.style.height = textAreaRef.current.scrollHeight + 'px';
	};

	return (
		<EditModalWindowLayout
			editedTask={editedTask}
			buttonActive={buttonActive}
			editHandler={editHandler}
			onSubmit={onSubmit}
			modalActive={modalActive}
			setModalActive={setModalActive}
			textAreaRef={textAreaRef}
		/>
	);
};
