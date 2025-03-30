import styles from './controlpanel.module.css';
import { useState } from 'react';

export const ControlPanel = ({ isSorted, setIsSorted, setSearchValue, createTodo }) => {
	const [buttonActive, setButtonActive] = useState(false);
	const [task, setTask] = useState('');

	const onSubmit = (event) => {
		event.preventDefault();
		createTodo(task);
		setTask('');
		setButtonActive(false);
	};

	const taskHandler = (event) => {
		const inputValue = event.target.value;
		setTask(inputValue);
		setButtonActive(inputValue.length > 0);
	};

	const onSearchChange = (event) => {
		setSearchValue(event.target.value);
	};

	const onSortClick = () => {
		setIsSorted((prevValue) => !prevValue);
	};

	const onSubmitSearch = (event) => {
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
			<form className={styles['search-form']} onSubmit={onSubmitSearch}>
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
