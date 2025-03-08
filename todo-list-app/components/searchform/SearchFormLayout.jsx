import styles from './searchForm.module.css';

export const SearchFormLayout = ({ onSubmit, onSearchChange, onSortClick, isSorted }) => {
	return (
		<>
			<form className={styles['search-form']} onSubmit={onSubmit}>
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
