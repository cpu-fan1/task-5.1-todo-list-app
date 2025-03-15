import { ActionFormLayout } from './ActionFormLayout';
import { useState } from 'react';

export const ActionForm = ({ task, setTask, refreshTodos }) => {
	const [buttonActive, setButtonActive] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();

		fetch('http://localhost:3005/todos', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json;charset=utf-8' },
			body: JSON.stringify({
				title: task,
				completed: false,
			}),
		}).then(() => {
			setTask('');
			setButtonActive(false);
			refreshTodos();
		});
	};

	const taskHandler = (event) => {
		const inputValue = event.target.value;
		setTask(inputValue);
		setButtonActive(inputValue.length > 0);
	};

	return (
		<ActionFormLayout
			task={task}
			taskHandler={taskHandler}
			buttonActive={buttonActive}
			onSubmit={onSubmit}
		/>
	);
};
