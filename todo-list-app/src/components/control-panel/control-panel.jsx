import { useState } from 'react';
import styles from './controlpanel.module.css';

export const ControlPanel = ({ refreshTodos, setSearchValue, isSorted, setIsSorted }) => {
	const [task, setTask] = useState('');
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

	const onSearchChange = (event) => {
		setSearchValue(event.target.value.toLowerCase());
	};

	const onSortClick = () => {
		setIsSorted((prevValue) => !prevValue);
	};

	const onSearchSubmit = (event) => {
		event.preventDefault();
	};

	return (
		<>
			<form onSubmit={onSubmit}>
				<input
					type="text"
					name="task"
					value={task}
					placeholder="Введите задачу"
					onChange={taskHandler}
				/>
				<button type="submit" disabled={!buttonActive}>
					Добавить задачу
				</button>
			</form>
			<form className={styles['search-form']} onSubmit={onSearchSubmit}>
				<input
					type="text"
					name="search"
					placeholder="🔎Начать поиск по фразе"
					onChange={onSearchChange}
				/>
			</form>
			<button
				className={`${styles['sort-button']} ${isSorted ? styles.active : ''}`}
				onClick={onSortClick}
			>
				{isSorted ? 'Отставить' : 'Отсортировать по алфавиту'}
			</button>
		</>
	);
};
