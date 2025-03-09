import { ActionFormLayout } from './ActionFormLayout';
import { useState } from 'react';
import { ref, push } from 'firebase/database';
import { db } from '../../src/firebase';

export const ActionForm = ({ task, setTask }) => {
	const [buttonActive, setButtonActive] = useState(false);

	const onSubmit = (event) => {
		event.preventDefault();

		const todosDbRef = ref(db, 'todos');

		push(todosDbRef, {
			title: task,
			completed: false,
		}).then(() => {
			setTask('');
			setButtonActive(false);
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
