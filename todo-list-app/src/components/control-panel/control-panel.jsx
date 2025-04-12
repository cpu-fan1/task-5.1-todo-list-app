import { useDispatch, useSelector } from 'react-redux';
import styles from './controlpanel.module.css';
import { controlPanelSelector } from '../../selectors';
import { createTodo } from '../../actions';

export const ControlPanel = () => {
	const dispatch = useDispatch();
	const { inputValue, buttonActive, isSorted } = useSelector(controlPanelSelector);

	const onSubmit = (event) => {
		event.preventDefault();
		dispatch(createTodo(inputValue));
		dispatch({ type: 'EMPTY_INPUT_VALUE' });
	};

	const taskHandler = ({ target }) => {
		dispatch({ type: 'SET_INPUT_VALUE', payload: target.value });
	};

	const onSearchChange = ({ target }) => {
		dispatch({ type: 'SET_SEARCH_VALUE', payload: target.value.toLowerCase() });
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
					value={inputValue}
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
				onClick={() => dispatch({ type: 'IS_SORTED' })}
			>
				{isSorted ? 'Отставить' : 'Отсортировать по алфавиту'}
			</button>
		</>
	);
};
